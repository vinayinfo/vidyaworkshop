import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, Droplets, Settings, Sparkles, Bike, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Regular Servicing',
    description: 'Keep your Bullet in peak condition with our comprehensive regular maintenance checks.',
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: 'Engine Work',
    description: 'Expert diagnostics and repair for your bike\'s heart, ensuring smooth performance.',
  },
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: 'Oil Change',
    description: 'Premium oil change services to enhance engine life and efficiency.',
  },
  {
    icon: <Bike className="h-10 w-10 text-primary" />,
    title: 'General Repairs',
    description: 'From brakes to suspension, we fix all mechanical and electrical issues with precision.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'Custom Modifications',
    description: 'Personalize your ride. We help you build the custom Bullet of your dreams.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Genuine Spare Parts',
    description: 'We stock and sell only genuine parts to guarantee the best for your bike.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Workshop Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a complete range of services to cater to every need of your Bullet bike.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col items-center p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="p-0">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
