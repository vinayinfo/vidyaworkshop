
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
        src: "https://images.unsplash.com/photo-1629895693994-4c3817316773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxSb3lhbCUyMEVuZmllbGQlMjBtb3RvcmN5Y2xlfGVufDB8fHx8MTc1NjExMTg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "A classic Royal Enfield motorcycle parked on a street",
        "data-ai-hint": "royal enfield motorcycle"
    },
    {
        src: "https://images.unsplash.com/photo-1599422839994-670151121665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxSb3lhbCUyMEVuZmllbGQlMjBtb3RvcmN5Y2xlfGVufDB8fHx8MTc1NjExMTg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "A person riding a Royal Enfield on a scenic road",
        "data-ai-hint": "royal enfield riding"
    },
    {
        src: "https://images.unsplash.com/photo-1620756260879-ab5d87a4a259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxSb3lhbCUyMEVuZmllbGQlMjBtb3RvcmN5Y2xlfGVufDB8fHx8MTc1NjExMTg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Close-up of a Royal Enfield motorcycle's fuel tank and logo",
        "data-ai-hint": "royal enfield classic"
    },
    {
        src: "https://images.unsplash.com/photo-1622146365147-f40889153549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxSb3lhbCUyMEVuZmllbGQlMjBtb3RvcmN5Y2xlfGVufDB8fHx8MTc1NjExMTg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "Royal Enfield bike parked in front of a colorful wall",
        "data-ai-hint": "royal enfield urban"
    },
    {
        src: "https://images.unsplash.com/photo-1605313936939-a192a8315571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Um95YWwlMjBFbmZpZWxkJTIwbW90b3JjeWNsZXxlbnwwfHx8fDE3NTYxMTE4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        alt: "A Royal Enfield motorcycle from a low angle view",
        "data-ai-hint": "royal enfield motorcycle"
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
