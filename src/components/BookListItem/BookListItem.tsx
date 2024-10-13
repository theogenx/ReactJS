import { Book } from "../../domain/book/Book";
import { exampleBooks } from "../../domain/book/exampleBook";
import { useState } from "react";
import { ReactNode } from "react";

// wofür dieser Wrapper? Interface für Funktionsparameter?
export interface BookListItemProps {
  book: Book;
}

export const BookListItem = ({ book }: BookListItemProps) => {
  const [first, second] = exampleBooks;

  const isFree = book.price === "$0.00";

  const [count, setCount] = useState(0);
  const [showDetails, toogleAbstract] = useState(false);

  const handleClick = () => {
    alert("Hello");
  };

  return (
    <div className={isFree ? "book-list-item-free" : ""}>
      <h2>
        {count >= 5 && <span>⭐️</span>}
        {isFree && <span>💰</span>}
        {book.title}
        <button
          className="secondary"
          onClick={() => setCount((count % 10) + 1)}
        >
          <span>👏 {count}</span>
        </button>
      </h2>
      <h3>{book.subtitle}</h3>
      <div className="text-meta">by {book.author}</div>
      <button className="tertiary" onClick={() => toogleAbstract(!showDetails)}>
        {showDetails ? "+ show" : "- hide"} details
      </button>
      <p className="hideable">{showDetails && book.abstract}</p>
    </div>
  );
};
