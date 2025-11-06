"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Star, Calendar, User, DollarSign } from "lucide-react"

export default function ProfileSidebar({ stats, profileData }) {
  return (
    <>
      <Card
        className="shadow-sm border border-gray-200 bg-gradient-to-br from-[#672e5b] to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Professional Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-purple-100 text-sm">Total Appointments</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.patientsHelped}</div>
            <p className="text-purple-100 text-sm">Patients Helped</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <span className="text-2xl font-bold">{stats.rating}</span>
            </div>
            <p className="text-purple-100 text-sm">{stats.reviewsCount} Reviews</p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Specialities</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {profileData.specialities.map((specialty, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <Button
            className="w-full justify-start"
            style={{ backgroundColor: "#672e5b" }}
            onClick={() => {
              // TODO: Navigate to appointments page using Next.js router
              window.location.href = "/veterinarian/appointments"
            }}>
            <Calendar className="w-4 h-4 mr-2" />
            View Appointments
          </Button>
          <Button
            className="w-full justify-start bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              // TODO: Navigate to patient records page using Next.js router
              window.location.href = "/veterinarian/patients"
            }}>
            <User className="w-4 h-4 mr-2" />
            Patient Records
          </Button>
          <Button
            className="w-full justify-start bg-green-600 hover:bg-green-700"
            onClick={() => {
              // TODO: Navigate to earnings page using Next.js router
              window.location.href = "/veterinarian/earnings"
            }}>
            <DollarSign className="w-4 h-4 mr-2" />
            View Earnings
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
