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
  }
];
