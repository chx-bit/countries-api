import { countriesRouter } from "./routers/countriesRouter.js";
import express from "express";
const app = express();

app.use("/countries", countriesRouter);

app.use(express.static("public"));
app.use("/src", express.static("src"));

export default app

