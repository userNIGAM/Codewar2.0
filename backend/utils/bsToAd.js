// Convert Bikram Sambat (BS) date to Gregorian (AD) date
// BS is approximately 56.7 years ahead of AD
export const bsToAd = (bsYear, bsMonth, bsDate) => {
  // Approximate conversion: BS year is about 56-57 years ahead
  // This uses the standard conversion formula
  
  const adYear = bsYear - 56;
  
  // Create a date object with the approximate AD values
  // Note: This is simplified - for production, consider using a library like nepali-date-converter
  let adDate = new Date(adYear, bsMonth - 1, bsDate);
  
  // Adjust for the more accurate offset (BS is roughly 56 years 8.5 months ahead)
  // Add approximately 20,000 days (which is roughly 56.7 years)
  adDate = new Date(adDate.getTime() + (20441 * 24 * 60 * 60 * 1000));
  
  return adDate;
};

// Convert Gregorian (AD) date to Bikram Sambat (BS) date
export const adToBs = (adYear, adMonth, adDate) => {
  const bsYear = adYear + 56;
  
  let bsDate = new Date(adYear, adMonth - 1, adDate);
  bsDate = new Date(bsDate.getTime() - (20441 * 24 * 60 * 60 * 1000));
  
  return {
    year: bsYear,
    month: bsDate.getMonth() + 1,
    date: bsDate.getDate(),
  };
};
