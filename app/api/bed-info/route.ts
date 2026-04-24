import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.URL_API_SIMRSJ;
    const loginUsername = process.env.USER_GET_TOKEN_API_SIMRSJ;
    const loginPassword = process.env.PASSWORD_GET_TOKEN_API_SIMRSJ;
    const dataUsername = process.env.USER_TOKEN_API_SIMRSJ;

    if (!apiUrl || !loginUsername || !loginPassword || !dataUsername) {
      return NextResponse.json(
        { error: "API credentials not configured" },
        { status: 500 }
      );
    }

    // 1. Get Token
    const loginResponse = await fetch(`${apiUrl}/users/login`, {
      method: "GET",
      headers: {
        "x-username": loginUsername,
        "x-password": loginPassword,
        "Accept": "application/json",
      },
      // Disable cache for this fetch to avoid stale tokens if they expire
      cache: "no-store",
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed with status: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData?.response?.token;

    if (!token) {
      throw new Error("Failed to retrieve token from response");
    }

    // 2. Fetch Bed Info
    const bedInfoResponse = await fetch(`${apiUrl}/antrean/infotempattidur`, {
      method: "GET",
      headers: {
        "x-token": token,
        "x-username": dataUsername,
      },
      // Cache bed info for 60 seconds to reduce load on SIMRS, or no-store for real-time
      cache: "no-store",
    });

    if (!bedInfoResponse.ok) {
      throw new Error(`Failed to fetch bed info: ${bedInfoResponse.status}`);
    }

    const bedInfoData = await bedInfoResponse.json();
    
    return NextResponse.json(bedInfoData);
  } catch (error: any) {
    console.error("Error fetching bed info:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
