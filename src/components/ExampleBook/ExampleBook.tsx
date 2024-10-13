import {book} from "../../domain/book/Book"

export const ExampleBook = () => {
    return <div className="example-book">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <div className='text-meta'>by {book.author}</div>
        <div className='text-meta'>{book.cover}</div>
    </div>
}