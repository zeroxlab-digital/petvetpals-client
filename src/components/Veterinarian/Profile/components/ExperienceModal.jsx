"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export default function ExperienceModal({
  showExperienceModal,
  setShowExperienceModal,
  editingExperience,
  setEditingExperience,
  experienceForm,
  setExperienceForm,
  profileData,
  setProfileData,
}) {
  const handleSaveExperience = () => {
    // TODO: API call - saveVeterinarianExperience(experienceForm) using RTK Query mutation
    if (editingExperience !== null) {
      const updatedExperiences = [...profileData.experiences]
      updatedExperiences[editingExperience] = experienceForm
      setProfileData({ ...profileData, experiences: updatedExperiences })
    } else {
      setProfileData({
        ...profileData,
        experiences: [...profileData.experiences, experienceForm],
      })
    }
    setShowExperienceModal(false)
    setEditingExperience(null)
  }

  return (
    <Dialog open={showExperienceModal} onOpenChange={setShowExperienceModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {editingExperience !== null ? "Edit Experience" : "Add New Experience"}
          </DialogTitle>
          <p className="text-gray-600">Fill in the details of your professional experience</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Position Title *</label>
              <Input
                value={experienceForm.position}
                onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                placeholder="e.g., Senior Veterinarian"
                className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Workplace *</label>
              <Input
                value={experienceForm.workplace}
                onChange={(e) => setExperienceForm({ ...experienceForm, workplace: e.target.value })}
                placeholder="e.g., Springfield Animal Hospital"
                className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Duration *</label>
            <Input
              value={experienceForm.duration}
              onChange={(e) => setExperienceForm({ ...experienceForm, duration: e.target.value })}
              placeholder="e.g., 2020 - Present or Jan 2018 - Dec 2020"
              className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
            <Textarea
              value={experienceForm.description}
              onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
              placeholder="Describe your responsibilities, achievements, and key contributions..."
              rows={4}
              className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setShowExperienceModal(false)}
            className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            onClick={handleSaveExperience}
            style={{ backgroundColor: "#672e5b" }}
            className="w-full sm:w-auto"
            disabled={!experienceForm.position || !experienceForm.workplace || !experienceForm.duration}>
            <Save className="w-4 h-4 mr-2" />
            {editingExperience !== null ? "Update Experience" : "Add Experience"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
