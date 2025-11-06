"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { User, Briefcase, MapPin, DollarSign, Camera } from "lucide-react"

export default function PersonalInformation({ profileData, setProfileData, isEditing }) {
  const handleImageUpload = () => {
    // TODO: API call - uploadProfileImage() using RTK Query mutation
    alert("Image upload functionality - integrate with file upload service")
  }

  const handlePriceUpdate = (newPrice) => {
    // TODO: API call - updateConsultationPrice(newPrice) using RTK Query mutation
    setProfileData({ ...profileData, consultationPrice: newPrice })
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-3 text-[#672e5b]" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-2 border-gray-200">
              <AvatarImage src={profileData.image || "/placeholder.svg"} alt={profileData.fullName} />
              <AvatarFallback className="text-lg font-semibold bg-[#672e5b] text-white">
                {profileData.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                onClick={handleImageUpload}
                className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0"
                style={{ backgroundColor: "#672e5b" }}>
                <Camera className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                {isEditing ? (
                  <Input
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{profileData.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Title</label>
                {isEditing ? (
                  <Input
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
                ) : (
                  <p className="text-base font-medium text-[#672e5b]">{profileData.title}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Current Workplace</label>
                {isEditing ? (
                  <Input
                    value={profileData.currentWorkplace}
                    onChange={(e) => setProfileData({ ...profileData, currentWorkplace: e.target.value })}
                    className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
                ) : (
                  <p className="text-gray-700 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                    {profileData.currentWorkplace}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Years of Experience</label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={profileData.yearsOfExperience}
                    onChange={(e) =>
                      setProfileData({ ...profileData, yearsOfExperience: Number.parseInt(e.target.value) })
                    }
                    className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
                ) : (
                  <p className="text-gray-700">{profileData.yearsOfExperience} years</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Based In</label>
                {isEditing ? (
                  <Input
                    value={profileData.basedIn}
                    onChange={(e) => setProfileData({ ...profileData, basedIn: e.target.value })}
                    className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
                ) : (
                  <p className="text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    {profileData.basedIn}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Consultation Price</label>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <div className="flex items-center">
                      <span className="text-lg font-semibold mr-1">$</span>
                      <Input
                        type="number"
                        value={profileData.consultationPrice}
                        onChange={(e) => handlePriceUpdate(Number.parseInt(e.target.value))}
                        className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b] w-24" />
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-green-600 flex items-center">
                      <DollarSign className="w-5 h-5" />
                      {profileData.consultationPrice}
                    </p>
                  )}
                  <span className="text-sm text-gray-500">per consultation</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Professional Details</label>
              {isEditing ? (
                <Textarea
                  value={profileData.details}
                  onChange={(e) => setProfileData({ ...profileData, details: e.target.value })}
                  rows={4}
                  className="border-gray-300 focus:border-[#672e5b] focus:ring-[#672e5b]" />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.details}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
