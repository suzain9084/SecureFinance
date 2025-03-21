import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionList() {
  // Sample transaction data
  const transactions = [
    {
      id: "tx1",
      type: "incoming",
      description: "Salary Deposit",
      amount: "$3,500.00",
      date: "2025-03-15",
      status: "completed",
      counterparty: "Acme Inc.",
    },
    {
      id: "tx2",
      type: "outgoing",
      description: "Rent Payment",
      amount: "$1,200.00",
      date: "2025-03-10",
      status: "completed",
      counterparty: "Property Management LLC",
    },
    {
      id: "tx3",
      type: "outgoing",
      description: "Grocery Shopping",
      amount: "$85.75",
      date: "2025-03-08",
      status: "completed",
      counterparty: "Whole Foods Market",
    },
    {
      id: "tx4",
      type: "incoming",
      description: "Refund",
      amount: "$29.99",
      date: "2025-03-05",
      status: "completed",
      counterparty: "Amazon",
    },
    {
      id: "tx5",
      type: "outgoing",
      description: "Utility Bill",
      amount: "$142.50",
      date: "2025-03-01",
      status: "completed",
      counterparty: "City Power & Water",
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-2 ${
                    transaction.type === "incoming" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "incoming" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.counterparty} • {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className={`text-right ${transaction.type === "incoming" ? "text-green-600" : ""}`}>
                {transaction.type === "incoming" ? "+" : ""}
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

