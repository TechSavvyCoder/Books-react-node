# BooksDB using React and NodeJS

## Overview

This project is a web application that serves as a Book Database where users can view, add, update, and delete books from a library system. The application uses a React frontend for the user interface and a Node.js backend for managing the database and server-side logic. The data is stored in a MongoDB database, and the application communicates with the backend through REST APIs.

## Technologies Used

- Frontend:

  - React.js
  - React Router (for navigation)
  - Bootstrap (for styling)
  - Axios (for making HTTP requests)

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose (for MongoDB object modeling)

## Features

- View Books: Display a list of books with information such as title, author, price, rating, and publication year.
- Add Books: Allows users to add new books to the database.
- Update Books: Enables users to edit details of an existing book.
- Delete Books: Users can delete a book from the library.
- Like/Dislike: Toggle between a liked or disliked state for each book using heart icons

## Setup and Installation

**Prerequisites**

- Node.js and npm installed on your machine.
- MongoDB set up locally or use a cloud MongoDB service like MongoDB Atlas.
- React development tools installed (e.g., create-react-app).

## Installation Steps

1. Clone the repository:

```bash
Copy code
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
Copy code
cd BooksDB
```

3. Install backend dependencies:

- Navigate to the backend directory (or root if no separate backend folder).

```bash
Copy code
cd backend
npm install
```

4. Set up environment variables:\
   Create a .env file in the root of the backend folder with the following content:

```bash
Copy code
MONGODB_URI=your-mongo-connection-string
PORT=5000
```

5. Start the backend server:

```bash
Copy code
npm start
```

This will start the Node.js server on port 5000.

6. Install frontend dependencies:
   Navigate to the frontend folder and install dependencies:

```bash
Copy code
cd frontend
npm install
```

7. Start the frontend development server:

```bash
Copy code
npm start
```

This will start the React development server on port 3000.

8. Access the application:
   Open your browser and go to http://localhost:3000 to view the BooksDB application.

## Contact

[Contact the developer](https://www.linkedin.com/in/diegopinlac/)
