// stripeFunction.mjs

import Stripe from "stripe";

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

export async function handler(event, context) {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // Change this to your specific origin(s) for better security
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  if (event.httpMethod !== "OPTIONS" && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  if (event.httpMethod === "OPTIONS") {
    // Preflight request. Reply successfully:
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Preflight request successful" }),
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: requestBody.amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const { client_secret, id: paymentIntentId } = paymentIntent;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ client_secret, paymentIntentId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
