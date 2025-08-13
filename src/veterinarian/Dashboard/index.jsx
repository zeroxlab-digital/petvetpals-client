"use client"

import DashboardHeader from "./components/DashboardHeader"
import StatsCards from "./components/StatsCards"
import QuickStatsRow from "./components/QuickStatsRow"
import UpcomingAppointments from "./components/UpcomingAppointments"
import QuickActions from "./components/QuickActions"
import RecentPatients from "./components/RecentPatients"
import PerformanceInsights from "./components/PerformanceInsights"

export default function Dashboard() {
  // Mock data - TODO: Replace with RTK Query hooks for real-time data
  // Example: const { data: stats } = useGetDashboardStatsQuery()
  const stats = {
    todayAppointments: 8,
    weeklyEarnings: 2450,
    totalPatients: 156,
    completionRate: 94,
    pendingAppointments: 3,
    confirmedAppointments: 5,
    monthlyGrowth: 12,
    patientSatisfaction: 4.9,
  }

  const upcomingAppointments = [
    {
      id: 1,
      petName: "Buddy",
      ownerName: "Sarah Johnson",
      time: "10:30 AM",
      type: "Checkup",
      petType: "Golden Retriever",
      status: "confirmed",
      priority: "normal",
      petImage: "/placeholder.svg?height=40&width=40",
      ownerPhone: "+1 (555) 123-4567",
      reason: "Annual wellness exam",
    },
    {
      id: 2,
      petName: "Whiskers",
      ownerName: "Mike Chen",
      time: "11:15 AM",
      type: "Vaccination",
      petType: "Persian Cat",
      status: "pending",
      priority: "high",
      petImage: "/placeholder.svg?height=40&width=40",
      ownerPhone: "+1 (555) 987-6543",
      reason: "Overdue vaccinations",
    },
    {
      id: 3,
      petName: "Luna",
      ownerName: "Emma Davis",
      time: "2:00 PM",
      type: "Surgery Consultation",
      petType: "Border Collie",
      status: "confirmed",
      priority: "urgent",
      petImage: "/placeholder.svg?height=40&width=40",
      ownerPhone: "+1 (555) 456-7890",
      reason: "Pre-surgical evaluation",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      petName: "Max",
      ownerName: "John Smith",
      lastVisit: "2 days ago",
      condition: "Healthy",
      petType: "Labrador",
      status: "good",
      nextAppointment: "Next checkup in 6 months",
      petImage: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      petName: "Bella",
      ownerName: "Lisa Wilson",
      lastVisit: "1 week ago",
      condition: "Follow-up needed",
      petType: "Siamese Cat",
      status: "attention",
      nextAppointment: "Follow-up scheduled for next week",
      petImage: "/placeholder.svg?height=32&width=32",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader />
        <StatsCards stats={stats} />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <UpcomingAppointments appointments={upcomingAppointments} />
            <PerformanceInsights stats={stats} />
          </div>
          <div className="space-y-6">
            <QuickStatsRow />
            <RecentPatients patients={recentPatients} />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
