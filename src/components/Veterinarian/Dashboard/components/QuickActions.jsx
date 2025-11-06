"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Stethoscope, Calendar, Plus } from "lucide-react"

export default function QuickActions() {
  const handleStartConsultation = () => {
    // TODO: Start video consultation - integrate with Jitsi or similar service
    alert("Starting consultation - integrate with video calling service")
  }

  const handleScheduleAppointment = () => {
    // TODO: Navigate to appointment scheduling page using Next.js router
    window.location.href = "/veterinarian/appointments/new"
  }

  const handleAddPatientRecord = () => {
    // TODO: Navigate to add patient record form using Next.js router
    window.location.href = "/veterinarian/patients/new"
  }

  return (
    <Card className="border">
      <CardHeader className="bg-white border-b rounded-t-xl py-3">
        <CardTitle className="text-lg font-semibold text-gray-900 ">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <Button
          onClick={handleStartConsultation}
          className="w-full justify-start text-white"
          style={{ backgroundColor: "#672e5b" }}>
          <Stethoscope className="w-4 h-4 mr-3" />
          Start Consultation
        </Button>
        <Button
          onClick={handleScheduleAppointment}
          className="w-full justify-start text-white bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-3" />
          Schedule Appointment
        </Button>
        <Button
          onClick={handleAddPatientRecord}
          className="w-full justify-start text-white bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-3" />
          Add Patient Record
        </Button>
      </CardContent>
    </Card>
  );
}
