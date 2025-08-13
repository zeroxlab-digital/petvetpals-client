"use client"

import { Button } from "../../../components/ui/button"
import { Calendar, Video } from "lucide-react"

export default function DashboardHeader() {
  const handleStartConsultation = () => {
    // TODO: Start video consultation - integrate with Jitsi or similar service
    alert("Starting consultation - integrate with video calling service")
  }

  return (
    <div
      className="flex flex-col lg:flex-row items-start justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Dr. Smith</h1>
        <p className="text-gray-600">Here's what's happening with your practice today</p>
      </div>
      <div className="flex items-center space-x-4">
        <div
          className="flex items-center gap-1 text-sm text-gray-500 bg-white px-4 py-3 rounded-lg border border-gray-200">
          <Calendar className="w-4 h-4" />
          <span>Today, {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
        <Button onClick={handleStartConsultation} size={'lg'} className={'text-white'}>
          <Video className="w-4 h-4 mr-2" />
          Start Consultation
        </Button>
      </div>
    </div>
  );
}
