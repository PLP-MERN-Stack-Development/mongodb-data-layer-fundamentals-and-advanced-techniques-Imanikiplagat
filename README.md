## MongoDB Data Layer Fundamentals and Advanced Techniques
# Overview

This project demonstrates the basic and advanced concepts of using MongoDB for data storage and retrieval.
It focuses on creating a database, inserting documents, and performing queries using MongoDB Compass and Node.js scripts.

# Functionality
1️ Insert Books
The insert_books.js file connects to your MongoDB database and inserts multiple book documents into a collection named books

2️ Queries
The queries.js file performs the following operations:
Find all books in a specific genre
Find books published after a certain year
Find books by a specific author
Sort books by price or year
Retrieve only selected fields (like title and author)

# Database
The MongoDB database (for example, named bookstore) is created using MongoDB Compass 
A collection called books holds all book documents inserted from insert_books.js.



## Screenshots
## 📸 Screenshots

### MongoDB Compass
(./screenshots/Screenshot 2025-10-04 130018.png)

![Inserted Data](./screenshots/inserted_data.png)

## How to Run

# Install dependencies

npm install

# Run the insert script

node insert_books.js

# Run the query script

node queries.js

## Author

Faith Kiplagat (Imanikiplagat)
Project for PLP MERN Stack Development — MongoDB Data Layer Fundamentals and Advanced Techniques
