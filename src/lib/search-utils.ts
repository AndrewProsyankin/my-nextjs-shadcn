import { CountryCode } from "@/data/country-codes";

// Map for handling different variations of country name prefixes
const countryPairsMap: Record<string, string> = {
  '^(st|saint)\\.?\\s?': '^(st|saint)\\s?',
};

/**
 * Matches the start of words with special handling for variations
 * @param term Search term
 * @param text Text to search in
 * @returns Boolean indicating if there's a match
 */
export const matchStart = (term: string, text: string): boolean => {
  let regexPattern = term;

  for (const key in countryPairsMap) {
    if (new RegExp(key, 'ig').test(term)) {
      term = term.replace(new RegExp(key, 'ig'), '');
      regexPattern = countryPairsMap[key] + term;
    }
  }

  return new RegExp(`(^|\\s)${regexPattern}`, 'ig').test(text);
};

/**
 * Enhanced filter function for country search
 * @param countries Array of country codes
 * @param value Country code value
 * @param search Search term
 * @returns Score indicating match quality (0 = no match, 2 = exact match)
 */
export const filterCountries = (
  countries: CountryCode[],
  value: string,
  search: string
): number => {
  if (!search.trim()) return 1;
  
  const item = countries.find(c => c.code === value);
  if (!item) return 0;
  
  const searchLower = search.toLowerCase();
  const nameLower = item.name.toLowerCase();
  const dialCode = item.dialCode;
  const code = item.code.toLowerCase();
  
  // Exact matches get highest priority
  if (nameLower === searchLower || code === searchLower || dialCode === searchLower) {
    return 2;
  }
  
  // Check if search term is at the start of the country name
  if (matchStart(searchLower, nameLower)) {
    return 1.5;
  }
  
  // Check if search term is contained anywhere in the country data
  if (nameLower.includes(searchLower) || 
      code.includes(searchLower) || 
      dialCode.includes(searchLower)) {
    return 1;
  }
  
  return 0;
};
