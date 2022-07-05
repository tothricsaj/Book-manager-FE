import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from './components/Home/Home';
import { BookList } from './components/Book';
import { BookPage } from "./components/Book/book-page/book-page";

export function App() {
  return (
    <>
    	<BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="books" element={<BookList />} />
          <Route path="book/:bookId" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}