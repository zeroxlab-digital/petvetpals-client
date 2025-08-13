"use client"

import { useState } from "react"
import AppointmentsHeader from "./components/AppointmentsHeader"
import AppointmentsTabs from "./components/AppointmentsTabs"
import AppointmentDetailsModal from "./components/AppointmentDetailsModal"
import RescheduleModal from "./components/RescheduleModal"
import NotesModal from "./components/NotesModal"
import FullRecordModal from "./components/FullRecordModal"

export default function Appointments() {
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [activeTab, setActiveTab] = useState("today")
  const [searchTerm, setSearchTerm] = useState("")
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const [showFullRecordModal, setShowFullRecordModal] = useState(false)
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(null)

  const appointments = {
    today: [
      {
        id: 1,
        pet: {
          name: "Buddy",
          breed: "Golden Retriever",
          age: "3 years",
          weight: "65 lbs",
          gender: "Male",
          image: "/placeholder.svg?height=64&width=64",
          medicalHistory: [
            {
              condition: "Annual Checkup",
              date: "2024-01-15",
              vet: "Dr. Smith",
              notes: "Healthy, all vitals normal. Recommended dental cleaning.",
            },
          ],
          allergies: ["Chicken", "Dust mites"],
          vaccinationStatus: "Up to date - Next due March 2025",
          behaviorNotes: "Friendly, good with children and other pets",
          currentMedications: [
            {
              name: "Heartgard Plus",
              dosage: "1 tablet monthly",
              purpose: "Heartworm prevention",
              startDate: "Jan 2024",
            },
          ],
          diet: {
            food: "Royal Canin Adult",
            amount: "3 cups daily",
            schedule: "Morning and evening",
            treats: "Training treats, occasional carrots",
            restrictions: "No chicken-based products",
          },
          activity: {
            level: "High",
            exercise: "2 walks daily, 1 hour each",
            favorite: "Fetch, swimming",
            restrictions: "None",
            lastActivity: "Morning walk - 2 hours ago",
          },
        },
        owner: {
          name: "Sarah Johnson",
          phone: "+1 (555) 123-4567",
          email: "sarah.johnson@email.com",
          address: "123 Oak Street, Springfield, IL 62701",
          emergencyContact: "Mike Johnson - +1 (555) 123-4568",
        },
        time: "10:30 AM",
        duration: "30 min",
        type: "Routine Checkup",
        status: "confirmed",
        priority: "normal",
        reason: "Annual wellness examination",
      },
    ],
    upcoming: [
      {
        id: 2,
        pet: {
          name: "Whiskers",
          breed: "Persian Cat",
          age: "5 years",
          weight: "12 lbs",
          gender: "Female",
          image: "/placeholder.svg?height=64&width=64",
          medicalHistory: [
            {
              condition: "Dental Cleaning",
              date: "2024-02-10",
              vet: "Dr. Johnson",
              notes: "Removed tartar buildup, prescribed dental care routine.",
            },
          ],
          allergies: ["Seafood"],
          vaccinationStatus: "Overdue - Needs FVRCP booster",
          behaviorNotes: "Shy, prefers quiet environments",
          currentMedications: [],
          diet: {
            food: "Hill's Science Diet Indoor",
            amount: "1/2 cup twice daily",
            schedule: "7 AM and 6 PM",
            treats: "Dental treats",
            restrictions: "No seafood",
          },
          activity: {
            level: "Low",
            exercise: "Indoor play, 15 minutes daily",
            favorite: "Feather toys, window watching",
            restrictions: "Indoor only",
            lastActivity: "Play session - 4 hours ago",
          },
        },
        owner: {
          name: "Mike Chen",
          phone: "+1 (555) 987-6543",
          email: "mike.chen@email.com",
          address: "456 Pine Avenue, Springfield, IL 62702",
          emergencyContact: "Lisa Chen - +1 (555) 987-6544",
        },
        time: "2:00 PM",
        duration: "45 min",
        type: "Vaccination",
        status: "pending",
        priority: "high",
        reason: "Overdue vaccinations and health check",
      },
    ],
    completed: [
      {
        id: 3,
        pet: {
          name: "Luna",
          breed: "Border Collie",
          age: "2 years",
          weight: "45 lbs",
          gender: "Female",
          image: "/placeholder.svg?height=64&width=64",
          medicalHistory: [
            {
              condition: "Spay Surgery",
              date: "2024-03-01",
              vet: "Dr. Smith",
              notes: "Surgery successful, recovery going well.",
            },
          ],
          allergies: ["None known"],
          vaccinationStatus: "Up to date",
          behaviorNotes: "Very active, highly intelligent, needs mental stimulation",
          currentMedications: [
            {
              name: "Carprofen",
              dosage: "50mg twice daily",
              purpose: "Post-surgery pain management",
              startDate: "Mar 2024",
            },
          ],
          diet: {
            food: "Blue Buffalo Life Protection",
            amount: "2.5 cups daily",
            schedule: "Morning and evening",
            treats: "Training treats, puzzle toys with treats",
            restrictions: "None",
          },
          activity: {
            level: "Very High",
            exercise: "3+ hours daily - running, agility training",
            favorite: "Agility courses, frisbee, herding games",
            restrictions: "Limited activity for 2 weeks post-surgery",
            lastActivity: "Light walk - 1 hour ago",
          },
        },
        owner: {
          name: "Emma Davis",
          phone: "+1 (555) 456-7890",
          email: "emma.davis@email.com",
          address: "789 Maple Drive, Springfield, IL 62703",
          emergencyContact: "Tom Davis - +1 (555) 456-7891",
        },
        time: "9:00 AM",
        duration: "60 min",
        type: "Post-Surgery Follow-up",
        status: "completed",
        priority: "normal",
        reason: "Post-spay surgery check and suture removal",
      },
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "normal":
        return "border-l-blue-500"
      case "low":
        return "border-l-gray-500"
      default:
        return "border-l-gray-500"
    }
  }

  const handleStartConsultation = (appointmentId) => {
    // TODO: Start video consultation - integrate with Jitsi or similar service
    alert(`Starting consultation for appointment ID: ${appointmentId}`)
  }

  const handleJoinCall = (appointmentId) => {
    // TODO: Join existing video call - integrate with Jitsi
    alert(`Joining call for appointment ID: ${appointmentId}`)
  }

  const handleRescheduleAppointment = (appointmentId) => {
    // TODO: API call - rescheduleAppointment(appointmentId, newDateTime) using RTK Query
    setShowRescheduleModal(true)
  }

  const handleCancelAppointment = (appointmentId) => {
    // TODO: API call - cancelAppointment(appointmentId) using RTK Query
    if (confirm("Are you sure you want to cancel this appointment?")) {
      alert(`Cancelling appointment ID: ${appointmentId}`)
    }
  }

  const handleAddNotes = (appointmentId) => {
    // TODO: API call - addAppointmentNotes(appointmentId, notes) using RTK Query
    setShowNotesModal(true)
  }

  const handleSaveNotes = () => {
    // TODO: API call - saveAppointmentNotes(selectedAppointment.id, appointmentNotes) using RTK Query
    alert("Notes saved successfully!")
    setShowNotesModal(false)
    setAppointmentNotes("")
  }

  const handleViewFullRecord = (appointment) => {
    // TODO: API call - getPatientFullRecord(appointment.pet.id) using RTK Query
    setSelectedPatientRecord(appointment)
    setShowFullRecordModal(true)
  }

  const handleScheduleFollowUp = (appointmentId) => {
    // TODO: API call - scheduleFollowUp(appointmentId, followUpData) using RTK Query
    // TODO: Show follow-up scheduling modal with available dates/times
    alert(`Scheduling follow-up for appointment ID: ${appointmentId}`)
  }

  const filteredAppointments =
    appointments[activeTab]?.filter((appointment) =>
      appointment.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())) || []

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <AppointmentsHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <AppointmentsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          appointments={appointments}
          filteredAppointments={filteredAppointments}
          setSelectedAppointment={setSelectedAppointment}
          setShowRescheduleModal={setShowRescheduleModal}
          setShowNotesModal={setShowNotesModal}
          setShowFullRecordModal={setShowFullRecordModal}
          setSelectedPatientRecord={setSelectedPatientRecord} />

        <AppointmentDetailsModal
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment} />

        <RescheduleModal
          showRescheduleModal={showRescheduleModal}
          setShowRescheduleModal={setShowRescheduleModal} />

        <NotesModal
          showNotesModal={showNotesModal}
          setShowNotesModal={setShowNotesModal}
          appointmentNotes={appointmentNotes}
          setAppointmentNotes={setAppointmentNotes}
          handleSaveNotes={handleSaveNotes} />

        <FullRecordModal
          showFullRecordModal={showFullRecordModal}
          setShowFullRecordModal={setShowFullRecordModal}
          selectedPatientRecord={selectedPatientRecord} />
      </div>
    </div>
  );
}
