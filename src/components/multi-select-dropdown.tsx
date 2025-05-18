"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Базовый интерфейс для элементов с обязательными полями value и label
export interface BaseSelectItem {
  value: string;
  label: string;
}

// Интерфейс для пропсов функции renderSelectedItems с обобщенным типом T
export interface RenderSelectedItemsProps<T extends BaseSelectItem> {
  selectedItems: string[];
  items: T[];
  placeholder: string;
  label: string;
}

// Функция для рендеринга выбранных элементов с иконками
export function defaultRenderSelectedItems({ selectedItems, placeholder }: RenderSelectedItemsProps<BaseSelectItem>) {
  if (!selectedItems || selectedItems.length === 0) return placeholder;
  
  return (
    <div className="flex items-center gap-1">
      {selectedItems.join(", ")}
    </div>
  );
}

export function defaultRenderMenuItem({ item, selectedItems }: { item: BaseSelectItem, selectedItems: string[] }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox 
        checked={selectedItems.includes(item.value)}
      />
      <span>{item.label}</span>
    </div>
  );
}

export interface MultiSelectDropdownProps<T extends BaseSelectItem> {
  items: T[];
  defaultSelected?: string[];
  placeholder?: string;
  buttonClassName?: string;
  width?: string;
  onChange?: (selectedValues: string[]) => void;
  label?: string;
  customRenderSelectedItems?: (props: RenderSelectedItemsProps<T>) => React.ReactNode;
  customRenderMenuItem?: (props: { item: T, selectedItems: string[] }) => React.ReactNode;
}


export function MultiSelectDropdown<T extends BaseSelectItem>({
  items = [],
  defaultSelected = [],
  placeholder = "Select items...",
  buttonClassName,
  width = "200px",
  onChange,
  label = "Platforms",
  customRenderSelectedItems,
  customRenderMenuItem
}: MultiSelectDropdownProps<T>) {
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

  // Используем кастомный рендеринг выбранных элементов или стандартный
  const renderSelectedItems = customRenderSelectedItems || defaultRenderSelectedItems;
  const renderMenuItem = customRenderMenuItem || defaultRenderMenuItem;

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
            {renderSelectedItems({ selectedItems, items, placeholder, label })}
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
            <Checkbox 
              checked={selectedItems.length === items.length}
              className="mr-2"
            />
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
              {renderMenuItem({ item, selectedItems })}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
