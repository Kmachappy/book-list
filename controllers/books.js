const express = require("express");
const Book = require("../models/book")
const bookSeedData = require("../models/bookSeed")
const bookRouter = express.Router();

//home route
// bookRouter.get("/", (req, res) => {
//   res.send("you are home");
// });

//index route
bookRouter.get("/", (req, res) => {
  Book.find({}, (err, allBooks) => {
    // console.log(allBooks[0]);
    res.render("index.ejs", {
      books: allBooks,
      yolo: "swag",
    });
  });
});

// book seed
bookRouter.get("/seed", (req, res) => {
  Book.deleteMany({}, (error, allBooks) => {
    Book.create(bookSeed, (err, data) => {
      res.redirect("/books");
    });
  });
});

//new route
bookRouter.get("/new", (req, res) => {
  res.render("new.ejs");
});

//show route
bookRouter.get("/:id", (req, res) => {
  Book.findById(req.params.id, (error, book) => {
    res.render("show.ejs", { book });
  });
  //res.send(req.params.id);
});

//create
bookRouter.post("/", (req, res) => {
  //   console.log(req.body.drugs);
  req.body.completed = !!req.body.completed;
  Book.create(req.body, (err, createdBook) => {
    if (err) return res.send(err);
    res.redirect("/books");
  });
});

//always have a slash and check for slashes!!!
// deleting
bookRouter.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, deletedBook) => {
    res.redirect("/books");
  });
});

//edit route
bookRouter.get("/:id/edit", (req, res) => {
  Book.findById(req.params.id, (err, book) => {
    res.render("edit.ejs", { book });
  });
  // res.send(`heyy I got your requres for ${req.params.id}`)
});

//update/edit route
bookRouter.put("/:id", (req, res) => {
  console.log(req.body);
  req.body.completed = !!req.body.completed;
  Book.findByIdAndUpdate(req.params.id, req.body, (err, updatedBook) => {
    if (err) console.log(err);
    res.redirect(`/books/${req.params.id}`);
  });
});

module.exports = bookRouter;
