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
  emptyMessage?: string
  disabled?: boolean
  className?: string
  buttonClassName?: string
}

export function CountryCodeSelect({
  countries,
  value,
  onChange,
  placeholder = "Select country",
  emptyMessage = "No country found.",
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

  // Map for handling different variations of country name prefixes
  const countryPairsMap: Record<string, string> = {
    '^(st|saint)\\.?\\s?': '^(st|saint)\\s?',
  };

  // Function to match the start of words with special handling for variations
  const matchStart = React.useCallback((term: string, text: string): boolean => {
    let regexPattern = term;

    for (const key in countryPairsMap) {
      if (new RegExp(key, 'ig').test(term)) {
        term = term.replace(new RegExp(key, 'ig'), '');
        regexPattern = countryPairsMap[key] + term;
      }
    }

    return new RegExp(`(^|\\s)${regexPattern}`, 'ig').test(text);
  }, []);

  // Enhanced filter function for country search
  const filter = React.useCallback((value: string, search: string) => {
    if (!search.trim()) return 1;
    
    const item = countries.find(c => c.code === value);
    if (!item) return 0;
    
    const searchLower = search.toLowerCase();
    const nameLower = item.name.toLowerCase();
    const dialCode = item.dialCode;
    const code = item.code.toLowerCase();
    
    // Exact matches get highest priority
    if (nameLower === searchLower || code === searchLower || dialCode === searchLower) {
      return 2;
    }
    
    // Check if search term is at the start of the country name
    if (matchStart(searchLower, nameLower)) {
      return 1.5;
    }
    
    // Check if search term is contained anywhere in the country data
    if (nameLower.includes(searchLower) || 
        code.includes(searchLower) || 
        dialCode.includes(searchLower)) {
      return 1;
    }
    
    return 0;
  }, [countries, matchStart])

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
                <span className="text-sm">{selectedCountry.code}</span>
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
        <PopoverContent className="p-0 min-w-[220px] w-full" align="start" side="bottom">
          <Command value={selectedCode} filter={filter}>
            <div className="border-b">
              <CommandInput
                placeholder="Search country..."
                className="h-9 border-0 focus:ring-0 focus-visible:outline-none"
              />
            </div>
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => handleSelect(country.code)}
                    className="flex items-center py-2 px-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
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
