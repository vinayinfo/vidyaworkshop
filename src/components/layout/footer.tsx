import Link from 'next/link';
import { Bike, Phone, Mail, MapPin } from 'lucide-react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.75,13.96C17.08,14.37 17.34,14.78 17.5,15.27C17.68,15.78 17.5,16.39 17.32,16.56C17.14,16.74 16.6,16.95 16.03,17.11C15.41,17.29 14.8,17.21 14.24,17.03C13.62,16.82 11.2,16.03 9.25,14.29C7.3,12.54 6.03,10.27 5.86,9.71C5.68,9.14 5.76,8.53 5.95,7.97C6.15,7.41 6.36,6.9 6.54,6.71C6.71,6.54 6.95,6.43 7.16,6.43C7.38,6.43 7.56,6.43 7.72,6.43C7.91,6.43 8.07,6.46 8.25,6.91C8.43,7.35 8.91,8.53 9,8.73C9.06,8.93 9.1,9.03 9,9.17C8.91,9.31 8.87,9.39 8.73,9.54C8.59,9.68 8.46,9.82 8.35,9.93C8.23,10.04 8.12,10.15 8.25,10.3C8.38,10.45 8.73,10.96 9.39,11.56C10.27,12.38 11.11,12.86 11.45,13.04C11.82,13.24 12.02,13.22 12.2,13.1C12.38,12.98 12.83,12.25 13.22,11.72C13.61,11.18 14.03,11.13 14.43,11.13C14.83,11.13 16.34,11.83 16.75,12.24M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Bike className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">VIDYA WORK SHOP</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your one-stop shop for Bullet Bike excellence. Quality service, genuine parts.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
            <li><Link href="/parts" className="text-sm text-muted-foreground hover:text-primary">Parts</Link></li>
            <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
            <li><Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Book a Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 12345 67890</span>
            </li>
            <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4" />
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@vidyaworkshop.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>near HOTEL MINI TAJ, Sitamarhi, Bihar 843302, India</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Opening Hours</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Sun - Fri: 9:00 AM - 8:00 PM</li>
            <li>Saturday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} VIDYA WORK SHOP. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">A Vidya Workshop Venture</p>
        </div>
      </div>
    </footer>
  );
}