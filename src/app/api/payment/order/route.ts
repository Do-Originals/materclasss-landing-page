import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { siteContent } from "@/content/copy";

export async function POST(req: NextRequest) {
  try {
    // We fetch the price from the server, not the client, to avoid tampering.
    // In a real app, this might come from a database based on a product ID.
    // Here we hardcode to 4999 as per the site content.
    const amount = 4999; // Rs. 4999
    const currency = "INR";
    const receipt = `receipt_${Date.now()}`; // Unique receipt ID

    const options = {
      amount: amount * 100, // Amount is in currency subunits (paise for INR)
      currency,
      receipt,
      // payment_capture: 1 // Auto capture
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
