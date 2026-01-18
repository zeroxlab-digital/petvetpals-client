import React, { useEffect, useState } from 'react';
import { Calendar, Check, CheckCircle2, Clock, Droplets, HeartPulse, PawPrint, Pill, Syringe, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Reminder = ({ reminder, onMarkGiven, onDelete }) => {

    // Countdown
    const getTimeUntil = (reminder) => {
        const baseDateStr = reminder.reminder_date || reminder.starting_date;
        if (!baseDateStr) return null;

        const now = new Date();

        // Remove time part if it exists ('T00:00:00Z')
        const pureDate = baseDateStr.split('T')[0];
        const [year, month, day] = pureDate.split('-').map(Number);

        // Parse safely as local date (no timezone shift)
        const targetDate = new Date(year, month - 1, day);

        // Add reminder time if exists
        const firstTime = reminder.reminder_times?.[0]?.time;
        if (firstTime) {
            const [hours, minutes] = firstTime.split(':').map(Number);
            targetDate.setHours(hours, minutes, 0, 0);
        }

        const diffMs = targetDate - now;
        if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0 };

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

        return { days, hours, minutes };
    };

    const [timeLeft, setTimeLeft] = useState(getTimeUntil(reminder));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeUntil(reminder));
        }, 60000);
        return () => clearInterval(interval);
    }, [reminder]);

    const isOverdue = !timeLeft || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) &&
        reminder.reminder_times.some(t => !t.is_given && !t.skipped);

    const reminderIcons = {
        Medication: <Pill className="w-5 h-5" />,
        'Vet Appointment': <Calendar className="w-5 h-5" />,
        Vaccination: <Syringe className="w-5 h-5" />,
        Exercise: <HeartPulse className="w-5 h-5" />,
        Hydration: <Droplets className="w-5 h-5" />,
        Other: <PawPrint className="w-5 h-5" />,
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
        });
    };

    return (
        <div className={cn(
            "relative overflow-hidden p-4 rounded-2xl border transition-all active:scale-[0.98]",
            isOverdue
                ? "bg-red-50/50 border-red-200"
                : "bg-white border-slate-100 shadow-sm"
        )}>

            <div className="flex items-start justify-between mb-4">
                <div className="flex gap-3 items-center">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                        isOverdue ? "bg-red-500 text-white" : "bg-indigo-600 text-white"
                    )}>
                        {reminderIcons[reminder.type] || <PawPrint className="w-5 h-5" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">
                            {reminder.type || "Reminder"}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-1 italic">
                            {reminder.notes || "No notes added"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(reminder._id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <Clock size={13} />
                    {reminder.reminder_times.map(rt =>
                        new Date(`1970-01-01T${rt.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
                    ).join(' & ')}
                </div>

                {isOverdue ? (
                    <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-[11px] font-bold uppercase tracking-wider animate-pulse">
                        Overdue
                    </span>
                ) : timeLeft && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {timeLeft.days > 0 ? `${timeLeft.days}d left` : `${timeLeft.hours}h ${timeLeft.minutes}m left`}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                    <Calendar size={14} />
                    {reminder.frequency === 'one_time'
                        ? formatDate(reminder.reminder_date)
                        : `${formatDate(reminder.starting_date)} - ${formatDate(reminder.end_date)}`
                    }
                </div>

                <div className="flex gap-2">
                    {reminder.reminder_times.map((rt, index) => (
                        <button
                            key={index}
                            onClick={() => onMarkGiven(reminder._id, index)}
                            disabled={rt.is_given}
                            className={cn(
                                "flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all",
                                rt.is_given
                                    ? "bg-green-100 text-green-700 opacity-80"
                                    : "bg-indigo-50 text-indigo-700 border border-indigo-100 active:bg-indigo-100"
                            )}
                        >
                            {rt.is_given ? <CheckCircle2 size={16} /> : <Check size={16} />}
                            {rt.is_given ? "Done" : "Mark"}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reminder;