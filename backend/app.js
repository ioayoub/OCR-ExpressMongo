import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import secrets from "./secrets.js";
import stuffRoutes from "./routes/stuff.js";
import userRoutes from "./routes/user.js";

// Connect to MongoDB
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://" + secrets.db_user + ":" + secrets.db_password + "@" + secrets.db_link,
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
app.use('/api/auth', userRoutes);

export default app;
