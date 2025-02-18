"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function SimpleCard() {
  const [amount, setAmount] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Ganti "/api/getData" dengan endpoint sesuai kebutuhan
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => {
        setAmount(data?.amount || 0)
        setChartData(data?.chart || [])
      })
      .catch((err) => {
        console.error("Error fetching data", err)
      })
  }, [])

  return (
    <Card className="rounded-lg bg-purple-50 relative shadow-md">
      <CardContent>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Rumah Sakit Carolus</h3>
          <p className="text-sm text-gray-600">Total Knee Replacement</p>
        </div>

        {/* Progress Bar */}
        <Progress value={40} className="mb-4" />

        {/* Amount */}
        <p className="font-bold text-xl mb-4">
          Amount: {amount !== null ? amount : "Loading..."}
        </p>

        {/* Grafik */}
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
