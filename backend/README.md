# Billeasy Backend API

A RESTful API for a book review application built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Postman Collection

You can find the complete API documentation and test the endpoints using our Postman Collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/japsimarsoin/workspace/billeasy/collection/30148040-29a0d6cb-3233-49de-9e00-098ee6e84c32?action=share&creator=30148040)

The collection includes:

- Environment setup
- Authentication endpoints
- Book management endpoints
- Review management endpoints
- Example requests and responses
- Pre-request scripts for authentication

To use the collection:

1. Click the "Run in Postman" button above
2. Import the collection into your Postman workspace
3. Set up the environment variables:
   - `base_url`: http://localhost:3000
   - `token`: (will be set automatically after login)

### Available Endpoints

#### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

#### Books

- `GET /api/books` - Get all books (with pagination and filters)
- `GET /api/books/:id` - Get book by ID (with reviews)
- `POST /api/books` - Add new book (requires authentication)
- `GET /api/books/search` - Search books by title or author

#### Reviews

- `POST /api/reviews/:bookId/reviews` - Add review to a book (only one review allowed for each user and requires authentication)
- `PUT /api/reviews/:reviewId` - Edit your review (requires authentication)
- `DELETE /api/reviews/:reviewId` - Delete your review (requires authentication)

## Design Decisions & Assumptions

### Authentication

- JWT-based authentication for stateless API
- Tokens expire after 24 hours
- Passwords are hashed using bcrypt with a salt round of 10
- One review per user per book (enforced by unique index)

### Database

- MongoDB Atlas for cloud hosting
- Mongoose schemas with timestamps for all models
- Text indexes on book title and author for efficient search
- Proper indexing for frequently queried fields

### API Design

- RESTful architecture
- Pagination implemented for book list and reviews (default 10 items per page)
- Filtering by author and genre
- Case-insensitive search
- Proper error handling and status codes
- CORS enabled for frontend integration

### Security

- Environment variables for sensitive data
- Input validation and sanitization
- Protected routes using JWT middleware
- No sensitive data in responses

### Performance

- Pagination to limit response size
- Indexed fields for faster queries
- Efficient text search implementation
- Proper error handling to prevent server crashes

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses follow the format:

```json
{
	"message": "Error description"
}
```

## Development

To run the development server with hot reload:

```bash
npm run dev
```

For production:

```bash
npm start
```

## Testing

To run tests (when implemented):

```bash
npm test
```
