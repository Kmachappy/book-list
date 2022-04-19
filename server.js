require("dotenv").config();
// Dependencies
const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override")
const booksControllers =require("./controllers/books")
const app = express();
const PORT = process.env.PORT || 3001;
const { redirect } = require("express/lib/response");

// this is a way to import the mongo key through a variable
// const MONGO_URI = process.env.MONGO_URI

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use("/books", booksControllers)


// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));



app.listen(PORT, () => console.log(`We are listening on port ${PORT}`));
