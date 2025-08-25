
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
                src="https://placehold.co/1920x1080.png"
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
                        {filteredParts.map(part => (
                            <Card key={part.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                                <div className="relative aspect-square w-full">
                                    <Image
                                        src={part.image}
                                        alt={part.name}
                                        data-ai-hint={part.imageHint}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg truncate">{part.name}</h3>
                                    <p className="text-sm text-muted-foreground">{part.id}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="font-bold text-lg">₹{part.mrp.toFixed(2)}</p>
                                        {part.stock > 0 ? (
                                            <Badge variant="default">In Stock</Badge>
                                        ) : (
                                            <Badge variant="destructive">Out of Stock</Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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
