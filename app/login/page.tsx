"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const correctPassword = "aiisthefuture";
  const redirectPath = searchParams.get('redirect') || '/';

  useEffect(() => {
    // Check if already authenticated
    const authCookie = document.cookie
      .split(';')
      .find(row => row.trim().startsWith('mat-auth='));
    
    if (authCookie && authCookie.split('=')[1] === 'authenticated') {
      router.push(redirectPath);
    }
  }, [router, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Trim whitespace and compare (case sensitive)
    const trimmedPassword = password.trim();
    
    if (trimmedPassword === correctPassword) {
      // Set authentication cookie (expires in 24 hours)
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000));
      
      document.cookie = `mat-auth=authenticated; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
      
      // Redirect to the original destination or home page
      router.push(redirectPath);
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007A7A] to-[#1c4064] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MAT San Jose</h1>
          <p className="text-white/80 text-lg">Muscle Activation Techniques</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#1c4064] mb-2">
              Access Required
            </h2>
            <p className="text-[#1c4064]/70">
              Please enter the password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1c4064] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007A7A] focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#007A7A] to-[#1c4064] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#005c5c] hover:to-[#153251] focus:ring-2 focus:ring-[#007A7A] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Access Website"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#1c4064]/50">
              Authorized access only • MAT San Jose
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            This website is password protected for authorized users only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#007A7A] to-[#1c4064] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">MAT San Jose</h1>
            <p className="text-white/80 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
} 