"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"

export default function FullRecordModal({ showFullRecordModal, setShowFullRecordModal, selectedPatientRecord }) {
  return (
    <Dialog open={showFullRecordModal} onOpenChange={setShowFullRecordModal}>
      <DialogContent className="h-96 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {selectedPatientRecord?.pet.name}'s Complete Medical Record
          </DialogTitle>
          <DialogDescription>Comprehensive patient history and current status</DialogDescription>
        </DialogHeader>
        {selectedPatientRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-blue-600">{selectedPatientRecord.pet.medicalHistory.length}</p>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <p className="text-sm text-gray-600">Current Medications</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedPatientRecord.pet.currentMedications.length}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-100 rounded-lg">
                <p className="text-sm text-gray-600">Known Allergies</p>
                <p className="text-2xl font-bold text-orange-600">{selectedPatientRecord.pet.allergies.length}</p>
              </div>
            </div>
            {/* Additional detailed record information would go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Recent Medical History</h3>
              <div className="space-y-2">
                {selectedPatientRecord.pet.medicalHistory.map((record, index) => (
                  <div key={index} className="bg-white p-3 rounded border-l-cyan-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{record.condition}</p>
                        <p className="text-sm text-gray-600">Dr. {record.vet}</p>
                        <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                      </div>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
