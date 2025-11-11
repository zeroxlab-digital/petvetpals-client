"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchAndFilters({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, totalPatients }) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search patients by name, owner, or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
              style={filterStatus === "all" ? { backgroundColor: "#672e5b" } : {}}>
              All ({totalPatients})
            </Button>
            <Button
              variant={filterStatus === "healthy" ? "default" : "outline"}
              onClick={() => setFilterStatus("healthy")}
              size="sm"
              className={
                filterStatus === "healthy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "text-green-600 border-green-600 hover:bg-green-50"
              }>
              Healthy
            </Button>
            <Button
              variant={filterStatus === "monitoring" ? "default" : "outline"}
              onClick={() => setFilterStatus("monitoring")}
              size="sm"
              className={
                filterStatus === "monitoring"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "text-yellow-600 border-yellow-600 hover:bg-yellow-50"
              }>
              Monitoring
            </Button>
            <Button
              variant={filterStatus === "treatment" ? "default" : "outline"}
              onClick={() => setFilterStatus("treatment")}
              size="sm"
              className={
                filterStatus === "treatment"
                  ? "bg-red-600 hover:bg-red-700"
                  : "text-red-600 border-red-600 hover:bg-red-50"
              }>
              Treatment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
