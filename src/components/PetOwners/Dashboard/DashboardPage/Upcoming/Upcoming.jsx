import { Calendar, CalendarClock, PawPrint, Syringe, PillIcon as Pills } from "lucide-react";
import React from "react";

const Upcoming = ({ petData, confirmed_appointment }) => {
    return (
        <div className="bg-white rounded-xl border shadow-sm md:col-span-3 max-md:order-1">
            <div className="p-4 border-b">
                <h3 className="flex items-center text-lg font-semibold text-primary">
                    <CalendarClock className="mr-2 h-5 w-5" />
                    Upcoming
                </h3>
                <p className="text-sm text-gray-500">Next appointments and reminders</p>
            </div>
            <div className="p-4 space-y-4">
                {confirmed_appointment || petData?.next_reminder?.length > 0 || petData?.upcoming_vaccination ? (
                    <div className="space-y-4">

                        <div className="grid gap-4">
                            {/* Appointment */}
                            {confirmed_appointment && (
                                <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/30 p-4 transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200 text-white transition-transform group-hover:scale-110">
                                            <Calendar size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500/80">Veterinary Visit</p>
                                            <p className="text-sm font-bold text-slate-900 truncate">
                                                {confirmed_appointment?.reason || 'Regular Check-up'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-medium text-slate-500">
                                                    {new Date(confirmed_appointment?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span className="text-xs text-slate-400">Dr. {confirmed_appointment?.vet?.fullName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Medication */}
                            {petData?.next_reminder?.[0] && (
                                <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/30 p-4 transition-all hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-200 text-white transition-transform group-hover:scale-110">
                                            <Pills size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-500/80">Medication Due</p>
                                            <p className="text-sm font-bold text-slate-900 capitalize truncate">
                                                {petData.next_reminder[0].medication?.medication}
                                            </p>
                                            <p className="text-xs font-medium text-slate-500 mt-1">
                                                Today at {new Date(petData.next_reminder[0].reminder_datetime).toLocaleString('en-US', {
                                                    hour: 'numeric', minute: '2-digit', hour12: true
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Vaccination */}
                            {petData?.upcoming_vaccination && (
                                <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-4 transition-all hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-200 text-white transition-transform group-hover:scale-110">
                                            <Syringe size={22} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/80">Vaccination</p>
                                            <p className="text-sm font-bold text-slate-900 truncate">
                                                {petData.upcoming_vaccination.vaccine}
                                            </p>
                                            <p className="text-xs font-medium text-slate-500 mt-1">
                                                Due in {Math.ceil((new Date(petData.upcoming_vaccination.next_due) - new Date()) / (1000 * 60 * 60 * 24))} days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 py-12 px-6 text-center">
                        <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-slate-300">
                            <PawPrint size={32} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800">No Upcoming Event</h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400 max-w-[200px]">
                            Everything looks great. No upcoming tasks at the moment
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Upcoming;