"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function PerformanceInsights({ stats }) {
  // Transform the stats into a format suitable for Recharts
  const data = [
    { name: "Satisfaction", value: stats.patientSatisfaction, max: 5 },
    { name: "Appointments", value: 28, max: 30 },
    { name: "Response (hrs)", value: 2, max: 24 },
    { name: "Growth (%)", value: stats.monthlyGrowth, max: 100 },
  ];

  return (
    <Card className="border text-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          This Week&apos;s Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
            <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
