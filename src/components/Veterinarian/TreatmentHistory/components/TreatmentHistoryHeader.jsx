"use client"

import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function TreatmentHistoryHeader({ onExportRecords, onAddTreatment }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Treatment History</h1>
        <p className="text-gray-600 mt-1">Complete record of all treatments and diagnoses</p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onExportRecords}
          className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Export Records
        </Button>
        <Button style={{ backgroundColor: "#672e5b" }} onClick={onAddTreatment}>
          <Plus className="w-4 h-4 mr-2" />
          Add Treatment
        </Button>
      </div>
    </div>
  );
}
