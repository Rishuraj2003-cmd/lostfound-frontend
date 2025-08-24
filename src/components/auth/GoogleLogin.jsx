// src/components/auth/GoogleLogin.jsx

// src/components/auth/GoogleLogin.jsx
import React from "react";

export default function GoogleLogin() {
  const handleGoogleLogin = () => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const googleAuthUrl = `${apiBase.replace(/\/+$/, "")}/api/auth/google`;
window.location.href = googleAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex justify-center items-center gap-2 border border-gray-300 bg-white py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google icon"
        className="w-6 h-6"
      />
      <span className="text-gray-700 font-medium">Continue with Google</span>
    </button>
  );
}
