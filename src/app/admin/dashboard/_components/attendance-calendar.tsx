
"use client"

import { useState, useMemo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { mockEmployees, mockAttendance, Employee, AttendanceRecord } from '@/lib/mock-data';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const attendanceSchema = z.object({
  employeeId: z.string({ required_error: "Please select an employee." }),
  date: z.date({ required_error: "A date is required." }),
  status: z.enum(['Present', 'Absent', 'On Leave'], { required_error: "Status is required." }),
  reason: z.string().optional(),
}).refine(data => {
    if (data.status === 'On Leave') {
        return !!data.reason && data.reason.length > 0;
    }
    return true;
}, {
    message: "Reason is required when status is 'On Leave'.",
    path: ['reason'],
});

type AttendanceFormValues = z.infer<typeof attendanceSchema>;

type DailyAttendanceSummary = {
    present: number;
    absent: number;
    onLeave: number;
    records: AttendanceRecord[];
}

export default function AttendanceCalendar() {
    const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
    const [employees] = useState<Employee[]>(mockEmployees);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [isAddEntryDialogOpen, setIsAddEntryDialogOpen] = useState(false);

    const { toast } = useToast();

    const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<AttendanceFormValues>({
        resolver: zodResolver(attendanceSchema),
    });

    const watchStatus = watch('status');

    const dailySummaries = useMemo(() => {
        const summaries = new Map<string, DailyAttendanceSummary>();
        attendance.forEach(record => {
            const dayKey = record.date;
            if (!summaries.has(dayKey)) {
                summaries.set(dayKey, { present: 0, absent: 0, onLeave: 0, records: [] });
            }
            const summary = summaries.get(dayKey)!;
            summary.records.push(record);
            if (record.status === 'Present') summary.present++;
            if (record.status === 'Absent') summary.absent++;
            if (record.status === 'On Leave') summary.onLeave++;
        });
        return summaries;
    }, [attendance]);
    
    const onAddEntrySubmit: SubmitHandler<AttendanceFormValues> = (data) => {
        const newRecord: AttendanceRecord = {
            id: `ATT-${Date.now()}`,
            ...data,
            date: format(data.date, 'yyyy-MM-dd'),
            status: data.status as 'Present' | 'Absent' | 'On Leave',
        };
        setAttendance(prev => [newRecord, ...prev]);
        toast({
            title: 'Attendance Marked',
            description: `Record has been added successfully.`,
        });
        reset();
        setIsAddEntryDialogOpen(false);
    };

    const getEmployeeName = (employeeId: string) => {
        return employees.find(e => e.id === employeeId)?.name || 'Unknown Employee';
    }

    const getStatusVariant = (status: AttendanceRecord['status']): "default" | "destructive" | "secondary" => {
        switch(status) {
            case 'Present': return 'default';
            case 'Absent': return 'destructive';
            case 'On Leave': return 'secondary';
            default: return 'secondary';
        }
    }

    const DayContent = ({ date }: { date: Date }) => {
        const dayKey = format(date, 'yyyy-MM-dd');
        const summary = dailySummaries.get(dayKey);
        
        if (!summary) return null;

        const total = summary.present + summary.absent + summary.onLeave;
        if(total === 0) return null;

        return (
            <Popover>
                <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full px-1 flex justify-center gap-0.5">
                        {summary.present > 0 && <div className="w-1.5 h-1.5 rounded-full bg-primary" title={`${summary.present} Present`}/>}
                        {summary.absent > 0 && <div className="w-1.5 h-1.5 rounded-full bg-destructive" title={`${summary.absent} Absent`}/>}
                        {summary.onLeave > 0 && <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" title={`${summary.onLeave} On Leave`}/>}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80" onClick={(e) => e.stopPropagation()}>
                     <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{format(date, "PPP")}</h4>
                            <p className="text-sm text-muted-foreground">Attendance Details</p>
                        </div>
                        <div className="grid gap-2">
                             {summary.records.map(record => (
                                <div key={record.id} className="grid grid-cols-[1fr,auto] items-center">
                                    <span className="font-medium text-sm">{getEmployeeName(record.employeeId)}</span>
                                     <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
    
    return (
         <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <CardTitle>Attendance Calendar</CardTitle>
                        <CardDescription>View monthly attendance at a glance. Click on dots for details.</CardDescription>
                    </div>
                     <Dialog open={isAddEntryDialogOpen} onOpenChange={setIsAddEntryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Attendance Entry
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Mark Attendance</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onAddEntrySubmit)} className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Employee</Label>
                                    <Controller
                                        name="employeeId"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an employee" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {employees.map(emp => (
                                                        <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.employeeId && <p className="text-xs text-destructive">{errors.employeeId.message}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Date</Label>
                                        <Controller
                                            control={control}
                                            name="date"
                                            render={({ field }) => (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                        {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Status</Label>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Present">Present</SelectItem>
                                                        <SelectItem value="Absent">Absent</SelectItem>
                                                        <SelectItem value="On Leave">On Leave</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
                                    </div>
                                </div>
                                {watchStatus === 'On Leave' && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="reason">Reason for Leave</Label>
                                        <Textarea id="reason" {...register("reason")} placeholder="e.g., Family emergency" />
                                        {errors.reason && <p className="text-xs text-destructive">{errors.reason.message}</p>}
                                    </div>
                                )}
                                <Button type="submit">Save Entry</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <Calendar
                    mode="single"
                    selected={selectedDay ?? undefined}
                    onSelect={(day) => setSelectedDay(day ?? null)}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="rounded-md border"
                    components={{
                        DayContent: DayContent
                    }}
                 />
            </CardContent>
        </Card>
    )
}

    