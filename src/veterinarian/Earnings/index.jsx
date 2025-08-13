"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, CreditCard, Clock } from "lucide-react"

export default function Earnings() {
  const earningsData = {
    thisMonth: 8450,
    lastMonth: 7200,
    thisYear: 89500,
    pending: 1250,
    nextPayout: "Dec 15, 2024",
  }

  const recentTransactions = [
    {
      id: 1,
      date: "2024-12-08",
      patient: "Buddy (Sarah Johnson)",
      service: "Annual Wellness Exam",
      amount: 150,
      status: "completed",
    },
    {
      id: 2,
      date: "2024-12-07",
      patient: "Whiskers (Mike Chen)",
      service: "Vaccination Package",
      amount: 85,
      status: "completed",
    },
    {
      id: 3,
      date: "2024-12-06",
      patient: "Luna (Emma Davis)",
      service: "Surgery Consultation",
      amount: 200,
      status: "pending",
    },
    {
      id: 4,
      date: "2024-12-05",
      patient: "Charlie (Robert Wilson)",
      service: "Senior Wellness Panel",
      amount: 180,
      status: "completed",
    },
  ]

  const monthlyBreakdown = [
    { month: "Jan", amount: 7200 },
    { month: "Feb", amount: 6800 },
    { month: "Mar", amount: 7500 },
    { month: "Apr", amount: 8100 },
    { month: "May", amount: 7900 },
    { month: "Jun", amount: 8300 },
    { month: "Jul", amount: 8600 },
    { month: "Aug", amount: 8200 },
    { month: "Sep", amount: 7800 },
    { month: "Oct", amount: 8400 },
    { month: "Nov", amount: 7200 },
    { month: "Dec", amount: 8450 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const growthPercentage = (((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Earnings & Payouts</h1>
          <p className="text-gray-600 mt-1">Track your income and manage payouts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button style={{ backgroundColor: "#672e5b" }}>
            <CreditCard className="w-4 h-4 mr-2" />
            Request Payout
          </Button>
        </div>
      </div>
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-gray-900">${earningsData.thisMonth.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              {growthPercentage > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
              )}
              <p
                className={`text-xs ${growthPercentage > 0 ? "text-green-600" : "text-red-600"}`}>
                {growthPercentage > 0 ? "+" : ""}
                {growthPercentage}% from last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Year</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-gray-900">${earningsData.thisYear.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Average: ${(earningsData.thisYear / 12).toFixed(0)}/month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-gray-900">${earningsData.pending.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Payout</CardTitle>
            <Calendar className="h-4 w-4" style={{ color: "#672e5b" }} />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-black text-gray-900">{earningsData.nextPayout}</div>
            <p className="text-xs text-gray-500 mt-1">Automatic transfer</p>
          </CardContent>
        </Card>
      </div>
      {/* Monthly Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-black text-gray-900">Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyBreakdown.map((month, index) => (
              <div key={month.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
                <div className="flex-1">
                  <Progress
                    value={(month.amount / Math.max(...monthlyBreakdown.map((m) => m.amount))) * 100}
                    className="h-3" />
                </div>
                <div className="w-20 text-sm font-medium text-right">${month.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Recent Transactions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-black text-gray-900">Recent Transactions</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.patient}</p>
                      <p className="text-sm text-gray-600">{transaction.service}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${transaction.amount}</p>
                  <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
