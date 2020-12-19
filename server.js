const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const postRoutes = require("./routes/posts.js");

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

// middlewares
app.use(express.json({ limit : "30mb", extended : true }));
app.use(express.urlencoded({ limit : "30mb", extended : true }));
app.use(cors());


app.use("/posts", postRoutes);


// mongodb connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser : true, useUnifiedTopology : true })
    .then(() => console.log("MongoDB connection established..."))
    .catch((error) => console.log(error.message));


app.listen(port, (req, res) => {
    console.log(`Server is running on port https://localhost:${port}`);
})

