
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Invoice from './invoice';
import { CartItem } from './inventory-tab';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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

export type ServiceItem = {
  id: string;
  name: string;
  cost: number;
};

type InvoiceDetails = {
  items: CartItem[];
  services: ServiceItem[];
  discount: number;
  customerName: string;
  customerContact: string;
  subtotal: number;
  totalAmount: number;
  invoiceId: string;
  invoiceDate: string;
};

export default function SellPartDialog({ cart, onOpenChange, onSaleComplete }: SellPartDialogProps) {
  const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm<SaleFormValues>({
      defaultValues: { discount: 0 }
  });
  const { toast } = useToast();
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceCost, setServiceCost] = useState('');

  const productsSubtotal = cart.reduce((acc, item) => acc + (item.product.sellingPrice * item.quantity), 0);
  const servicesSubtotal = services.reduce((acc, service) => acc + service.cost, 0);
  const subtotal = productsSubtotal + servicesSubtotal;
  const discount = watch('discount') || 0;
  const totalAmount = subtotal * (1 - discount / 100);

  const handleAddService = () => {
    if (serviceName && serviceCost) {
        const newService: ServiceItem = {
            id: `service-${Date.now()}`,
            name: serviceName,
            cost: Number(serviceCost)
        };
        setServices(prev => [...prev, newService]);
        setServiceName('');
        setServiceCost('');
    }
  };

  const handleRemoveService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  }

  const onSubmit: SubmitHandler<SaleFormValues> = (data) => {
    const newInvoiceDetails: InvoiceDetails = {
      items: cart,
      services,
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
    const invoiceContent = document.getElementById('invoice-content');
    if (invoiceContent) {
      const printWindow = window.open('', '', 'height=800,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Invoice</title>');
        printWindow.document.write(`
          <style>
            @media print {
              @page { size: auto; margin: 0.5in; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .min-w-\\[500px\\] > div { page-break-inside: avoid; }
              #invoice-items-scroll-area, #invoice-services-scroll-area { height: auto !important; overflow: visible !important; }
            }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.5; color: #333; }
            .invoice-card { max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 0.5rem; }
            .p-6 { padding: 1.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .font-bold { font-weight: 700; }
            .text-muted-foreground { color: #64748b; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-start { align-items: flex-start; }
            .items-center { align-items: center; }
            .text-left { text-align: left; }
            .text-right { text-align: right; }
            .mt-4 { margin-top: 1rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .font-semibold { font-weight: 600; }
            .my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
            hr, .separator { border-top: 1px solid #e2e8f0; }
            .grid { display: grid; }
            .grid-cols-items { grid-template-columns: 2.5fr 0.5fr 1fr 1fr 1fr; }
            .grid-cols-services { grid-template-columns: 3.5fr 1.5fr; }
            .gap-4 { gap: 1rem; }
            .col-span-2 { grid-column: span 2 / span 2; }
            .text-center { text-align: center; }
            .font-medium { font-weight: 500; }
            .break-words { overflow-wrap: break-word; }
            .block { display: block; }
            .line-through { text-decoration: line-through; }
            .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
            .text-destructive { color: hsl(0 84.2% 60.2%); }
            .text-green-600 { color: #16a34a; }
            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-center { text-align: center; }
            .sm\\:flex-row { flex-direction: row; }
            .sm\\:items-center { align-items: center; }
            .sm\\:text-right { text-align: right; }
            .sm\\:mt-0 { margin-top: 0px; }
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(invoiceContent.innerHTML.replace(/data-radix-scroll-area-viewport=""/g, 'style="height: auto !important; overflow: visible !important;"'));
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { // Timeout to ensure content is loaded
            printWindow.print();
            printWindow.close();
        }, 250);
      }
    }
  }

  if (invoiceDetails) {
      return (
        <Dialog open={true} onOpenChange={(open) => {
          if (!open) {
            setInvoiceDetails(null); // Reset when dialog is closed
          }
          onOpenChange(open);
        }}>
            <DialogContent id="invoice-dialog" className="sm:max-w-2xl flex flex-col h-[90vh]">
                <DialogHeader className="print-hidden">
                    <DialogTitle>Invoice</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow">
                    <Invoice details={invoiceDetails} />
                </ScrollArea>
                 <div className="flex justify-end gap-2 mt-4 print-hidden flex-shrink-0">
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Finalize Sale</DialogTitle>
           <DialogDescription>Review the order, add services, and enter customer details to generate an invoice.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            <h4 className="font-medium mb-2">Order Summary</h4>
            {cart.length > 0 ? (
                cart.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.product.sellingPrice * item.quantity).toFixed(2)}</span>
                    </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground">No products in cart.</p>
            )}
            {cart.length > 0 && <Separator className="my-2" />}
             {services.map(service => (
                <div key={service.id} className="flex justify-between items-center text-sm">
                    <span>{service.name}</span>
                    <div className="flex items-center gap-2">
                        <span>₹{service.cost.toFixed(2)}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveService(service.id)}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            ))}
          </div>

          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Add Service</h4>
            <div className="flex items-end gap-2">
                <div className="grid gap-1.5 flex-grow">
                    <Label htmlFor="serviceName">Service Description</Label>
                    <Input id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="e.g., General Labor" />
                </div>
                 <div className="grid gap-1.5 w-32">
                    <Label htmlFor="serviceCost">Cost (₹)</Label>
                    <Input id="serviceCost" type="number" value={serviceCost} onChange={(e) => setServiceCost(e.target.value)} placeholder="e.g., 500" />
                </div>
                <Button type="button" onClick={handleAddService} disabled={!serviceName || !serviceCost}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
            </div>
          </div>
          
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input id="customerName" {...register("customerName", { required: "Customer name is required" })} />
              {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerContact">Customer Contact</Label>
              <Input id="customerContact" {...register("customerContact", { required: "Customer contact is required" })} />
              {errors.customerContact && <p className="text-xs text-destructive">{errors.customerContact.message}</p>}
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

          <div className="mt-4 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-right">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <Button type="submit" disabled={cart.length === 0 && services.length === 0}>Generate Invoice</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
    
