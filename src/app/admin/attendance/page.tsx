
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AttendanceTable from './_components/attendance-table';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AttendanceChart from './_components/attendance-chart';


export default function AttendancePage() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (!isLoggedIn) {
            router.push('/admin');
        }
    }, [router]);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-secondary/40 min-h-screen">
             <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Employee Attendance</h2>
            </div>
            <AttendanceChart />
            <AttendanceTable />
        </div>
    );
}
