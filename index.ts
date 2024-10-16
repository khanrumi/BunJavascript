import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // Home route
    if (url.pathname === '/') {
      const body = figlet.textSync("video");
      return new Response(body, { headers: { "Content-Type": "text/plain" } });
    }

    // About route
    if (url.pathname === '/about') {
      const aboutText = "About Me";
      return new Response(aboutText, { headers: { "Content-Type": "text/plain" } });
    }

    // Contact route - throwing error
    if (url.pathname === '/contact') {
      throw new Error('Could not fetch feed');
    }
    
    if (url.pathname === '/greet.txt') {
      return new Response (Bun.file('./greet.txt'))
    }

    // 404 for any other route
    return new Response('404 Not Found', { status: 404 });
  },

  // Error handling middleware
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
});

console.log(`Listening on Port http://localhost:${server.port}`);


