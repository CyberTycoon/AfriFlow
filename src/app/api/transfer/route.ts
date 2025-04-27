export async function POST(req: Request) {
    try {
      const body = await req.json();
      const headers = req.headers;
      const authHeader = headers.get("Authorization");
  
      console.log("✅ [API] Incoming Transfer Request Body:", body);
  
      // Send the request to the actual transfer API (PythonAnywhere)
      const proxyRes = await fetch("https://paybridge.pythonanywhere.com/api/auth/wallet/transfer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader || "", // <-- fixed here
        },
        body: JSON.stringify(body),
      });
  
      const proxyData = await proxyRes.json();
  
      console.log("📬 [API] Response from PythonAnywhere:", proxyData);
  
      // Return the response from the external API to the frontend
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
  