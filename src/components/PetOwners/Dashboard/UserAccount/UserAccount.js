"use client"
import { useEffect, useState } from "react"
import { Bell, Camera, CreditCard, Edit, Eye, EyeOff, Key, Lock, Mail, Phone, PlusCircle, Save, Settings, Shield, User, } from "lucide-react"
import Image from "next/image"
import { PetSpinner } from "@/components/Common/Loader/PetSpinner"
import { toast, ToastContainer } from "react-toastify"
import { useGetUserDetailsQuery, useLogoutUserMutation, useUpdateUserDetailsMutation } from "@/redux/services/userApi"
import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useRouter } from "next/navigation"
import { FaMoneyBillTransfer, FaMoneyCheckDollar } from "react-icons/fa6"

const UserAccount = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { data, isLoading, isError, error } = useGetUserDetailsQuery();
  useEffect(() => {
    setUserProfile(data?.user)
  }, [data])
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)

  const notify = (message, type) => {
    toast(message, { type: type, autoClose: 1500 });
  }

  const [updateUserDetails] = useUpdateUserDetailsMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserDetails(userProfile);
      console.log(res);
      if (res.data?.success) {
        notify("Profile updated successfull!", "success");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();
  const handleUserLogout = async () => {
    try {
      const res = await logoutUser({});
      console.log(res);
      if (res.data?.success) {
        notify("Logout successfull!", "success");
        localStorage.clear();
        router.push("/signin");
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <PetSpinner />
  }
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b">
          <nav className="-mb-px flex space-x-6">
            {["profile", "billing", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-semibold text-base whitespace-nowrap
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
              <form onSubmit={handleUpdateProfile} className="bg-white rounded-xl border shadow-sm p-6">
                <div className="sm:flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image src={userProfile?.image || "/images/user-man.png"} alt="user-image" width={80} height={80} className="rounded-full" />
                      {/* <HiUserCircle className="w-16 h-16 text-gray-600" /> */}
                      <button type="button" className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{userProfile?.fullName}</h2>
                      <p className="text-sm text-gray-500">Member since {new Date(userProfile?.createdAt).toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
                      <p className="text-sm text-blue-500">Premium Member</p>
                    </div>
                  </div>
                  <div
                    onClick={() => setEditMode(!editMode)}
                    className="max-sm:hidden text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {editMode ?
                      <button type="button" className="flex items-center gap-1 w-full p-3">
                        <Save className="h-4 w-4 " />
                        Save Changes
                      </button>
                      :
                      <button type="submit" className="flex items-center gap-1 w-full p-3">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </button>
                    }
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userProfile?.fullName}
                        onChange={(e) => setUserProfile({ ...userProfile, fullName: e.target.value })}
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue={userProfile?.email}
                        disabled
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-gray-500 font-normal">(optional)</span></label>
                      <input
                        type="tel"
                        defaultValue=""
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
                        defaultValue={userProfile?.address || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        defaultValue={userProfile?.city || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                      <input
                        type="text"
                        defaultValue={userProfile?.zip || ''}
                        onChange={(e) => setUserProfile({ ...userProfile, zip: e.target.value })}
                        disabled={!editMode}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setEditMode(!editMode)}
                  className="sm:hidden mt-10 flex justify-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {editMode ?
                    <button type="button" className="flex items-center justify-center gap-1 w-full p-3">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                    :
                    <button type="submit" className="flex items-center justify-center gap-1 w-full p-3">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  }
                </div>
              </form>
              <div>
                <button onClick={handleUserLogout} className="lg:hidden mt-auto w-full  rounded-md h-12 px-3 text-red-500  font-medium bg-red-500/5 hover:bg-red-500/10 duration-200 flex justify-center items-center gap-2 "><HiArrowRightOnRectangle className='text-xl' /> Log out</button>
              </div>

              {/* Security Settings */}
              {/* <div className="grid gap-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="">
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
                          value={userProfile?.password || "********"}

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
              </div> */}
            </div>
          )}

          {/* Billing Section */}
          {activeTab === "billing" && (
            <div className="grid gap-6">
              {/* <div className="bg-white rounded-xl border shadow-sm p-6">
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
              </div> */}

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Billing History</h3>
                <div className="overflow-x-auto">
                  <div className="text-center py-10 text-gray-500">
                    <FaMoneyBillTransfer className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Billing History Found!</p>
                    <p className="text-sm">You have no transaction history</p>
                  </div>
                  {/* <table className="w-full">
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
                  </table> */}
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {/* {activeTab === "security" && (
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
                        value={userProfile?.password || "12345678"}

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
          )} */}

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

export default UserAccount;