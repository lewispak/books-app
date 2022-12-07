import express from 'express'
import mysql from 'mysql'

const app = express()

//MySQL Database
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Jord@n2345!@",
  database:"test"
})

//Routes
//Root route "/"
app.get("/", (req,res) => {
  res.json("Hi! This is the backend server.")
})

// If there is an authentication issue, run the below code (without //) in MySQL Workbench:
// ALTER USER 'root'@'localhost' IDENTIFIED WITH myql_native_password BY 'Jord@n2345!@';
// Re-run server and you should now connect

//Return all books from database
app.get("/books", (req,res) => {
  const q = "SELECT * FROM test.books"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

//Server
app.listen(3000, () => {
  console.log("Connected to backend")
})