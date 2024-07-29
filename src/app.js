import cors from "cors";
import express from "express";
import swaggerConfig from "./Config/swagger.js";
import authRoutes from "./Features/Users/UserRoutes.js";
import { sendError } from "./Utils/response.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use("/api/products", productRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/cart", cartRouter);
console.log("after routes");

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
