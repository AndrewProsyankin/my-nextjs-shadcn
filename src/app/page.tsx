"use client";

import { MultiSelectDropdown } from "@/components/multi-select-dropdown";
import { TRADING_PLATFORMS } from "@/data/trading-platforms";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  // Обработчик изменения выбранных элементов
  const handleChange = (selected: string[]) => {
    console.log("Selected items:", selected);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-6">Multi-Select Dropdown</h1>
        <p className="text-muted-foreground mb-6">Выберите несколько элементов из списка</p>
        
        {/* Стандартный вариант */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Стандартный вариант</h2>
          <MultiSelectDropdown 
            items={TRADING_PLATFORMS}
            defaultSelected={["mt4", "mt5", "rst"]}
            onChange={handleChange}
          />
        </div>

        {/* Стандартный вариант */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Стандартный вариант</h2>
          <MultiSelectDropdown 
            items={TRADING_PLATFORMS}
            defaultSelected={["mt4", "mt5", "rst"]}
            onChange={handleChange}
            customRenderSelectedItems={({ selectedItems, items, placeholder, label }) => {
              if (!selectedItems || selectedItems.length === 0) return placeholder;
              
              return (
                <div className="flex items-center gap-1">
                  <span className="mr-1 text-gray-700">{label}</span>
                  {selectedItems.map((value) => {
                    const item = items.find((i) => i.value === value);
                    return item ? <span key={value} className="flex items-center">{item.icon}</span> : null;
                  })}
                </div>
              );
            }}
          />
        </div>
        
        {/* Вариант с кастомным рендерингом используя render props */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Вариант с render props</h2>
          <MultiSelectDropdown 
            items={TRADING_PLATFORMS}
            defaultSelected={["mt4", "mt5"]}
            onChange={handleChange}
            width="100%"
            label="Платформы"
            customRenderSelectedItems={({ selectedItems, items, placeholder, label }) => {
              if (!selectedItems || selectedItems.length === 0) return placeholder;
              
              return (
                <div className="flex flex-wrap items-center gap-1">
                  {selectedItems.map(itemValue => {
                    const item = items.find(i => i.value === itemValue);
                    return (
                      <div key={itemValue} className="px-3 h-7 flex items-center rounded-full bg-gray-100 text-gray-700 text-sm border border-gray-200">
                        {item?.label || itemValue}
                      </div>
                    );
                  })}
                </div>
              );
            }}
            customRenderMenuItem={({ item, selectedItems }) => (
              <>
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <Checkbox 
                  checked={selectedItems.includes(item.value)}
                />
              </div>
              <span className="mr-2 flex items-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              </>
            )}
          />
        </div>
        
        {/* Кастомный вариант без использования компонента */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Кастомный вариант</h2>
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <div className="text-blue-800 font-medium mb-2">Трейдинговые платформы</div>
            <div className="flex flex-wrap gap-2">
              {TRADING_PLATFORMS.map(platform => (
                <div 
                  key={platform.value}
                  className="flex items-center gap-2 bg-white border border-blue-200 rounded-full px-3 py-1 cursor-pointer hover:bg-blue-100"
                  onClick={() => console.log(`Выбрана платформа: ${platform.label}`)}
                >
                  <span className="flex items-center">{platform.icon}</span>
                  <span className="font-medium">{platform.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
