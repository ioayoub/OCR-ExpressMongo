import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import stuffRoutes from "./routes/stuff.js";

// Connect to MongoDB
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://mongo_admin:mongo_admin123@cluster0.smxvuc1.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Express
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

export default app;
