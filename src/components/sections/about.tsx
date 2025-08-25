import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, ShieldCheck } from 'lucide-react';

export default function About() {
  const testimonials = [
    {
      quote: "The team at VIDYA WORK SHOP is phenomenal. They treated my Classic 350 like their own. Best service in town!",
      name: "Rohan Sharma",
      avatar: "https://placehold.co/40x40.png",
      avatarHint: "man portrait"
    },
    {
      quote: "I was stranded with an engine issue, and they had me back on the road in no time. Truly reliable and professional.",
      name: "Priya Kulkarni",
      avatar: "https://placehold.co/40x40.png",
      avatarHint: "woman portrait"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Workshop History */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A Legacy of Trust & Two-Wheeler Passion
            </h2>
            <p className="text-muted-foreground">
              Founded over 25 years ago, Vidya Workshop started as a small garage with a big dream: to provide unparalleled service for Royal Enfield enthusiasts. Today, as VIDYA WORK SHOP, we carry forward that legacy, combining traditional craftsmanship with modern technology. Our 10-strong team of certified mechanics shares a deep passion for these iconic machines.
            </p>
            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold text-xl">10+</p>
                  <p className="text-sm text-muted-foreground">Skilled Technicians</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold text-xl">100%</p>
                  <p className="text-sm text-muted-foreground">Genuine Parts</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1542273042-5c73bc895ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtb3RvcmN5Y2xlJTIwc2VydmljZXxlbnwwfHx8fDE3NTYxMDgyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Interior of Vidya Workshop with a motorcycle being serviced"
              data-ai-hint="motorcycle workshop"
              width={600}
              height={450}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Riders Like You
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to say.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <blockquote className="text-muted-foreground">"{testimonial.quote}"</blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
