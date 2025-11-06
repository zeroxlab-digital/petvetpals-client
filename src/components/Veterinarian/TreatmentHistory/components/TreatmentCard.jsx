"use client"

import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { PawPrint, CheckCircle, Clock, AlertCircle, FileText, Eye, Calendar } from "lucide-react"

export default function TreatmentCard({ treatment, onViewFullRecord, onScheduleFollowUp }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "monitoring":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "ongoing":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "monitoring":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  }

  return (
    <Card
      className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="w-12 h-12">
              <AvatarImage src={treatment.avatar || "/placeholder.svg"} alt={treatment.petName} />
              <AvatarFallback className="bg-blue-100">
                <PawPrint className="w-6 h-6 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{treatment.petName}</h3>
                <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                {getStatusIcon(treatment.status)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Owner</p>
                  <p className="font-medium">{treatment.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium">
                    {treatment.date} at {treatment.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Treatment</p>
                  <p className="font-medium">{treatment.treatment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Follow-up</p>
                  <p className="font-medium">{treatment.followUp}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Diagnosis</p>
                  <p className="text-gray-900 font-medium">{treatment.diagnosis}</p>
                </div>

                {treatment.medications.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Medications Prescribed</p>
                    <div className="flex flex-wrap gap-2">
                      {treatment.medications.map((med, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200">
                          {med}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Treatment Notes</p>
                  <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">{treatment.notes}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewFullRecord(treatment)}
              className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <Eye className="w-4 h-4 mr-1" />
              View Full Record
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onScheduleFollowUp(treatment.id)}
              className="text-green-600 border-green-600 hover:bg-green-50">
              <Calendar className="w-4 h-4 mr-1" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
