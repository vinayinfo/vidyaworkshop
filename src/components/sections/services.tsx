
"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wrench, ChevronsRight, Paintbrush, Cog, Bolt, Anchor, CircleDotDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const serviceCategories = [
  {
    title: 'General Service',
    icon: <Wrench className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Basic Service', description: 'Includes oil change, thorough cleaning, and a comprehensive brake check to ensure safety.' },
      { name: 'Premium Service', description: 'A full-vehicle inspection combined with an engine tune-up for optimal performance.' },
      { name: 'Annual Maintenance', description: 'A complete, once-a-year service that covers all essential checks and maintenance.' },
    ],
  },
  {
    title: 'Engine & Transmission',
    icon: <Cog className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Engine Overhaul', description: 'Complete engine rebuild and restoration to factory specifications for peak power.' },
      { name: 'Clutch & Gearbox Repair', description: 'Expert repair and replacement for clutch assemblies and gearbox components.' },
      { name: 'Oil Change & Filter Replacement', description: 'Premium oil and genuine filters to enhance engine life and efficiency.' },
    ],
  },
  {
    title: 'Electrical & Wiring',
    icon: <Bolt className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Battery Replacement', description: 'Testing and replacement with high-quality, long-lasting batteries.' },
      { name: 'Wiring Check & Repair', description: 'Comprehensive diagnosis and repair of all electrical wiring and components.' },
      { name: 'Lighting Replacement', description: 'Installation and alignment of lighting systems for maximum visibility.' },
      { name: 'Ignition Repair', description: 'Troubleshooting and repair of ignition systems for reliable starting.' },
    ],
  },
  {
    title: 'Brakes & Suspension',
    icon: <Anchor className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Brake Pad Replacement', description: 'High-quality brake pad installation for reliable and safe stopping power.' },
      { name: 'Brake Disc Replacement', description: 'Inspection and replacement of brake discs for optimal braking performance.' },
      { name: 'Shock Absorber Service', description: 'Restore ride comfort and handling with our suspension services.' },
      { name: 'Brake Fluid Replacement', description: 'Flushing and replacing brake fluid to ensure system integrity.' },
    ],
  },
   {
    title: 'Tyres & Wheels',
    icon: <CircleDotDashed className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Tyre Replacement', description: 'Wide range of quality tyres with professional fitting services.' },
      { name: 'Tube Replacement', description: 'Quick and reliable puncture repair and tube replacement.' },
      { name: 'Wheel Balancing & Alignment', description: 'Precision wheel balancing and alignment for a smooth ride.' },
    ],
  },
  {
    title: 'Customization & Accessories',
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    services: [
      { name: 'Exhaust Modification', description: 'Custom exhaust solutions for improved performance and a unique sound.' },
      { name: 'Seat Customization', description: 'Tailor-made seats for enhanced comfort and style on long rides.' },
      { name: 'Paint & Decals', description: 'Custom paint jobs and decal application to make your bike truly yours.' },
      { name: 'Handlebar/Grip Upgrade', description: 'Ergonomic and stylish handlebar and grip options for better control.' },
    ],
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
            We offer a complete range of services to cater to every need of your Bullet bike, from routine maintenance to full-custom builds.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category) => (
              <Card key={category.title} className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            {category.icon}
                        </div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {category.services.map((service) => (
                      <li key={service.name} className="flex items-start gap-3">
                        <ChevronsRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-base">{service.name}</h4>
                            <p className="text-muted-foreground text-sm">{service.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="mt-16 text-center">
            <Button size="lg" asChild>
                <Link href="/book-service">
                    Book Your Service Now <ChevronsRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
