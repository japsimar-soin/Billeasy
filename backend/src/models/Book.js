import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: String,
			required: true,
			trim: true,
		},
		genre: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		totalReviews: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

// create text index for search
bookSchema.index({ title: "text", author: "text" });

const Book = new mongoose.model("Book", bookSchema);
export default Book;
