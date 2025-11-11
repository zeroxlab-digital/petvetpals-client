"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PatientRecordsHeader({ onAddNewPatient }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
        <p className="text-gray-600 mt-1">Manage and view all your patient information</p>
      </div>
      <Button style={{ backgroundColor: "#672e5b" }} onClick={onAddNewPatient}>
        <Plus className="w-4 h-4 mr-2" />
        Add New Patient
      </Button>
    </div>
  );
}
