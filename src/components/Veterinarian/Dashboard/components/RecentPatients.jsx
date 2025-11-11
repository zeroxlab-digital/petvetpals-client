"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, CheckCircle, AlertCircle } from "lucide-react"

export default function RecentPatients({ patients }) {
  const handleViewPatient = (patientId) => {
    // TODO: API call - getPatientDetails(patientId) using RTK Query
    // TODO: Navigate to patient details page using Next.js router
    window.location.href = `/veterinarian/patients/${patientId}`
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200 rounded-t-xl py-4 space-y-1">
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Patients</CardTitle>
        <CardDescription className="text-gray-600">Latest patient updates</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => handleViewPatient(patient.id)}>
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                <AvatarImage src={patient.petImage || "/placeholder.svg"} alt={patient.petName} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <PawPrint className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-gray-900 text-sm">{patient.petName}</h5>
                  {patient.status === "good" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {patient.ownerName} • {patient.petType}
                </p>
                <p className="text-xs text-gray-500">{patient.lastVisit}</p>
                <p className="text-xs text-gray-400 mt-1">{patient.nextAppointment}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
