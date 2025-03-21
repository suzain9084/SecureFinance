"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for different dimensions
const channelData = [
  { name: "Mobile", predictedFraud: 65, reportedFraud: 42 },
  { name: "Web", predictedFraud: 58, reportedFraud: 35 },
]

const paymentModeData = [
  { name: "Credit Card", predictedFraud: 72, reportedFraud: 48 },
  { name: "Debit Card", predictedFraud: 53, reportedFraud: 31 },
  { name: "Bank Transfer", predictedFraud: 38, reportedFraud: 22 },
]

const gatewayData = [
  { name: "Bank A", predictedFraud: 62, reportedFraud: 40 },
  { name: "Bank B", predictedFraud: 48, reportedFraud: 32 },
  { name: "Bank C", predictedFraud: 55, reportedFraud: 36 },
  { name: "Bank D", predictedFraud: 42, reportedFraud: 25 },
]

const payerData = [
  { name: "Top Payer 1", predictedFraud: 35, reportedFraud: 22 },
  { name: "Top Payer 2", predictedFraud: 28, reportedFraud: 18 },
  { name: "Top Payer 3", predictedFraud: 25, reportedFraud: 15 },
  { name: "Top Payer 4", predictedFraud: 20, reportedFraud: 12 },
  { name: "Top Payer 5", predictedFraud: 18, reportedFraud: 10 },
]

const payeeData = [
  { name: "Top Payee 1", predictedFraud: 42, reportedFraud: 30 },
  { name: "Top Payee 2", predictedFraud: 36, reportedFraud: 24 },
  { name: "Top Payee 3", predictedFraud: 30, reportedFraud: 20 },
  { name: "Top Payee 4", predictedFraud: 25, reportedFraud: 15 },
  { name: "Top Payee 5", predictedFraud: 20, reportedFraud: 12 },
]

const dimensions = [
  { value: "channel", label: "Transaction Channel", data: channelData },
  { value: "paymentMode", label: "Payment Mode", data: paymentModeData },
  { value: "gateway", label: "Payment Gateway", data: gatewayData },
  { value: "payer", label: "Top Payers", data: payerData },
  { value: "payee", label: "Top Payees", data: payeeData },
]

export function FraudComparisonGraph() {
  const [selectedDimension, setSelectedDimension] = useState("channel")

  const currentData = dimensions.find((d) => d.value === selectedDimension)?.data || channelData

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fraud Comparison by Dimension</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Select value={selectedDimension} onValueChange={setSelectedDimension}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Select dimension" />
            </SelectTrigger>
            <SelectContent>
              {dimensions.map((dimension) => (
                <SelectItem key={dimension.value} value={dimension.value}>
                  {dimension.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="predictedFraud" name="Predicted Fraud" fill="#8884d8" />
              <Bar dataKey="reportedFraud" name="Reported Fraud" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

