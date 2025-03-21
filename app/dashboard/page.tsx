import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionTable } from "@/components/transaction-table"
import { FraudComparisonGraph } from "@/components/fraud-comparison-graph"
import { FraudTrendGraph } from "@/components/fraud-trend-graph"
import { EvaluationMetrics } from "@/components/evaluation-metrics"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    
    <div className="container mx-auto py-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-6 w-6 text-primary" />
            <span>SecureFinance</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/support" className="text-sm font-medium">
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-6">Transaction and Fraud Monitoring Dashboard</h1>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="comparison">Fraud Comparison</TabsTrigger>
          <TabsTrigger value="trends">Fraud Trends</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="mt-6">
          <TransactionTable />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <FraudComparisonGraph />
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <FraudTrendGraph />
        </TabsContent>

        <TabsContent value="evaluation" className="mt-6">
          <EvaluationMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

