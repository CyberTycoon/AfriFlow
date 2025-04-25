// /pages/api/auth/register.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("✅ [API] Incoming Request Body:", body);

    const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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