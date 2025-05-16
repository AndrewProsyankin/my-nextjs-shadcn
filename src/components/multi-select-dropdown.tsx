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
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            role="combobox" 
            aria-expanded={open} 
            className="w-[200px] justify-between text-sm font-normal h-8 px-3 py-1"
            onClick={() => setOpen(!open)}
          >
            {renderSelectedItems()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[200px] p-0 shadow-md border border-gray-200 rounded-md" 
          align="start"
          sideOffset={5}
        >
          <div className="rounded-md overflow-hidden">
            <div className="max-h-[300px] overflow-auto">
              <div className="p-1">
                <div 
                  className="flex items-center w-full px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => toggleAll()}
                >
                  <div className="mr-2 h-4 w-4 flex items-center justify-center border border-gray-300 rounded-sm">
                    {selectedItems.length === items.length && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  <span>All</span>
                </div>
                {items.map((item) => (
                  <div 
                    key={item.value} 
                    className="flex items-center w-full px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100 rounded"
                    onClick={() => toggleItem(item.value)}
                  >
                    <div className="mr-2 h-4 w-4 flex items-center justify-center border border-gray-300 rounded-sm">
                      {selectedItems.includes(item.value) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
