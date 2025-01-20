require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const dbConnection = require("./config/dbConnection");

const PORT = process.env.PORT || 4000;
const dir = path.join(__dirname, "public");
const root = require("./routes/root");
const corsOptions = require("./config/corsOptions");
const html404 = path.join(__dirname, "views", "404.html");

dbConnection();
app.use("/", express.static(dir));
app.use("/", root);
app.use(express.json({ extended: true }));

//Middle Wares
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));



app.use(errorHandler);
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const notesRouter = require("./routes/notes");



  app.use('/auth',authRouter);
  app.use('/users',userRouter);
  app.use('/notes',notesRouter);
  
  

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(html404);
//   } else if (req.accepts("json")) {
//     res.send({ error: "Not Found" });
//   } else {
//     res.type("text").send("Not Found");
//   }
// });


mongoose.connection.once("open", (req, res) => {
  console.log("MongoDB Connected");
});
app.listen(PORT, () => console.log(`Running on Port: ${PORT}`));
