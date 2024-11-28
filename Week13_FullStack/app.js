import express from 'express'
import mongoose from 'mongoose'
import { uri } from './atlas_uri.js'
import { Book } from './models/books.js'
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const main = async (req, res) => {
    try {
        await mongoose.connect(uri);
        console.log("Database Connected");
    }
    catch (err) {
        console.log(`ERROR in connecting: ${err}`)
    }
}
main();

//////////////////////////////////////////////////
///////////////////ROUTES/////////////////////////
//READ OPERATION

//Executing just the find() method with no arguments will return all records currently in the collection.
app.get("/api/booksinfo", async (req, res) => {
    try {
        const books = await Book.find();
        // console.log(books);
        res.send(JSON.stringify(books));

    }
    catch (err) {
        console.log(`ERROR in Finding: ${err}`);
        res.status(500).send(`ERROR in finding: ${err}`);
    }
})

//READ OPERATION using path parameter

app.get("/api/booksinfo/:id", async (req, res) => {
    //process request parameters
    let _id = req.params.id;
    console.log(_id, typeof _id);
    _id = new mongoose.Types.ObjectId(_id);
    console.log(_id);
    try {
        const book = await Book.findOne({ _id })
        console.log("Found ", book);
        res.send(JSON.stringify(book));

    }
    catch (err) {
        console.log(`ERROR in finding: ${err}`);
        res.status(500).send(`ERROR in finding: ${err}`);
    }
})

//CREATE DATA
app.post("/api/addbook", async (req, res) => {

    //process request body
    const { 
        title,
        author,
        numberInStock,
        price,
        rating,
        publishYear,
        like
     } = req.body;
    console.log(title,
        author,
        numberInStock,
        price,
        rating,
        publishYear,
        like
    );

    const book = new Book({ title,
        author,
        numberInStock,
        price,
        rating,
        publishYear,
        like
     });

    //save the document
    try {
        const savedDoc = await book.save();
        console.log(`Document saved successfully.`);
        res.send(savedDoc)
    }
    catch (err) {
        console.log(`ERROR in Posting: ${err}`)
        res.send(`ERROR in Posting: ${err}`)
    }
})



//UPDATEDATA
app.put("/api/updatebook/:id", async (req, res) => {
    //process request parameters
    let _id = req.params.id;
    // console.log(_id, typeof _id)
    _id = new mongoose.Types.ObjectId(_id);
    // console.log(_id);

    //process request body
    const { title, rating, author, numberInStock, like } = req.body;
    // console.log(title, rating, author, numberInStock, like);
    const updateData = { title, rating, author, numberInStock, like };
    try {
        const updatedBook = await Book.findByIdAndUpdate({ _id }, updateData, { new: true })
        // The third parameter { new: true } returns the modified document rather than the original
        if (updatedBook) {
            res.send(JSON.stringify(updatedBook));
        }
        else {
            console.log(`No matching document could be found`);
            res.send(`No matching document could be found`);
        }
    }
    catch (err) {
        console.log(`ERROR in Updating: ${err}`);
        res.send(`ERROR in Updating: ${err}`)
    }
})

//DELETE DATA
app.delete("/api/deletebook/:id", async (req, res) => {

    //process request parameters

    let _id = req.params.id;
    // console.log(_id, typeof _id)
    _id = new mongoose.Types.ObjectId(_id);
    // console.log(_id);
    const filter = { _id }
    try {
        const result = await Book.deleteOne(filter);
        if (result.deletedCount === 0) {
            console.log(`No matching document could be found - Deleted 0 documents`);
            res.send(`No matching document could be found`);
        }
        else {
            console.log(`Successfully deleted ${result.deletedCount} documents.`)
            res.send(`Successfully deleted ${result.deletedCount} documents.`)
        }
    }
    catch (err) {
        console.log(`ERROR in Deleting: ${err}`);
        res.send(`ERROR in Deleting: ${err}`)
    }
})

const port = process.env.PORT || 5000;
//app configurations
app.set('port', port)
//Proper way of assiging a PORT to your node applications
//attempt to read the value of the environment variable called PORT,
//If there is a value, you should use that, otherwise use an arbitrary number for your development machine

app.listen(port, () => console.log(`The server is listening on Port ${port}`));

// Close the Mongoose connection when the Node.js process exits
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Database Connection Closed");
    process.exit(0);
});

// Or you can close the connection explicitly when you're done with it
// mongoose.connection.close();