import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger.js";
import { connectDB, API_BASE } from "./config/index.js";
import routes from "./routes/index.js";

const app = express();

// 🌍 Render ortamı için port
const PORT = Number(process.env.PORT) || 8000;

// ✅ CORS: sadece güvenli domain’leri kabul et
const allowedOrigins = [
  "http://localhost:5173",
  "https://tunahanarslan.github.io",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🔧 Middleware
app.use(morgan("dev"));
app.use(express.json());

// 🔗 Routes
app.use(API_BASE, routes);

// 🧠 Swagger dokümantasyonu
setupSwagger(app);

// 🧪 Health check endpoint (Render için zorunlu)
app.get("/health", (_, res) => res.json({ ok: true }));

// 🧪 Basit test endpoint
app.get("/", (_req, res) => {
  res.send(`
    <h1>Fullstack Mastery Backend</h1>
    <p>🚀 Server is running successfully.</p>
    <p>Try <a href="${API_BASE}/hello">${API_BASE}/hello</a> endpoint.</p>
  `);
});

// 🚀 Server başlatma (async wrapper)
async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is live on port ${PORT}`);
    });
  } catch (err) {
    console.error("💥 Server failed to start:", err);
    process.exit(1);
  }
}

// 🔒 Global error handlers
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Rejection:", reason);
});

startServer();
