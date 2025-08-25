
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

type TopSellingProduct = {
  product: Product;
  totalQuantitySold: number;
};

export default function TopSellingTab() {
  const router = useRouter();

  const topSellingProducts = useMemo((): TopSellingProduct[] => {
    const salesCount = mockSales.reduce((acc, sale) => {
        acc[sale.productId] = (acc[sale.productId] || 0) + sale.quantity;
        return acc;
    }, {} as Record<string, number>);

    const sortedProductIds = Object.keys(salesCount).sort((a, b) => salesCount[b] - salesCount[a]);
    
    return sortedProductIds.map(id => {
        const product = mockProducts.find(p => p.id === id);
        return {
            product: product!,
            totalQuantitySold: salesCount[id]
        };
    }).filter(item => item.product);

  }, []);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
          </Button>
          <div>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Products ranked by total units sold.</CardDescription>
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
              {topSellingProducts.map((item, index) => (
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
                  <TableCell className="text-right font-medium">₹{(item.totalQuantitySold * item.product.sellingPrice).toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

    