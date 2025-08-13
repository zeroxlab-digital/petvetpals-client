"use client"

import { useState } from "react"
import PatientRecordsHeader from "./components/PatientRecordsHeader"
import SearchAndFilters from "./components/SearchAndFilters"
import PatientGrid from "./components/PatientGrid"
import PatientDetailsModal from "./components/PatientDetailsModal"

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showPatientModal, setShowPatientModal] = useState(false)

  // Enhanced patient data with comprehensive medical records
  const patients = [
    {
      id: 1,
      name: "Buddy",
      owner: {
        name: "Sarah Johnson",
        phone: "+1 (555) 123-4567",
        email: "sarah.johnson@email.com",
        address: "123 Oak Street, Springfield, IL 62701",
        emergencyContact: "Mike Johnson - +1 (555) 987-6543",
      },
      species: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "65 lbs",
      gender: "Male",
      color: "Golden",
      microchip: "GR123456789",
      lastVisit: "2024-12-08",
      status: "healthy",
      avatar: "/placeholder.svg?height=60&width=60",
      conditions: ["Vaccinated", "Healthy"],
      nextAppointment: "2025-01-15",
      medicalHistory: [
        { date: "2024-12-08", condition: "Annual Wellness Exam", vet: "Dr. Smith", notes: "Excellent health" },
        { date: "2024-10-15", condition: "Vaccination - Rabies", vet: "Dr. Smith", notes: "No adverse reactions" },
        {
          date: "2024-08-20",
          condition: "Ear Infection Treatment",
          vet: "Dr. Johnson",
          notes: "Responded well to antibiotics",
        },
      ],
      currentMedications: [
        { name: "Heartgard Plus", dosage: "1 tablet monthly", purpose: "Heartworm Prevention" },
        { name: "NexGard", dosage: "1 chew monthly", purpose: "Flea & Tick Prevention" },
      ],
      allergies: ["Chicken", "Wheat"],
      vitals: {
        temperature: "101.5°F",
        heartRate: "90 bpm",
        respiratoryRate: "20 breaths/min",
        weight: "65 lbs",
        lastUpdated: "2024-12-08",
      },
      diet: {
        food: "Royal Canin Golden Retriever Adult",
        amount: "3 cups daily",
        schedule: "Morning and Evening",
      },
    },
    {
      id: 2,
      name: "Whiskers",
      owner: {
        name: "Mike Chen",
        phone: "+1 (555) 234-5678",
        email: "m.chen@email.com",
        address: "456 Pine Avenue, Springfield, IL 62702",
        emergencyContact: "Lisa Chen - +1 (555) 876-5432",
      },
      species: "Cat",
      breed: "Maine Coon",
      age: "7 years",
      weight: "14 lbs",
      gender: "Female",
      color: "Brown Tabby",
      microchip: "MC987654321",
      lastVisit: "2024-12-05",
      status: "monitoring",
      avatar: "/placeholder.svg?height=60&width=60",
      conditions: ["Post-Surgery", "Recovery"],
      nextAppointment: "2024-12-20",
      medicalHistory: [
        { date: "2024-12-05", condition: "Post-Surgery Follow-up", vet: "Dr. Smith", notes: "Healing well from spay" },
        { date: "2024-11-10", condition: "Spay Surgery", vet: "Dr. Smith", notes: "Surgery successful" },
        { date: "2024-09-05", condition: "Dental Cleaning", vet: "Dr. Johnson", notes: "Several teeth extracted" },
      ],
      currentMedications: [
        { name: "Metacam", dosage: "0.5ml daily", purpose: "Post-surgery pain management" },
        { name: "Clavamox", dosage: "62.5mg twice daily", purpose: "Antibiotic" },
      ],
      allergies: ["Penicillin"],
      vitals: {
        temperature: "101.8°F",
        heartRate: "180 bpm",
        respiratoryRate: "25 breaths/min",
        weight: "14 lbs",
        lastUpdated: "2024-12-05",
      },
      diet: {
        food: "Hill's Science Diet Senior",
        amount: "1/2 cup twice daily",
        schedule: "Morning and Evening",
      },
    },
    {
      id: 3,
      name: "Luna",
      owner: {
        name: "Emma Davis",
        phone: "+1 (555) 345-6789",
        email: "emma.davis@email.com",
        address: "789 Maple Drive, Springfield, IL 62703",
        emergencyContact: "Tom Davis - +1 (555) 765-4321",
      },
      species: "Dog",
      breed: "Border Collie",
      age: "5 years",
      weight: "45 lbs",
      gender: "Female",
      color: "Black and White",
      microchip: "BC456789123",
      lastVisit: "2024-12-01",
      status: "treatment",
      avatar: "/placeholder.svg?height=60&width=60",
      conditions: ["ACL Injury", "Pain Management"],
      nextAppointment: "2024-12-15",
      medicalHistory: [
        {
          date: "2024-12-01",
          condition: "ACL Injury Assessment",
          vet: "Dr. Smith",
          notes: "Partial ACL tear - Grade 2",
        },
        { date: "2024-09-15", condition: "Hip X-rays", vet: "Dr. Smith", notes: "No signs of dysplasia" },
        { date: "2024-07-10", condition: "Annual Checkup", vet: "Dr. Johnson", notes: "Healthy, active dog" },
      ],
      currentMedications: [
        { name: "Carprofen", dosage: "75mg twice daily", purpose: "Anti-inflammatory" },
        { name: "Gabapentin", dosage: "100mg three times daily", purpose: "Pain management" },
      ],
      allergies: ["None known"],
      vitals: {
        temperature: "101.3°F",
        heartRate: "95 bpm",
        respiratoryRate: "22 breaths/min",
        weight: "45 lbs",
        lastUpdated: "2024-12-01",
      },
      diet: {
        food: "Purina Pro Plan Sport",
        amount: "2.5 cups daily",
        schedule: "Morning and Evening",
      },
    },
    {
      id: 4,
      name: "Charlie",
      owner: {
        name: "Robert Wilson",
        phone: "+1 (555) 456-7890",
        email: "r.wilson@email.com",
        address: "321 Cedar Lane, Springfield, IL 62704",
        emergencyContact: "Nancy Wilson - +1 (555) 654-3210",
      },
      species: "Dog",
      breed: "Labrador Retriever",
      age: "9 years",
      weight: "78 lbs",
      gender: "Male",
      color: "Yellow",
      microchip: "LR789123456",
      lastVisit: "2024-11-28",
      status: "healthy",
      avatar: "/placeholder.svg?height=60&width=60",
      conditions: ["Senior Care", "Vaccinated"],
      nextAppointment: "2025-02-28",
      medicalHistory: [
        {
          date: "2024-11-28",
          condition: "Senior Wellness Panel",
          vet: "Dr. Smith",
          notes: "Age-related joint stiffness",
        },
        { date: "2024-08-15", condition: "Dental Cleaning", vet: "Dr. Brown", notes: "Moderate tartar removed" },
        { date: "2024-05-10", condition: "Blood Work", vet: "Dr. Smith", notes: "All values normal for age" },
      ],
      currentMedications: [
        { name: "Cosequin DS", dosage: "1 tablet daily", purpose: "Joint support" },
        { name: "Fish Oil", dosage: "1 capsule daily", purpose: "Omega-3 supplement" },
      ],
      allergies: ["None known"],
      vitals: {
        temperature: "101.1°F",
        heartRate: "88 bpm",
        respiratoryRate: "18 breaths/min",
        weight: "78 lbs",
        lastUpdated: "2024-11-28",
      },
      diet: {
        food: "Hill's Science Diet Senior",
        amount: "3 cups daily",
        schedule: "Morning and Evening",
      },
    },
  ]

  const handleViewRecord = (patient) => {
    // TODO: API call - getPatientFullRecord(patient.id) using RTK Query
    setSelectedPatient(patient)
    setShowPatientModal(true)
  }

  const handleScheduleAppointment = (patientId) => {
    // TODO: API call - scheduleAppointment(patientId) using RTK Query
    // TODO: Navigate to appointment scheduling page with pre-filled patient data
    window.location.href = `/veterinarian/appointments/new?patientId=${patientId}`
  }

  const handleAddNewPatient = () => {
    // TODO: Navigate to new patient registration form using Next.js router
    window.location.href = "/veterinarian/patients/new"
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || patient.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 space-y-6">
      <PatientRecordsHeader onAddNewPatient={handleAddNewPatient} />
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        totalPatients={patients.length} />
      <PatientGrid
        patients={filteredPatients}
        onViewRecord={handleViewRecord}
        onScheduleAppointment={handleScheduleAppointment} />
      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)} />
    </div>
  );
}
