"use client";

import React from "react";
import { useRazorpayPayment } from "@/hooks/useRazorpayPayment";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  text?: string;
}

export function CheckoutButton({ 
  className = "", 
  text = "Register Now — ₹4999" 
}: CheckoutButtonProps) {
  const { initiatePayment, isLoading, error } = useRazorpayPayment();

  const handleCheckout = () => {
    initiatePayment(
      (response) => {
        // Success callback - usually handle redirect to success page
        console.log("Payment Successful!", response);
        alert("Payment Successful! Your seat is confirmed.");
      },
      (err) => {
        // Error callback
        console.error("Payment Failed!", err);
        alert("Payment Failed. Please try again.");
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? "Processing..." : text}
      </button>
      {error && (
        <span className="text-red-500 text-sm mt-2 font-medium">{error}</span>
      )}
    </div>
  );
}
