// src/app/api/user-info/route.ts

export async function GET(req: Request) {
    try {
      const headers = req.headers;
      const authHeader = headers.get("Authorization");
  
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Proxy the request to the actual external API
      const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/user-info/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
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
  