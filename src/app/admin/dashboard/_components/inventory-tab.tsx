
"use client";

import { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Search, QrCode, ShoppingCart, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockProducts, Product } from '@/lib/mock-data';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SellPartDialog from './sell-part-dialog';
import QrScannerDialog from './qr-scanner-dialog';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

type FormValues = Omit<Product, 'id'>;
export type CartItem = { product: Product; quantity: number };

const PRODUCTS_PER_PAGE = 10;

export default function InventoryTab() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastCartAction, setLastCartAction] = useState<{type: string, payload: any} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

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
                    title: 'Invalid Product ID',
                    description: `Product with ID "${lastCartAction.payload.id}" not found in inventory.`,
                });
                break;
        }
    };
    showToast();
    setLastCartAction(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCartAction]);


  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>();

  const filteredProducts = useMemo(() => products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const onAddProductSubmit: SubmitHandler<FormValues> = (data) => {
    const newProduct: Product = {
      id: `${data.category.toUpperCase()}-${Date.now()}`,
      ...data,
      mrp: Number(data.mrp),
      sellingPrice: Number(data.sellingPrice),
      stock: Number(data.stock),
      image: 'https://placehold.co/400x400.png',
      imageHint: 'new product'
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    toast({
      title: 'Product Added',
      description: `${data.name} has been added to the inventory.`,
    });
    reset();
    setIsAddProductDialogOpen(false);
  };
  
  const handleQrScan = (productId: string) => {
    setIsQrScannerOpen(false);
    const product = products.find(p => p.id === productId);
    if (product) {
      handleAddToCart(product);
    } else {
      setLastCartAction({ type: 'QR_NOT_FOUND', payload: { id: productId } });
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product.id === product.id);
      if (existingItem) {
        if(existingItem.quantity < product.stock) {
          setLastCartAction({ type: 'UPDATE_SUCCESS', payload: { name: product.name } });
          return currentCart.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
           setLastCartAction({ type: 'STOCK_LIMIT', payload: { name: product.name } });
           return currentCart;
        }
      }
      setLastCartAction({ type: 'ADD_SUCCESS', payload: { name: product.name } });
      return [...currentCart, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(currentCart => {
       const item = currentCart.find(item => item.product.id === productId);
       if (!item) return currentCart;

       if (quantity > item.product.stock) {
          setLastCartAction({type: 'NOT_ENOUGH_STOCK', payload: {stock: item.product.stock}});
          return currentCart.map(i => i.product.id === productId ? { ...i, quantity: i.product.stock } : i);
       }
       
       if (quantity <= 0) {
         return currentCart.filter(item => item.product.id !== productId);
       }

       return currentCart.map(item =>
         item.product.id === productId ? { ...item, quantity } : item
       );
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.product.id !== productId));
  }

  const cartTotal = cart.reduce((total, item) => total + item.product.sellingPrice * item.quantity, 0);

  const handleSaleComplete = (soldItems: CartItem[]) => {
    setProducts(currentProducts => {
      return currentProducts.map(product => {
        const soldItem = soldItems.find(item => item.product.id === product.id);
        if (soldItem) {
          return { ...product, stock: product.stock - soldItem.quantity };
        }
        return product;
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
             <div className="flex items-center gap-4 mb-4">
              <Button variant="outline" size="icon" onClick={() => router.push('/admin/dashboard')}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
              </Button>
              <CardTitle>Product Inventory</CardTitle>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Button variant="outline" onClick={() => setIsQrScannerOpen(true)}>
                    <QrCode className="mr-2 h-4 w-4" /> Scan
                  </Button>
                  <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit(onAddProductSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" {...register("name", { required: "Name is required" })} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Part">Part</SelectItem>
                                            <SelectItem value="Accessory">Accessory</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                             {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="mrp">MRP (₹)</Label>
                              <Input id="mrp" type="number" step="0.01" {...register("mrp", { required: "MRP is required", min: 0 })} />
                              {errors.mrp && <p className="text-xs text-destructive">{errors.mrp.message}</p>}
                          </div>
                           <div className="grid gap-2">
                              <Label htmlFor="sellingPrice">Selling Price (₹)</Label>
                              <Input id="sellingPrice" type="number" step="0.01" {...register("sellingPrice", { required: "Selling Price is required", min: 0 })} />
                              {errors.sellingPrice && <p className="text-xs text-destructive">{errors.sellingPrice.message}</p>}
                          </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input id="stock" type="number" {...register("stock", { required: "Stock is required", min: 0 })} />
                            {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
                        </div>
                        <Button type="submit">Save Product</Button>
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
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price (MRP/Sell)</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="line-through text-muted-foreground">₹{product.mrp.toFixed(2)}</span>
                            <span className="font-medium">₹{product.sellingPrice.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
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
                                <div key={item.product.id} className="flex flex-wrap justify-between items-center gap-y-2">
                                    <div className="flex-grow pr-4">
                                        <p className="font-medium">{item.product.name}</p>
                                        <p className="text-sm text-muted-foreground">₹{item.product.sellingPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Input 
                                            type="number" 
                                            className="w-16 h-8"
                                            value={item.quantity}
                                            onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 0)}
                                            min="1"
                                            max={item.product.stock}
                                        />
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.product.id)}>
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
                        <p className="text-sm">Add products from the inventory to start a sale.</p>
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
