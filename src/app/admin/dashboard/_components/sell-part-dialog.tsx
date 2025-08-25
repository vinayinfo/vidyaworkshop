
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Part } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import Invoice from './invoice';

interface SellPartDialogProps {
  part: Part;
  onOpenChange: (open: boolean) => void;
  onSaleComplete: (partId: string, quantitySold: number) => void;
}

type SaleFormValues = {
  quantity: number;
  discount: number;
  customerName: string;
  customerContact: string;
};

type InvoiceDetails = SaleFormValues & {
    part: Part;
    totalAmount: number;
    invoiceId: string;
    invoiceDate: string;
}

export default function SellPartDialog({ part, onOpenChange, onSaleComplete }: SellPartDialogProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SaleFormValues>({
      defaultValues: { quantity: 1, discount: 0 }
  });
  const { toast } = useToast();
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(null);

  const quantity = watch('quantity', 1);

  const onSubmit: SubmitHandler<SaleFormValues> = (data) => {
    if (data.quantity > part.stock) {
      toast({
        variant: 'destructive',
        title: 'Out of Stock',
        description: `Only ${part.stock} units of ${part.name} available.`,
      });
      return;
    }
    
    const totalAmount = (part.mrp * data.quantity) * (1 - data.discount / 100);

    const newInvoiceDetails: InvoiceDetails = {
      ...data,
      part,
      totalAmount,
      invoiceId: `INV-${Date.now()}`,
      invoiceDate: new Date().toLocaleDateString(),
    }
    setInvoiceDetails(newInvoiceDetails);
  };
    
  const handleConfirmSale = () => {
    if(!invoiceDetails) return;
    onSaleComplete(part.id, invoiceDetails.quantity);
    toast({
        title: 'Sale Completed',
        description: `Sold ${invoiceDetails.quantity} of ${part.name}. Invoice generated.`,
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
          <DialogTitle>Sell Part: {part.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Price (MRP)</Label>
            <Input value={`₹${part.mrp.toFixed(2)}`} readOnly disabled />
          </div>
          <div className="grid gap-2">
            <Label>Available Stock</Label>
            <Input value={part.stock} readOnly disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { 
                required: "Quantity is required", 
                min: { value: 1, message: "Quantity must be at least 1" },
                max: { value: part.stock, message: "Not enough stock" }
              })}
            />
            {errors.quantity && <p className="text-xs text-destructive">{errors.quantity.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount">Discount (%)</Label>
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
              Total: ₹{((part.mrp * (quantity || 0)) * (1 - (watch('discount') || 0) / 100)).toFixed(2)}
          </div>
          <Button type="submit">Generate Invoice</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
