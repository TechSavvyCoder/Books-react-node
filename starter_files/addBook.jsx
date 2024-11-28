import { useState } from 'react'
const AddBook = ({ onAdd = f => f }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [numberInStock, setNumberInStock] = useState("")
    const [price, setPrice] = useState("")
    const [rating, setRating] = useState("")
    const [publishYear, setPublishYear] = useState("")
    const [like, setLike] = useState("")

    const submitForm = (event) => {
        event.preventDefault();
        onAdd(title, author, numberInStock, price, rating, publishYear, like);
        setTitle("");
        setAuthor("");
        setNumberInStock("");
        setPrice("");
        setRating("")
        setPublishYear("");
        setLike("");
    }

    return (<div>
        <h1>Please enter the details of the new Book here..</h1>
        <form onSubmit={submitForm} method="post">
            <div className="form-group">
                <label htmlFor="title" className="p-3">Book Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter a Title"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="author" className="p-3">Book Author</label>
                <input
                    type="text"
                    name="author"
                    id="author"
                    className="form-control"
                    placeholder="Enter an Author"
                    onChange={(event) => setAuthor(event.target.value)}
                    value={author}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="numberInStock" className="p-3">Number In Stock</label>
                <input
                    type="number"
                    name="numberInStock"
                    id="numberInStock"
                    className="form-control"
                    placeholder="Number In Stock"
                    onChange={(event) => setNumberInStock(event.target.value)}
                    value={numberInStock}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="price" className="p-3">Book Price</label>
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="Enter a Price"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="rating" className="p-3">Book Rating</label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    className="form-control"
                    placeholder="Enter a Rating"
                    onChange={(event) => setRating(event.target.value)}
                    value={rating}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="publishYear" className="p-3">Book Publish Year</label>
                <input
                    type="date"
                    name="publishYear"
                    id="publishYear"
                    className="form-control"
                    placeholder="Enter a Publish Year"
                    onChange={(event) => setPublishYear(event.target.value)}
                    value={publishYear}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="like" className="p-3">Like Status (True/False)</label>
                <input
                    type="text"
                    name="like"
                    id="like"
                    className="form-control"
                    placeholder="Enter the like status (True/False)"
                    onChange={(event) => setLike(event.target.value)}
                    value={like}
                    required
                />
            </div>

            <button className='m-5 p-3 w-25'>ADD THE BOOK</button>
        </form>

    </div>);
}

export default AddBook;