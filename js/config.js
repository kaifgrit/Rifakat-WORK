// js/config.js

const config = {
  /**
   * The base URL for the API.
   * It automatically switches between a local development server
   * and a placeholder production URL based on the browser's hostname.
   */
  API_URL:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000/api"
      : "https://your-production-backend-url.com/api",
};
