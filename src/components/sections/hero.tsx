"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { siteContent } from "@/content/copy";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  profession: string;
  reference: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    profession: "",
    reference: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      if (leftContentRef.current) {
        tl.fromTo(
          leftContentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      }
      
      if (formRef.current) {
        tl.fromTo(
          formRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      case "age":
        if (!value) return "Age is required";
        const ageNum = parseInt(value, 10);
        if (isNaN(ageNum) || ageNum < 15 || ageNum > 100) return "Enter a valid age (15-100)";
        return "";
      case "location":
        if (!value.trim()) return "Location is required";
        return "";
      case "profession":
        if (!value.trim()) return "Profession is required";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate on change if already touched
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
    // Mark all as touched so errors show up
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
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
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
              setIsSuccess(true);
              console.log("Payment successful, form data:", formData, response);
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
        theme: {
          color: "#E6007A",
        },
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

  const inputClass = (field: keyof FormState) => `w-full px-3 py-2 text-sm bg-transparent border rounded-lg text-white placeholder:text-white/50 focus:outline-none transition-colors ${
    errors[field] && touched[field] 
      ? "border-red-500 focus:ring-1 focus:ring-red-500 bg-red-500/5" 
      : "border-white/30 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta"
  }`;

  return (
    <section id="register" ref={containerRef} className="relative pt-16 pb-16 lg:pt-16 lg:pb-28 overflow-hidden bg-surface-dark text-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-surface-dark to-surface-dark pointer-events-none"></div>
      
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 items-center">
          
          <div ref={leftContentRef} className="flex-1 space-y-8">
            <div className="inline-flex items-center rounded-full border border-brand-magenta/50 bg-brand-magenta/10 px-4 py-1.5 text-sm font-medium text-brand-magenta shadow-[0_0_15px_rgba(230,0,122,0.5)] animate-pulse">
              <span className="relative flex h-2.5 w-2.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-magenta"></span>
              </span>
              {siteContent.hero.eyebrow}
            </div>
            
            <h1 className="text-[2.5rem] leading-[1.15] sm:text-5xl lg:text-[4rem] font-bold tracking-tight lg:leading-[1.1] font-heading">
              {siteContent.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium">
              {siteContent.hero.subheadline}
            </p>
            
            <p className="text-white/70 max-w-2xl leading-relaxed text-sm md:text-base">
              {siteContent.registrationHook.text}
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-lg">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner">
                <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Time</span>
                <span className="text-white font-semibold text-sm sm:text-lg">10 Sessions</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner relative overflow-hidden">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Online</span>
                 <span className="text-white font-semibold text-sm sm:text-lg">Live Cohort</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 flex flex-col justify-center shadow-inner col-span-2">
                 <span className="text-white/60 text-[10px] sm:text-xs uppercase font-medium tracking-wider mb-0.5 sm:mb-1">Price</span>
                 <span className="text-white font-semibold text-base sm:text-lg">₹4999 incl. GST</span>
              </div>
            </div>
          </div>

          <div ref={formRef} className="w-full max-w-[500px] shrink-0 relative flex flex-col justify-end mt-8 lg:mt-0 lg:ml-8">
            {/* Mentor Image */}
            <div className="w-full flex justify-center lg:justify-end -mb-16 sm:-mb-20 lg:-mb-24 relative z-0 pointer-events-none">
              <img 
                src="/mentor.png" 
                alt="" 
                className="w-full max-w-[420px] sm:max-w-[550px] lg:max-w-none lg:w-[130%] max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] h-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div className="bg-[#132341] border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative z-10 transition-all duration-500">
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="h-16 w-16 rounded-full bg-brand-magenta/20 flex items-center justify-center text-brand-magenta mb-2">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold">You're Registered!</h3>
                  <p className="text-white/70">Our team will contact you shortly to confirm your session.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                        type="number" 
                        id="age" 
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass("age")} 
                        placeholder="Age*" 
                      />
                      {errors.age && touched.age && <p className="text-red-400 text-xs mt-1 absolute">{errors.age}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <input 
                        type="text" 
                        id="location" 
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass("location")} 
                        placeholder="Location*" 
                      />
                      {errors.location && touched.location && <p className="text-red-400 text-xs mt-1 absolute">{errors.location}</p>}
                    </div>
                    <div>
                      <input 
                        type="text" 
                        id="profession" 
                        value={formData.profession}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass("profession")} 
                        placeholder="Profession*" 
                      />
                      {errors.profession && touched.profession && <p className="text-red-400 text-xs mt-1 absolute">{errors.profession}</p>}
                    </div>
                  </div>

                  <div className="pt-2">
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
                        siteContent.hero.cta
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
