
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockBookings, Booking } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const router = useRouter();

  const handleStatusChange = (bookingId: string, newStatus: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled') => {
    setBookings(currentBookings =>
      currentBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
          </Button>
          <CardTitle>Service Bookings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                    <div className="text-sm text-muted-foreground">{booking.customerPhone}</div>
                  </TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.bookingDate}</TableCell>
                  <TableCell>
                     <Select 
                        defaultValue={booking.status} 
                        onValueChange={(value: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled') => handleStatusChange(booking.id, value)}
                      >
                          <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                      </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
