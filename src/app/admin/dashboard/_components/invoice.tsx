
"use client";

import { CartItem } from './inventory-tab';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type InvoiceDetails = {
  items: CartItem[];
  discount: number;
  customerName: string;
  customerContact: string;
  subtotal: number;
  totalAmount: number;
  invoiceId: string;
  invoiceDate: string;
};

interface InvoiceProps {
  details: InvoiceDetails;
}

export default function Invoice({ details }: InvoiceProps) {
  const { items, discount, customerName, customerContact, subtotal, totalAmount, invoiceId, invoiceDate } = details;
  const totalMrp = items.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
  const totalSavings = totalMrp - subtotal;
  
  return (
    <Card className="max-w-2xl mx-auto" id="invoice-content">
      <CardHeader className="p-6">
        <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-bold">VIDYA WORK SHOP</h1>
                <p className="text-muted-foreground text-sm">near HOTEL MINI TAJ, Sitamarhi, Bihar 843302, India</p>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
                <h2 className="text-xl font-semibold text-primary">Invoice</h2>
                <p className="text-sm"><strong>Invoice #:</strong> {invoiceId}</p>
                <p className="text-sm"><strong>Date:</strong> {invoiceDate}</p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div>
            <h3 className="text-lg font-semibold mb-2">Bill To:</h3>
            <p>{customerName}</p>
            <p>{customerContact}</p>
        </div>
        <Separator className="my-6" />
        <div className="overflow-x-auto">
            <div className="min-w-[500px]">
                <div className="grid grid-cols-6 gap-4 font-semibold mb-2">
                    <div className="col-span-2">Item</div>
                    <div className="text-center">Qty</div>
                    <div className="text-right">MRP</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Amount</div>
                </div>
                <Separator className="my-2" />
                <ScrollArea className="h-[200px] print:h-auto print:overflow-visible" id="invoice-items-scroll-area">
                  {items.map(item => (
                      <div key={item.product.id} className="grid grid-cols-6 gap-4 items-start mb-2">
                          <div className="col-span-2 break-words">
                            <span className="font-medium">{item.product.name}</span>
                            <span className="text-xs text-muted-foreground block"> ({item.product.id})</span>
                          </div>
                          <div className="text-center">{item.quantity}</div>
                          <div className="text-right line-through text-muted-foreground">₹{item.product.mrp.toFixed(2)}</div>
                          <div className="text-right">₹{item.product.sellingPrice.toFixed(2)}</div>
                          <div className="text-right font-medium">₹{(item.product.sellingPrice * item.quantity).toFixed(2)}</div>
                      </div>
                  ))}
                </ScrollArea>
            </div>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div></div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                   <div className="flex justify-between text-sm">
                        <span>Total Savings on MRP</span>
                        <span className='text-green-600'>- ₹{totalSavings.toFixed(2)}</span>
                   </div>
                )}
                 <div className="flex justify-between">
                    <span>Additional Discount</span>
                    <span className="text-destructive">- {discount}%</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 text-center text-xs text-muted-foreground">
        <p>Thank you for your business! | All sales are final.</p>
      </CardFooter>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-dialog, #invoice-dialog * {
            visibility: visible;
          }
          #invoice-dialog {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            box-shadow: none;
            border: none;
          }
           #invoice-dialog .print-hidden {
             display: none;
           }
           #invoice-items-scroll-area, 
           #invoice-items-scroll-area > div {
             height: auto !important;
             overflow: visible !important;
           }
        }
      `}</style>
    </Card>
  )
}
