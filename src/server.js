import app from "./app.js";
import { connectToMongoDB } from "./Config/mongodb.js";
import connectRedis from "./Config/redis.js";
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  connectToMongoDB();
  connectRedis();
  console.log(`Ecommerce backend app listening at http://localhost:${port}`);
});
