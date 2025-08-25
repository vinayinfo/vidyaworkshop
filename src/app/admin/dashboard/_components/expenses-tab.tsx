
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockExpenses, Expense } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const expenseSchema = z.object({
  name: z.string().min(2, "Expense name is required."),
  category: z.string({ required_error: "Please select a category." }),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  date: z.date({ required_error: "A date is required." }),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export default function ExpensesTab() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
  });

  const onAddExpenseSubmit: SubmitHandler<ExpenseFormValues> = (data) => {
    const newExpense: Expense = {
      id: `EXP-${Date.now()}`,
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      category: data.category as Expense['category'],
    };
    setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    toast({
      title: 'Expense Added',
      description: `${data.name} has been added.`,
    });
    reset();
    setIsAddExpenseDialogOpen(false);
  };
  
  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(currentExpenses => currentExpenses.filter(expense => expense.id !== expenseId));
     toast({
        title: "Expense Deleted",
        description: "The expense has been removed from your records.",
        variant: "destructive"
      });
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className='flex items-center gap-4'>
                 <Button variant="outline" size="icon" onClick={() => router.push('/admin/dashboard')}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <div>
                    <CardTitle>Expense Management</CardTitle>
                    <CardDescription>Track all your business expenses here.</CardDescription>
                </div>
            </div>
            <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onAddExpenseSubmit)} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Expense Name</Label>
                            <Input id="name" {...register("name")} placeholder="e.g., Office Rent"/>
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                         <div className="grid gap-2">
                            <Label>Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Rent">Rent</SelectItem>
                                            <SelectItem value="Salary">Salary</SelectItem>
                                            <SelectItem value="Utilities">Utilities</SelectItem>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                             {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                           <div className="grid gap-2">
                                <Label htmlFor="amount">Amount (₹)</Label>
                                <Input id="amount" type="number" step="0.01" {...register("amount")} />
                                {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
                            </div>
                             <div className="grid gap-2">
                                <Label>Date</Label>
                                 <Controller
                                    control={control}
                                    name="date"
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                                {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                            </div>
                        </div>
                        <Button type="submit">Save Expense</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this expense record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteExpense(expense.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-end font-bold text-lg pr-4">
            <span>Total Expenses: ₹{totalExpenses.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
