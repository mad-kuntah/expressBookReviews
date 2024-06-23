const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  
  const {username, password} = req.body 

  let user = users.filter(user => user.username == username)

  if (user.length > 0){
    if (users[0].password === password){
        return res.status(200).json({
            data: jwt.sign({
                username
            }, "SomeWeirdSecret")
        }) 
    }
  }

  res.status(500).json({
    message: 'Auth failed'
  })
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const {username, review} = req.body
  let isbn = req.params.isbn

  books[isbn].reviews[username] = review

  return res.status(200).json({
    message: "Review added",
    data: books[isbn].reviews[username]
  })
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const {username} = req.body
  let isbn = req.params.isbn

  delete books[isbn].reviews[username]

  return res.status(200).json({
    message: "Review deleted",
  })
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
