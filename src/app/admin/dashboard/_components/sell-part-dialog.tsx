
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Invoice from './invoice';
import { CartItem } from './inventory-tab';

interface SellPartDialogProps {
  cart: CartItem[];
  onOpenChange: (open: boolean) => void;
  onSaleComplete: (soldItems: CartItem[]) => void;
}

type SaleFormValues = {
  discount: number;
  customerName: string;
  customerContact: string;
};

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

export default function SellPartDialog({ cart, onOpenChange, onSaleComplete }: SellPartDialogProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SaleFormValues>({
      defaultValues: { discount: 0 }
  });
  const { toast } = useToast();
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.part.sellingPrice * item.quantity), 0);
  const discount = watch('discount') || 0;
  const totalAmount = subtotal * (1 - discount / 100);

  const onSubmit: SubmitHandler<SaleFormValues> = (data) => {
    const newInvoiceDetails: InvoiceDetails = {
      items: cart,
      subtotal,
      totalAmount,
      invoiceId: `INV-${Date.now()}`,
      invoiceDate: new Date().toLocaleDateString(),
      ...data,
    }
    setInvoiceDetails(newInvoiceDetails);
  };
    
  const handleConfirmSale = () => {
    if(!invoiceDetails) return;
    onSaleComplete(invoiceDetails.items);
    toast({
        title: 'Sale Completed',
        description: `Invoice ${invoiceDetails.invoiceId} generated.`,
    });
  }
  
  const handlePrint = () => {
    window.print();
  }


  if (invoiceDetails) {
      return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Invoice</DialogTitle>
                </DialogHeader>
                <Invoice details={invoiceDetails} />
                 <div className="flex justify-end gap-2 mt-4 print:hidden">
                    <Button variant="outline" onClick={() => setInvoiceDetails(null)}>Back to Sale</Button>
                    <Button onClick={handlePrint}>Print Invoice</Button>
                    <Button onClick={handleConfirmSale}>Confirm Sale & Close</Button>
                 </div>
            </DialogContent>
        </Dialog>
      )
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalize Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <h4 className="font-medium mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm">
              {cart.map(item => (
                <div key={item.part.id} className="flex justify-between">
                  <span>{item.part.name} x {item.quantity}</span>
                  <span>₹{(item.part.sellingPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="discount">Additional Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              {...register("discount", { 
                  min: { value: 0, message: "Discount cannot be negative" },
                  max: { value: 100, message: "Discount cannot exceed 100%" }
              })}
            />
             {errors.discount && <p className="text-xs text-destructive">{errors.discount.message}</p>}
          </div>
           <div className="grid gap-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" {...register("customerName", { required: "Customer name is required" })} />
            {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
          </div>
           <div className="grid gap-2">
            <Label htmlFor="customerContact">Customer Contact (Mobile/Email)</Label>
            <Input id="customerContact" {...register("customerContact", { required: "Customer contact is required" })} />
            {errors.customerContact && <p className="text-xs text-destructive">{errors.customerContact.message}</p>}
          </div>
          <div className="font-bold text-lg text-right">
              Total: ₹{totalAmount.toFixed(2)}
          </div>
          <Button type="submit">Generate Invoice</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
