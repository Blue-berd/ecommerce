import express from "express";
import swaggerConfig from "./Config/swagger.js";
import cartRouter from "./Features/Cart/CartRoutes.js";
import orderRouter from "./Features/Orders/OrderRoutes.js";
import productRouter from "./Features/Products/ProductModel.js";
import authRoutes from "./Features/Users/UserRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

swaggerConfig(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("api/auth", authRoutes);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);

export default app;
