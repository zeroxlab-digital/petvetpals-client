/* eslint-disable react/no-unescaped-entities */
import { Activity, Calendar, MessageSquare, PawPrint, Plus, ShoppingBag, Stethoscope } from "lucide-react"

const InitialDashboard = () => {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Welcome to PetVetPals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your all-in-one platform for pet healthcare management. Let's get started by adding your first pet to unlock
            personalized care recommendations and health tracking.
          </p>
        </div>

        {/* Add Pet Card */}
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Add Your First Pet</h2>
            <p className="text-gray-500 mb-4">
              Create a profile for your pet to start tracking their health and accessing our services.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryOutline transition-colors">
              Add Pet
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-8">Everything Your Pet Needs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Online Vet Consultation</h3>
              <p className="text-gray-500 text-sm">
                Connect with licensed veterinarians from the comfort of your home, 24/7.
              </p>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health Tracking</h3>
              <p className="text-gray-500 text-sm">
                Monitor weight, activity, medications, and overall wellness with easy-to-read charts.
              </p>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vet Chat</h3>
              <p className="text-gray-500 text-sm">
                Quick answers to your pet health questions through our messaging platform.
              </p>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pet Pharmacy & Shop</h3>
              <p className="text-gray-500 text-sm">Order medications, food, and supplies with doorstep delivery.</p>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <PawPrint className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Symptom Checker</h3>
              <p className="text-gray-500 text-sm">Identify potential health issues and get recommended actions.</p>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Appointment Booking</h3>
              <p className="text-gray-500 text-sm">Schedule in-person or virtual vet visits with just a few clicks.</p>
            </div>
          </div>
        </div>

        {/* Getting Started Steps */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Getting Started is Easy</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium mb-2">Add Your Pet</h3>
              <p className="text-sm text-gray-500">Create your pet's profile with basic information</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium mb-2">Complete Health Profile</h3>
              <p className="text-sm text-gray-500">Add medical history and current medications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium mb-2">Access Services</h3>
              <p className="text-sm text-gray-500">Start using all our pet care features</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InitialDashboard

