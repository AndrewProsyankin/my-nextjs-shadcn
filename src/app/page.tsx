"use client";

import { MultiSelectDropdown, MultiSelectItem } from "@/components/multi-select-dropdown";
import { TRADING_PLATFORMS } from "@/data/trading-platforms";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, X } from "lucide-react";

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
        
        {/* Вариант с кастомным рендерингом используя render props */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Вариант с render props</h2>
          <MultiSelectDropdown 
            items={TRADING_PLATFORMS}
            defaultSelected={["mt4", "mt5"]}
            onChange={handleChange}
            width="100%"
            label="Платформы"
            // renderTrigger={({ selectedItems, items, isOpen }) => (
            //   <div className="flex items-center justify-between w-full p-2 border rounded-md bg-white hover:bg-gray-50 cursor-pointer">
            //     <div className="flex items-center gap-2">
            //       <span className="font-medium">Платформы:</span>
            //       <span className="text-sm text-muted-foreground">
            //         {selectedItems.length > 0 
            //           ? `Выбрано ${selectedItems.length}` 
            //           : "Выберите платформы"}
            //       </span>
            //     </div>
            //     <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            //   </div>
            // )}
            renderSelectedItems={({ selectedItems, getItemLabel, removeItem }) => (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedItems.map(value => (
                  <div 
                    key={value}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs"
                  >
                    <span>{getItemLabel(value)}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-blue-600" 
                      onClick={() => removeItem(value)}
                    />
                  </div>
                ))}
              </div>
            )}
            renderItem={({ item, isSelected, onSelect }) => (
              <div 
                className={`flex items-center gap-2 p-2 rounded ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`}
                onClick={onSelect}
              >
                <div className={`w-4 h-4 flex items-center justify-center rounded ${isSelected ? 'bg-blue-500' : 'border border-gray-300'}`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </div>
            )}
            renderAllOption={({ isSelected, onSelect }) => (
              <div 
                className={`flex items-center gap-2 p-2 rounded ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer font-medium`}
                onClick={onSelect}
              >
                <div className={`w-4 h-4 flex items-center justify-center rounded ${isSelected ? 'bg-blue-500' : 'border border-gray-300'}`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <span>Все платформы</span>
              </div>
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
