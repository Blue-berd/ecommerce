import cors from "cors";
import express from "express";
import path from "path";
import swaggerConfig from "./Config/swagger.js";
import cartRouter from "./Features/Cart/CartRoutes.js";
import orderRouter from "./Features/Orders/OrderRoutes.js";
import productRouter from "./Features/Products/ProductRoutes.js";
import sessionRouter from "./Features/Sessions/SessionRoutes.js";
import authRoutes from "./Features/Users/UserRoutes.js";
import { sendError } from "./Utils/response.js";
// utils/pathUtils.js
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.headers.authorization);
  next();
});
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/sessions", sessionRouter);

swaggerConfig(app);
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    return sendError(
      res,
      err.message || "Internal Server Error",
      err.status || 500
    );
  }
});

app.all("/*", (req, res, next) => {
  return sendError(res, "Route not found", 404);
});

export default app;
