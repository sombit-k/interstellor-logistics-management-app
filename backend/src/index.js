import express from "express"
import dotenv from "dotenv"

import { connectDb } from "./lib/db.js"
import wasteRoutes from "./routes/waste.js"

dotenv.config()
const app = express()
app.use(express.json())

const PORT=process.env.PORT

app.use("/api/waste", wasteRoutes);

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDb();
  });