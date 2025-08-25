
"use client";

import { useState } from 'react';
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


export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

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
        <CardTitle>Service Bookings</CardTitle>
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
