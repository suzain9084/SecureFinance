"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Generate mock time series data
const generateTimeSeriesData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      predictedFraud: Math.floor(Math.random() * 30) + 10,
      reportedFraud: Math.floor(Math.random() * 20) + 5,
    })
  }

  return data
}

const timeFrames = [
  { value: "7", label: "Last 7 Days", data: generateTimeSeriesData(7) },
  { value: "14", label: "Last 14 Days", data: generateTimeSeriesData(14) },
  { value: "30", label: "Last 30 Days", data: generateTimeSeriesData(30) },
  { value: "90", label: "Last 90 Days", data: generateTimeSeriesData(90) },
]

export function FraudTrendGraph() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7")

  const currentData = timeFrames.find((tf) => tf.value === selectedTimeFrame)?.data || timeFrames[0].data

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fraud Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              {timeFrames.map((timeFrame) => (
                <SelectItem key={timeFrame.value} value={timeFrame.value}>
                  {timeFrame.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="predictedFraud"
                name="Predicted Fraud"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="reportedFraud" name="Reported Fraud" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

