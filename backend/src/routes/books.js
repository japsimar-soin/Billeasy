import express from "express";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Search books
router.get("/search", async (req, res) => {
	try {
		const { query } = req.query;
		if (!query) {
			return res.status(400).json({ message: "Query parameter is required" });
		}

		// Case-insensitive partial match for title/author
		const books = await Book.find({
			$or: [
				{ title: { $regex: query, $options: "i" } },
				{ author: { $regex: query, $options: "i" } },
			],
		}).limit(5);

		res.json(books);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Add a new book (Authenticated)
router.post("/", auth, async (req, res) => {
	try {
		const book = new Book(req.body);
		await book.save();
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Get all books with pagination and filters
router.get("/", async (req, res) => {
	try {
		const { page = 1, limit = 5, author, genre } = req.query;
		const query = {};

		if (author) query.author = new RegExp(author, "i");
		if (genre) query.genre = new RegExp(genre, "i");

		//get the books from the database with pagination and filters
		const books = await Book.find(query)
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.exec();
			
		const count = await Book.countDocuments(query);

		res.json({
			books,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get book by ID with reviews
router.get("/:id", async (req, res) => {
	try {
		const { page = 1, limit = 5 } = req.query;
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		const reviews = await Review.find({ book: req.params.id })
			.populate("user", "username")
			.sort({ createdAt: -1 })
			.limit(limit * 1)
			.skip((page - 1) * limit);

		const totalReviews = await Review.countDocuments({ book: req.params.id });

		res.json({
			book,
			reviews,
			totalPages: Math.ceil(totalReviews / limit),
			currentPage: page,
			totalReviews,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
