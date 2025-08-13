"use client"

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Search, Plus } from "lucide-react"

export default function AppointmentsHeader({ searchTerm, setSearchTerm }) {
  const handleScheduleNew = () => {
    // TODO: Navigate to new appointment scheduling page using Next.js router
    window.location.href = "/veterinarian/appointments/new"
  }

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-600">Manage your veterinary appointments and patient consultations</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64" />
        </div>
        <Button onClick={handleScheduleNew} style={{ backgroundColor: "#672e5b" }}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule New
        </Button>
      </div>
    </div>
  );
}
