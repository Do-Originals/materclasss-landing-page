"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "./RegistrationModal";

interface CheckoutButtonProps {
  className?: string;
  text?: string;
}

export function CheckoutButton({ 
  className = "", 
  text = "Register Now" 
}: CheckoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center justify-center gap-2 ${className}`}
      >
        <span>{text}</span>
      </Button>
      <RegistrationModal 
        course={isModalOpen ? { name: "Digital Marketing Master Class", price: 4999 } : null} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
