import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    // Handle specific routes
    if (req.url === "/") {
      return new Response("Hello, Bun API!", { status: 200 });
    }

    if (req.url === "/api/data") {
      const data = { message: "This is a sample Bun API", status: "success" };
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Default case for all other routes (404 Not Found)
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Bun API is running on http://localhost:3000");
