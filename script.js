const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
app.use(cors());
// const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
const blogData = new Schema({
  'title': String,
  'author': String,
  'gmail': String,
  'content': String
  });



const Detail = mongoose.model("Detail", blogData);

mongoose.connect("mongodb://localhost/asc", () =>{
    console.log("Connected")
},
e=> console.error(e),
);

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Blogger!");
});

app.get("/getData", function (req, res) {
  Detail.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


app.post("/submit", (req, res) => {
  const { title,author,gmail,content } =
    req.body;

  const detail = new Detail({
    title:title,
    author:author,
    gmail:gmail,
    content:content,
  });

  detail
    .save()
    .then(() => {
      res.send(detail);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});


