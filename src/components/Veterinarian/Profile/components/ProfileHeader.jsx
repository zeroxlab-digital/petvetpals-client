"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Edit, Save, X } from "lucide-react"

export default function ProfileHeader({
  isEditing,
  setIsEditing,
  setShowAvailabilityModal,
  profileData,
  setProfileData,
}) {
  const handleSave = () => {
    // TODO: API call - updateVeterinarianProfile(profileData) using RTK Query mutation
    alert("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // TODO: Reset form data from server state using RTK Query
  }

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Professional Profile</h1>
        <p className="text-gray-600">Manage your veterinary practice information and availability</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => setShowAvailabilityModal(true)}
          className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
          <Calendar className="w-4 h-4 mr-2" />
          Manage Availability
        </Button>

        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} style={{ backgroundColor: "#672e5b" }}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} style={{ backgroundColor: "#672e5b" }}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
}
