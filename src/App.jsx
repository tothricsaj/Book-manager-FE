import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from './components/Home/Home';
import { BookList, BookPage, BookForm } from './components/Book';

export function App() {
  const [chosenBook, setChosenBook] = useState({});
  
  const manageBook = {
      book: chosenBook,
      setBook: (data) => {
        setChosenBook(data)
      }
    };

  return (
    <>
    	<BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="books" element={<BookList />} />
          <Route path="book/:bookId" element={<BookPage manageBook={manageBook} />} />
          <Route path="book/update/:bookId" element={<BookForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}