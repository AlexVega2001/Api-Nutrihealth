import "dotenv/config";
import express from "express";
import nutrihealthRoute from "./routes/nutrihealth.route.js";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json()); //Importante: Es un middleware que activa la propiedad req.body
app.use("/api/v1", nutrihealthRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
