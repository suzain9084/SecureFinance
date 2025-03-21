"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"

interface CaptchaVerificationProps {
  onVerify: () => void
}

export function CaptchaVerification({ onVerify }: CaptchaVerificationProps) {
  const [showChallenge, setShowChallenge] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const handleCheckboxClick = () => {  [setSelectedImages] = useState<number[]>([])
  
  const handleCheckboxClick = () => {
    if (verified) return
    setShowChallenge(true)
  }
  
  const handleImageClick = (index: number) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter(i => i !== index))
    } else {
      setSelectedImages([...selectedImages, index])
    }
  }
  
  const handleVerify = () => {
    setLoading(true)
    
    // Simulate verification process
    setTimeout(() => {
      setVerified(true)
      setShowChallenge(false)
      setLoading(false)
      onVerify()
    }, 1500)
  }
  
  return (
    <div className="space-y-4">
      {!verified ? (
        <div className="flex items-center space-x-2">
          <Checkbox id="captcha" onClick={handleCheckboxClick} />
          <Label htmlFor="captcha">I'm not a robot</Label>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-green-600 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>Verification complete</span>
        </div>
      )}
      
      {showChallenge && !verified && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="text-sm font-medium">
              Select all images with traffic lights
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer rounded-md border ${
                    selectedImages.includes(index) ? "border-primary ring-2 ring-primary" : "border-muted"
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                    Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setShowChallenge(false)}>
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleVerify} 
                disabled={selectedImages.length === 0 || loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
}