"use client"

import React from "react"
import { CountryCodeSelect } from "@/components/country-code-select"
import { PhoneInput } from "@/components/phone-input"
import { COUNTRY_CODES } from "@/data/country-codes"

export default function CountryCodesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Country Code Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Country Code Select */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Basic Country Code Select</h2>
          <div className="mb-2">
            <CountryCodeSelect 
              countries={COUNTRY_CODES} 
              value="US"
              className="w-full"
              buttonClassName="w-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Basic example of country code selection with default US selected
          </p>
        </div>

        {/* Phone Input with Country Code */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Phone Input with Country Code</h2>
          <div className="mb-2">
            <PhoneInput 
              countries={COUNTRY_CODES} 
              defaultCountry="US"
              placeholder="Enter phone number"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Phone input with integrated country code selection
          </p>
        </div>

        {/* Popular Countries */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Popular Countries</h2>
          <div className="grid grid-cols-2 gap-4">
            {COUNTRY_CODES
              .filter(country => ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'RU'].includes(country.code))
              .map(country => (
                <div key={country.code} className="flex items-center p-2 border rounded">
                  <span className="text-xl mr-2">{country.flag}</span>
                  <div>
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-gray-500">{country.dialCode}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Custom Styling */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Custom Styling</h2>
          <div className="mb-2">
            <CountryCodeSelect 
              countries={COUNTRY_CODES} 
              value="FR"
              className="w-full"
              buttonClassName="w-full bg-blue-50 border-blue-200 hover:bg-blue-100"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Country code selection with custom styling
          </p>
        </div>
      </div>

      {/* Additional Examples */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Additional Examples</h2>
        
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Country Code List</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRY_CODES.slice(0, 12).map(country => (
              <div key={country.code} className="flex items-center p-2 border rounded">
                <span className="text-xl mr-2">{country.flag}</span>
                <div>
                  <div className="font-medium">{country.name}</div>
                  <div className="text-sm text-gray-500">{country.dialCode}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Showing 12 of {COUNTRY_CODES.length} countries
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
