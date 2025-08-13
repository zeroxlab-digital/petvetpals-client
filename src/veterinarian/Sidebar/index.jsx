"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  History,
  DollarSign,
  User,
  Menu,
  X,
  Heart,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/veterinarian", icon: LayoutDashboard, current: true },
  { name: "Appointments", href: "/veterinarian/appointments", icon: Calendar, current: false },
  { name: "Messages", href: "/veterinarian/messages", icon: MessageSquare, current: false },
  { name: "Patient Records", href: "/veterinarian/patients", icon: FileText, current: false },
  { name: "Treatment History", href: "/veterinarian/treatments", icon: History, current: false },
  { name: "Earnings & Payouts", href: "/veterinarian/earnings", icon: DollarSign, current: false },
  { name: "Profile", href: "/veterinarian/profile", icon: User, current: false },
]

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#672e5b" }}>
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900">PetVetPals</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.current ? "text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={item.current ? { backgroundColor: "#672e5b" } : {}}
                  onClick={() => setSidebarOpen(false)}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div
          className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#672e5b" }}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900">PetVetPals</span>
            </div>
          </div>
          <nav className="mt-8 flex-1 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.current ? "text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    style={item.current ? { backgroundColor: "#672e5b" } : {}}>
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-40 bg-white shadow-md hover:bg-gray-50 border border-gray-200"
          onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}
