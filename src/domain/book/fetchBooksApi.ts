import { Book } from "./Book";

export const fetchAllBooks = async() => {
  const response = await fetch('http://localhost:4730/books')
  if (!response.ok) {
    console.log('Fehler')
  }
  const result = response.json() as Promise<Book[]>;

  // return fetch('http://localhost:4730/books').then((res) =>
  //   res.json()
  // ) as Promise<Book[]>;
  return result
}