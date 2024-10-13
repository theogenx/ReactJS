import { BookListItem } from "../BookListItem/BookListItem";
import { Book } from "../../domain/book/Book";
import { exampleBooks } from '../../domain/book/exampleBook';

interface BookListProps {
    books: Book[];
  }

export const BookList = ({ books }: BookListProps) => {
//   const books = exampleBooks;

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListItem book={book} key={book.id} />
      ))}
    </div>
  );
};
