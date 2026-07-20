import Razorpay from "razorpay";
import crypto from "crypto";

// Ensure we don't create multiple instances in development due to hot reloading
const globalForRazorpay = globalThis as unknown as {
  razorpay: Razorpay | undefined;
};

export const razorpay =
  globalForRazorpay.razorpay ??
  new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "dummy_key_id",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_key_secret",
  });

if (process.env.NODE_ENV !== "production") globalForRazorpay.razorpay = razorpay;

/**
 * Verify payment signature from the frontend
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string = process.env.RAZORPAY_KEY_SECRET || ""
): boolean {
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

/**
 * Verify webhook signature from Razorpay servers
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string = process.env.RAZORPAY_WEBHOOK_SECRET || ""
): boolean {
  return Razorpay.validateWebhookSignature(payload, signature, secret);
}
