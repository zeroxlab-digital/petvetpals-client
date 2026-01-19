"use client"
import { useEffect, useState } from "react"
import {
  Bell, Camera, CreditCard, Edit, Eye, EyeOff, Key, Lock, Mail, Phone,
  PlusCircle, Save, Settings, Shield, User, MapPin, Globe, Hash,
  LogOut, ChevronRight, CheckCircle2, CreditCard as BillingIcon,
  Pin
} from "lucide-react"
import Image from "next/image"
import { PetSpinner } from "@/components/Common/Loader/PetSpinner"
import { toast, ToastContainer } from "react-toastify"
import { useGetUserDetailsQuery, useLogoutUserMutation, useUpdateUserDetailsMutation } from "@/redux/services/userApi"
import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useRouter } from "next/navigation"
import { FaMoneyBillTransfer } from "react-icons/fa6"

const UserAccount = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { data, isLoading } = useGetUserDetailsQuery();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.user) setUserProfile(data.user);
  }, [data]);

  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const [logoutUser] = useLogoutUserMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserDetails(userProfile);
      if (res.data?.success) {
        toast.success("Profile synchronized!", { position: "top-center" });
        setEditMode(false);
      }
    } catch (error) { console.error(error); }
  }

  const handleUserLogout = async () => {
    try {
      const res = await logoutUser({});
      if (res.data?.success) {
        localStorage.clear();
        router.push("/signin");
      }
    } catch (error) { console.error(error); }
  }

  if (isLoading) return <PetSpinner />;

  return (
    <div className="min-h-screen">
      <ToastContainer hideProgressBar />

      <header className="">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Settings</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Personal Account</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${editMode ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"
              }`}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto mt-6 space-y-6">

        <section className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-white relative">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 rounded-[2rem] overflow-hidden ring-4 ring-slate-50 shadow-inner">
                <Image
                  src={userProfile?.image || "/images/user-man.png"}
                  alt="Avatar"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <label className="absolute -bottom-1 -right-1 p-2 bg-slate-900 text-white rounded-xl shadow-lg cursor-pointer active:scale-90 transition-transform">
                <Camera size={14} />
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{userProfile?.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {userProfile?.membership_status || "Standard"}
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Since {new Date(userProfile?.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex bg-slate-100 p-1.5 rounded-2xl">
            {["profile", "billing", "notifications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${activeTab === tab ? "bg-white text-slate-900 shadow-sm scale-100" : "text-slate-500 scale-95"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          {activeTab === "profile" && (
            <form onSubmit={handleUpdateProfile} className="space-y-4 animate-in fade-in slide-in-from-bottom-4">

              {/* Personal Info Group */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 space-y-4">
                <h3 className="text-sm font-black text-slate-900 px-1 mb-2">Primary Details</h3>
                <InputField
                  icon={User} label="Full Name" value={userProfile?.fullName}
                  disabled={!editMode}
                  onChange={(v) => setUserProfile({ ...userProfile, fullName: v })}
                />
                <InputField icon={Mail} label="Email Address" value={userProfile?.email} disabled={true} />
              </div>

              {/* Location Group */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 space-y-4">
                <h3 className="text-sm font-black text-slate-900 px-1 mb-2">Location & Shipping</h3>
                <InputField
                  icon={MapPin} label="Address" value={userProfile?.address}
                  disabled={!editMode}
                  onChange={(v) => setUserProfile({ ...userProfile, address: v })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    icon={Globe} label="State" value={userProfile?.state}
                    disabled={!editMode}
                    onChange={(v) => setUserProfile({ ...userProfile, state: v })}
                  />
                  <InputField
                    icon={Pin} label="City" value={userProfile?.city}
                    disabled={!editMode}
                    onChange={(v) => setUserProfile({ ...userProfile, city: v })}
                  />
                </div>
                <InputField
                  icon={Hash} label="Zip Code" value={userProfile?.zip}
                  disabled={!editMode}
                  onChange={(v) => setUserProfile({ ...userProfile, zip: v })}
                />
              </div>

              {editMode && (
                <div className="fixed bottom-6 left-0 right-0 px-6 z-50">
                  <button type="submit" className="w-full max-w-md mx-auto bg-primary text-white h-16 rounded-[2rem] font-bold shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Save size={20} /> Save Changes
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === "billing" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <FaMoneyBillTransfer size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No History Yet</h3>
                <p className="text-xs text-slate-400 mt-1 mb-6">Your transaction records will appear here.</p>
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest">Upgrade Account</button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <NotificationItem
                icon={Bell} title="Push Notifications"
                desc="Appointment & health alerts" defaultChecked
              />
              <NotificationItem
                icon={Mail} title="Email Reports"
                desc="Weekly pet health summaries" defaultChecked
              />
              <NotificationItem
                icon={Shield} title="Security Alerts"
                desc="Sign-in and password notifications" defaultChecked
              />
            </div>
          )}
        </div>

        <section className="pt-4">
          <button onClick={handleUserLogout} className="lg:hidden mt-auto w-full  rounded-2xl h-14 px-3 text-red-500  font-semibold bg-red-500/5 hover:bg-red-500/10 duration-200 flex justify-center items-center gap-2 "><HiArrowRightOnRectangle className='text-xl' /> Log out</button>
        </section>
      </main>
    </div>
  )
}

const InputField = ({ icon: Icon, label, value, disabled, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 ${disabled ? 'bg-slate-50/50 border-slate-100 text-slate-500' : 'bg-white border-primary/20 ring-4 ring-primary/5'
      }`}>
      <Icon size={16} className={disabled ? "text-slate-300" : "text-primary"} />
      <input
        value={value || ''}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent w-full text-sm font-bold placeholder:text-slate-300 focus:outline-none"
        placeholder={`Enter ${label}`}
      />
      {!disabled && <CheckCircle2 size={14} className="text-slate-200" />}
    </div>
  </div>
)

const NotificationItem = ({ icon: Icon, title, desc, defaultChecked }) => (
  <div className="flex items-center justify-between p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 shadow-inner">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-sm font-black text-slate-900">{title}</p>
        <p className="text-[10px] font-medium text-slate-400 tracking-tight">{desc}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary shadow-inner" />
    </label>
  </div>
)

export default UserAccount;