
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Feb", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Mar", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Apr", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "May", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Jun", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Jul", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Aug", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Sep", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Oct", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Nov", total: Math.floor(Math.random() * 50000) + 10000 },
  { name: "Dec", total: Math.floor(Math.random() * 50000) + 10000 },
]

export default function OverviewChart() {
  return (
     <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Monthly Revenue Overview</CardTitle>
        <Select defaultValue="2024">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2024">This Year (2024)</SelectItem>
                <SelectItem value="2023">Last Year (2023)</SelectItem>
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
              tickFormatter={(value) => `₹${value / 1000}K`}
            />
             <Tooltip 
                cursor={{fill: 'hsl(var(--muted))'}}
                contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                }}
             />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
