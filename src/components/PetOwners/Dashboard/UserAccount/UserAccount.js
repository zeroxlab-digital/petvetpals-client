"use client"
import { useState } from "react"
import { Bell, Camera, CreditCard, Edit, Eye, EyeOff, Key, Lock, LogOut, Mail, Phone, PlusCircle, Save, Settings, Shield, User, } from "lucide-react"
import Image from "next/image"

export default function UserAccount() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b">
          <nav className="-mb-px flex space-x-6">
            {["profile", "billing", "security", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Profile Section */}
          {activeTab === "profile" && (
            <div className="grid gap-6">
              {/* Profile Header */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Image src="/images/vet.png" alt="Profile" width={80} height={80} className="rounded-full" />
                      <button className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">John Doe</h2>
                      <p className="text-sm text-gray-500">Member since January 2024</p>
                      <p className="text-sm text-blue-500">Premium Member</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {editMode ? (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        defaultValue="123 Pet Street"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        defaultValue="Pet City"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <input
                        type="text"
                        defaultValue="12345"
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Updated payment method</p>
                      <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Settings className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Changed notification settings</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile information updated</p>
                      <p className="text-xs text-gray-500">5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeTab === "billing" && (
            <div className="grid gap-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/24</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Default</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <PlusCircle className="h-4 w-4" />
                    Add Payment Method
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-4 pr-4">Date</th>
                        <th className="pb-4 pr-4">Description</th>
                        <th className="pb-4 pr-4">Amount</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-t">
                        <td className="py-4 pr-4">Feb 15, 2024</td>
                        <td className="py-4 pr-4">Premium Membership</td>
                        <td className="py-4 pr-4">$29.99</td>
                        <td className="py-4">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Paid</span>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-4 pr-4">Feb 1, 2024</td>
                        <td className="py-4 pr-4">Vet Consultation</td>
                        <td className="py-4 pr-4">$49.99</td>
                        <td className="py-4">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Paid</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === "security" && (
            <div className="grid gap-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div className="pb-6 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-gray-500" />
                        <h4 className="font-medium">Password</h4>
                      </div>
                      <button className="text-sm text-blue-500 hover:text-blue-600">Change</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        value="12345678"
                        
                        className="px-3 py-2 border rounded-lg bg-gray-50 text-gray-500"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pb-6 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-gray-500" />
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                      </div>
                      <button className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                        Enable
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-gray-500" />
                        <h4 className="font-medium">Active Sessions</h4>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Current Session</p>
                          <p className="text-xs text-gray-500">Windows • Chrome • New York, USA</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeTab === "notifications" && (
            <div className="grid gap-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive email updates about your account</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Email Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      defaultChecked
                    />
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-gray-500">Get notified about upcoming vet appointments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      defaultChecked
                    />
                    <div>
                      <p className="font-medium">Medication Reminders</p>
                      <p className="text-sm text-gray-500">Receive reminders for pet medications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      defaultChecked
                    />
                    <div>
                      <p className="font-medium">Health Reports</p>
                      <p className="text-sm text-gray-500">Get periodic health reports for your pets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

