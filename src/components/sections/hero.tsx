
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Link from 'next/link';

const heroImages = [
    {
        src: "https://images.unsplash.com/photo-1542273042-5c73bc895ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb3RvcmN5Y2xlJTIwc2VydmljZXxlbnwwfHx8fDE3NTYxMDgyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "A classic Bullet bike being serviced in a workshop",
        "data-ai-hint": "motorcycle service"
    },
    {
        src: "https://images.unsplash.com/photo-1676247122495-97eea5629e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtb3RvcmN5Y2xlJTIwZW5naW5lfGVufDB8fHx8MTc1NjEwODIwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up of a Royal Enfield engine",
        "data-ai-hint": "motorcycle engine"
    },
    {
        src: "https://images.unsplash.com/photo-1650569663281-44a28c984e2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmVwYWlyfGVufDB8fHx8MTc1NjEwODIwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "A mechanic working on a motorcycle wheel",
        "data-ai-hint": "motorcycle repair"
    }
]

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full bg-background md:h-[80vh]">
        <Carousel className="w-full h-full absolute inset-0" opts={{ loop: true }}>
            <CarouselContent className="h-full">
                {heroImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-full relative">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                data-ai-hint={image['data-ai-hint']}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="container relative mx-auto flex h-full flex-col items-start justify-end px-4 pb-16 md:px-6 md:pb-24">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Precision & Passion for Your Ride
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to VIDYA WORK SHOP, the premier destination for Bullet Bike enthusiasts. From routine servicing to custom modifications, we handle your prized possession with expert care.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/#services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
