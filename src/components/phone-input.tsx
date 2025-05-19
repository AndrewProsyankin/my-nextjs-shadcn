"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { CountryCodeSelect } from "@/components/country-code-select"
import { CountryCode } from "@/data/country-codes"

export interface PhoneInputProps {
  countries: CountryCode[]
  value?: string
  onChange?: (value: string, countryCode?: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  defaultCountry?: string
}

export function PhoneInput({
  countries,
  value = "",
  onChange,
  placeholder = "Phone number",
  disabled = false,
  className,
  defaultCountry = "US"
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = React.useState(defaultCountry)
  const [phoneNumber, setPhoneNumber] = React.useState(value)

  // Get the dial code for the selected country
  const dialCode = React.useMemo(() => {
    const country = countries.find(c => c.code === selectedCountry)
    return country?.dialCode || ""
  }, [countries, selectedCountry])

  // Handle country code change
  const handleCountryChange = (code: string) => {
    setSelectedCountry(code)
    onChange?.(phoneNumber, code)
  }

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setPhoneNumber(newValue)
    onChange?.(newValue, selectedCountry)
  }

  return (
    <div className={`flex ${className}`}>
      <CountryCodeSelect
        countries={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        disabled={disabled}
        className="w-[120px] min-w-[120px]"
        buttonClassName="rounded-r-none border-r-0 w-full"
      />
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        className="rounded-l-none flex-1"
      />
    </div>
  )
}
