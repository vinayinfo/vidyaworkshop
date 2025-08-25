
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
import { mockAttendance, mockEmployees } from "@/lib/mock-data"
import { format, getMonth, getYear, parseISO } from "date-fns"

export default function AttendanceChart() {
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  const chartData = useMemo(() => {
    const month = parseInt(selectedMonth, 10) - 1;
    const year = parseInt(selectedYear, 10);
    
    const filteredRecords = mockAttendance.filter(record => {
        const recordDate = parseISO(record.date);
        return getMonth(recordDate) === month && getYear(recordDate) === year;
    });
    
    const dailyAttendance = filteredRecords.reduce((acc, record) => {
        const day = format(parseISO(record.date), "MMM d");
        if (!acc[day]) {
            acc[day] = { name: day, present: 0, absent: 0, onLeave: 0 };
        }
        if (record.status === 'Present') {
            acc[day].present++;
        }
        if (record.status === 'Absent') {
            acc[day].absent++;
        }
        if (record.status === 'On Leave') {
            acc[day].onLeave++;
        }
        return acc;
    }, {} as Record<string, {name: string, present: number, absent: number, onLeave: number}>);
    
    return Object.values(dailyAttendance).sort((a,b) => a.name.localeCompare(b.name));

  }, [selectedMonth, selectedYear]);

  const totalEmployees = mockEmployees.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-bold">{label}</p>
          <p className="text-sm text-green-600">Present: {data.present}</p>
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
                <CardTitle>Daily Attendance Analysis</CardTitle>
                <CardDescription>
                    Showing number of employees present each day for the selected month.
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
        {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
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
                domain={[0, totalEmployees]}
                allowDataOverflow={true}
                />
                <Tooltip 
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<CustomTooltip />}
                />
                <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        ) : (
            <div className="flex items-center justify-center h-[350px]">
                <p className="text-muted-foreground">No attendance data for the selected period.</p>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
