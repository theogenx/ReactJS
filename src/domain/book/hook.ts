import { useEffect, useState } from "react";
import { Book } from "./Book";
import { fetchAllBooks } from "./fetchBooksApi";

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchAllBooks()
        .then((newBooks) => setBooks(newBooks))
        .catch(() => setBooks([]));
      }, []);

    return {books};
}