"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, Heart, AlertCircle, FileText, Eye, Calendar } from "lucide-react"

export default function PatientCard({ patient, onViewRecord, onScheduleAppointment }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "monitoring":
        return "bg-yellow-100 text-yellow-800"
      case "treatment":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <Heart className="w-4 h-4 text-green-600" />;
      case "monitoring":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "treatment":
        return <FileText className="w-4 h-4 text-red-600" />;
      default:
        return <PawPrint className="w-4 h-4 text-gray-600" />;
    }
  }

  return (
    <Card
      className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
            <AvatarFallback className="bg-blue-100">
              <PawPrint className="w-8 h-8 text-blue-600" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
              {getStatusIcon(patient.status)}
            </div>
            <p className="text-gray-600">{patient.breed}</p>
            <p className="text-sm text-gray-500">Owner: {patient.owner.name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Species</p>
            <p className="font-medium">{patient.species}</p>
          </div>
          <div>
            <p className="text-gray-600">Age</p>
            <p className="font-medium">{patient.age}</p>
          </div>
          <div>
            <p className="text-gray-600">Weight</p>
            <p className="font-medium">{patient.weight}</p>
          </div>
          <div>
            <p className="text-gray-600">Gender</p>
            <p className="font-medium">{patient.gender}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm mb-2">Current Status</p>
          <Badge className={getStatusColor(patient.status)}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </Badge>
        </div>

        <div>
          <p className="text-gray-600 text-sm mb-2">Conditions</p>
          <div className="flex flex-wrap gap-1">
            {patient.conditions.map((condition, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {condition}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Last Visit</p>
              <p className="font-medium">{patient.lastVisit}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Next Appointment</p>
              <p className="font-medium">{patient.nextAppointment}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
            onClick={() => onViewRecord(patient)}>
            <Eye className="w-4 h-4 mr-1" />
            View Records
          </Button>
          <Button
            size="sm"
            className="flex-1"
            style={{ backgroundColor: "#672e5b" }}
            onClick={() => onScheduleAppointment(patient.id)}>
            <Calendar className="w-4 h-4 mr-1" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
