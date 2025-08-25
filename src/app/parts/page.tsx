
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { mockParts } from '@/lib/mock-data';

export default function PartsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredParts = mockParts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Genuine Spare Parts</h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-200">
                    Find the right genuine parts for your Bullet bike. We ensure quality and authenticity for peak performance.
                </p>
             </div>
        </section>
        
        <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for parts..."
                            className="w-full rounded-full pl-10 pr-4 py-2 text-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredParts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredParts.map(part => {
                            const discount = ((part.mrp - part.sellingPrice) / part.mrp) * 100;
                            return (
                                <Card key={part.id} className="relative aspect-square w-full overflow-hidden rounded-lg group">
                                    <Image
                                        src={part.image}
                                        alt={part.name}
                                        data-ai-hint={part.imageHint}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    {discount > 0 && (
                                        <Badge variant="destructive" className="absolute top-2 right-2">{discount.toFixed(0)}% OFF</Badge>
                                    )}
                                    <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-semibold text-lg truncate">{part.name}</h3>
                                        <p className="text-sm text-gray-300">{part.id}</p>
                                        <div className="flex justify-between items-end mt-2">
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-bold text-xl">₹{part.sellingPrice.toFixed(2)}</p>
                                                {part.sellingPrice < part.mrp && (
                                                  <p className="text-sm text-gray-400 line-through">₹{part.mrp.toFixed(2)}</p>
                                                )}
                                            </div>
                                            {part.stock > 0 ? (
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
                        <p className="text-xl text-muted-foreground">No parts found for "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
