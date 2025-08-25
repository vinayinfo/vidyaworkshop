
"use client";

import { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Search, QrCode, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockParts, Part } from '@/lib/mock-data';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import SellPartDialog from './sell-part-dialog';
import QrScannerDialog from './qr-scanner-dialog';
import { Separator } from '@/components/ui/separator';

type FormValues = Omit<Part, 'id'>;
export type CartItem = { part: Part; quantity: number };

const PARTS_PER_PAGE = 10;

export default function InventoryTab() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPartDialogOpen, setIsAddPartDialogOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastCartAction, setLastCartAction] = useState<{type: string, payload: any} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { toast } = useToast();

  useEffect(() => {
    if (!lastCartAction) return;

    let toastId: string | undefined;

    const showToast = () => {
        switch (lastCartAction.type) {
            case 'ADD_SUCCESS':
                toast({ title: "Added to cart", description: `${lastCartAction.payload.name} has been added to your cart.` });
                break;
            case 'UPDATE_SUCCESS':
                toast({ title: "Added to cart", description: `${lastCartAction.payload.name} quantity updated.` });
                break;
            case 'STOCK_LIMIT':
                toast({ variant: 'destructive', title: "Stock limit reached", description: `Cannot add more of ${lastCartAction.payload.name}.` });
                break;
            case 'NOT_ENOUGH_STOCK':
                toast({ variant: 'destructive', title: "Not enough stock", description: `Only ${lastCartAction.payload.stock} units available.` });
                break;
            case 'QR_NOT_FOUND':
                toast({
                    variant: 'destructive',
                    title: 'Invalid Part ID',
                    description: `Part with ID "${lastCartAction.payload.id}" not found in inventory.`,
                });
                break;
        }
    };
    showToast();
    setLastCartAction(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCartAction]);


  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const filteredParts = useMemo(() => parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [parts, searchTerm]);

  const totalPages = Math.ceil(filteredParts.length / PARTS_PER_PAGE);
  const paginatedParts = filteredParts.slice((currentPage - 1) * PARTS_PER_PAGE, currentPage * PARTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const onAddPartSubmit: SubmitHandler<FormValues> = (data) => {
    const newPart: Part = {
      id: `PART-${Date.now()}`,
      ...data,
      mrp: Number(data.mrp),
      stock: Number(data.stock),
    };
    setParts(prevParts => [newPart, ...prevParts]);
    toast({
      title: 'Part Added',
      description: `${data.name} has been added to the inventory.`,
    });
    reset();
    setIsAddPartDialogOpen(false);
  };
  
  const handleQrScan = (partId: string) => {
    setIsQrScannerOpen(false);
    const part = parts.find(p => p.id === partId);
    if (part) {
      handleAddToCart(part);
    } else {
      setLastCartAction({ type: 'QR_NOT_FOUND', payload: { id: partId } });
    }
  };

  const handleAddToCart = (part: Part) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.part.id === part.id);
      if (existingItem) {
        if(existingItem.quantity < part.stock) {
          setLastCartAction({ type: 'UPDATE_SUCCESS', payload: { name: part.name } });
          return currentCart.map(item =>
            item.part.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
           setLastCartAction({ type: 'STOCK_LIMIT', payload: { name: part.name } });
           return currentCart;
        }
      }
      setLastCartAction({ type: 'ADD_SUCCESS', payload: { name: part.name } });
      return [...currentCart, { part, quantity: 1 }];
    });
  };

  const updateCartQuantity = (partId: string, quantity: number) => {
    setCart(currentCart => {
       const item = currentCart.find(item => item.part.id === partId);
       if (!item) return currentCart;

       if (quantity > item.part.stock) {
          setLastCartAction({type: 'NOT_ENOUGH_STOCK', payload: {stock: item.part.stock}});
          return currentCart.map(i => i.part.id === partId ? { ...i, quantity: i.part.stock } : i);
       }
       
       if (quantity <= 0) {
         return currentCart.filter(item => item.part.id !== partId);
       }

       return currentCart.map(item =>
         item.part.id === partId ? { ...item, quantity } : item
       );
    })
  }

  const removeFromCart = (partId: string) => {
    setCart(currentCart => currentCart.filter(item => item.part.id !== partId));
  }

  const cartTotal = cart.reduce((total, item) => total + item.part.mrp * item.quantity, 0);

  const handleSaleComplete = (soldItems: CartItem[]) => {
    setParts(currentParts => {
      return currentParts.map(part => {
        const soldItem = soldItems.find(item => item.part.id === part.id);
        if (soldItem) {
          return { ...part, stock: part.stock - soldItem.quantity };
        }
        return part;
      });
    });
    setCart([]); // Clear cart
    setIsCheckoutOpen(false); // Close dialog
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parts Inventory</CardTitle>
            <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search parts by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Button variant="outline" onClick={() => setIsQrScannerOpen(true)}>
                    <QrCode className="mr-2 h-4 w-4" /> Scan
                  </Button>
                  <Dialog open={isAddPartDialogOpen} onOpenChange={setIsAddPartDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Part
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Part</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onAddPartSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Part Name</Label>
                            <Input id="name" {...register("name", { required: "Name is required" })} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mrp">MRP (₹)</Label>
                            <Input id="mrp" type="number" {...register("mrp", { required: "MRP is required", min: 0 })} />
                            {errors.mrp && <p className="text-xs text-destructive">{errors.mrp.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input id="stock" type="number" {...register("stock", { required: "Stock is required", min: 0 })} />
                            {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
                        </div>
                        <Button type="submit">Save Part</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Part ID</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedParts.map(part => (
                    <TableRow key={part.id}>
                      <TableCell className="font-medium">{part.name}</TableCell>
                      <TableCell>{part.id}</TableCell>
                      <TableCell>{part.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleAddToCart(part)} disabled={part.stock === 0}>
                          Add to Cart
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Current Sale
                </CardTitle>
            </CardHeader>
            <CardContent>
                {cart.length > 0 ? (
                    <div className="flex flex-col h-full">
                        <div className="flex-grow space-y-4">
                            {cart.map(item => (
                                <div key={item.part.id} className="flex flex-wrap justify-between items-center gap-y-2">
                                    <div className="flex-grow pr-4">
                                        <p className="font-medium">{item.part.name}</p>
                                        <p className="text-sm text-muted-foreground">₹{item.part.mrp.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Input 
                                            type="number" 
                                            className="w-16 h-8"
                                            value={item.quantity}
                                            onChange={(e) => updateCartQuantity(item.part.id, parseInt(e.target.value) || 0)}
                                            min="1"
                                            max={item.part.stock}
                                        />
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.part.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                            <div className="flex justify-between font-semibold">
                                <span>Subtotal</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button className="mt-4 w-full" onClick={() => setIsCheckoutOpen(true)}>
                            Proceed to Invoice
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        <ShoppingCart className="mx-auto h-12 w-12" />
                        <p className="mt-4">Your cart is empty</p>
                        <p className="text-sm">Add parts from the inventory to start a sale.</p>
                    </div>
                )}
            </CardContent>
        </Card>

      </div>
      
      {isQrScannerOpen && (
        <QrScannerDialog 
            onScan={handleQrScan}
            onOpenChange={setIsQrScannerOpen}
        />
      )}

      {isCheckoutOpen && cart.length > 0 && (
        <SellPartDialog 
          cart={cart}
          onOpenChange={() => setIsCheckoutOpen(false)}
          onSaleComplete={handleSaleComplete}
        />
      )}
    </>
  );
}

    