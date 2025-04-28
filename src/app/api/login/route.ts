import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("✅ [API] Incoming Login Request Body:", body);

    const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const proxyData = await proxyRes.json();
    console.log("📬 [API] Response from PythonAnywhere:", proxyData);

    const accessToken = proxyData.access;
    const refreshToken = proxyData.refresh;

    const cookieHeaders: string[] = [];

    if (accessToken) {
      cookieHeaders.push(
        `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 2}; SameSite=Strict; ${
          process.env.NODE_ENV === "production" ? "Secure" : ""
        }`
      );
    }

    if (refreshToken) {
      cookieHeaders.push(
        `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; ${
          process.env.NODE_ENV === "production" ? "Secure" : ""
        }`
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieHeaders.join(", "),
      },
    });

  } catch (error) {
    console.error("❌ [API] Proxy error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
