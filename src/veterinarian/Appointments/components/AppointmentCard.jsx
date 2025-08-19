"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { User, Clock, PawPrint, FileText, Video, Edit, Eye, Calendar } from "lucide-react"

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
      case "past":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStartConsultation = (appointmentId) => {
    console.log("Trigger join appointment:", appointmentId);
    window.open(`https://meet.jit.si/petvetpals-appointment/${appointmentId}#config.prejoinPageEnabled=false`, '_blank');
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
        <div className="grid grid-cols-[4fr_1fr] max-md:grid-cols-1 gap-6 items-center">
          <div className="sm:flex items-center gap-5">
            <Avatar className="w-20 h-20">
              <AvatarImage className="object-cover"
                src={appointment.pet.image || "/images/paw-heart.webp"}
                alt={appointment.pet.name} />
              <AvatarFallback className="bg-blue-100">
                <PawPrint className="w-8 h-8 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 max-sm:mt-5">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{appointment.pet.name}</h3>
                <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                {appointment.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:w-full w-fit gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-600" />
                  {appointment.user.fullName}
                </div>
                <div className="flex sm:items-center gap-3 max-sm:flex-col text-sm text-gray-700">
                  {/* Time */}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {(() => {
                      const startDate = new Date(appointment.date);
                      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

                      const start = startDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      });

                      const end = endDate.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      });

                      const [startTime, startPeriod] = start.split(' ');
                      const [endTime, endPeriod] = end.split(' ');

                      return startPeriod === endPeriod
                        ? `${startTime} - ${endTime} ${startPeriod}`
                        : `${start} - ${end}`;
                    })()}
                  </div>

                  <span className="text-gray-400 max-sm:hidden">|</span>

                  {/* Date */}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-600" />
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <PawPrint className="w-4 h-4 text-pink-900" />
                  {appointment.pet.breed} • {appointment.pet.age} Years Old
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {appointment.type || 'N/A'}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">{appointment.purpose || 'N/A'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:justify-end">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setSelectedAppointment(appointment)}
                className="text-white"
                style={{ backgroundColor: "#672e5b" }}>
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNotesModal(true)}
                className="text-gray-600 border-gray-300 hover:bg-gray-50">
                Add Notes
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowRescheduleModal(true)}
                className="text-blue-600 border-blue-600 hover:bg-blue-100">
                <Edit className="w-4 h-4 mr-1" />
                Reschedule
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewFullRecord}
                className="text-green-600 border-green-600 hover:bg-green-100 bg-transparent">
                <Eye className="w-4 h-4 mr-1" />
                Records
              </Button>
            </div>
            {appointment.status === "confirmed" && (
              <Button
                size="lg"
                onClick={() => handleStartConsultation(appointment._id)}
                className="bg-green-600 hover:bg-green-700 text-white">
                <Video className="w-4 h-4 mr-1" />
                Start
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
