
"use client";

import { useState, useMemo } from 'react';
import { Product } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface PurchaseOrderDialogProps {
  selectedProducts: Product[];
  onOpenChange: (open: boolean) => void;
}

type OrderItem = {
  product: Product;
  orderQuantity: number;
};

export default function PurchaseOrderDialog({ selectedProducts, onOpenChange }: PurchaseOrderDialogProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    selectedProducts.map(p => ({ product: p, orderQuantity: 10 })) // Default order quantity to 10
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setOrderItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId ? { ...item, orderQuantity: quantity } : item
      )
    );
  };
  
  const handlePrint = () => {
    const poContent = document.getElementById('po-content')?.innerHTML;
    if (poContent) {
      const printWindow = window.open('', '', 'height=800,width=800');
      if(printWindow) {
          printWindow.document.write('<html><head><title>Purchase Order</title>');
          printWindow.document.write(`
            <style>
              body { font-family: Arial, sans-serif; margin: 2rem; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              h1, h2, h3 { margin-bottom: 1rem; }
              .header, .footer { margin-bottom: 2rem; }
              .po-details { display: flex; justify-content: space-between; margin-bottom: 2rem; }
              .total-row td { font-weight: bold; }
               @media print {
                 @page {
                    size: auto;
                    margin: 0.5in;
                 }
                .print-hidden { display: none; }
              }
            </style>
          `);
          printWindow.document.write('</head><body>');
          printWindow.document.write(poContent);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.focus();
           setTimeout(() => { 
            printWindow.print();
            printWindow.close();
        }, 250);
      }
    }
  }

  const totalOrderQuantity = orderItems.reduce((sum, item) => sum + item.orderQuantity, 0);

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl flex flex-col h-[90vh]">
        <DialogHeader>
          <DialogTitle>Purchase Order</DialogTitle>
          <DialogDescription>Review the items and quantities before printing the purchase order.</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
                <div id="po-content" className="p-2">
                    <div className="header">
                        <h1 className="text-2xl font-bold">VIDYA WORK SHOP</h1>
                        <p className="text-muted-foreground text-sm">near HOTEL MINI TAJ, Sitamarhi, Bihar 843302, India</p>
                    </div>
                    <div className="po-details">
                        <div>
                            <h2 className="text-lg font-semibold">Vendor:</h2>
                            <p>_________________________</p>
                            <p>_________________________</p>
                            <p>_________________________</p>
                        </div>
                        <div className="text-right">
                             <h2 className="text-xl font-semibold text-primary">Purchase Order</h2>
                            <p><strong>PO #:</strong> PO-{Date.now()}</p>
                            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead className="text-center print-hidden">Order Quantity</TableHead>
                            <TableHead className="text-center hidden print:table-cell">Order Qty</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {orderItems.map(item => (
                            <TableRow key={item.product.id}>
                            <TableCell>{item.product.id}</TableCell>
                            <TableCell className="font-medium">{item.product.name}</TableCell>
                            <TableCell className="text-destructive font-bold">{item.product.stock}</TableCell>
                            <TableCell className="text-right">
                                <Input
                                    type="number"
                                    value={item.orderQuantity}
                                    onChange={e => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
                                    className="w-20 h-8 mx-auto print-hidden"
                                    min="1"
                                />
                                 <span className="hidden print:inline-block w-full text-center">{item.orderQuantity}</span>
                            </TableCell>
                            </TableRow>
                        ))}
                         <TableRow className="total-row">
                            <TableCell colSpan={3} className="text-right">Total Quantity</TableCell>
                            <TableCell className="text-center font-bold">{totalOrderQuantity}</TableCell>
                         </TableRow>
                        </TableBody>
                    </Table>
                    <div className="footer mt-12">
                        <p><strong>Approved By:</strong> _________________________</p>
                    </div>
                </div>
            </ScrollArea>
        </div>
        <div className="flex justify-end gap-2 mt-4 flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handlePrint}>Print Purchase Order</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
