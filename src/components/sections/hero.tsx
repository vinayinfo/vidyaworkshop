import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full bg-background md:h-[80vh]">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="A classic Bullet bike in a workshop"
        data-ai-hint="motorcycle workshop"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="container relative mx-auto flex h-full flex-col items-start justify-end px-4 pb-16 md:px-6 md:pb-24">
        <div className="max-w-2xl text-left">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Precision & Passion for Your Ride
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Welcome to Torque Garage, the premier destination for Bullet Bike enthusiasts. From routine servicing to custom modifications, we handle your prized possession with expert care.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
