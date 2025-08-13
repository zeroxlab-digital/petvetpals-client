"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { User, Clock, PawPrint, FileText, Video, Edit, Eye } from "lucide-react"

export default function AppointmentCard({
  appointment,
  setSelectedAppointment,
  setShowRescheduleModal,
  setShowNotesModal,
  setShowFullRecordModal,
  setSelectedPatientRecord,
}) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      default:
        return "border-l-green-500"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStartConsultation = () => {
    // TODO: Start video consultation - integrate with Jitsi or similar service
    alert("Starting consultation - integrate with video calling service")
  }

  const handleViewFullRecord = () => {
    // TODO: API call - getPatientFullRecord(petId) using RTK Query
    setSelectedPatientRecord(appointment)
    setShowFullRecordModal(true)
  }

  return (
    <Card
      className={`border-l-4 ${getPriorityColor(appointment.priority)} shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-6">
        <div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={appointment.pet.image || "/placeholder.svg"}
                alt={appointment.pet.name} />
              <AvatarFallback className="bg-blue-100">
                <PawPrint className="w-8 h-8 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{appointment.pet.name}</h3>
                <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                {appointment.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {appointment.owner.name}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {appointment.time} ({appointment.duration})
                </div>
                <div className="flex items-center">
                  <PawPrint className="w-4 h-4 mr-2" />
                  {appointment.pet.breed} • {appointment.pet.age}
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  {appointment.type}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{appointment.reason}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-fit">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setSelectedAppointment(appointment)}
                style={{ backgroundColor: "#672e5b" }}>
                View Details
              </Button>
              {appointment.status === "confirmed" && (
                <Button
                  size="sm"
                  onClick={handleStartConsultation}
                  className="bg-green-600 hover:bg-green-700">
                  <Video className="w-4 h-4 mr-1" />
                  Start
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRescheduleModal(true)}
                className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Edit className="w-4 h-4 mr-1" />
                Reschedule
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewFullRecord}
                className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent">
                <Eye className="w-4 h-4 mr-1" />
                Records
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowNotesModal(true)}
              className="text-gray-600 border-gray-300 hover:bg-gray-50">
              Add Notes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
