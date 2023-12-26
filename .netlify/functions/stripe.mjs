// stripeFunction.mjs

import Stripe from "stripe";

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
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
      body: JSON.stringify({ client_secret, paymentIntentId }),
      success: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
