// Loading Messages
export const LOADING_MESSAGES = {
  MOVIES: "Loading amazing movies...",
  MOVIE_DETAILS: "Loading movie details...",
  SHOWS: "Loading available shows...",
  SEATS: "Loading seat layout...",
  PAYMENT: "Processing your payment...",
  GENERAL: "Please wait...",
};

// Error Messages
export const ERROR_MESSAGES = {
  // General Errors
  GENERAL: "Something went wrong. Please try again later.",
  NETWORK:
    "Unable to connect to the server. Please check your internet connection.",

  // Movie Errors
  MOVIES_FETCH: "Unable to fetch movies. Please try again later.",
  MOVIES_SEARCH: "Unable to search movies. Please try again.",
  MOVIE_NOT_FOUND: "Movie not found.",
  MOVIE_DETAILS_FETCH: "Unable to load movie details. Please try again.",

  // Show/Theatre Errors
  SHOWS_FETCH: "Unable to fetch shows. Please try again later.",
  NO_SHOWS_AVAILABLE: "No shows available for this movie at the moment.",

  // Seat Errors
  SEATS_FETCH: "Unable to load seat layout. Please try again.",
  SEAT_UNAVAILABLE: "Some selected seats are no longer available.",

  // Payment Errors
  PAYMENT_FAILED: "Payment failed. Please try again.",
  PAYMENT_CANCELLED: "Payment was cancelled.",

  // Rating Errors
  RATING_FAILED: "Unable to submit rating. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  RATING_SUBMITTED: "Thank you for rating!",
  PAYMENT_SUCCESS: "Payment successful! Your tickets are confirmed.",
  BOOKING_CONFIRMED: "Your booking has been confirmed!",
};

// Empty State Messages
export const EMPTY_MESSAGES = {
  NO_MOVIES: "No movies available at the moment.",
  NO_SHOWS: "No shows available for this movie.",
  NO_RESULTS: "No movies found matching your criteria.",
  NO_SEATS: "No seats available for this show.",
};

// Info Messages
export const INFO_MESSAGES = {
  MAX_TICKETS: "Maximum 10 tickets per booking",
  SELECT_SEATS: "Click on available seats to select them",
  PAYMENT_SECURE: "Your payment information is secure",
  FILTER_HINT: "Try adjusting your filters or search term",
};

// Button Labels
export const BUTTON_LABELS = {
  BOOK_NOW: "Book Now",
  VIEW_DETAILS: "View Details",
  TRY_AGAIN: "Try Again",
  RETRY: "Retry",
  CLEAR_FILTERS: "Clear Filters",
  SELECT_SEATS: "Select Seats",
  PROCEED_TO_PAYMENT: "Proceed to Payment",
  CONFIRM_BOOKING: "Confirm Booking",
  DOWNLOAD_TICKET: "Download Ticket",
  BACK_TO_HOME: "Back to Home",
  BACK_TO_MOVIES: "Back to Movies",
  SUBMIT_RATING: "Submit Rating",
  CANCEL: "Cancel",
};

// Page Titles
export const PAGE_TITLES = {
  HOME: "Welcome to iCinema",
  MOVIES: "Explore Movies",
  MOVIE_DETAILS: "Movie Details",
  SEAT_SELECTION: "Select Your Seats",
  PAYMENT: "Complete Payment",
  TICKET: "Your Ticket",
};

// Section Titles
export const SECTION_TITLES = {
  NOW_SHOWING: "Now Showing",
  DEALS: "Deals & Exclusives",
  THEATRE_EXPERIENCE: "Premium Experience",
  SELECT_SHOW: "Select Show",
  BOOKING_SUMMARY: "Booking Summary",
  PAYMENT_METHOD: "Payment Method",
};
