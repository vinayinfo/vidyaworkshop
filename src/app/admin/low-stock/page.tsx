
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, FileText } from 'lucide-react';
import { mockProducts, Product } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import PurchaseOrderDialog from '../dashboard/_components/purchase-order-dialog';

const LOW_STOCK_THRESHOLD = 5;

export default function LowStockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isPoDialogOpen, setIsPoDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    }
  }, [router]);

  const lowStockProducts = useMemo(() => {
    return mockProducts.filter(p => p.stock < LOW_STOCK_THRESHOLD);
  }, []);

  const filteredProducts = useMemo(() => {
    return lowStockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [lowStockProducts, searchTerm]);
  
  const handleSelectProduct = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, product]);
    } else {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts(filteredProducts);
    } else {
      setSelectedProducts([]);
    }
  };
  
  const isAllSelected = filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40 min-h-screen">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Low Stock Products</h2>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <CardTitle>Inventory Items Running Low</CardTitle>
                    <CardDescription>
                        Select items to generate a purchase order. Items with stock less than {LOW_STOCK_THRESHOLD}.
                    </CardDescription>
                </div>
                <Button 
                    onClick={() => setIsPoDialogOpen(true)}
                    disabled={selectedProducts.length === 0}
                >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Purchase Order ({selectedProducts.length})
                </Button>
            </div>
            <div className="pt-4">
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name or ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                       <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Current Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                          <TableRow 
                            key={product.id}
                            data-state={selectedProducts.some(p => p.id === product.id) && "selected"}
                          >
                            <TableCell>
                               <Checkbox
                                checked={selectedProducts.some(p => p.id === product.id)}
                                onCheckedChange={(checked) => handleSelectProduct(product, Boolean(checked))}
                                aria-label="Select row"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="text-right font-bold text-destructive">{product.stock}</TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            {searchTerm ? `No low stock products found for "${searchTerm}".` : "All stock levels are healthy."}
                          </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {isPoDialogOpen && selectedProducts.length > 0 && (
        <PurchaseOrderDialog
          selectedProducts={selectedProducts}
          onOpenChange={(open) => {
            if (!open) {
                setIsPoDialogOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
