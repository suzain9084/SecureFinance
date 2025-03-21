"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

// Mock evaluation metrics data
const timeFrames = [
  {
    value: "7",
    label: "Last 7 Days",
    confusionMatrix: {
      truePositive: 42,
      falsePositive: 8,
      trueNegative: 950,
      falseNegative: 12,
    },
    metrics: {
      accuracy: 0.98,
      precision: 0.84,
      recall: 0.78,
      f1Score: 0.81,
    },
  },
  {
    value: "30",
    label: "Last 30 Days",
    confusionMatrix: {
      truePositive: 156,
      falsePositive: 24,
      trueNegative: 3820,
      falseNegative: 38,
    },
    metrics: {
      accuracy: 0.985,
      precision: 0.87,
      recall: 0.8,
      f1Score: 0.83,
    },
  },
  {
    value: "90",
    label: "Last 90 Days",
    confusionMatrix: {
      truePositive: 485,
      falsePositive: 65,
      trueNegative: 11450,
      falseNegative: 95,
    },
    metrics: {
      accuracy: 0.987,
      precision: 0.88,
      recall: 0.84,
      f1Score: 0.86,
    },
  },
]

export function EvaluationMetrics() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("7")

  const currentData = timeFrames.find((tf) => tf.value === selectedTimeFrame) || timeFrames[0]

  const { confusionMatrix, metrics } = currentData

  // Prepare data for the metrics chart
  const metricsChartData = [
    { name: "Accuracy", value: metrics.accuracy },
    { name: "Precision", value: metrics.precision },
    { name: "Recall", value: metrics.recall },
    { name: "F1 Score", value: metrics.f1Score },
  ]

  // Colors for the metrics chart
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fraud Detection Evaluation</h2>
        <Select value={selectedTimeFrame} onValueChange={setSelectedTimeFrame}>
          <SelectTrigger className="w-[180px]">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Confusion Matrix</CardTitle>
            <CardDescription>Evaluation of predicted vs actual fraud cases</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Predicted Positive</TableHead>
                  <TableHead>Predicted Negative</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Actual Positive</TableCell>
                  <TableCell className="bg-green-100 dark:bg-green-900/20">
                    {confusionMatrix.truePositive} (True Positive)
                  </TableCell>
                  <TableCell className="bg-red-100 dark:bg-red-900/20">
                    {confusionMatrix.falseNegative} (False Negative)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Actual Negative</TableCell>
                  <TableCell className="bg-red-100 dark:bg-red-900/20">
                    {confusionMatrix.falsePositive} (False Positive)
                  </TableCell>
                  <TableCell className="bg-green-100 dark:bg-green-900/20">
                    {confusionMatrix.trueNegative} (True Negative)
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key metrics for fraud detection model evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metricsChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={(value) => (value * 100).toFixed(1) + "%"} />
                  <Legend />
                  <Bar dataKey="value" name="Score">
                    {metricsChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-2xl font-bold">{(value * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

