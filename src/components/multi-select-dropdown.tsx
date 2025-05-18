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
      <div className="relative w-4 h-4 flex items-center justify-center">
        <div className={`w-4 h-4 rounded border ${selectedItems.includes(item.value) ? 'bg-[#2196F3] border-[#2196F3]' : 'border-gray-300'}`}></div>
        {selectedItems.includes(item.value) && (
          <svg className="h-3 w-3 absolute text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
            </div>
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
  const renderSelectedItemsContent = () => {
    if (customRenderSelectedItems) {
      return customRenderSelectedItems({ selectedItems, items, placeholder, label });
    }
    return defaultRenderSelectedItems({ selectedItems, items, placeholder, label });
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
            {renderSelectedItemsContent()}
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
              {customRenderMenuItem ? customRenderMenuItem({ item, selectedItems }) : defaultRenderMenuItem({ item, selectedItems })}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
