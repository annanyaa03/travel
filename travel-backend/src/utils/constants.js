export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const DESTINATION_CATEGORIES = [
  'beach',
  'mountain',
  'city',
  'adventure',
  'cultural',
];

export const NOTIFICATION_TYPES = {
  BOOKING: 'booking',
  PAYMENT: 'payment',
  SYSTEM: 'system',
  PROMO: 'promo',
};

export const ANALYTICS_EVENTS = {
  VIEW_DESTINATION: 'view_destination',
  SEARCH: 'search',
  BOOKING_CREATED: 'booking_created',
  PAYMENT_SUCCESS: 'payment_success',
  USER_REGISTERED: 'user_registered',
  USER_LOGIN: 'user_login',
};
