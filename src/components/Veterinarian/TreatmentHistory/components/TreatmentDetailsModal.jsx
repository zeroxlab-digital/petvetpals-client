import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { PawPrint, FileText, Stethoscope, Activity, Pill } from "lucide-react"

export default function TreatmentDetailsModal({ treatment, isOpen, onClose }) {
  if (!treatment) return null

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Complete Treatment Record - {treatment.petName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="examination">Examination</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="lab">Lab Results</TabsTrigger>
            <TabsTrigger value="plan">Treatment Plan</TabsTrigger>
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
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{treatment.petName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Breed</p>
                      <p className="font-semibold">{treatment.detailedRecord.petInfo.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-semibold">{treatment.detailedRecord.petInfo.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-semibold">{treatment.detailedRecord.petInfo.weight}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Microchip</p>
                    <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                      {treatment.detailedRecord.petInfo.microchip}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Treatment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Treatment Type</p>
                    <p className="font-semibold">{treatment.treatment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Diagnosis</p>
                    <p className="font-semibold text-blue-600">{treatment.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Follow-up Required</p>
                    <p className="font-semibold">{treatment.followUp}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examination" className="space-y-4 mt-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <Stethoscope className="w-5 h-5 mr-2 text-red-500" />
                  Physical Examination Findings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(treatment.detailedRecord.examination || {}).map(([system, finding]) => (
                    <div key={system} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 capitalize mb-1">
                        {system.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm text-gray-700">{finding}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4 mt-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  Vital Signs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(treatment.detailedRecord.vitals).map(([vital, value]) => (
                    <div key={vital} className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 capitalize">{vital.replace(/([A-Z])/g, " $1")}</p>
                      <p className="text-lg font-semibold text-blue-600">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab" className="space-y-4 mt-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Laboratory Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {treatment.detailedRecord.labResults ? (
                  <div className="space-y-3">
                    {treatment.detailedRecord.labResults.map((lab, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{lab.test}</h4>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{lab.date}</span>
                        </div>
                        <p className="text-green-600 font-medium">{lab.result}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No laboratory results available for this treatment</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <Pill className="w-5 h-5 mr-2 text-green-600" />
                    Medications Prescribed
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {treatment.medications.map((med, index) => (
                      <div
                        key={index}
                        className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="font-semibold text-green-800">{med}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {treatment.detailedRecord.recommendations ? (
                    <div className="space-y-2">
                      {treatment.detailedRecord.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  ) : treatment.detailedRecord.treatmentPlan ? (
                    <div className="space-y-2">
                      {treatment.detailedRecord.treatmentPlan.map((plan, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{plan}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No specific recommendations recorded</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
