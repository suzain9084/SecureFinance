import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, TrendingUp } from "lucide-react"

interface AccountSummaryProps {
  accountNumber: string
  balance: string
  currency: string
}

export function AccountSummary({ accountNumber, balance, currency }: AccountSummaryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
          <CardDescription>Main Account ({accountNumber})</CardDescription>
        </div>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{balance}</div>
        <div className="flex items-center pt-1 text-xs text-muted-foreground">
          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          <span className="text-green-500 font-medium">+2.5%</span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

