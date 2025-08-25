
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InventoryTab from '../dashboard/_components/inventory-tab';

export default function InventoryPage() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            router.push('/admin');
        }
    }, [router]);


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40">
        <InventoryTab />
    </div>
  );
}
