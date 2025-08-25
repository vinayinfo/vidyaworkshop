
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Cog, Bolt, Anchor, Shell, Fuel, CircleDotDashed, Wrench, Shield, VenetianMask, Tags, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const partCategories = [
    { name: "All Categories", icon: <List className="h-8 w-8 text-primary" /> },
    { name: "Engine Parts", icon: <Cog className="h-8 w-8 text-primary" /> },
    { name: "Electrical Parts", icon: <Bolt className="h-8 w-8 text-primary" /> },
    { name: "Braking System", icon: <Anchor className="h-8 w-8 text-primary" /> },
    { name: "Suspension & Steering", icon: <GitCommitHorizontal className="h-8 w-8 text-primary" /> },
    { name: "Body & Frame", icon: <Shell className="h-8 w-8 text-primary" /> },
    { name: "Consumables", icon: <Fuel className="h-8 w-8 text-primary" /> },
    { name: "Tyres & Tubes", icon: <CircleDotDashed className="h-8 w-8 text-primary" /> },
    { name: "Accessories", icon: <VenetianMask className="h-8 w-8 text-primary" /> },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[40vh] min-h-[300px] w-full bg-secondary">
            <Image
                src="https://images.unsplash.com/photo-1579274212942-834c38997384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcGFydHMlMjBzaGVsZnxlbnwwfHx8fDE3NTYxMTQwODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Genuine bike parts on a shelf"
                data-ai-hint="motorcycle parts shelf"
                fill
                className="object-cover"
                priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
             <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Genuine Parts & Accessories</h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-200">
                    Find the right genuine parts and accessories for your Bullet bike. We ensure quality and authenticity for peak performance.
                </p>
             </div>
        </section>

         <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Our Spare Part Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-6">
                    {partCategories.map(category => (
                         <Card 
                            key={category.name} 
                            className={cn(
                                "flex flex-col items-center justify-center p-4 text-center hover:shadow-lg transition-all cursor-pointer",
                                selectedCategory === category.name ? "bg-primary/20 border-primary" : "bg-card"
                            )}
                            onClick={() => setSelectedCategory(category.name)}
                         >
                            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                {category.icon}
                            </div>
                            <CardTitle className="text-base font-semibold">{category.name}</CardTitle>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
                 <h2 className="text-3xl font-bold text-center mb-4">Search Our Inventory</h2>
                <div className="mb-12 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for products by name..."
                            className="w-full rounded-full pl-10 pr-4 py-2 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => {
                            const discount = ((product.mrp - product.sellingPrice) / product.mrp) * 100;
                            return (
                                <Card key={product.id} className="relative aspect-square w-full overflow-hidden rounded-lg group">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        data-ai-hint={product.imageHint}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    {discount > 0 && (
                                        <Badge variant="destructive" className="absolute top-2 right-2">{discount.toFixed(0)}% OFF</Badge>
                                    )}
                                    <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                                        <p className="text-sm text-gray-300">{product.id}</p>
                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-bold text-xl">₹{product.sellingPrice.toFixed(2)}</p>
                                                {product.sellingPrice < product.mrp && (
                                                  <p className="text-sm text-gray-400 line-through">₹{product.mrp.toFixed(2)}</p>
                                                )}
                                            </div>
                                            {product.stock > 0 ? (
                                                <Badge variant="secondary">In Stock</Badge>
                                            ) : (
                                                <Badge variant="destructive">Out of Stock</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                         <p className="text-xl text-muted-foreground">
                            {searchTerm 
                                ? `No products found for "${searchTerm}" in ${selectedCategory}`
                                : `No products found in ${selectedCategory}`
                            }
                        </p>
                    </div>
                )}
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
