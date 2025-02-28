/* eslint-disable react/no-unescaped-entities */
"use client"
import { useEffect, useState } from "react"
import { Activity, AlertCircle, Bell, Calendar, Check, ChevronDown, Clock, Clipboard, FileText, Heart, MapPin, MessageSquare, PawPrint, PillIcon as Pills, Plus, Settings, Syringe, Thermometer, User, Weight, X, Zap, Menu, Search, Filter, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts"
import InitialDashboard from "./InitialDashboard"
import useFetchPets from "../../../../../hooks/useFetchPets"
import { format } from "date-fns"
import { PetSpinner } from "@/components/Common/Loader/PetSpinner"

// Sample data for charts and displays
const healthData = [
  { name: "Week 1", weight: 32.5, activity: 75, heartRate: 72, temperature: 38.2 },
  { name: "Week 2", weight: 32.8, activity: 82, heartRate: 74, temperature: 38.3 },
  { name: "Week 3", weight: 32.6, activity: 78, heartRate: 71, temperature: 38.1 },
  { name: "Week 4", weight: 32.5, activity: 85, heartRate: 73, temperature: 38.2 },
  { name: "Week 5", weight: 32.4, activity: 88, heartRate: 72, temperature: 38.0 },
  { name: "Week 6", weight: 32.5, activity: 85, heartRate: 70, temperature: 38.1 },
]

const foodIntakeData = [
  { name: "Mon", amount: 350 },
  { name: "Tue", amount: 320 },
  { name: "Wed", amount: 340 },
  { name: "Thu", amount: 360 },
  { name: "Fri", amount: 330 },
  { name: "Sat", amount: 350 },
  { name: "Sun", amount: 340 },
]

const activityBreakdown = [
  { name: "Walking", value: 45 },
  { name: "Running", value: 20 },
  { name: "Playing", value: 25 },
  { name: "Resting", value: 10 },
]

const medications = [
  {
    id: 1,
    name: "Heartworm Prevention",
    dosage: "1 tablet",
    frequency: "Monthly",
    nextDue: "2024-03-15",
    instructions: "Give with food",
    remainingDoses: 5,
  },
  {
    id: 2,
    name: "Joint Supplement",
    dosage: "2 tablets",
    frequency: "Daily",
    nextDue: "2024-02-28",
    instructions: "Morning and evening with meals",
    remainingDoses: 14,
  },
  {
    id: 3,
    name: "Flea & Tick",
    dosage: "1 application",
    frequency: "Monthly",
    nextDue: "2024-03-10",
    instructions: "Apply to back of neck",
    remainingDoses: 2,
  },
]

const vaccinations = [
  {
    id: 1,
    name: "Rabies",
    lastDate: "2023-08-15",
    nextDue: "2024-08-15",
    status: "Up to date",
    provider: "Dr. Smith",
  },
  {
    id: 2,
    name: "DHPP",
    lastDate: "2023-06-10",
    nextDue: "2024-06-10",
    status: "Up to date",
    provider: "Dr. Johnson",
  },
  {
    id: 3,
    name: "Bordetella",
    lastDate: "2023-11-20",
    nextDue: "2024-03-15",
    status: "Due soon",
    provider: "Dr. Williams",
  },
  {
    id: 4,
    name: "Leptospirosis",
    lastDate: "2023-05-05",
    nextDue: "2024-05-05",
    status: "Up to date",
    provider: "Dr. Smith",
  },
]

const appointments = [
  {
    id: 1,
    type: "Regular Check-up",
    date: "2024-02-28",
    time: "10:00 AM",
    doctor: "Dr. Smith",
    clinic: "Happy Paws Veterinary",
    address: "123 Pet Street, Pawville",
    notes: "Annual wellness exam",
    status: "Confirmed",
  },
  {
    id: 2,
    type: "Vaccination",
    date: "2024-03-15",
    time: "2:30 PM",
    doctor: "Dr. Johnson",
    clinic: "Pet Care Center",
    address: "456 Animal Avenue, Furtown",
    notes: "Bordetella vaccination due",
    status: "Scheduled",
  },
  {
    id: 3,
    type: "Dental Cleaning",
    date: "2024-04-10",
    time: "9:00 AM",
    doctor: "Dr. Williams",
    clinic: "Happy Paws Veterinary",
    address: "123 Pet Street, Pawville",
    notes: "Fasting required 12 hours before procedure",
    status: "Pending",
  },
]

const medicalRecords = [
  {
    id: 1,
    date: "2024-02-15",
    type: "Check-up",
    doctor: "Dr. Smith",
    clinic: "Happy Paws Veterinary",
    diagnosis: "Healthy",
    treatment: "None required",
    notes: "Regular health check - All normal",
    files: ["health_report_feb2024.pdf"],
  },
  {
    id: 2,
    date: "2024-02-01",
    type: "Vaccination",
    doctor: "Dr. Johnson",
    clinic: "Pet Care Center",
    diagnosis: "N/A",
    treatment: "Annual boosters",
    notes: "Annual boosters completed",
    files: ["vaccination_record_feb2024.pdf"],
  },
  {
    id: 3,
    date: "2024-01-20",
    type: "Dental",
    doctor: "Dr. Williams",
    clinic: "Happy Paws Veterinary",
    diagnosis: "Mild tartar buildup",
    treatment: "Dental cleaning",
    notes: "Teeth cleaning and check",
    files: ["dental_report_jan2024.pdf", "dental_xrays_jan2024.zip"],
  },
  {
    id: 4,
    date: "2023-12-05",
    type: "Illness",
    doctor: "Dr. Smith",
    clinic: "Happy Paws Veterinary",
    diagnosis: "Mild digestive upset",
    treatment: "Prescription diet for 7 days",
    notes: "Likely caused by dietary indiscretion",
    files: ["treatment_plan_dec2023.pdf"],
  },
]

const notifications = [
  {
    id: 1,
    type: "medication",
    icon: <Pills className="h-5 w-5 text-blue-500" />,
    title: "Medication Reminder",
    message: "Time for evening medication",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "message",
    icon: <MessageSquare className="h-5 w-5 text-green-500" />,
    title: "Message from Dr. Smith",
    message: "Max is doing great! Keep up with the current routine...",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "health",
    icon: <Activity className="h-5 w-5 text-purple-500" />,
    title: "Weight Updated",
    message: "New weight recorded: 32.5 kg",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "appointment",
    icon: <Calendar className="h-5 w-5 text-orange-500" />,
    title: "Appointment Reminder",
    message: "Check-up with Dr. Smith tomorrow at 10:00 AM",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "alert",
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    title: "Vaccination Due Soon",
    message: "Bordetella vaccination due in 15 days",
    time: "2 days ago",
  },
]

const DashboardPage = () => {
  const { pets, isLoading, error } = useFetchPets()
  const [selectedPet, setSelectedPet] = useState({})
  const [showPetMenu, setShowPetMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [date, setDate] = useState(new Date())
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
  const [showMedicationDialog, setShowMedicationDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedAppointmentType, setSelectedAppointmentType] = useState("checkup")
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState("10:00")
  const [selectedVet, setSelectedVet] = useState("smith")
  const [appointmentNotes, setAppointmentNotes] = useState("")

  console.log("Selected pet:", selectedPet)

  useEffect(() => {
    if (pets.length > 0) {
      setSelectedPet(pets[0])
    }
  }, [pets])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading) {
    return (
      <PetSpinner />
    )
  }

  if (pets.length < 1) {
    return <InitialDashboard />
  }

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <main className="">
        {/* Pet Selector and Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <Image
                src="/images/cat-cute.jpg"
                alt="Pet avatar"
                width={64}
                height={64}
                className="rounded-full w-full h-full object-cover border-2 border-white shadow-sm"
              />
              <span className="absolute -bottom-1 right-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                Active
              </span>
            </div>
            <div>
              <div className="relative">
                <button
                  onClick={() => setShowPetMenu(!showPetMenu)}
                  className="flex items-center text-lg font-semibold hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  {selectedPet.name} <span className="text-gray-500">({selectedPet.breed})</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showPetMenu && (
                  <div className="absolute top-full left-0 mt-1 w-[15rem] bg-white rounded-lg shadow-lg border p-1 z-10">
                    {pets.map((pet) => (
                      <button
                        key={pet._id}
                        onClick={() => {
                          setSelectedPet(pet), setShowPetMenu(false)
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {pet.name} ({pet.breed})
                      </button>
                    ))}
                    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Pet
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {selectedPet.age} years old • {selectedPet.gender} • {selectedPet.weight} kg
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAppointmentDialog(true)}
              className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryOutline transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </button>
            <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Vet
            </button>
            {/* <button className="flex items-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="h-4 w-4" />
            </button> */}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="border-b">
            <div className="flex -mb-px space-x-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("health")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "health"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Health Records
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "appointments"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab("medications")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "medications"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Medications
              </button>
              <button
                onClick={() => setActiveTab("diet")}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === "diet"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Diet & Activity
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8 mt-8">
              {/* Health Overview Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Overall Health</h3>
                    <Activity className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500">Excellent</div>
                  <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last check-up: 2 weeks ago</p>
                </div>

                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Weight Tracking</h3>
                    <Weight className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold">32.5 kg</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Healthy range
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: 30-34 kg</p>
                </div>

                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Activity Level</h3>
                    <PawPrint className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-500"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Above average for breed</p>
                </div>

                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Next Vaccination</h3>
                    <Syringe className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-gray-500 mt-2">Days until Bordetella shot</p>
                  <button className="text-xs text-blue-500 mt-1 hover:underline">View vaccination schedule</button>
                </div>
              </div>

              {/* Additional Health Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Heart Rate</h3>
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    72 <span className="text-sm font-normal text-gray-500">bpm</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Normal range: 60-100 bpm</p>
                </div>

                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Temperature</h3>
                    <Thermometer className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold">
                    38.1 <span className="text-sm font-normal text-gray-500">°C</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Normal range: 37.5-39.2 °C</p>
                </div>

                <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-medium text-gray-600">Energy Level</h3>
                    <Zap className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">High</div>
                  <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-yellow-500 transition-all duration-500"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Consistent with breed standard</p>
                </div>
              </div>

              {/* Health Trends and Upcoming */}
              <div className="grid gap-4 md:grid-cols-7">
                <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Health Trends</h3>
                    <p className="text-sm text-gray-500">Weight and activity level over time</p>
                  </div>
                  <div className="p-4">
                    {mounted && (
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={healthData}>
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "0.5rem",
                              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#8884d8"
                            strokeWidth={2}
                            name="Weight (kg)"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="activity"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            name="Activity Level (%)"
                            activeDot={{ r: 8 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8884d8] mr-1"></div>
                        <span>Weight</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-1"></div>
                        <span>Activity</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Upcoming</h3>
                    <p className="text-sm text-gray-500">Next appointments and reminders</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                      <Calendar className="h-8 w-8 text-blue-500" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Regular Check-up</p>
                        <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                        <p className="text-xs text-gray-500">with Dr. Smith</p>
                      </div>
                      <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Reschedule
                      </button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                      <Pills className="h-8 w-8 text-blue-500" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Heartworm Medicine Due</p>
                        <p className="text-xs text-gray-500">In 3 days</p>
                      </div>
                      <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Mark Done
                      </button>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                      <Syringe className="h-8 w-8 text-blue-500" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Bordetella Vaccination</p>
                        <p className="text-xs text-gray-500">In 15 days</p>
                      </div>
                      <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                        Schedule
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      View All Upcoming →
                    </button>
                  </div>
                </div>
              </div>

              {/* Medical History and Recent Updates */}
              {/* <div className="grid gap-4 md:grid-cols-7">
                <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Medical History</h3>
                    <p className="text-sm text-gray-500">Recent medical records</p>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500 border-b">
                          <th className="p-4">Date</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Doctor</th>
                          <th className="p-4">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {medicalRecords.slice(0, 3).map((record, index) => (
                          <tr key={record.id} className={index !== 2 ? "border-b" : ""}>
                            <td className="p-4">{record.date}</td>
                            <td className="p-4">{record.type}</td>
                            <td className="p-4">{record.doctor}</td>
                            <td className="p-4">{record.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      View Complete History →
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Recent Updates</h3>
                    <p className="text-sm text-gray-500">Latest activities and notifications</p>
                  </div>
                  <div className="p-0">
                    <div className="space-y-1">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="flex gap-4 items-start p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                        >
                          <div className="mt-0.5">{notification.icon}</div>
                          <div>
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      View All Updates →
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-7 overflow-hidden">
                {/* Medical History */}
                <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Medical History</h3>
                    <p className="text-sm text-gray-500">Recent medical records</p>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b bg-gray-50">
                          <th className="p-3">Date</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Doctor</th>
                          <th className="p-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {medicalRecords.slice(0, 3).map((record, index) => (
                          <tr key={record.id} className="border-b hover:bg-gray-50 ">
                            <td className="p-3 text-sm">{record.date}</td>
                            <td className="p-3 text-sm">{record.type}</td>
                            <td className="p-3 text-sm">{record.doctor}</td>
                            <td className="p-3 text-sm">{record.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t ">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      View Complete History →
                    </button>
                  </div>
                </div>

                {/* Recent Updates */}
                <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Recent Updates</h3>
                    <p className="text-sm text-gray-500">Latest activities and notifications</p>
                  </div>
                  <div className="p-0">
                    <div className="space-y-1">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className="flex gap-4 items-start p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                        >
                          <div className="mt-0.5">{notification.icon}</div>
                          <div>
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t ">
                    <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                      View All Updates →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Health Records Tab */}
          {activeTab === "health" && (
            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Health Records</h2>
                <div className="flex gap-2">
                  <button className="flex items-center border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primaryOutline transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                  </button>
                </div>
              </div>

              <div className="border-b">
                <div className="flex -mb-px space-x-6 overflow-x-auto">
                  <button className="py-2 px-1 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">
                    Medical Records
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Vaccinations
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Vital History
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Allergies & Conditions
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="p-4">Date</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Doctor</th>
                        <th className="p-4">Diagnosis</th>
                        <th className="p-4">Treatment</th>
                        <th className="p-4">Files</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {medicalRecords.map((record, index) => (
                        <tr key={record.id} className="border-b">
                          <td className="p-4">{record.date}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              {record.type}
                            </span>
                          </td>
                          <td className="p-4">{record.doctor}</td>
                          <td className="p-4">{record.diagnosis}</td>
                          <td className="p-4">{record.treatment}</td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              {record.files.map((file, i) => (
                                <button
                                  key={i}
                                  className="flex items-center text-xs text-gray-600 hover:text-gray-900 px-2 py-1 border rounded-md"
                                >
                                  <FileText className="h-4 w-4 mr-1" />
                                  <span>{file.split("_")[0]}</span>
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <button className="p-1 hover:bg-gray-100 rounded-md">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Appointments</h2>
                <button
                  onClick={() => setShowAppointmentDialog(true)}
                  className="flex items-center bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primaryOutline transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </button>
              </div>

              <div className="border-b">
                <div className="flex -mb-px space-x-6 overflow-x-auto">
                  <button className="py-2 px-1 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">
                    Upcoming
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Past Appointments
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Calendar View
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border-b last:border-0 p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="bg-blue-100 rounded-full p-3 h-12 w-12 flex items-center justify-center">
                          {appointment.type === "Regular Check-up" && <Clipboard className="h-6 w-6 text-blue-500" />}
                          {appointment.type === "Vaccination" && <Syringe className="h-6 w-6 text-blue-500" />}
                          {appointment.type === "Dental Cleaning" && <Clipboard className="h-6 w-6 text-blue-500" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                            <Clock className="h-4 w-4 ml-2" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <User className="h-4 w-4" />
                            <span>{appointment.doctor}</span>
                            <MapPin className="h-4 w-4 ml-2" />
                            <span>{appointment.clinic}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${appointment.status === "Confirmed"
                              ? "bg-green-50 text-green-700"
                              : appointment.status === "Scheduled"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                        >
                          {appointment.status}
                        </span>
                        <div className="flex gap-2">
                          <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                            Reschedule
                          </button>
                          <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm text-red-500 hover:bg-gray-100 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3 ml-16">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medications Tab */}
          {activeTab === "medications" && (
            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Medications & Treatments</h2>
                <button
                  onClick={() => setShowMedicationDialog(true)}
                  className="flex items-center bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primaryOutline transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </button>
              </div>

              <div className="border-b">
                <div className="flex -mb-px space-x-6 overflow-x-auto">
                  <button className="py-2 px-1 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">
                    Current Medications
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Medication History
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Medication Schedule
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Reminders
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="p-4">Medication</th>
                        <th className="p-4">Dosage</th>
                        <th className="p-4">Frequency</th>
                        <th className="p-4">Next Due</th>
                        <th className="p-4">Remaining</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {medications.map((medication) => (
                        <tr key={medication.id} className="border-b">
                          <td className="p-4 font-medium">{medication.name}</td>
                          <td className="p-4">{medication.dosage}</td>
                          <td className="p-4">{medication.frequency}</td>
                          <td className="p-4">{medication.nextDue}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span>{medication.remainingDoses} doses</span>
                              {medication.remainingDoses <= 5 && (
                                <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">Low</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                Mark Given
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded-md">
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Diet & Activity Tab */}
          {activeTab === "diet" && (
            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Diet & Activity</h2>
                <div className="flex gap-2">
                  <button className="flex items-center border border-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primaryOutline transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Entry
                  </button>
                </div>
              </div>

              <div className="border-b">
                <div className="flex -mb-px space-x-6 overflow-x-auto">
                  <button className="py-2 px-1 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap">
                    Diet Tracking
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Activity Tracking
                  </button>
                  <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm whitespace-nowrap">
                    Weight History
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Food Intake</h3>
                    <p className="text-sm text-gray-500">Weekly consumption in grams</p>
                  </div>
                  <div className="p-4">
                    {mounted && (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={foodIntakeData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#8884d8" name="Food (g)" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Diet Information</h3>
                    <p className="text-sm text-gray-500">Current feeding schedule and diet</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Current Diet</h3>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Premium Dry Food</p>
                          <p className="text-sm text-gray-500">Adult formula for large breeds</p>
                        </div>
                        <button className="text-sm text-gray-600 hover:text-gray-900">Change</button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Feeding Schedule</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">Morning</p>
                            <p className="text-sm text-gray-500">7:00 AM - 200g</p>
                          </div>
                          <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <p className="font-medium">Evening</p>
                            <p className="text-sm text-gray-500">6:00 PM - 150g</p>
                          </div>
                          <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Appointment Dialog */}
      {showAppointmentDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book a Veterinary Appointment</h2>
              <button onClick={() => setShowAppointmentDialog(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-500 mb-6">Schedule a new appointment for {selectedPet.name}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Appointment Type</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedAppointmentType}
                  onChange={(e) => setSelectedAppointmentType(e.target.value)}
                >
                  <option value="checkup">Regular Check-up</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="dental">Dental Cleaning</option>
                  <option value="grooming">Grooming</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <button className="w-full flex items-center justify-between border p-2 rounded-md">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(date, "PPP")}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedAppointmentTime}
                  onChange={(e) => setSelectedAppointmentTime(e.target.value)}
                >
                  <option value="9:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Veterinarian</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedVet}
                  onChange={(e) => setSelectedVet(e.target.value)}
                >
                  <option value="smith">Dr. Smith</option>
                  <option value="johnson">Dr. Johnson</option>
                  <option value="williams">Dr. Williams</option>
                  <option value="any">Any Available</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <input
                  className="w-full p-2 border rounded-md"
                  placeholder="Any special instructions or concerns"
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowAppointmentDialog(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAppointmentDialog(false)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryOutline"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage

