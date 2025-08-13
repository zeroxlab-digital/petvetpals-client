"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Calendar, Edit } from "lucide-react"

export default function AvailabilitySection({ availability, setShowAvailabilityModal }) {
  const generateWeekDates = (weekOffset = 0) => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + weekOffset * 7))
    const dates = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-[#672e5b]" />
            Current Availability
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setShowAvailabilityModal(true)}
            className="text-sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {generateWeekDates(0).map((date, index) => {
            const dateStr = date.toISOString().split("T")[0]
            const daySlots = availability[dateStr] || []
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            const isToday = date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`p-3 rounded-lg border ${isToday ? "border-[#672e5b] bg-purple-50" : "border-gray-200"}`}>
                <div className="text-center mb-2">
                  <div className="font-medium text-sm text-gray-900">{dayNames[index]}</div>
                  <div
                    className={`text-lg font-semibold ${isToday ? "text-[#672e5b]" : "text-gray-700"}`}>
                    {date.getDate()}
                  </div>
                </div>
                <div className="space-y-1">
                  {daySlots.length > 0 ? (
                    daySlots.slice(0, 3).map((time) => (
                      <div
                        key={time}
                        className="text-xs bg-[#672e5b] text-white px-2 py-1 rounded text-center">
                        {time}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 text-center">No slots</div>
                  )}
                  {daySlots.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">+{daySlots.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
