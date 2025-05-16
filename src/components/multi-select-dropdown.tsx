"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
]

export function MultiSelectDropdown() {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {selectedItems && selectedItems.length > 0 ? `${selectedItems.length} selected` : "Select items..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
          </CommandList>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => toggleAll()}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedItems && selectedItems.length === items.length ? "opacity-100" : "opacity-0",
                  )}
                />
                {selectedItems && selectedItems.length === items.length ? "Deselect All" : "Select All"}
              </CommandItem>
              {items.map((item) => (
                <CommandItem key={item.value} onSelect={() => toggleItem(item.value)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItems && selectedItems.includes(item.value) ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
