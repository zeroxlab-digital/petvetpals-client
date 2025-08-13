"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { MessageSquare, FileText, AlertCircle } from "lucide-react"

export default function QuickStatsRow() {
  const quickStats = [
    { label: "New Messages", value: 12, icon: MessageSquare, color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Pending Reports", value: 5, icon: FileText, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Urgent Cases", value: 2, icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50" },
  ]

  const handleViewMessages = () => {
    // TODO: Navigate to messages page using Next.js router
    window.location.href = "/veterinarian/messages"
  }

  const handleViewReports = () => {
    // TODO: Navigate to reports page using Next.js router
    window.location.href = "/veterinarian/treatments"
  }

  const handleViewUrgentCases = () => {
    // TODO: Navigate to filtered appointments showing only urgent cases
    window.location.href = "/veterinarian/appointments?priority=urgent"
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {quickStats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            if (stat.label === "New Messages") handleViewMessages()
            else if (stat.label === "Pending Reports") handleViewReports()
            else if (stat.label === "Urgent Cases") handleViewUrgentCases()
          }}>
          <CardContent className="p-4 flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
