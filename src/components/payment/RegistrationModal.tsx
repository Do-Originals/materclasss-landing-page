"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Script from "next/script";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  reference: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

interface RegistrationModalProps {
  course: { name: string; price: number } | null;
  onClose: () => void;
}

export function RegistrationModal({ course, onClose }: RegistrationModalProps) {
  const isModalOpen = !!course;

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    reference: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isModalOpen || !mounted) return null;

  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name is too short";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
        return "";
      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^[0-9]{10}$/.test(value.replace(/[-+()\s]/g, ''))) return "Enter a valid 10-digit phone number";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (touched[id as keyof FormState]) {
      setErrors(prev => ({
        ...prev,
        [id]: validateField(id as keyof FormState, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    setErrors(prev => ({
      ...prev,
      [id]: validateField(id as keyof FormState, value)
    }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formData) as Array<keyof FormState>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof FormState] = true;
      return acc;
    }, {} as Partial<Record<keyof FormState, boolean>>);
    setTouched(allTouched);
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: course ? course.price * 100 : 499900 }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "DoCourseOnline",
        description: course ? `${course.name} Registration` : "Course Registration",
        order_id: data.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setIsSuccess(true);
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            alert("Payment verification error.");
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
        theme: { color: "#E6007A" },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function () {
        alert("Payment failed — no amount was deducted. Please try again.");
        setIsSubmitting(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const inputClass = (field: keyof FormState) => `w-full px-3 py-2 text-sm bg-transparent border rounded-lg text-white placeholder:text-white/50 focus:outline-none transition-colors ${
    errors[field] && touched[field] 
      ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-500/5" 
      : "border-white/30 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
  }`;

  const modalContent = (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#132341] border border-white/20 rounded-2xl w-full max-w-[500px] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-300">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="p-1 rounded-full bg-white/5 mb-3 inline-block">
              <img src="/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full object-cover shadow-[0_0_15px_rgba(230,0,122,0.3)] border border-brand-magenta/30" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Complete Registration</h2>
            <p className="text-white/70 text-sm mt-1">
              {course ? (
                <span className="font-semibold text-white">{course.name} - ₹{course.price}</span>
              ) : (
                "Fill out the details below to secure your seat."
              )}
            </p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="h-16 w-16 rounded-full bg-brand-magenta/20 flex items-center justify-center text-brand-magenta mb-2">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">You're Registered!</h3>
              <p className="text-white/70">Our team will contact you shortly to confirm your session.</p>
              <Button onClick={handleClose} className="mt-4 bg-brand-magenta text-white">Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("name")} 
                    placeholder="Full Name*" 
                  />
                  {errors.name && touched.name && <p className="text-red-400 text-xs mt-1 absolute">{errors.name}</p>}
                </div>
                <div>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("email")} 
                    placeholder="Email Address*" 
                  />
                  {errors.email && touched.email && <p className="text-red-400 text-xs mt-1 absolute">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("phone")} 
                    placeholder="Phone Number*" 
                  />
                  {errors.phone && touched.phone && <p className="text-red-400 text-xs mt-1 absolute">{errors.phone}</p>}
                </div>
                <div>
                  <input 
                    type="text" 
                    id="reference" 
                    value={formData.reference}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("reference")} 
                    placeholder="Reference (Optional)" 
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 sm:py-5 text-sm sm:text-base font-semibold bg-brand-magenta hover:bg-brand-magenta/90 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(230,0,122,0.4)] hover:shadow-[0_0_30px_rgba(230,0,122,0.6)] border-0 disabled:opacity-70 disabled:hover:shadow-[0_0_20px_rgba(230,0,122,0.4)] relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
