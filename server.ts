import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Store scores in memory (since Firebase was declined)
  const scores = new Map<string, { name: string; score: number; lastUpdate: number }>();

  // Vite middleware for development
  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // WebSocket setup
  const wss = new WebSocketServer({ server });

  const broadcastScores = () => {
    const scoreList = Array.from(scores.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 20); // Top 20
    
    const message = JSON.stringify({
      type: 'INITIAL_SCORES',
      payload: scoreList
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'JOIN') {
          ws.send(JSON.stringify({
            type: 'INITIAL_SCORES',
            payload: Array.from(scores.values()).sort((a, b) => b.score - a.score)
          }));
        }

        if (message.type === 'SCORE_UPDATE') {
          const { name, score } = message.payload;
          if (name) {
            scores.set(name, { name, score, lastUpdate: Date.now() });
            broadcastScores();
          }
        }
      } catch (e) {
        console.error("WS error:", e);
      }
    });
  });
}

startServer();
