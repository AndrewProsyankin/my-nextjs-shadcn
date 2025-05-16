"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Define platform items with custom icons to match the reference design
const items = [
  { value: "mt4", label: "Meta Trader 4", icon: (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#29B6F6" stroke="#29B6F6" strokeWidth="0.5"/>
        <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) },
  { value: "mt5", label: "Meta Trader 5", icon: (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#FDD835" stroke="#FDD835" strokeWidth="0.5"/>
        <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) },
  { value: "rst", label: "R Stock Trader", icon: (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2H14V14H2V2Z" fill="#1E88E5" stroke="#1E88E5" strokeWidth="0.5"/>
        <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) }
];

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
        <span className="mr-1 text-gray-700">Platforms</span>
        {selectedItems.map((value) => {
          const item = items.find((i) => i.value === value)
          return item ? <span key={value} className="flex items-center">{item.icon}</span> : null
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
            className="w-[200px] justify-between text-sm font-normal h-9 px-3 py-2 bg-white border-gray-300 hover:bg-gray-50"
            onClick={() => setOpen(!open)}
          >
            {renderSelectedItems()}
            {open ? (
              <ChevronUp className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[200px] p-0 shadow-md border border-gray-200 rounded-md bg-white" 
          align="start"
          sideOffset={5}
        >
          <div className="rounded-md overflow-hidden">
            <div className="max-h-[300px] overflow-auto">
              <div className="p-1">
                <div 
                  className="flex items-center w-full px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded"
                  onClick={() => toggleAll()}
                >
                  <Checkbox 
                    className="mr-2 h-4 w-4 rounded-sm border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    checked={selectedItems.length === items.length}
                    id="select-all"
                  />
                  <label htmlFor="select-all" className="cursor-pointer flex-1">All</label>
                </div>
                {items.map((item) => (
                  <div 
                    key={item.value} 
                    className="flex items-center w-full px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded"
                    onClick={() => toggleItem(item.value)}
                  >
                    <Checkbox 
                      className="mr-2 h-4 w-4 rounded-sm border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      checked={selectedItems.includes(item.value)}
                      id={`select-${item.value}`}
                    />
                    <span className="mr-2 flex items-center">{item.icon}</span>
                    <label htmlFor={`select-${item.value}`} className="cursor-pointer flex-1">{item.label}</label>
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
