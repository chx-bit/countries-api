import { countriesRouter } from "./routers/countriesRouter.js";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use("/countries", countriesRouter);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

if (!isProd) {
    app.listen(3000, () => {
        console.log("Dev server running at http://localhost:3000");
    });
}

export default app;
