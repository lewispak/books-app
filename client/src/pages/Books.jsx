import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Books = () => {
  // Store books within books state
  const [books, setBooks] = useState([])

  // Fetches all data from database
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/books") // This ENDPOINT the conneciton point between react and DB - can basically retrieve any data from an API with this method
        setBooks(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  return (
    <div>
      <h1>Book Store</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books