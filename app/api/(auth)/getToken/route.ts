import { NextResponse } from "next/server";

export async function GET() {
  const tokenUrl = "https://osu.ppy.sh/oauth/token";

  const body = {
    client_id: process.env.OSU_CLIENT_ID,
    client_secret: process.env.OSU_CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "public",
  };

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to get access token");

    const data = await response.json();
    return NextResponse.json({ accessToken: data.access_token });
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
}
