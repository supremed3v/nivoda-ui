// authFunction.mjs

import fetch from "node-fetch";

export default async function handler(event) {
  try {
    const { email, password } = JSON.parse(event.body);

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
                username_and_password(username: "${email}", password: "${password}") {
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
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Authentication failed" }),
      };
    }

    const token = authData.data.authenticate.username_and_password.token;

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
