"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Clock, PawPrint, ArrowRight, Phone, MessageSquare } from "lucide-react"

export default function UpcomingAppointments({ appointments }) {
  const handleViewAppointment = (appointmentId) => {
    // TODO: API call - getAppointmentDetails(appointmentId) using RTK Query
    // TODO: Navigate to appointment details page using Next.js router
    window.location.href = `/veterinarian/appointments?id=${appointmentId}`
  }

  const handleViewAllAppointments = () => {
    // TODO: Navigate to appointments page using Next.js router
    window.location.href = "/veterinarian/appointments"
  }

  const handleSendMessage = (ownerPhone) => {
    // TODO: API call - sendMessage(ownerPhone, message) using RTK Query
    // TODO: Open messaging interface or navigate to messages page
    window.location.href = `/veterinarian/messages?phone=${ownerPhone}`
  }

  const handleCallOwner = (ownerPhone) => {
    // TODO: Integrate with calling service or open phone app
    window.location.href = `tel:${ownerPhone}`
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Upcoming Appointments</CardTitle>
            <CardDescription className="text-gray-600">Your schedule for today</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAllAppointments}
            className="text-[#672e5b] border-[#672e5b] hover:bg-purple-50 bg-transparent">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                  <AvatarImage
                    src={appointment.petImage || "/placeholder.svg"}
                    alt={appointment.petName} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <PawPrint className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{appointment.petName}</h4>
                    <Badge
                      className={`text-xs ${
                        appointment.priority === "urgent"
                          ? "bg-red-100 text-red-700"
                          : appointment.priority === "high"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                      }`}>
                      {appointment.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {appointment.ownerName} • {appointment.petType}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.reason}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {appointment.time} • {appointment.type}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() => handleViewAppointment(appointment.id)}
                  style={{ backgroundColor: "#672e5b" }}>
                  View Details
                </Button>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCallOwner(appointment.ownerPhone)}
                    className="text-green-600 border-green-300 hover:bg-green-50 px-2">
                    <Phone className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSendMessage(appointment.ownerPhone)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50 px-2">
                    <MessageSquare className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
