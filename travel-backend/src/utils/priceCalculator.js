/**
 * Calculate total price for a booking
 */
export const calculateTotalPrice = (pricePerPerson, numTravelers) => {
  return Number((pricePerPerson * numTravelers).toFixed(2));
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export default {
  calculateTotalPrice,
  formatCurrency,
};
