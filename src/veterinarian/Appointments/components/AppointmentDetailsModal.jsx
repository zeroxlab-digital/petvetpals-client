"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { PawPrint, User, Phone, Mail, MapPin, FileText, AlertTriangle, Pill, Utensils, Activity } from "lucide-react"

export default function AppointmentDetailsModal({ selectedAppointment, setSelectedAppointment }) {
  if (!selectedAppointment) return null

  return (
    <Dialog
      open={!!selectedAppointment}
      onOpenChange={() => setSelectedAppointment(null)}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {selectedAppointment.pet.name}'s Appointment Details
          </DialogTitle>
          <DialogDescription>Complete patient information and medical history</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="owner">Owner Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <PawPrint className="w-5 h-5 mr-2" style={{ color: "#672e5b" }} />
                    Pet Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={selectedAppointment.pet.image || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100">
                        <PawPrint className="w-10 h-10 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-lg">{selectedAppointment.pet.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Breed</p>
                          <p className="font-medium">{selectedAppointment.pet.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Age</p>
                          <p className="font-medium">{selectedAppointment.pet.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Weight</p>
                          <p className="font-medium">{selectedAppointment.pet.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-medium">{selectedAppointment.pet.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Appointment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold">{selectedAppointment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{selectedAppointment.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Reason</p>
                    <p className="font-semibold">{selectedAppointment.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge
                      className={
                        selectedAppointment.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : selectedAppointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Medical History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {selectedAppointment.pet.medicalHistory.map((record, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-gray-900">{record.condition}</p>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">{record.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">Dr. {record.vet}</p>
                        <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                    Allergies & Restrictions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Known Allergies:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAppointment.pet.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Vaccination Status:</p>
                      <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        {selectedAppointment.pet.vaccinationStatus}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">Behavior Notes:</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {selectedAppointment.pet.behaviorNotes}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4 mt-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <Pill className="w-5 h-5 mr-2 text-green-600" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAppointment.pet.currentMedications.map((med, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-green-50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{med.name}</h4>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Since {med.startDate}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Dosage:</strong> {med.dosage}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Purpose:</strong> {med.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                    Diet & Nutrition
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Primary Food</p>
                    <p className="font-semibold">{selectedAppointment.pet.diet.food}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Daily Amount</p>
                    <p className="font-semibold">{selectedAppointment.pet.diet.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Feeding Schedule</p>
                    <p className="font-semibold">{selectedAppointment.pet.diet.schedule}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Treats</p>
                    <p className="font-semibold">{selectedAppointment.pet.diet.treats}</p>
                  </div>
                  {selectedAppointment.pet.diet.restrictions && (
                    <div>
                      <p className="text-sm text-gray-600">Restrictions</p>
                      <p className="font-semibold text-red-600">{selectedAppointment.pet.diet.restrictions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Activity & Exercise
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Activity Level</p>
                    <Badge
                      className={`${
                        selectedAppointment.pet.activity.level === "High" ||
                        selectedAppointment.pet.activity.level === "Very High"
                          ? "bg-green-100 text-green-800"
                          : selectedAppointment.pet.activity.level === "Moderate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                      {selectedAppointment.pet.activity.level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Exercise Routine</p>
                    <p className="font-semibold">{selectedAppointment.pet.activity.exercise}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Favorite Activities</p>
                    <p className="font-semibold">{selectedAppointment.pet.activity.favorite}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Restrictions</p>
                    <p className="font-semibold text-orange-600">{selectedAppointment.pet.activity.restrictions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Activity</p>
                    <p className="font-semibold">{selectedAppointment.pet.activity.lastActivity}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="owner" className="space-y-4 mt-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-semibold text-lg">{selectedAppointment.owner.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold">{selectedAppointment.owner.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold">{selectedAppointment.owner.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-semibold">{selectedAppointment.owner.address}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Emergency Contact</p>
                      <p className="font-semibold">{selectedAppointment.owner.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
