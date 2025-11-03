// frontend/js/config.js

// Détecte si on est en développement ou en production
const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const BACKEND_URL = isDevelopment
  ? "http://localhost:3000"
  : "tickethackv1-abhs-n7qchc8jm-sey-aangs-projects.vercel.app"; // ← Change avec ton URL Vercel!

export { BACKEND_URL };
