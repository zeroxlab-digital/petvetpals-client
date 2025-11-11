import PatientCard from "./PatientCard"
import { Card, CardContent } from "@/components/ui/card"
import { PawPrint } from "lucide-react"

export default function PatientGrid({ patients, onViewRecord, onScheduleAppointment }) {
  if (patients.length === 0) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-12 text-center">
          <PawPrint className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onViewRecord={onViewRecord}
          onScheduleAppointment={onScheduleAppointment} />
      ))}
    </div>
  );
}
