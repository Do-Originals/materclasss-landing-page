"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutButtonProps {
  className?: string;
  text?: string;
}

export function CheckoutButton({ 
  className = "", 
  text = "Register Now — ₹4999" 
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "DoCourseOnline",
        description: "Digital Marketing Master Class Registration",
        order_id: data.order_id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              alert("Payment Successful! Your seat is confirmed.");
            } else {
              setError("Payment verification failed.");
            }
          } catch (err) {
            setError("Payment verification error.");
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
        theme: {
          color: "#E6007A",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function () {
        setError("Payment failed — no amount was deducted. Please try again.");
        setIsLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      {error && (
        <span className="text-red-500 text-sm mt-2 font-medium text-center">{error}</span>
      )}
    </div>
  );
}
