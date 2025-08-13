"use client"

import { useState } from "react"
import ProfileHeader from "./components/ProfileHeader"
import PersonalInformation from "./components/PersonalInformation"
import AvailabilitySection from "./components/AvailabilitySection"
import ExperienceSection from "./components/ExperienceSection"
import DegreesAndLanguages from "./components/DegreesAndLanguages"
import ProfileSidebar from "./components/ProfileSidebar"
import AvailabilityModal from "./components/AvailabilityModal"
import ExperienceModal from "./components/ExperienceModal"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
  const [showExperienceModal, setShowExperienceModal] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [experienceForm, setExperienceForm] = useState({
    position: "",
    workplace: "",
    duration: "",
    description: "",
  })

  // Enhanced profile data structure
  const [profileData, setProfileData] = useState({
    fullName: "Dr. Sarah Elizabeth Smith",
    image: "/placeholder.svg?height=150&width=150",
    title: "Senior Veterinarian & Small Animal Specialist",
    currentWorkplace: "PetVetPals Veterinary Clinic",
    degrees: ["DVM - Doctor of Veterinary Medicine", "MS in Animal Science", "Certificate in Emergency Medicine"],
    yearsOfExperience: 8,
    experiences: [
      {
        position: "Senior Veterinarian",
        workplace: "PetVetPals Veterinary Clinic",
        duration: "2020 - Present",
        description: "Leading small animal care, emergency procedures, and mentoring junior veterinarians",
      },
      {
        position: "Associate Veterinarian",
        workplace: "Springfield Animal Hospital",
        duration: "2018 - 2020",
        description: "General practice, surgery, and preventive care for companion animals",
      },
      {
        position: "Veterinary Resident",
        workplace: "University of Illinois Veterinary Teaching Hospital",
        duration: "2016 - 2018",
        description: "Advanced training in small animal medicine and emergency care",
      },
    ],
    basedIn: "Springfield, Illinois, USA",
    languagesSpoken: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
    details:
      "Passionate veterinarian with over 8 years of experience in small animal medicine. Specialized in emergency care, preventive medicine, and client education. Committed to providing compassionate care for pets and supporting their families through every stage of their pet's life.",
    specialities: [
      "Small Animal Medicine",
      "Emergency & Critical Care",
      "Preventive Medicine",
      "Soft Tissue Surgery",
      "Dental Care",
      "Geriatric Pet Care",
    ],
    consultationPrice: 85,
    email: "dr.sarah.smith@petvetpals.com",
    phone: "+1 (555) 123-4567",
    address: "123 Veterinary Lane, Springfield, IL 62701",
  })

  // Availability calendar state
  const [availability, setAvailability] = useState({
    "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    "2024-01-16": ["09:00", "10:30", "11:30", "13:00", "14:30"],
    "2024-01-17": ["08:30", "10:00", "11:00", "15:00", "16:00"],
  })

  const stats = {
    totalAppointments: 1247,
    patientsHelped: 892,
    rating: 4.9,
    reviewsCount: 156,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setShowAvailabilityModal={setShowAvailabilityModal}
          profileData={profileData}
          setProfileData={setProfileData} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <PersonalInformation
              profileData={profileData}
              setProfileData={setProfileData}
              isEditing={isEditing} />

            <AvailabilitySection
              availability={availability}
              setShowAvailabilityModal={setShowAvailabilityModal} />

            <ExperienceSection
              profileData={profileData}
              setProfileData={setProfileData}
              isEditing={isEditing}
              setShowExperienceModal={setShowExperienceModal}
              setEditingExperience={setEditingExperience}
              setExperienceForm={setExperienceForm} />

            <DegreesAndLanguages profileData={profileData} />
          </div>

          <div className="space-y-6">
            <ProfileSidebar stats={stats} profileData={profileData} />
          </div>
        </div>

        <AvailabilityModal
          showAvailabilityModal={showAvailabilityModal}
          setShowAvailabilityModal={setShowAvailabilityModal}
          availability={availability}
          setAvailability={setAvailability} />

        <ExperienceModal
          showExperienceModal={showExperienceModal}
          setShowExperienceModal={setShowExperienceModal}
          editingExperience={editingExperience}
          setEditingExperience={setEditingExperience}
          experienceForm={experienceForm}
          setExperienceForm={setExperienceForm}
          profileData={profileData}
          setProfileData={setProfileData} />
      </div>
    </div>
  );
}
