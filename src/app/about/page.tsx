
"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import About from '@/components/sections/about';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  );
}
