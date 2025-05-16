"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define platform items with icons
const items = [
  { value: "mt4", label: "Meta Trader 4", icon: "🔵" },
  { value: "mt5", label: "Meta Trader 5", icon: "🟡" },
  { value: "rst", label: "R Stock Trader", icon: "🟦" },
]

export function MultiSelectDropdown() {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<string[]>(["mt4", "mt5", "rst"]) // Default selected items

  const toggleItem = (item: string) => {
    if (!item) return

    setSelectedItems((current) => {
      // Ensure current is an array
      const currentArray = Array.isArray(current) ? current : []

      return currentArray.includes(item) ? currentArray.filter((i) => i !== item) : [...currentArray, item]
    })
  }

  const toggleAll = () => {
    setSelectedItems((current) => {
      // Ensure current is an array
      const currentArray = Array.isArray(current) ? current : []

      return currentArray.length === items.length ? [] : items.map((item) => item.value)
    })
  }

  // Function to render selected items with icons
  const renderSelectedItems = () => {
    if (!selectedItems || selectedItems.length === 0) return "Select platforms..."
    
    return (
      <div className="flex items-center gap-1">
        <span className="mr-1">Platforms</span>
        {selectedItems.map((value) => {
          const item = items.find((i) => i.value === value)
          return item ? <span key={value}>{item.icon}</span> : null
        })}
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          className="w-[200px] justify-between text-sm font-normal"
        >
          {renderSelectedItems()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No platforms found.</CommandEmpty>
          </CommandList>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => toggleAll()} className="justify-start text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 flex items-center justify-center">
                    <Check
                      className={cn(
                        "h-3 w-3",
                        selectedItems && selectedItems.length === items.length ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                  <span>All</span>
                </div>
              </CommandItem>
              {items.map((item) => (
                <CommandItem key={item.value} onSelect={() => toggleItem(item.value)} className="justify-start text-sm">
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center">
                      <Check
                        className={cn(
                          "h-3 w-3",
                          selectedItems && selectedItems.includes(item.value) ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </div>
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
