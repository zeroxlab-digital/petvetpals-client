/* eslint-disable react/no-unescaped-entities */
"use client"
import { useEffect, useState } from "react"
import { Activity, Bell, Calendar, Check, ChevronDown, MessageSquare, PawPrint, PillIcon as Pills, Plus, Syringe, Weight } from "lucide-react"
import Image from "next/image"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import InitialDashboard from "./InitialDashboard"
import useFetchPets from "../../../../../hooks/useFetchPets"

const healthData = [
  { name: "Week 1", weight: 32.5, activity: 75, },
  { name: "Week 2", weight: 32.8, activity: 82, },
  { name: "Week 3", weight: 32.6, activity: 78, },
  { name: "Week 4", weight: 32.5, activity: 85, },
  { name: "Week 5", weight: 32.4, activity: 88, },
  { name: "Week 6", weight: 32.5, activity: 85, },
]

const DashboardPage = () => {
  const { pets, isLoading, error } = useFetchPets();
  const [selectedPet, setSelectedPet] = useState({});
  console.log("Selected pet:", selectedPet);
  useEffect(() => {
    if (pets.length > 0) {
      setSelectedPet(pets[0]);
    }
  }, [pets])

  const [mounted, setMounted] = useState(false)
  const [showPetMenu, setShowPetMenu] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if(isLoading) {
    return <div>Loading...</div>
  }
  if (pets.length < 1) {
    return <InitialDashboard />
  }
  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto ">
        {/* Pet Selector and Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <Image
                src="/images/dog-puppy.avif"
                alt="Pet avatar"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="absolute -bottom-1 right-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                Active
              </span>
            </div>
            <div>
              <div className="relative">
                <button
                  onClick={() => setShowPetMenu(!showPetMenu)}
                  className="flex items-center text-lg font-semibold hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  {selectedPet.name} <span className="text-gray-500">({selectedPet.breed})</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showPetMenu && (
                  <>
                    {showPetMenu && (
                      <div className="absolute top-full left-0 mt-1 w-[200px] bg-white rounded-lg shadow-lg border p-1 z-10">
                        {pets.map((pet) => (
                          <button
                            key={pet._id}
                            onClick={() => { setSelectedPet(pet), setShowPetMenu(false) }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            {pet.name} ({pet.breed})
                          </button>
                        ))}
                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center transition-colors">
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Pet
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">{selectedPet.age} years old • {selectedPet.gender} • {selectedPet.weight} kg</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryOutline transition-colors">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </button>
            <button className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Vet
            </button>
          </div>
        </div>

        {/* Health Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-600">Overall Health</h3>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-green-500">Excellent</div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: "92%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last check-up: 2 weeks ago</p>
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-600">Weight Tracking</h3>
              <Weight className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">32.5 kg</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
              <Check className="h-3 w-3" />
              Healthy weight range
            </p>
            <p className="text-xs text-gray-500 mt-1">Target: 30-34 kg</p>
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-600">Activity Level</h3>
              <PawPrint className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">85%</div>
            <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Above average for breed</p>
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-600">Next Vaccination</h3>
              <Syringe className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-500 mt-2">Days until next shot</p>
            <p className="text-xs text-blue-500 mt-1 cursor-pointer hover:underline">View vaccination schedule</p>
          </div>
        </div>

        {/* Health Trends and Upcoming */}
        <div className="grid gap-4 md:grid-cols-7 mb-8">
          <div className="bg-white rounded-xl border p-4 shadow-sm md:col-span-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Health Trends</h3>
              <p className="text-sm text-gray-500">Weight and activity level over time</p>
            </div>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={healthData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Weight (kg)"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Activity Level (%)"
                    activeDot={{ r: 8 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm md:col-span-3">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Upcoming</h3>
              <p className="text-sm text-gray-500">Next appointments and reminders</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Regular Check-up</p>
                  <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                  <p className="text-xs text-gray-500">with Dr. Smith</p>
                </div>
                <button className="border px-3 py-1 rounded-lg text-sm hover:bg-white transition-colors">
                  Reschedule
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                <Pills className="h-8 w-8 text-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Heartworm Medicine Due</p>
                  <p className="text-xs text-gray-500">In 3 days</p>
                </div>
                <button className="border px-3 py-1 rounded-lg text-sm hover:bg-white transition-colors">
                  Mark Done
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                <Syringe className="h-8 w-8 text-blue-500" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Rabies Vaccination</p>
                  <p className="text-xs text-gray-500">In 15 days</p>
                </div>
                <button className="border px-3 py-1 rounded-lg text-sm hover:bg-white transition-colors">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Medical History and Recent Updates */}
        <div className="grid gap-4 md:grid-cols-7">
          <div className="bg-white rounded-xl border shadow-sm md:col-span-4">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Medical History</h3>
              <p className="text-sm text-gray-500">Recent medical records</p>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-2 pr-4">Date</th>
                    <th className="pb-2 pr-4">Type</th>
                    <th className="pb-2 pr-4">Doctor</th>
                    <th className="pb-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">Feb 15, 2024</td>
                    <td className="py-3 pr-4">Check-up</td>
                    <td className="py-3 pr-4">Dr. Smith</td>
                    <td className="py-3">Regular health check - All normal</td>
                  </tr>
                  <tr className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">Feb 1, 2024</td>
                    <td className="py-3 pr-4">Vaccination</td>
                    <td className="py-3 pr-4">Dr. Johnson</td>
                    <td className="py-3">Annual boosters completed</td>
                  </tr>
                  <tr className="border-t hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">Jan 20, 2024</td>
                    <td className="py-3 pr-4">Dental</td>
                    <td className="py-3 pr-4">Dr. Williams</td>
                    <td className="py-3">Teeth cleaning and check</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                View Complete History →
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm md:col-span-3">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Recent Updates</h3>
              <p className="text-sm text-gray-500">Latest activities and notifications</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Medication Reminder</p>
                  <p className="text-sm text-gray-500">Time for evening medication</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Message from Dr. Smith</p>
                  <p className="text-sm text-gray-500">"Max is doing great! Keep up with the current routine..."</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Weight Updated</p>
                  <p className="text-sm text-gray-500">New weight recorded: 32.5 kg</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <button className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                View All Updates →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage;