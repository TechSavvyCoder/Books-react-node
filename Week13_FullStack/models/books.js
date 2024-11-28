import mongoose from 'mongoose';

//1. create a schema
//schema is a blueprint or structure of our data that we are going to save into our MongoDB database
//This bookSchema lays down the foundation for every new book that will be added to our database.
//Performing Validations while defining the schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please check the entry, no title specified."]
    },
    author: {
        type: String,
        required: [true, "Please check the entry, no author specified."]
    },
    numberInStock: {
        type: Number,
        required: [true, "Number in Stock is missing. Please provide a value."]
    },
    price: Number,
    rating: {
        type: Number,
        min: 1,
        max: 100,
        required: [true, "The rating is required, please specify a value between 1 -10."]
    },
    publishYear: {
        type: Date, default: Date.now
    },
    like: Boolean

})

//2. Compiling our schema into a Model.

//use the schema to create a mongoose model - specify two parameters
//first is name of the collection that complies with this particular schema
//If you have a collection of books, you use the word Book in singular form
//and Mongoose will convert this string to a plural form to create your collection.

//A model is a class with which we construct documents.

export const Book = mongoose.model("Book", bookSchema);
