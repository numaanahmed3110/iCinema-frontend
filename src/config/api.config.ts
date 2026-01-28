// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
  ENDPOINTS: {
    MOVIES: {
      ALL: "/movies/allMovies",
      BY_ID: (id: string | number) => `/movies/${id}`,
      SEARCH: "/movies/search",
      FILTER: "/movies/filter",
    },
    SEATING: {
      BY_MOVIE: (movieId: string | number) => `/api/seating/movie/${movieId}`,
      BY_SHOW: (showId: string | number) => `/api/seating/show/${showId}/seats`,
      PRICING: (showId: string | number) =>
        `/api/seating/show/${showId}/pricing`,
    },
    PAYMENT: {
      PAY: "/api/payment/pay",
    },
    RATING: {
      RATE: "/api/rating/rate",
    },
  },
};

// Build full URL helper
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || "iCinema",
  MAX_TICKETS_PER_BOOKING: parseInt(
    process.env.REACT_APP_MAX_TICKETS_PER_BOOKING || "10",
  ),
  MOVIES_PER_PAGE: parseInt(process.env.REACT_APP_MOVIES_PER_PAGE || "8"),
};
