import React from "react";

// Предопределенные платформы для примера
export const TRADING_PLATFORMS = [
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
