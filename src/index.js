import { countriesRoutes } from "./routes/countriesRoutes.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use("/countries", countriesRoutes);
app.use(express.static(path.join(__dirname, "../public")));

// GET /ping
app.get("/ping", async (req, res) => {
app.get("/ping", async (req, res) => {
  const pingStart = Date.now();

  const countriesStart = Date.now();
  try {
    await fetch(`${req.protocol}://${req.get("host")}/countries`);
  } catch (e) {}
  const countriesTime = Date.now() - countriesStart;
  const pingTime = Date.now() - pingStart;

  res.json({
    status: "OK",
    uptime: process.uptime().toFixed(2) + "s",
    response_time: {
      ping: pingTime + "ms",
      countries: countriesTime + "ms"
    },
    memory: {
      used: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB",
      total: (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB"
    },
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

if (!isProd) {
    app.listen(3000, () => {
        console.log("Dev server running at http://localhost:3000");
    });
}

export default app;
