"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Activity, Star, TrendingUp } from "lucide-react"

export default function PerformanceInsights({ stats }) {
  return (
    <Card
      className="shadow-sm border border-gray-200 bg-gradient-to-br from-[#672e5b] to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          This Week's Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-100">Patient Satisfaction</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-300 mr-1" />
            <span className="text-sm font-semibold">{stats.patientSatisfaction}/5</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-100">Appointments Completed</span>
          <span className="text-sm font-semibold text-green-300">28/30</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-100">Response Time</span>
          <span className="text-sm font-semibold">&lt; 2 hours</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-100">Revenue Growth</span>
          <div className="flex items-center">
            <TrendingUp className="w-3 h-3 text-green-300 mr-1" />
            <span className="text-sm font-semibold text-green-300">+{stats.monthlyGrowth}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
