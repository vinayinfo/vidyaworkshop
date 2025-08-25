"use client";

import { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockParts, Part } from '@/lib/mock-data';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '@/components/ui/label';

type FormValues = Omit<Part, 'id'>;

export default function InventoryTab() {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts Inventory</CardTitle>
        <div className="flex justify-between items-center pt-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search parts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Part
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Part</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part Name</TableHead>
              <TableHead>Part ID</TableHead>
              <TableHead>MRP (₹)</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParts.map(part => (
              <TableRow key={part.id}>
                <TableCell className="font-medium">{part.name}</TableCell>
                <TableCell>{part.id}</TableCell>
                <TableCell>{part.mrp.toFixed(2)}</TableCell>
                <TableCell>{part.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}