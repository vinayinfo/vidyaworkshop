

"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bike, DollarSign, Package, Wrench, Users, List, ArrowRight, TrendingUp, TrendingDown, CalendarCheck, FileText, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { mockProducts, mockExpenses, mockBookings, mockAttendance } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import OverviewChart from './_components/overview-chart';
import DailySalesChart from './_components/daily-sales-chart';
import AttendanceChart from './_components/attendance-chart';
import WeeklyLeaveChart from './_components/weekly-leave-chart';

export default function Dashboard() {
    const router = useRouter();
    const [totalStock, setTotalStock] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(452318.89);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [pendingBookings, setPendingBookings] = useState(0);
    const [absentToday, setAbsentToday] = useState(0);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            router.push('/admin');
        }
        
        // In a real app, this data would be fetched.
        setTotalStock(mockProducts.reduce((sum, product) => sum + product.stock, 0));
        setLowStockCount(mockProducts.filter(product => product.stock < 5).length);
        setTotalExpenses(mockExpenses.reduce((sum, expense) => sum + expense.amount, 0));
        setPendingBookings(mockBookings.filter(b => b.status === 'Pending').length);

        const todayString = new Date().toISOString().split('T')[0];
        setAbsentToday(mockAttendance.filter(a => a.date === todayString && a.status !== 'Present').length);

    }, [router]);

    const netProfit = totalRevenue - totalExpenses;
    const isProfit = netProfit > 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40">
       <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                    {isProfit ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                    </CardHeader>
                    <CardContent>
                    <div className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-destructive'}`}>₹{netProfit.toLocaleString('en-IN')}</div>
                    <p className="text-xs text-muted-foreground">Total Revenue - Total Expenses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{totalStock}</div>
                    <p className="text-xs text-muted-foreground">Total products in inventory</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                        <List className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lowStockCount}</div>
                        <p className="text-xs text-muted-foreground mb-2">Items with stock less than 5</p>
                        <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link href="/admin/low-stock">
                                View All
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Management Sections</CardTitle>
                        <CardDescription>Navigate to different management areas of the workshop.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/admin/inventory" className="block">
                            <Card className="hover:bg-muted transition-colors">
                                <CardHeader className="flex flex-col items-center justify-center text-center p-4">
                                    <Package className="h-8 w-8 mb-2 text-primary" />
                                    <CardTitle className="text-lg">Inventory</CardTitle>
                                    <CardDescription className="text-xs">{totalStock} items</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                         <Link href="/admin/bookings" className="block">
                            <Card className="hover:bg-muted transition-colors">
                                <CardHeader className="flex flex-col items-center justify-center text-center p-4">
                                    <BookOpen className="h-8 w-8 mb-2 text-primary" />
                                    <CardTitle className="text-lg">Bookings</CardTitle>
                                    <CardDescription className="text-xs">{pendingBookings} pending</CardDescription>
                                </CardHeader>
                            </Card>
                         </Link>
                         <Link href="/admin/expenses" className="block">
                             <Card className="hover:bg-muted transition-colors">
                                <CardHeader className="flex flex-col items-center justify-center text-center p-4">
                                    <FileText className="h-8 w-8 mb-2 text-primary" />
                                    <CardTitle className="text-lg">Expenses</CardTitle>
                                    <CardDescription className="text-xs">₹{totalExpenses.toLocaleString('en-IN')}</CardDescription>
                                </CardHeader>
                            </Card>
                         </Link>
                        <Link href="/admin/attendance" className="block">
                            <Card className="hover:bg-muted transition-colors">
                                <CardHeader className="flex flex-col items-center justify-center text-center p-4">
                                    <CalendarCheck className="h-8 w-8 mb-2 text-primary" />
                                    <CardTitle className="text-lg">Attendance</CardTitle>
                                    <CardDescription className="text-xs">{absentToday} absent today</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <OverviewChart />
                </div>
                 <div className="lg:col-span-3">
                    <DailySalesChart />
                </div>
            </div>
             <div className="grid gap-4 md:grid-cols-2">
                <AttendanceChart />
                <WeeklyLeaveChart />
            </div>
        </div>
    </div>
  );
}
