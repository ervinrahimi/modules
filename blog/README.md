<div align="center">
    <h1>Blog Project</h1>
    <p><em>A modular blog system powered by Next.js 15 App Router and SurrealDB</em></p>
</div>

## Description

This project is a fully functional blog system built using **Next.js 15** with the App Router feature and **SurrealDB** for data management. It supports creating, updating, retrieving, and deleting posts, with validation implemented using **Zod schemas**.

## Features

- **RESTful API**: Well-defined endpoints for managing blog posts.
- **Zod Validation**: Ensures input data integrity with detailed error reporting.
- **SurrealDB Integration**: Modern, scalable database integration.
- **Dynamic Routing**: Supports parameterized routes for CRUD operations.
- **Error Handling**: Comprehensive error handling for server and client-side issues.

## Current and Future Features

| **Feature**              | **Status**                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| **API Endpoints**        | :white_check_mark: Create, Read, Update, Delete (CRUD) operations                         |
| **Database Integration** | :white_check_mark: SurrealDB<br>:white_large_square: Support for multiple databases       |
| **Validation**           | :white_check_mark: Zod-based validation<br>:white_large_square: Advanced validation rules |
| **Routing**              | :white_check_mark: Dynamic routes<br>:white_large_square: Nested resource management      |
| **Performance**          | :white_large_square: Optimization and caching mechanisms                                  |

## Technologies Used

- **Next.js 15**: A modern React framework supporting server-side rendering and static site generation.
- **SurrealDB**: A powerful, document-graph hybrid database solution.
- **Zod**: A schema-based validation library for runtime input validation.

## API Endpoints and Logic

### POST /api/blog

**Purpose**: Create a new blog post.

**Handler**:

- Connects to the database using `sdb()`.
- Parses and validates the incoming JSON body using `PostCreateSchema`.
- Extracts and verifies the author ID from the `author` field.
- Checks if the author exists in the database.
- Inserts a new post record into the `post` table.
- Returns a success response with the created post data.

**Error Handling**:

- Validation errors (Zod) return a 400 status.
- Missing or invalid author ID returns a 400 status.
- Author not found returns a 404 status.
- General server errors return a 500 status.

---

### GET /api/blog

**Purpose**: Retrieve all blog posts or a specific post by ID.

**Handler**:

- Connects to the database using `sdb()`.
- Parses the `id` query parameter from the request URL.
- If `id` is provided, retrieves a specific post. If not, retrieves all posts.
- Returns the fetched post(s).

**Error Handling**:

- Post not found returns a 404 status.
- General server errors return a 500 status.

---

### PUT /api/blog/[id]

**Purpose**: Update a specific blog post.

**Handler**:

- Connects to the database using `sdb()`.
- Extracts the `id` parameter from the route.
- Parses and validates the incoming JSON body using `PostUpdateSchema`.
- Checks if the post exists before updating.
- If `author` is provided, verifies the author record.
- Updates the post record with the provided data.
- Returns a success response with the updated post data.

**Error Handling**:

- Validation errors (Zod) return a 400 status.
- Post not found returns a 404 status.
- General server errors return a 500 status.

---

### DELETE /api/blog/[id]

**Purpose**: Delete a specific blog post.

**Handler**:

- Connects to the database using `sdb()`.
- Extracts the `id` parameter from the route.
- Checks if the post exists before deleting.
- Deletes the post record from the `post` table.
- Returns a success response.

**Error Handling**:

- Post not found returns a 404 status.
- General server errors return a 500 status.

## Validation Schemas

**File**: `src/schemas/zod/postSchemas.js`

### PostCreateSchema

Defines the required fields for creating a post:

- **title**: String (required, non-empty).
- **slug**: String (required, non-empty).
- **content**: String (required, non-empty).
- **author**: String (required, non-empty).

### PostUpdateSchema

Defines optional fields for updating a post:

- **title**: String (optional).
- **slug**: String (optional).
- **content**: String (optional).
- **author**: String (optional).

## Installation and Usage

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   Create a `.env.local` file and configure database credentials for SurrealDB.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

<div align="center">
    <p>Powered by <strong>Future Wings</strong></p>
</div>
