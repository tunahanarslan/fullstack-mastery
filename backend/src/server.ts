import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger.js";
import { connectDB, PORT, API_BASE } from "./config/index.js";
import routes from "./routes/index.js";

const app = express();

// 🔒 Sadece izin verilen origin’lerden gelen istekleri kabul et
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

// 🔧 Middleware //
app.use(morgan("dev")); // 1️⃣ Log her isteği
app.use(express.json()); // 2️⃣ JSON gövdeleri parse et

// 🔗 Routes
app.use(API_BASE, routes); // 3️⃣ Route'ları bağla

// 🧠 Swagger Setup
setupSwagger(app); // 4️⃣ Swagger sonradan gelsin

// 🧪 Basit test endpoint 
app.get("/", (req, res) => {
  res.send(`
    <h1>Fullstack Mastery Backend</h1>
    <p>🚀 Server is running successfully.</p>
    <p>Try <a href="${API_BASE}/hello">${API_BASE}/hello</a> endpoint.</p>
  `);
});

// 🚀 Server başlatma (async wrapper ile)
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is live at: http://localhost:${PORT}`);
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

// 🚀 Server başlatma
(async () => {
  await startServer();
})();
