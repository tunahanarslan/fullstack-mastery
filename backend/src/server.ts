import express from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./swagger";
import helloRoute from "./routes/hello";
import userRoute from "./routes/user";
import { PORT, API_BASE } from "./config"; // ✅ config'ten alıyoruz
import routes from "./routes"; //dinamik


const app = express();

// 🔧 Middleware //
app.use(morgan("dev")); // 1️⃣ Log her isteği
app.use(cors()); // 2️⃣ CORS erişimini aç
app.use(express.json()); // 3️⃣ JSON gövdeleri parse et
// 🔗 Routes
app.use(API_BASE, routes); // 4️⃣ Route'ları bağla
// 🧠 Swagger Setup
setupSwagger(app); // 5️⃣ Swagger sonradan gelsin


// 🧪 Basit test endpoint 
app.get("/", (req, res) => {
  res.send(`
    <h1>Fullstack Mastery Backend</h1>
    <p>🚀 Server is running successfully.</p>
    <p>Try <a href="${API_BASE}/hello">${API_BASE}/hello</a> endpoint.</p>
  `);
});

// 🚀 Server başlatma
app.listen(PORT, () => {
  console.log(`✅ Server is live at: http://localhost:${PORT}`); //config'ten çekiliyor port cnm
});
