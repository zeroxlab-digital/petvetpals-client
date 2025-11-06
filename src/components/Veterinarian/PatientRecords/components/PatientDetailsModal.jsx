import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { PawPrint, Activity } from "lucide-react"

export default function PatientDetailsModal({ patient, isOpen, onClose }) {
  if (!patient) return null

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {patient.name}&apos;s Complete Medical Record
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="owner">Owner Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <PawPrint className="w-5 h-5 mr-2" style={{ color: "#672e5b" }} />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100">
                        <PawPrint className="w-10 h-10 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-lg">{patient.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Breed</p>
                          <p className="font-medium">{patient.breed}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Age</p>
                          <p className="font-medium">{patient.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Weight</p>
                          <p className="font-medium">{patient.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Gender</p>
                          <p className="font-medium">{patient.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Microchip</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">{patient.microchip}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <Activity className="w-5 h-5 mr-2 text-green-600" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Health Status</p>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Conditions</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Known Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.allergies.map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="text-xs bg-red-100 text-red-800">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
