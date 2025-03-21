"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, RefreshCw } from "lucide-react"

interface SessionTimerProps {
  timeout: number // in minutes
  onTimeout: () => void
}

export function SessionTimer({ timeout, onTimeout }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeout * 60) // convert to seconds
  const [showTimer, setShowTimer] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const totalTime = timeout * 60
    let timer: NodeJS.Timeout

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1
          setProgress((newTime / totalTime) * 100)
          return newTime
        })
      }, 1000)
    } else {
      onTimeout()
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeLeft, timeout, onTimeout])

  // Show warning when 20% of time is left
  useEffect(() => {
    if (timeLeft <= timeout * 60 * 0.2) {
      setShowTimer(true)
    }
  }, [timeLeft, timeout])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const extendSession = () => {
    setTimeLeft(timeout * 60)
    setProgress(100)
    setShowTimer(false)
  }

  if (!showTimer) {
    return (
      <Button variant="outline" size="sm" className="opacity-70 hover:opacity-100" onClick={() => setShowTimer(true)}>
        <Clock className="h-4 w-4 mr-1" />
        {formatTime(timeLeft)}
      </Button>
    )
  }

  return (
    <Card className="w-64 shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              <span className="text-sm font-medium">Session Timeout</span>
            </div>
            <span className="text-sm font-bold">{formatTime(timeLeft)}</span>
          </div>

          <Progress value={progress} className={`h-2 ${progress <= 20 ? "bg-red-200" : "bg-muted"}`} />

          <p className="text-xs text-muted-foreground">Your session will expire soon due to inactivity.</p>

          <div className="flex justify-between pt-1">
            <Button variant="ghost" size="sm" onClick={() => setShowTimer(false)}>
              Hide
            </Button>
            <Button size="sm" onClick={extendSession}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Extend
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

