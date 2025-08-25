import { Card, CardContent } from '@/components/ui/card';
import { Phone, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M16.75,13.96C17.08,14.37 17.34,14.78 17.5,15.27C17.68,15.78 17.5,16.39 17.32,16.56C17.14,16.74 16.6,16.95 16.03,17.11C15.41,17.29 14.8,17.21 14.24,17.03C13.62,16.82 11.2,16.03 9.25,14.29C7.3,12.54 6.03,10.27 5.86,9.71C5.68,9.14 5.76,8.53 5.95,7.97C6.15,7.41 6.36,6.9 6.54,6.71C6.71,6.54 6.95,6.43 7.16,6.43C7.38,6.43 7.56,6.43 7.72,6.43C7.91,6.43 8.07,6.46 8.25,6.91C8.43,7.35 8.91,8.53 9,8.73C9.06,8.93 9.1,9.03 9,9.17C8.91,9.31 8.87,9.39 8.73,9.54C8.59,9.68 8.46,9.82 8.35,9.93C8.23,10.04 8.12,10.15 8.25,10.3C8.38,10.45 8.73,10.96 9.39,11.56C10.27,12.38 11.11,12.86 11.45,13.04C11.82,13.24 12.02,13.22 12.2,13.1C12.38,12.98 12.83,12.25 13.22,11.72C13.61,11.18 14.03,11.13 14.43,11.13C14.83,11.13 16.34,11.83 16.75,12.24M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z" />
  </svg>
);


export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions or want to book a service? Reach out to us!
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a href="tel:+911234567890" className="text-muted-foreground hover:text-primary">+91 12345 67890</a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <WhatsAppIcon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a 
                    href="https://wa.me/911234567890" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-primary underline"
                  >
                    Chat with us
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-muted-foreground">123 Bike Lane, Mechanic Nagar, Pune, Maharashtra 411001</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Opening Hours</h3>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl aspect-square">
             <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="View workshop on Google Maps">
                <Image
                    src="https://placehold.co/600x600.png"
                    alt="Map showing workshop location"
                    data-ai-hint="city map"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                />
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}
