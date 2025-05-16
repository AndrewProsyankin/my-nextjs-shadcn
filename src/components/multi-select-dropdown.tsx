"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Define platform items with custom icons to match the reference design
const items = [
  { value: "mt4", label: "Meta Trader 4", icon: (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" fill="#1E88E5" stroke="#1E88E5" strokeWidth="0.5"/>
        <path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) },
  { value: "mt5", label: "Meta Trader 5", icon: (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="6" fill="#FFC107" stroke="#FFC107" strokeWidth="0.5"/>
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

  const toggleItem = (item: string, event?: React.MouseEvent) => {
    if (!item) return
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setSelectedItems((current) => {
      // Ensure current is an array
      const currentArray = Array.isArray(current) ? current : []

      return currentArray.includes(item) ? currentArray.filter((i) => i !== item) : [...currentArray, item]
    })
  }

  const toggleAll = (event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    
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

  // Custom checkbox component
  const CustomCheckbox = ({ checked }: { checked: boolean }) => (
    <div className="relative mr-2 w-4 h-4 flex items-center justify-center">
      <div className={`w-4 h-4 rounded border ${checked ? 'bg-[#2196F3] border-[#2196F3]' : 'border-gray-300'}`}></div>
      {checked && (
        <svg className="h-3 w-3 absolute text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            role="combobox" 
            aria-expanded={open} 
            className="w-[200px] justify-between text-sm font-normal h-9 px-3 py-2 bg-white border-gray-300 hover:bg-gray-50"
          >
            {renderSelectedItems()}
            {open ? (
              <ChevronUp className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-[200px] p-2 shadow-md border border-gray-200 rounded-md bg-white max-h-[300px] overflow-auto" 
          align="start"
          sideOffset={5}
          onCloseAutoFocus={(e) => e.preventDefault()} // Prevent focus on close
        >
          {/* All option */}
          <DropdownMenuItem 
            className="flex items-center px-2 py-1.5 cursor-pointer"
            onSelect={(e) => {
              e.preventDefault();
              toggleAll();
            }}
          >
            <div className="relative mr-2 w-4 h-4 flex items-center justify-center">
              <div className={`w-4 h-4 rounded border ${selectedItems.length === items.length ? 'bg-[#2196F3] border-[#2196F3]' : 'border-gray-300'}`}></div>
              {selectedItems.length === items.length && (
                <svg className="h-3 w-3 absolute text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="flex-1">All</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-1" />
          
          {/* Individual items */}
          {items.map((item) => (
            <DropdownMenuItem 
              key={item.value} 
              className="flex items-center px-2 py-1.5 cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                toggleItem(item.value);
              }}
            >
              <div className="relative mr-2 w-4 h-4 flex items-center justify-center">
                <div className={`w-4 h-4 rounded border ${selectedItems.includes(item.value) ? 'bg-[#2196F3] border-[#2196F3]' : 'border-gray-300'}`}></div>
                {selectedItems.includes(item.value) && (
                  <svg className="h-3 w-3 absolute text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="mr-2 flex items-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
