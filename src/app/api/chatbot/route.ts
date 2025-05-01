import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.prompt || typeof body.prompt !== "string") {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("✅ [API] Incoming Transfer Request Body:", body);

    const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ prompt: body.prompt }),
    });

    const proxyData = await proxyRes.json();

    console.log("📬 [API] Response from PythonAnywhere:", proxyData);

    return new Response(JSON.stringify(proxyData), {
      status: proxyRes.status,
      headers: {
        "Content-Type": "application/json",
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
