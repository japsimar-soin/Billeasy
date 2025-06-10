import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
	try {
		//get the token from header and remove "Bearer"
		const token = req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new Error();
		}

		//verify the token and get the user
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "SomeRandomSecret"
		);
		const user = await User.findById(decoded.userId);

		if (!user) {
			throw new Error();
		}

		//attach the user and token to the request object
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		//if the token is invalid, return error
		res.status(401).json({ message: "Please authenticate." });
	}
};

export default auth;
