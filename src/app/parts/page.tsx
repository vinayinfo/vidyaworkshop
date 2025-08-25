
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { mockParts } from '@/lib/mock-data';
import Image from 'next/image';

export default function PartsPage() {
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
                <Card>
                    <CardHeader>
                        <CardTitle>Available Parts</CardTitle>
                        <CardDescription>Browse our inventory of genuine Royal Enfield spare parts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Part Name</TableHead>
                            <TableHead>Part ID</TableHead>
                            <TableHead className="text-right">Price (MRP)</TableHead>
                            <TableHead className="text-center">Availability</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockParts.map(part => (
                            <TableRow key={part.id}>
                                <TableCell className="font-medium">{part.name}</TableCell>
                                <TableCell>{part.id}</TableCell>
                                <TableCell className="text-right">₹{part.mrp.toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                {part.stock > 0 ? (
                                    <Badge variant="default">In Stock</Badge>
                                ) : (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}