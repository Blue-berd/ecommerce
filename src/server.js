import app from "./app.js";
import { mongooseConnection } from "./Config/mongodb.js";
import connectRedis from "./Config/redis.js";
const port = 3000;

app.listen(port, () => {
  mongooseConnection();
  connectRedis();
  console.log(`Ecommerce backend app listening at http://localhost:${port}`);
});
