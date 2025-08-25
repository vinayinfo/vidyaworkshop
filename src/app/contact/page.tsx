
"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Contact from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
