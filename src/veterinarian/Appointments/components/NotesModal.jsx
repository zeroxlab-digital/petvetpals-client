"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { Save } from "lucide-react"

export default function NotesModal({
  showNotesModal,
  setShowNotesModal,
  appointmentNotes,
  setAppointmentNotes,
  handleSaveNotes,
}) {
  return (
    <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Appointment Notes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Add your notes here..."
            value={appointmentNotes}
            onChange={(e) => setAppointmentNotes(e.target.value)}
            rows={4}
            className="w-full" />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowNotesModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} style={{ backgroundColor: "#672e5b" }}>
              <Save className="w-4 h-4 mr-2" />
              Save Notes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
