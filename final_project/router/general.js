const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
   //Write your code here
   const { username, password} = req.body

   if (users.filter(user => user.username === username).length > 0){
     return res.status(500).json({
         message: "Username already exists"
     })
   }
 
   users.push({
     username,
     password
   })
 
   return res.status(200).json({
     message: "User registered successfully"
   })
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({
    data: books
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json({
    data: books[req.params.isbn]
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let keys = Object.keys(books)

  let author = keys.filter(key => books[key].author === req.params.author)
  
  if (author.length > 0)
    return res.status(200).json({
        data: author.map(a => books[a])
    })

   return res.status(500).json({
    message: "Author not found!"
   }) 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let keys = Object.keys(books)

  let book = keys.filter(key => books[key].title === req.params.title)
  
  if (book.length > 0)
    return res.status(200).json({
        data: books[book[0]]
    })

   return res.status(500).json({
    message: "Book not found!"
   }) 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(
    {data: books[req.params.isbn].reviews}
  )
});


public_users.get('/',async function (req, res) {
    //Write your code here
    let getResult = new Promise((resolve,reject) => {
        resolve(books)})

    result = await getResult()
});



public_users.get('/isbn/:isbn',async function (req, res) {
    //Write your code here
    let getResult = new Promise((resolve,reject) => {
        resolve(books[req.params.isbn])})

    result = await getResult()
});


public_users.get('/author/:author',async function (req, res) {
    //Write your code here
    let getResult = new Promise((resolve,reject) => {

        let booksResult = Object.keys(books).map(key => {
            if (books[key].author == req.params.author) return books[key]
        })

        resolve(booksResult)})

    result = await getResult()
});

public_users.get('/title/:title',async function (req, res) {
    //Write your code here
    let getResult = new Promise((resolve,reject) => {

        let booksResult = Object.keys(books).map(key => {
            if (books[key].title == req.params.title) return books[key]
        })

        resolve(booksResult)})

    result = await getResult()
});
  
  


module.exports.general = public_users;
