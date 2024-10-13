// this is an example of a book returned by the API
const exampleBook: unknown = {
    title: "Refactoring",
    subtitle: "Improving the Design of Existing Code, 2nd Edition",
    isbn: "978-0-13-475759-9",
    abstract: "",
    numPages: 448,
    author: "Martin Fowler",
    publisher: "Addison-Wesley Professional",
    price: "$59.99",
    cover: "https://www.informit.com/ShowCover.aspx?isbn=9780134757599&type=f"
}

type ISBN = string

interface Book {
    title: string,
    subtitle: string,
    isbn: ISIN,
    abstract: string,
    numPages: number,
    author: string,
    publisher: string,
    price: string,
    cover: URL
}

// TODO: add correct parameters and return types - check the example usage below what these functions accept and return
interface BookMonkeyApiClient {
    getBooks(): unknown;
    getBook(): unknown;
    updateBook(): unknown;
    deleteBook(): unknown;
}

// You don’t have to implement anything here!
// Use the example to finish the type declarations above and check that everything is typed correctly.
class BookMonkeyApi implements BookMonkeyApiClient {
    async getBooks() {
        return [exampleBook]
    }

    async getBook(isbn: ISBN): Promise<Book> {
        return { ...exampleBook, isbn }
    }

    async updateBook(book: Book) {
        return book
    }

    async deleteBook(isbn: ISBN) {}
}

const api = new BookMonkeyApi()

api.getBooks().then(books => {
    console.log(`Retrieved ${books.length} from the server`)
})

const isbn = "978-0-13-475759-9"
api.getBook(isbn).then(book => {
    console.log(`Retrieved book with ISBN "${book.isbn} from server."`)
})

api.updateBook(exampleBook).then(book => {
    console.log(`The book with ISBN "${book.isbn}" got updated.`)
})

api.deleteBook(isbn).then(() => {
    console.log(`The book with ISBN "${isbn}" got deleted successfully.`)
})
