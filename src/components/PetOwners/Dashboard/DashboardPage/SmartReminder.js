import React, { useState } from 'react';
import { Activity, Bell, Calendar, Check, Clock, Droplets, Heart, Minus, Plus, Settings, Smartphone, TrendingUp } from 'lucide-react';

// Custom utility function to conditionally join class names
const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
}

// Custom Button component
const Button = ({
    children,
    variant = "default",
    className = "",
    disabled = false,
    size = "default",
    onClick,
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95"

    const variants = {
        default:
            "bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl",
        outline:
            "border-2 border-gray-200 bg-white hover:border-pink-300 text-gray-700 hover:text-pink-600 hover:bg-pink-50 shadow-sm hover:shadow-md",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-pink-600",
        success:
            "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl",
        warning:
            "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl",
        danger:
            "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl",
    }

    const sizes = {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

// Card components
const Card = ({ className, children, hover = true, ...props }) => {
    return (
        <div
            className={cn(
                "rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm",
                hover && "hover:shadow-lg hover:border-pink-200 transition-all duration-300",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const CardHeader = ({ className, children, gradient = false, ...props }) => {
    return (
        <div
            className={cn(
                "flex flex-col space-y-1.5 p-6",
                gradient && "bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-2xl border-b border-gray-100",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

const CardTitle = ({ className, children, ...props }) => {
    return (
        <h3 className={cn("text-xl font-bold leading-none tracking-tight text-gray-800", className)} {...props}>
            {children}
        </h3>
    )
}

const CardContent = ({ className, children, ...props }) => {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    )
}

// Badge component
const Badge = ({ children, variant = "default", className, ...props }) => {
    const variants = {
        default: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md",
        outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-pink-300",
        success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md",
        danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md",
        info: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
        severe: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md animate-pulse",
    }

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </span>
    )
}

// Reminder Component
const ReminderCard = ({ reminder, onToggle, onDelete }) => {
    const isOverdue = new Date(reminder.nextDue) < new Date()
    const timeUntil = Math.ceil((new Date(reminder.nextDue) - new Date()) / (1000 * 60 * 60))

    const reminderIcons = {
        medication: <Heart className="h-4 w-4" />,
        treatment: <Droplets className="h-4 w-4" />,
        checkup: <Activity className="h-4 w-4" />,
        appointment: <Calendar className="h-4 w-4" />,
    }

    return (
        <div
            className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200",
                isOverdue
                    ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-300"
                    : reminder.active
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300"
                        : "bg-gray-50 border-gray-200 opacity-60",
            )}
        >
            <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
                <div className="flex items-start gap-3">
                    <div
                        className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isOverdue
                                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                : reminder.active
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                    : "bg-gray-300 text-gray-600",
                        )}
                    >
                        {reminderIcons[reminder.type]}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{reminder.title}</h3>
                        <p className="text-sm text-gray-600">{reminder.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>⏰ {reminder.time}</span>
                            <span>🔄 {reminder.frequency}</span>
                            {isOverdue ? (
                                <Badge variant="danger" className="text-xs">
                                    Overdue
                                </Badge>
                            ) : timeUntil > 0 ? (
                                <Badge variant="info" className="text-xs">
                                    In {timeUntil}h
                                </Badge>
                            ) : (
                                <Badge variant="success" className="text-xs">
                                    Due now
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggle(reminder.id)}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            reminder.active
                                ? "bg-green-100 text-green-600 hover:bg-green-200"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                        )}
                    >
                        <Check className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(reminder.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const SmartReminder = ({ selectedPet }) => {
    const mockReminders = [
        {
            id: "1",
            type: "medication",
            title: "Give Apoquel",
            description: "Daily allergy medication for Buddy",
            time: "08:00",
            frequency: "daily",
            nextDue: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            active: true,
            petId: "1",
        },
        {
            id: "2",
            type: "treatment",
            title: "Apply medicated shampoo",
            description: "Weekly antifungal shampoo treatment",
            time: "10:00",
            frequency: "weekly",
            nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            active: true,
            petId: "1",
        },
        {
            id: "3",
            type: "checkup",
            title: "Severity assessment",
            description: "Rate current itch severity and document progress",
            time: "19:00",
            frequency: "daily",
            nextDue: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
            active: true,
            petId: "1",
        },
    ]
    const remindersData = selectedPet ? mockReminders.filter((r) => r.petId === selectedPet._id) : []
    const [showReminders, setShowReminders] = useState(false)

    const [reminders, setReminders] = useState([])

    const addReminder = (reminderData) => {
        const newReminder = {
            id: Date.now().toString(),
            ...reminderData,
            petId: selectedPet._id,
            active: true,
            createdAt: new Date().toISOString(),
        }
        setReminders((prev) => [...prev, newReminder])
    }

    const toggleReminder = (reminderId) => {
        setReminders((prev) =>
            prev.map((reminder) => (reminder.id === reminderId ? { ...reminder, active: !reminder.active } : reminder)),
        )
    }

    const deleteReminder = (reminderId) => {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== reminderId))
    }
    return (
        <Card>
            <CardHeader gradient>
                <CardTitle className="flex sm:items-center sm:justify-between max-sm:flex-col max-sm:gap-3">
                    <div className="flex items-center">
                        <Bell className="mr-3 h-6 w-6 text-green-600" />
                        Smart Reminder System
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="success">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Push Notifications
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setShowReminders(!showReminders)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center">
                        <Smartphone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {remindersData.filter((r) => r.active).length}
                        </div>
                        <div className="text-sm text-gray-600">Active Reminders</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-center">
                        <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">
                            {remindersData.filter((r) => new Date(r.nextDue) < new Date()).length}
                        </div>
                        <div className="text-sm text-gray-600">Due Now</div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 text-center">
                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800">94%</div>
                        <div className="text-sm text-gray-600">Compliance Rate</div>
                    </div>
                </div>

                <div>
                    {showReminders && (
                        <div
                            className="space-y-3"
                        >
                            {reminders.map((reminder) => (
                                <ReminderCard
                                    key={reminder.id}
                                    reminder={reminder}
                                    onToggle={toggleReminder}
                                    onDelete={deleteReminder}
                                />
                            ))}

                            <Button
                                variant="outline"
                                className="w-full bg-transparent border-dashed"
                                onClick={() => {
                                    // Add new reminder logic
                                    const newReminder = {
                                        type: "checkup",
                                        title: "Daily Assessment",
                                        description: "Rate severity and document progress",
                                        time: "20:00",
                                        frequency: "daily",
                                        nextDue: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                                    }
                                    addReminder(newReminder)
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Reminder
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SmartReminder;