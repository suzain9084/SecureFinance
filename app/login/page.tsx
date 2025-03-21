"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, RefreshCw } from "lucide-react"
import { CaptchaVerification } from "@/components/captcha-verification"
import { NoAutofillInput } from "@/components/no-autofill-input"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if session expired from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("expired") === "true") {
      setSessionExpired(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!captchaVerified) {
      setShowAlert(true)
      setLoading(false)
      return
    }

    // Simulate login attempt check
    setLoginAttempts((prev) => prev + 1)

    if (loginAttempts >= 2) {
      // Simulate flagging for suspicious activity
      setShowAlert(true)
      setLoading(false)
      return
    }

    // Simulate successful login
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        {sessionExpired && (
          <Alert className="mb-4 border-amber-500 bg-amber-50 text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>Your session has expired for security reasons. Please log in again.</AlertDescription>
          </Alert>
        )}

        {showAlert && (
          <Alert className="mb-4 border-red-500 bg-red-50 text-red-900">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription>
              {!captchaVerified
                ? "Please complete the human verification."
                : "Multiple login attempts detected. Your account has been flagged for security."}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <NoAutofillInput
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <NoAutofillInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <CaptchaVerification onVerify={() => setCaptchaVerified(true)} />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                Register
              </Link>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              By logging in, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

