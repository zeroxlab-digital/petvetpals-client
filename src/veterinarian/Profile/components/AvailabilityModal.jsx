"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Button } from "../../../components/ui/button"
import { ChevronLeft, ChevronRight, Check, Save } from "lucide-react"

export default function AvailabilityModal({
  showAvailabilityModal,
  setShowAvailabilityModal,
  availability,
  setAvailability,
}) {
  const [currentWeek, setCurrentWeek] = useState(0)

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

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

  const weekDates = generateWeekDates(currentWeek)

  const toggleTimeSlot = (date, time) => {
    const dateStr = date.toISOString().split("T")[0]
    const currentSlots = availability[dateStr] || []

    if (currentSlots.includes(time)) {
      setAvailability({
        ...availability,
        [dateStr]: currentSlots.filter((slot) => slot !== time),
      })
    } else {
      setAvailability({
        ...availability,
        [dateStr]: [...currentSlots, time].sort(),
      })
    }
  }

  const saveAvailability = () => {
    // TODO: API call - updateVeterinarianAvailability(availability) using RTK Query mutation
    alert("Availability updated successfully!")
    setShowAvailabilityModal(false)
  }

  return (
    <Dialog open={showAvailabilityModal} onOpenChange={setShowAvailabilityModal}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6 border-b bg-white sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Manage Your Availability</DialogTitle>
            <p className="text-gray-600">Set your available dates and time slots for appointments</p>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Week Navigation */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <Button
              variant="outline"
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="flex items-center gap-2 w-full sm:w-auto">
              <ChevronLeft className="w-4 h-4" />
              Previous Week
            </Button>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {weekDates[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                {weekDates[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </h3>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="flex items-center gap-2 w-full sm:w-auto">
              Next Week
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {weekDates.map((date, index) => {
              const dateStr = date.toISOString().split("T")[0]
              const daySlots = availability[dateStr] || []
              const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${
                    isToday ? "border-[#672e5b] bg-purple-50" : "border-gray-200 bg-white"
                  } shadow-sm`}>
                  <div className="text-center mb-4">
                    <div className="font-semibold text-sm text-gray-900">{dayNames[index]}</div>
                    <div
                      className={`text-2xl font-bold ${isToday ? "text-[#672e5b]" : "text-gray-700"}`}>
                      {date.getDate()}
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1 mt-1">
                      {daySlots.length} slots available
                    </div>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => toggleTimeSlot(date, time)}
                        className={`w-full text-sm p-3 rounded-lg transition-all duration-200 flex items-center justify-between font-medium ${
                          daySlots.includes(time)
                            ? "bg-[#672e5b] text-white shadow-md transform scale-105"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                        }`}>
                        <span>{time}</span>
                        {daySlots.includes(time) && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t bg-white sticky bottom-0">
            <Button
              variant="outline"
              onClick={() => setShowAvailabilityModal(false)}
              className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              onClick={saveAvailability}
              style={{ backgroundColor: "#672e5b" }}
              className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Save Availability
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
