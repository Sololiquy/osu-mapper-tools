import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, beatmapID } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing access token" }, { status: 401 });
    }

    const response = await fetch(`https://osu.ppy.sh/api/v2/beatmapsets/${beatmapID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
