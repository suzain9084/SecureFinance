"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface NoAutofillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function NoAutofillInput({ value, onChange, ...props }: NoAutofillInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPasting, setIsPasting] = useState(false)

  // Prevent paste operations
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    setIsPasting(true)
    setTimeout(() => setIsPasting(false), 1000)
  }

  // Prevent drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Prevent autofill by using a random name attribute
  useEffect(() => {
    if (inputRef.current) {
      const randomName = `field_${Math.random().toString(36).substring(2, 15)}`
      inputRef.current.setAttribute("name", randomName)
      inputRef.current.setAttribute("autocomplete", "off")
    }
  }, [])

  return (
    <>
      {isPasting && (
        <div className="text-xs text-red-500 mb-1">
          Pasting is not allowed for security reasons. Please type manually.
        </div>
      )}
      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        onPaste={handlePaste}
        onDrop={handleDrop}
        autoComplete="new-password"
        {...props}
      />
    </>
  )
}

