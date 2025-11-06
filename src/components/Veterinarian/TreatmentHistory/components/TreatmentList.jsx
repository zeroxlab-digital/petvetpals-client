import TreatmentCard from "./TreatmentCard"
import { Card, CardContent } from "../../../components/ui/card"
import { FileText } from "lucide-react"

export default function TreatmentList({ treatments, onViewFullRecord, onScheduleFollowUp }) {
  if (treatments.length === 0) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No treatments found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {treatments.map((treatment) => (
        <TreatmentCard
          key={treatment.id}
          treatment={treatment}
          onViewFullRecord={onViewFullRecord}
          onScheduleFollowUp={onScheduleFollowUp} />
      ))}
    </div>
  );
}
