
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExpensesTab from '../dashboard/_components/expenses-tab';

export default function ExpensesPage() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            router.push('/admin');
        }
    }, [router]);


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40">
        <ExpensesTab />
    </div>
  );
}
