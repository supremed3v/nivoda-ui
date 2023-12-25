// authFunction.mjs

import fetch from "node-fetch";

export async function handler(event, context, callback) {
  try {
    const response = await fetch(
      "https://integrations.nivoda.net/graphql-loupe360",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              authenticate {
                username_and_password(username: "${
                  import.meta.env.VITE_AUTH_EMAIL
                }", password: "${import.meta.env.VITE_AUTH_PASSWORD}") {
                  token
                }
              }
            }
          `,
        }),
      }
    );

    const authData = await response.json();

    if (authData.errors) {
      console.error("Nivoda Authentication Error:", authData.errors);
      return callback(null, {
        statusCode: 401,
        body: JSON.stringify({ error: "Authentication failed" }),
      });
    }

    const token = authData.data.authenticate.username_and_password.token;

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("Unexpected error:", error);

    // Log the error details
    console.error(error.stack);

    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
      error: error,
    });
  }
}
