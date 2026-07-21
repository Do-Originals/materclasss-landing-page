import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

const WEBINAR_PRICE_PAISE = 499900; // Rs. 4999

export async function POST(req: NextRequest) {
  try {
    // If client sends an amount, it is ignored. We only use the server-side constant.
    const amount = WEBINAR_PRICE_PAISE;
    const currency = "INR";
    const receipt = `receipt_${Date.now()}`; // Unique receipt ID

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const options = {
      amount,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    
    // Simple check for auth failure based on typical Razorpay error shape
    if (error.statusCode === 401 || (error.error && error.error.code === 'BAD_REQUEST_ERROR' && error.error.description.includes('authenticat'))) {
      return NextResponse.json(
        { error: "Authentication failed." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while creating the order." },
      { status: 500 }
    );
  }
}
