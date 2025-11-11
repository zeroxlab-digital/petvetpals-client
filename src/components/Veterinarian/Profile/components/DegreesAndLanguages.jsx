import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Languages, Award } from "lucide-react"

export default function DegreesAndLanguages({ profileData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-[#672e5b]" />
            Degrees & Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {profileData.degrees.map((degree, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-[#672e5b] mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{degree}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Languages className="w-5 h-5 mr-2 text-[#672e5b]" />
            Languages Spoken
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {profileData.languagesSpoken.map((language, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <span className="font-medium text-gray-900">{language}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
