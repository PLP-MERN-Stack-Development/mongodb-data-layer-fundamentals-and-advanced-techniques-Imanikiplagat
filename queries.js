// queries.js — Node.js compatible version

const { MongoClient } = require("mongodb");

// Replace with your connection string
const uri = "mongodb+srv://plpstore:R9neZIGuK8VxJVNt@cluster0.vjv8rak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function runQueries() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    console.log("Connected to MongoDB ✅\n");

    // --- Task 1: Find books in a specific genre ---
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("📚 Books in 'Fiction' genre:");
    console.log(fictionBooks);

    // --- Task 2: Find books published after a certain year ---
    const recentBooks = await books.find({ published_year: { $gt: 2010 } }).toArray();
    console.log("\n📘 Books published after 2010:");
    console.log(recentBooks);

    // --- Task 3: Find books by a specific author ---
    const authorBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("\n✍️ Books by George Orwell:");
    console.log(authorBooks);

    // --- Task 4: Update the price of a specific book ---
    const updateResult = await books.updateOne(
      { title: "The Alchemist" },
      { $set: { price: 15.99 } }
    );
    console.log(`\n💰 Updated ${updateResult.modifiedCount} book(s) price.`);

    // --- Task 5: Delete a book by its title ---
    const deleteResult = await books.deleteOne({ title: "Moby Dick" });
    console.log(`\n🗑️ Deleted ${deleteResult.deletedCount} book(s).`);

    // --- Task 6: Find books in stock after 2010 with projection ---
    const inStockRecent = await books
      .find(
        { in_stock: true, published_year: { $gt: 2010 } },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
      )
      .toArray();
    console.log("\n✅ In-stock books published after 2010:");
    console.log(inStockRecent);

    // --- Task 7: Sort books by price ascending ---
    const sortedAsc = await books.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: 1 })
      .toArray();
    console.log("\n📈 Books sorted by price (ascending):");
    console.log(sortedAsc);

    // --- Task 8: Sort books by price descending ---
    const sortedDesc = await books.find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: -1 })
      .toArray();
    console.log("\n📉 Books sorted by price (descending):");
    console.log(sortedDesc);

    // --- Task 9: Pagination (5 books per page) ---
    const page = 1;
    const perPage = 5;
    const paginatedBooks = await books.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();
    console.log(`\n📄 Page ${page} (5 books):`);
    console.log(paginatedBooks);

    // --- Task 10: Aggregation - Average price by genre ---
    const avgPrice = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("\n📊 Average book price by genre:");
    console.log(avgPrice);

    // --- Task 11: Author with the most books ---
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("\n🏆 Author with the most books:");
    console.log(topAuthor);

    // --- Task 12: Books grouped by publication decade ---
    const byDecade = await books.aggregate([
      {
        $group: {
          _id: { $subtract: [{ $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] }] },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log("\n🕰️ Books grouped by publication decade:");
    console.log(byDecade);

    // --- Task 13: Indexing ---
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("\n⚡ Indexes created on 'title' and 'author + published_year'.");

    const explainResult = await books.find({ title: "The Hobbit" }).explain("executionStats");
    console.log("\n🔍 Explain output (showing index performance):");
    console.log(explainResult.executionStats);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("\nConnection closed ✅");
  }
}

runQueries();
