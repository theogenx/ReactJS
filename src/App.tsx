import { AppHeader } from "./components/AppHeader/AppHeader";
import { ExampleBook } from "./components/ExampleBook/ExampleBook";
import { BookListItem } from "./components/BookListItem/BookListItem";
import { BookList } from "./components/BookList/BookList";
import { useState, useEffect } from "react";
import { fetchAllBooks } from "./domain/book/fetchBooksApi";
import { Book } from "./domain/book/Book";
import { exampleBooks } from "./domain/book/exampleBook";
import { useBooks } from "./domain/book/hook";
import { ThemeContext } from "./domain/theme/ThemeConstext";

// Fehler zu Compile-Fehler: https://github.com/GoogleChrome/web-vitals/issues/482

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchAllBooks().then((newBooks) => setBooks(newBooks));
  }, []);

  // const {booksHook} = useBooks();

  const [primaryColor, setPrimaryColor] = useState("tomato");

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor }}>
      <div className="App">
        <AppHeader />
        {/* <ExampleBook /> */}
        {/* <BookListItem /> */}
        {/* <BookList books={exampleBooks} /> */}
        <BookList books={books} />
      </div>
    </ThemeContext.Provider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
