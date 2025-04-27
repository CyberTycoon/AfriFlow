export async function GET(req: Request) {
    try {
      const headers = req.headers;
      const authHeader = headers.get("Authorization");
  
      console.log('🪪 Authorization Header:', authHeader); // 👈 ADD THIS
  
      if (!authHeader) {
        console.log('🚫 Missing Authorization header');
        return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
  
const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/wallet/", {
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
  