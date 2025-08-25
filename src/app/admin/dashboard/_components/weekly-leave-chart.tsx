
"use client"

import { useState, useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockAttendance } from "@/lib/mock-data"
import { format, getMonth, getYear, parseISO, getDay } from "date-fns"

export default function WeeklyLeaveChart() {
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  const chartData = useMemo(() => {
    const month = parseInt(selectedMonth, 10) - 1;
    const year = parseInt(selectedYear, 10);
    
    const filteredRecords = mockAttendance.filter(record => {
        const recordDate = parseISO(record.date);
        return getMonth(recordDate) === month && getYear(recordDate) === year && record.status !== 'Present';
    });

    const weeklyDataMap = new Map<string, { name: string, onLeave: number, absent: number }>();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Initialize all days of the week
    dayNames.forEach(dayName => {
        weeklyDataMap.set(dayName, { name: dayName, onLeave: 0, absent: 0 });
    });

    // Populate with actual data
    filteredRecords.forEach(record => {
        const dayIndex = getDay(parseISO(record.date));
        const dayName = dayNames[dayIndex];
        const dayData = weeklyDataMap.get(dayName);
        if (dayData) {
            if (record.status === 'On Leave') {
                dayData.onLeave++;
            }
            if (record.status === 'Absent') {
                dayData.absent++;
            }
        }
    });
    
    return Array.from(weeklyDataMap.values());

  }, [selectedMonth, selectedYear]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-bold">{label}</p>
          <p className="text-sm text-destructive">Absent: {data.absent}</p>
          <p className="text-sm text-muted-foreground">On Leave: {data.onLeave}</p>
        </div>
      );
    }
    return null;
  };

  return (
     <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
                <CardTitle>Weekly Absence Analysis</CardTitle>
                <CardDescription>
                    Total absences & leaves by day of the week.
                </CardDescription>
            </div>
            <div className="flex gap-2">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                           <SelectItem key={i} value={(i + 1).toString()}>
                                {format(new Date(0, i), 'MMMM')}
                           </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {["2024", "2023"].map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
            />
            <Tooltip 
                cursor={{fill: 'hsl(var(--muted))'}}
                content={<CustomTooltip />}
            />
            <Bar dataKey="absent" stackId="a" fill="hsl(var(--destructive))" name="Absent" radius={[0, 0, 0, 0]} />
            <Bar dataKey="onLeave" stackId="a" fill="hsl(var(--muted))" name="On Leave" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
