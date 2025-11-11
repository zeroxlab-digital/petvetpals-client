"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Plus, Edit, Trash2 } from "lucide-react"

export default function ExperienceSection({
  profileData,
  setProfileData,
  isEditing,
  setShowExperienceModal,
  setEditingExperience,
  setExperienceForm,
}) {
  const handleAddExperience = () => {
    setEditingExperience(null)
    setExperienceForm({
      position: "",
      workplace: "",
      duration: "",
      description: "",
    })
    setShowExperienceModal(true)
  }

  const handleEditExperience = (index) => {
    setEditingExperience(index)
    setExperienceForm(profileData.experiences[index])
    setShowExperienceModal(true)
  }

  const handleRemoveExperience = (index) => {
    // TODO: API call - removeExperience(experienceId) using RTK Query mutation
    const updatedExperiences = profileData.experiences.filter((_, i) => i !== index)
    setProfileData({ ...profileData, experiences: updatedExperiences })
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-3 text-[#672e5b]" />
            Professional Experience
          </CardTitle>
          {isEditing && (
            <Button
              size="sm"
              onClick={handleAddExperience}
              variant="outline"
              className="text-[#672e5b] border-[#672e5b] hover:bg-purple-50 bg-transparent">
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {profileData.experiences.map((exp, index) => (
            <div
              key={index}
              className="border-l-4 border-[#672e5b] pl-4 pb-4 last:pb-0 bg-gray-50 p-4 rounded-r-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                  <p className="text-[#672e5b] font-medium">{exp.workplace}</p>
                  <p
                    className="text-sm text-gray-500 bg-gray-200 inline-block px-2 py-1 rounded mt-1">
                    {exp.duration}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditExperience(index)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-500 border-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
