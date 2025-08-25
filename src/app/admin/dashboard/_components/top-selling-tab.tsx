
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockProducts, mockSales, Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isWithinInterval, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, parseISO } from 'date-fns';


type AnalyzedProduct = {
  product: Product;
  totalQuantitySold: number;
  totalRevenue: number;
};

type TimeFilter = 'week' | 'month' | 'year' | 'lifetime';
type RankBy = 'units' | 'revenue';

export default function TopSellingTab() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('lifetime');
  const [rankBy, setRankBy] = useState<RankBy>('units');

  const topSellingProducts = useMemo((): AnalyzedProduct[] => {
    const now = new Date();
    let startDate: Date;

    switch (timeFilter) {
        case 'week':
            startDate = startOfWeek(now);
            break;
        case 'month':
            startDate = startOfMonth(now);
            break;
        case 'year':
            startDate = startOfYear(now);
            break;
        case 'lifetime':
        default:
            startDate = new Date(0); // A very old date to include all sales
            break;
    }
    
    const filteredSales = mockSales.filter(sale => {
        if (timeFilter === 'lifetime') return true;
        const saleDate = parseISO(sale.saleDate);
        return isWithinInterval(saleDate, { start: startDate, end: now });
    });


    const salesAnalysis = filteredSales.reduce((acc, sale) => {
        const product = mockProducts.find(p => p.id === sale.productId);
        if (product) {
            if (!acc[sale.productId]) {
                acc[sale.productId] = {
                    product: product,
                    totalQuantitySold: 0,
                    totalRevenue: 0,
                };
            }
            acc[sale.productId].totalQuantitySold += sale.quantity;
            acc[sale.productId].totalRevenue += sale.quantity * product.sellingPrice;
        }
        return acc;
    }, {} as Record<string, AnalyzedProduct>);

    const analyzedProductsArray = Object.values(salesAnalysis);
    
    analyzedProductsArray.sort((a, b) => {
        if (rankBy === 'revenue') {
            return b.totalRevenue - a.totalRevenue;
        }
        return b.totalQuantitySold - a.totalQuantitySold;
    });

    return analyzedProductsArray;

  }, [timeFilter, rankBy]);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <div>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Analyze products by units sold or revenue generated.</CardDescription>
            </div>
          </div>
           <div className="flex flex-col sm:flex-row gap-2">
                <Select value={rankBy} onValueChange={(value) => setRankBy(value as RankBy)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Rank by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="units">Total Units Sold</SelectItem>
                        <SelectItem value="revenue">Total Revenue</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="lifetime">All Time</SelectItem>
                    </SelectContent>
                </Select>
           </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Units Sold</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingProducts.length > 0 ? (
                topSellingProducts.map((item, index) => (
                  <TableRow key={item.product.id}>
                    <TableCell className="font-bold text-lg">
                      <div className='flex items-center gap-2'>
                          {index === 0 ? <Crown className="h-6 w-6 text-yellow-500" /> : <span>#{index + 1}</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name} 
                          width={40} 
                          height={40} 
                          className="rounded-md object-cover"
                          data-ai-hint={item.product.imageHint} 
                        />
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">{item.product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{item.totalQuantitySold}</TableCell>
                    <TableCell className="text-right font-medium">₹{item.totalRevenue.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        No sales data for the selected period.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
