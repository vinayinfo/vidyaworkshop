
"use client";

import { CartItem } from './inventory-tab';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
  const totalMrp = items.reduce((acc, item) => acc + item.part.mrp * item.quantity, 0);
  const totalSavings = totalMrp - subtotal;
  
  return (
    <Card className="max-w-2xl mx-auto" id="invoice">
      <CardHeader className="p-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">VIDYA WORK SHOP</h1>
                <p className="text-muted-foreground">near HOTEL MINI TAJ, Sitamarhi, Bihar 843302, India</p>
            </div>
            <div className="text-right">
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
        <div className="grid grid-cols-6 gap-4 font-semibold mb-2">
            <div className="col-span-2">Item</div>
            <div className="text-center">Qty</div>
            <div className="text-right">MRP</div>
            <div className="text-right">Price</div>
            <div className="text-right">Amount</div>
        </div>
        <Separator className="my-2" />
        {items.map(item => (
            <div key={item.part.id} className="grid grid-cols-6 gap-4 items-center mb-2">
                <div className="col-span-2">{item.part.name} ({item.part.id})</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right line-through text-muted-foreground">₹{item.part.mrp.toFixed(2)}</div>
                <div className="text-right">₹{item.part.sellingPrice.toFixed(2)}</div>
                <div className="text-right">₹{(item.part.sellingPrice * item.quantity).toFixed(2)}</div>
            </div>
        ))}
        <Separator className="my-6" />
        <div className="grid grid-cols-2 gap-4">
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
          #invoice, #invoice * {
            visibility: visible;
          }
          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
          }
          .print\\:hidden {
              display: none;
          }
        }
      `}</style>
    </Card>
  )
}
