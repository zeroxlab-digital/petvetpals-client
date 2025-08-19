"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card } from "../../../components/ui/card"
import AppointmentCard from "./AppointmentCard"

export default function AppointmentsTabs({
  activeTab,
  setActiveTab,
  appointments,
  filteredAppointments,
  setSelectedAppointment,
  setShowRescheduleModal,
  setShowNotesModal,
  setShowFullRecordModal,
  setSelectedPatientRecord,
}) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-white border border-gray-200">
        <TabsTrigger
          value="today"
          className="data-[state=active]:bg-[#672e5b] data-[state=active]:text-white">
          Today ({appointments.today?.length || 0})
        </TabsTrigger>
        <TabsTrigger
          value="upcoming"
          className="data-[state=active]:bg-[#672e5b] data-[state=active]:text-white">
          Upcoming ({appointments.upcoming?.length || 0})
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="data-[state=active]:bg-[#672e5b] data-[state=active]:text-white">
          Completed ({appointments.completed?.length || 0})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="space-y-4 mt-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              setSelectedAppointment={setSelectedAppointment}
              setShowRescheduleModal={setShowRescheduleModal}
              setShowNotesModal={setShowNotesModal}
              setShowFullRecordModal={setShowFullRecordModal}
              setSelectedPatientRecord={setSelectedPatientRecord} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments for today</h3>
            <p className="text-gray-600">Today&apos;s appointments will appear here</p>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="upcoming" className="space-y-4 mt-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              setSelectedAppointment={setSelectedAppointment}
              setShowRescheduleModal={setShowRescheduleModal}
              setShowNotesModal={setShowNotesModal}
              setShowFullRecordModal={setShowFullRecordModal}
              setSelectedPatientRecord={setSelectedPatientRecord} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
            <p className="text-gray-600">Upcoming appointments will appear here</p>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="completed" className="space-y-4 mt-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              setSelectedAppointment={setSelectedAppointment}
              setShowRescheduleModal={setShowRescheduleModal}
              setShowNotesModal={setShowNotesModal}
              setShowFullRecordModal={setShowFullRecordModal}
              setSelectedPatientRecord={setSelectedPatientRecord} />
          ))
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No completed appointments</h3>
            <p className="text-gray-600">Completed appointments will appear here</p>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
