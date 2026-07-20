import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // Verify the webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`Razorpay Webhook Event Received: ${event}`);

    // Handle the event
    switch (event) {
      case "order.paid":
        // Payment is successful and captured
        const paymentEntity = payload.payload.payment.entity;
        const orderEntity = payload.payload.order.entity;
        console.log(`Payment successful for order: ${orderEntity.id}`);
        // TODO: Update database to mark order as paid and grant access to the user
        break;
      
      case "payment.failed":
        const failedPaymentEntity = payload.payload.payment.entity;
        console.error(`Payment failed: ${failedPaymentEntity.id}`);
        // TODO: Handle failed payment (e.g., notify user)
        break;

      default:
        console.log(`Unhandled event: ${event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
