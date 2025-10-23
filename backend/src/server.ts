import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 🔧 Middleware'ler
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🧠 Basit test endpoint
app.get("/api/hello", (req, res) => {
  console.log("📩 Yeni istek geldi:", new Date().toISOString());
  res.json({ message: "Hello, Tunahan! 🚀 Backend is running smoothly." });
});

// 🚀 Server'ı başlat
app.listen(PORT, () => {
  console.log(`✅ Server is live at: http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Fullstack Mastery Backend</h1>
    <p>🚀 Server is running successfully.</p>
    <p>Try <a href="/api/hello">/api/hello</a> endpoint.</p>
  `);
});
