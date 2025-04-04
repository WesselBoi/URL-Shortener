require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connection");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8001; 



connectToMongoDB(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false  }));

app.use("/url", urlRoute);

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


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
