
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Wrench, Settings, Droplets, Bolt, Power, ChevronsRight, ShieldCheck, Paintbrush, Cog, Fuel, Anchor, Shell, GitCommitHorizontal, CircleDotDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const serviceCategories = [
  {
    title: 'General Service',
    icon: <Wrench className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Basic Service Package', description: 'Includes oil change, thorough cleaning, and a comprehensive brake check to ensure safety.' },
      { name: 'Premium Service Package', description: 'A full-vehicle inspection combined with an engine tune-up for optimal performance.' },
      { name: 'Annual Maintenance Package', description: 'A complete, once-a-year service that covers all essential checks and maintenance.' },
    ],
  },
  {
    title: 'Engine & Transmission',
    icon: <Cog className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Engine Overhaul', description: 'Complete engine rebuild and restoration to factory specifications for peak power.' },
      { name: 'Clutch & Gearbox Repair', description: 'Expert repair and replacement for clutch assemblies and gearbox components.' },
      { name: 'Oil Change & Filter Replacement', description: 'Premium oil and genuine filters to enhance engine life and efficiency.' },
    ],
  },
  {
    title: 'Electrical & Wiring',
    icon: <Bolt className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Battery Replacement', description: 'Testing and replacement with high-quality, long-lasting batteries.' },
      { name: 'Wiring Check & Repair', description: 'Comprehensive diagnosis and repair of all electrical wiring and components.' },
      { name: 'Headlight/Tail-light Replacement', description: 'Installation and alignment of lighting systems for maximum visibility.' },
    ],
  },
  {
    title: 'Suspension & Brakes',
    icon: <Anchor className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Brake Pad Replacement', description: 'High-quality brake pad installation for reliable and safe stopping power.' },
      { name: 'Brake Fluid Replacement', description: 'Flushing and replacing brake fluid to ensure system integrity.' },
      { name: 'Shock Absorber Repair/Replacement', description: 'Restore ride comfort and handling with our suspension services.' },
    ],
  },
   {
    title: 'Tyres & Wheels',
    icon: <CircleDotDashed className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Wheel Balancing', description: 'Precision wheel balancing to eliminate vibrations and ensure a smooth ride.' },
      { name: 'Tyre Replacement', description: 'Wide range of quality tyres with professional fitting services.' },
      { name: 'Tube Replacement', description: 'Quick and reliable puncture repair and tube replacement.' },
    ],
  },
  {
    title: 'Customization & Parts',
    icon: <Paintbrush className="h-6 w-6 text-primary" />,
    services: [
      { name: 'Exhaust Modification', description: 'Custom exhaust solutions for improved performance and a unique sound.' },
      { name: 'Seat Customization', description: 'Tailor-made seats for enhanced comfort and style on long rides.' },
      { name: 'Paint/Decals', description: 'Custom paint jobs and decal application to make your bike truly yours.' },
      { name: 'Genuine Spare Parts', description: 'We stock and sell only genuine parts to guarantee the best for your bike.' },
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
        <div className="mt-12 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {serviceCategories.map((category) => (
              <AccordionItem value={category.title} key={category.title}>
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    {category.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 pl-4">
                    {category.services.map((service) => (
                      <li key={service.name} className="border-l-2 border-primary/20 pl-6 relative">
                         <div className="absolute -left-[11px] top-1.5 h-5 w-5 bg-primary rounded-full border-4 border-secondary"></div>
                        <h4 className="font-semibold text-base">{service.name}</h4>
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
