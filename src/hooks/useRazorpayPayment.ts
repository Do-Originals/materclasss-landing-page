import { useState, useCallback } from "react";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export function useRazorpayPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
        resolve(true);
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async (
    onSuccess?: (response: any) => void,
    onFailure?: (error: any) => void
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      // Create order from our API
      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
      });
      
      const orderData = await orderRes.json();
      
      if (!orderData.success || !orderData.order) {
        throw new Error(orderData.error || "Failed to create order");
      }

      const { order } = orderData;

      // Define Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "DoCourseOnline",
        description: "Digital Marketing Master Class Registration",
        order_id: order.id,
        handler: function (response: any) {
          // Frontend verification (optional if webhooks are implemented)
          // We can optionally verify the signature here via another API call
          if (onSuccess) onSuccess(response);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#E6007A", // brand-magenta from tailwind config
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on("payment.failed", function (response: any) {
        if (onFailure) onFailure(response.error);
      });

      paymentObject.open();

    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setError(err.message || "An unexpected error occurred");
      if (onFailure) onFailure(err);
    } finally {
      setIsLoading(false);
    }
  }, [loadRazorpayScript]);

  return { initiatePayment, isLoading, error };
}
