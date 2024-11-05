import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import pageRouter from "./routes/page.routes";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", pageRouter);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).render("404");
});

// start server
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
