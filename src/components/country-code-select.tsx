"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CountryCode } from "@/data/country-codes"

export interface CountryCodeSelectProps {
  countries: CountryCode[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
}

export function CountryCodeSelect({
  countries,
  value,
  onChange,
  placeholder = "Select country",
  disabled = false,
  className,
  buttonClassName,
}: CountryCodeSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedCode, setSelectedCode] = React.useState<string | undefined>(value)

  // Find the selected country
  const selectedCountry = React.useMemo(() => {
    return countries.find((country) => country.code === selectedCode)
  }, [countries, selectedCode])

  // Handle selection change
  const handleSelect = React.useCallback((code: string) => {
    setSelectedCode(code)
    onChange?.(code)
    setOpen(false)
  }, [onChange])

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "flex justify-between items-center h-9 w-[180px] text-sm font-normal bg-white border-gray-300 hover:bg-gray-50",
              buttonClassName
            )}
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedCountry.flag}</span>
                <span>{selectedCountry.dialCode}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {open ? (
              <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[220px]">
          <Command value={selectedCode}>
            <div className="border-b">
              <CommandInput
                placeholder="Search country..."
                className="h-9 border-0 focus:ring-0 focus-visible:outline-none"
              />
            </div>
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleSelect(country.code)}
                    className="flex items-center py-2 px-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-base">{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="text-gray-500 ml-auto">{country.dialCode}</span>
                    </div>
                    {selectedCode === country.code && (
                      <Check className="h-4 w-4 text-[#1976D2]" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
