
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bike, DollarSign, Package, Wrench, Users, List } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryTab from './_components/inventory-tab';
import BookingsTab from './_components/bookings-tab';
import { mockProducts } from '@/lib/mock-data';

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            router.push('/admin');
        }
    }, [router]);
  
  const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = mockProducts.filter(product => product.stock < 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40">
       <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">₹4,52,318.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Bookings</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">+235</div>
                <p className="text-xs text-muted-foreground">+18.1% from last month</p>
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
             <Card className="lg:col-span-1 flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                    <List className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="text-2xl font-bold">{lowStockProducts.length}</div>
                    <p className="text-xs text-muted-foreground mb-2">Items with stock less than 5</p>
                    {lowStockProducts.length > 0 ? (
                        <div className="text-sm space-y-1">
                            {lowStockProducts.map(p => (
                                <div key={p.id} className="flex justify-between items-center">
                                    <span className="truncate" title={p.name}>{p.name}</span>
                                    <span className="font-semibold text-destructive">{p.stock} left</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground mt-4">All stock levels are healthy.</p>
                    )}
                </CardContent>
            </Card>
            </div>
        </TabsContent>
        <TabsContent value="inventory">
            <InventoryTab />
        </TabsContent>
        <TabsContent value="bookings">
           <BookingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
