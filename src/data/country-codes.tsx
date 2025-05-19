import React from "react";

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸"
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧"
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪"
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷"
  },
  {
    code: "IT",
    name: "Italy",
    dialCode: "+39",
    flag: "🇮🇹"
  },
  {
    code: "ES",
    name: "Spain",
    dialCode: "+34",
    flag: "🇪🇸"
  },
  {
    code: "RU",
    name: "Russia",
    dialCode: "+7",
    flag: "🇷🇺"
  },
  {
    code: "CN",
    name: "China",
    dialCode: "+86",
    flag: "🇨🇳"
  },
  {
    code: "JP",
    name: "Japan",
    dialCode: "+81",
    flag: "🇯🇵"
  },
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳"
  },
  {
    code: "BR",
    name: "Brazil",
    dialCode: "+55",
    flag: "🇧🇷"
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦"
  },
  // Примеры для проверки улучшенного поиска с вариациями названий Saint/St
  {
    code: "LC",
    name: "Saint Lucia",
    dialCode: "+1758",
    flag: "🇱🇨"
  },
  {
    code: "VC",
    name: "St. Vincent and the Grenadines",
    dialCode: "+1784",
    flag: "🇻🇨"
  },
  {
    code: "KN",
    name: "St Kitts and Nevis",
    dialCode: "+1869",
    flag: "🇰🇳"
  },
  // Другие примеры для проверки поиска
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿"
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦"
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    dialCode: "+971",
    flag: "🇦🇪"
  },
  {
    code: "KR",
    name: "South Korea",
    dialCode: "+82",
    flag: "🇰🇷"
  }
];
