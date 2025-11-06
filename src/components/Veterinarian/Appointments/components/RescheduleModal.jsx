"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"

export default function RescheduleModal({ showRescheduleModal, setShowRescheduleModal }) {
  const handleReschedule = () => {
    // TODO: API call - rescheduleAppointment() using RTK Query
    alert("Appointment rescheduled successfully!")
    setShowRescheduleModal(false)
  }

  return (
    <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">New Date</label>
            <Input type="date" className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">New Time</label>
            <Input type="time" className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Reason for Reschedule</label>
            <Textarea placeholder="Optional reason..." className="w-full" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowRescheduleModal(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#672e5b" }} className="text-white" onClick={handleReschedule}>
              Reschedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
