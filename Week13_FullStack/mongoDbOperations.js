import express from 'express'
import mongoose from 'mongoose'
import { uri } from './atlas_uri.js'
import { Book } from './models/books.js';
const app = express();
//1. connect to the server
const main = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Database Connected");
    }
    catch (err) {
        console.log(`ERROR in connecting: ${err}`)
    }
};
main()


//2. Define a schema
//3. Craete a model
/////////////////////////////////////////////////////////////////////////////////////////////
//4. Ready to create a new book document
//we are creating this document from the model that we specified in books.js
//which means this document sticks to the schema
const book = new Book({
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    numberInStock: 4,
    price: 120.89,
    rating: 3,
    publishYear: new Date('2014-10-08'),
    like: true,
})
// /////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//5. Saving the new book document
//The save() method returns a promise.
//If save() succeeds, the promise resolves to the document that was saved.
const saveBook = async () => {
    try {
        const savedDoc = await book.save();
        console.log(`Document saved successfully. ${savedDoc}`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// saveBook();
//it calls the save method in Mongoose to save this book document into a books collection inside a booksDB
//Every single time you run save(), it will save the same book to your books collection in your booksDB.


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//6. 

//Inserting many new documents to the booksDB
const book1 = new Book({
    title: "Introduction to Statistical Learning",
    author: "Gareth James",
    numberInStock: 16,
    price: 106.5,
    rating: 3,
    publishYear: new Date('2009-10-08'),
    like: true,
})
const book2 = new Book({
    title: "Stream Data Mining",
    author: "Leszek Rutkowski",
    numberInStock: 8,
    price: 89.5,
    rating: 1,
    publishYear: new Date('2012-3-11'),
    like: false,
})
const book3 = new Book({
    title: "The Robotic Process Automation Handbook",
    author: "Tom Taulli",
    numberInStock: 9,
    price: 135.2,
    rating: 1,
    publishYear: new Date('2016-5-10'),
    like: false,
})
const saveBooks = async () => {
    try {
        const docs = await Book.insertMany([book1, book2, book3]);
        console.log("documents saved successfully.")
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// saveBooks();

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//7. Reading documents from the booksDB

//To get all the documents from a collection, we can simply use the find() method on our chosen collection. 
// The find() method retrieves an array of documents that match the specified conditions.
//
// The findOne() method retrieves a single document that matches the specified conditions.

const findBooks = async () => {
    try {
        const books = await Book.find({ rating: 5 })
        console.log("Found")
        books.forEach(book => console.log(book.title))
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// findBooks()

const findBook = async () => {
    try {
        const book = await Book.findOne({ rating: 5, title: "Data Sciences" })
        console.log("Found", book);
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// findBook();


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//8. Updating the documents

// findOneAndUpdate() finds the first document that matches a given filter, applies an update, and returns the document. By default, findOneAndUpdate() returns the document as it was before update was applied.
//You should set the new option to true to return the document after update was applied.

const findOneAndUpdate = async () => {
    try {
        const filter = { title: "Eloquent JavaScript" };
        const update = { title: "Introduction To JavaScript" }
        const doc = await Book.findOneAndUpdate(filter, update, {
            new: true
        })
        console.log("UPDATED: ", doc)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// findOneAndUpdate()


//UpdateOne updates an existing document with the information mentioned in the "update" object. 
//It updates only the first document that is returned in the filter.
const updateOne = async () => {
    try {
        const filter = { title: "Eloquent JavaScript" }
        const update = { title: "My Eloquent JavaScript" };
        const result = await Book.updateOne(filter, update)
        // console.log(result.modifiedCount)
        if (result.modifiedCount > 0) {
            console.log('updated successfully:', result);
        } else {
            console.log('Book not found or no modifications were made.');
        }
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// updateOne()
// /////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//8. Deleting a document

//DeleteOne - Deletes first document that matches the condition
// The result contains an object with the property name deletedCount indicating the number of documents deleted.

const deleteOne = async () => {
    const filter = { title: "Eloquent JavaScript" }
    try {
        const result = await Book.deleteOne(filter);
        if (result.deletedCount === 0) console.log(`Deleted 0 documents`)
        else console.log(`Successfully deleted ${result.deletedCount} documents.`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// deleteOne();
const deleteMany = async () => {
    // const filter = { title: "Eloquent JavaScript" }
    // const filter = { title: "Eloquent JavaScript", rating: 5 }
    const filter = { rating: 9 }
    try {
        const result = await Book.deleteMany(filter);
        if (result.deletedCount === 0) console.log(`Deleted 0 documents`)
        else console.log(`Successfully deleted ${result.deletedCount} documents.`)
    }
    catch (err) {
        console.log("Error: " + err)
    }
}
// deleteMany();

//once you are done with the database, you can close the database using close() method
//when the last action with the database is completed, and the callback returns no error,
//then we must close the connection

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Database Connection Closed");
    process.exit(0);
});
