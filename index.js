require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connection");
const path = require("path");
const {restrictToLoggedinUserOnly  } = require("./middlewares/auth");


const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8001; 
const mongoUrl="mongodb://127.0.0.1:27017/short-url"



connectToMongoDB(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false  }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly , urlRoute);       // Restrict access to logged-in users only by using inline middleware

app.use("/", staticRoute)


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
        $push:{visitHistory : {
            timestamp : Date.now()
        }
        }
    }
  );
  res.redirect(entry.redirectUrl);
});


app.use("/user", userRoute);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
