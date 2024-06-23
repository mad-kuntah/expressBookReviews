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


axios.get('https://madechanguta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')
     .then(res => console.log(res.data))
     .catch(err => console.log(err))


axios.get('https://madechanguta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/2')
     .then(res => console.log(res.data))
     .catch(err => console.log(err))    
     
axios.get('https://madechanguta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Unknown')
     .then(res => console.log(res.data))
     .catch(err => console.log(err))         

axios.get('https://madechanguta-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/Pride%20and%Prejudice')
     .then(res => console.log(res.data))
     .catch(err => console.log(err))  

module.exports.general = public_users;
