
"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Services from '@/components/sections/services';

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
