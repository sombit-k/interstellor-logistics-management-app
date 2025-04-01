import express from "express"
import dotenv from "dotenv"
import manageRoutes from "./routes/manage.route.js"
import wasteRoutes from "./routes/waste.route.js"
import { connectDb } from "./lib/db.js"

dotenv.config()
const app = express()
app.use(express.json())

const PORT=process.env.PORT

app.use("/api", manageRoutes)
// app.use("/api/waste",wasteRoutes)
// app.use("/api/import/",importRoutes)
// app.use("/api/export/",exportRoutes)


app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDb();
  });