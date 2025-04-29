import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  
const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/wallet/transactions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
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
  