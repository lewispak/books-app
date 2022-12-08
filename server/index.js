import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express()

//--MySQL Database--//
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Jord@n2345!@",
  database:"test"
})

// Express Middleware - allows for client json posts
app.use(express.json())

// Express Middleware - allows cors
app.use(cors())

//--Routes--//
// Routes and functions will be organised into separate folders at later stage

// Root route "/"
app.get("/", (req,res) => {
  res.json("Hi! This is the backend server.")
});

// Return all books from database
app.get("/books", (req,res) => {
  const q = "SELECT * FROM test.books"

  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  });
});

// If there is an authentication issue with database requests, run the below code (without //) in MySQL Workbench:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH myql_native_password BY 'Jord@n2345!@';
// Re-run server and you should now connect

// Post entry into databse
app.post("/books", (req,res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ];

  db.query(q, [values], (err,data) => {
    if(err) return res.json(err);
    return res.json("Book has been created successfully!");
  });
});

//--Server--//
app.listen(3001, () => {
  console.log("Connected to backend")
})