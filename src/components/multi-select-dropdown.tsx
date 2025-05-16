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

export interface MultiSelectItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MultiSelectDropdownProps {
  items: MultiSelectItem[];
  defaultSelected?: string[];
  placeholder?: string;
  buttonClassName?: string;
  width?: string;
  onChange?: (selectedValues: string[]) => void;
  label?: string;
}



export function MultiSelectDropdown({
  items = [],
  defaultSelected = [],
  placeholder = "Select items...",
  buttonClassName,
  width = "200px",
  onChange,
  label = "Platforms"
}: MultiSelectDropdownProps) {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(defaultSelected)

  const toggleItem = (item: string, event?: React.MouseEvent) => {
    if (!item) return
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setSelectedItems((current) => {
      // Ensure current is an array
      const currentArray = Array.isArray(current) ? current : []
      const newItems = currentArray.includes(item) 
        ? currentArray.filter((i) => i !== item) 
        : [...currentArray, item]
      
      // Вызываем callback, если он предоставлен
      if (onChange) {
        onChange(newItems)
      }
      
      return newItems
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
      const newItems = currentArray.length === items.length 
        ? [] 
        : items.map((item) => item.value)
      
      // Вызываем callback, если он предоставлен
      if (onChange) {
        onChange(newItems)
      }
      
      return newItems
    })
  }

  // Function to render selected items with icons
  const renderSelectedItems = () => {
    if (!selectedItems || selectedItems.length === 0) return placeholder
    
    return (
      <div className="flex items-center gap-1">
        <span className="mr-1 text-gray-700">{label}</span>
        {selectedItems.map((value) => {
          const item = items.find((i) => i.value === value)
          return item?.icon ? <span key={value} className="flex items-center">{item.icon}</span> : null
        })}
      </div>
    )
  }

  // Используем состояние для отслеживания открытия/закрытия меню
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            role="combobox" 
            aria-expanded={open} 
            className={cn(`justify-between text-sm font-normal h-9 px-3 py-2 bg-white border-gray-300 hover:bg-gray-50`, `w-[${width}]`, buttonClassName)}
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
