"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, TrendingUp, Users, Heart, CheckCircle, Clock } from "lucide-react"

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="shadow-sm border border-gray-200 space-y-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Today&apos;s Appointments</CardTitle>
          <Calendar className="h-5 w-5 text-[#672e5b]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</div>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center mr-4">
              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
              {stats.confirmedAppointments} confirmed
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-yellow-500" />
              {stats.pendingAppointments} pending
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200 space-y-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Weekly Earnings</CardTitle>
          <DollarSign className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">${stats.weeklyEarnings}</div>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <TrendingUp className="w-3 h-3 mr-1 text-green-500" />+{stats.monthlyGrowth}% from last week
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200 space-y-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
          <Users className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalPatients}</div>
          <p className="text-xs text-gray-500 mt-2">8 new this month</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-gray-200 space-y-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          <Heart className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
          <Progress value={stats.completionRate} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}
