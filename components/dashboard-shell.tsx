import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  )
}

