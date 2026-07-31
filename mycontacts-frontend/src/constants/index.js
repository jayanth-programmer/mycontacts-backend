export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  CONTACTS: "/contacts",
  CONTACT_NEW: "/contacts/new",
  CONTACT_DETAILS: "/contacts/:id",
  CONTACT_EDIT: "/contacts/:id/edit",
  PROFILE: "/profile",
  SETTINGS: "/settings",
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const TOAST_DURATION = 4000;

export const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "date-newest", label: "Newest First" },
  { value: "date-oldest", label: "Oldest First" },
];

export const TOKEN_KEY = "mycontacts_token";
