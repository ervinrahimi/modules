<div align="center">
    <h1>Project Structure</h1>
    <p><em>A modular, scalable, and well-documented architecture for modern applications</em></p>
</div>

---

## Description

The **Project Structure** provides a foundational layout for developing scalable and maintainable web applications. It includes preconfigured routes, database connectivity, and example API structures, ensuring seamless development.

---

## Features

- **Organized Structure**: Modular design for better scalability.
- **Database Integration**: Ready-to-use SurrealDB connection.
- **Centralized Routes**: Streamlined route configuration.
- **Global Styling**: Consistent UI with global styles.
- **API Examples**: Easy-to-extend backend integration.

---

## Quick Overview

| **Feature**          | **Status**                                        |
| -------------------- | ------------------------------------------------- |
| **Folder Structure** | ✅ Defined                                        |
| **API Routes**       | ✅ Basic Example<br>⬜ Advanced API Logic         |
| **Database Setup**   | ✅ SurrealDB Connection<br>⬜ Multi-DB Support    |
| **Routing**          | ✅ Predefined Routes<br>⬜ Dynamic Route Handling |
| **Styling**          | ✅ Global CSS<br>⬜ Theme Support                 |
| **Documentation**    | ⬜ Extended README<br>⬜ Additional Guides        |

---

## Key Files

### `app`

- **`layout.js`**: Overall application layout, including shared components (e.g., header, footer).

- **`page.js`**: Entry point for rendering primary content of the application.

- **`api/example/route.js`**: Demonstrates a POST API route implementation using Next.js App Router.

#### Key Sections:

1. **Database Initialization**:

   ```javascript
   const db = await sdb()
   ```

   Retrieves an instance of the SurrealDB connection to execute queries.

2. **Table Definition**:

   ```javascript
   await db.query(`DEFINE TABLE example;`)
   ```

   Creates a new table named `example` in SurrealDB. This step ensures that the table is defined before any data operations.

3. **Success Response**:

   ```javascript
   return NextResponse.json(
     {
       message: 'Example table created successfully.',
     },
     {
       status: 201,
     }
   )
   ```

   Constructs and sends a JSON response indicating successful table creation.

4. **Error Handling**:
   ```javascript
   console.error('Error creating example table:', error)
   return NextResponse.json(
     {
       error: {
         code: 'internal_server_error',
         message: 'Failed to create "example" table.',
       },
     },
     {
       status: 500,
     }
   )
   ```
   Logs the error and sends a structured JSON response with an appropriate error code and message.

### `constants/routes`

- **`admin.js`**: Admin-specific route configurations.

  ```javascript
  const ADMIN_ROUTES = {
    dashboard: '/admin/dashboard',
    settings: '/admin/settings',
  }
  export default ADMIN_ROUTES
  ```

- **`api.js`**: Centralized management of API endpoints.

  ```javascript
  const API_ROUTES = {
    getUser: '/api/user',
    createUser: '/api/user/create',
  }
  export default API_ROUTES
  ```

- **`auth.js`**: Routes for authentication-related actions.

  ```javascript
  const AUTH_ROUTES = {
    login: '/auth/login',
    logout: '/auth/logout',
  }
  export default AUTH_ROUTES
  ```

- **`index.js`**: Combines and exports all route configurations.

  ```javascript
  import ADMIN_ROUTES from './admin'
  import API_ROUTES from './api'
  import AUTH_ROUTES from './auth'

  const ROUTES = {
    ...ADMIN_ROUTES,
    ...API_ROUTES,
    ...AUTH_ROUTES,
  }

  export default ROUTES
  ```

### `db/surealdb.js`

This file handles SurrealDB integration with a robust connection setup.

#### Key Sections:

1. **Environment Variables**:

   ```javascript
   const DB_URL = process.env.DB_URL
   const DB_USER = process.env.DB_USER
   const DB_PASS = process.env.DB_PASS
   const DB_NAME = process.env.DB_NAME
   const DB_NAMESPACE = process.env.DB_NAMESPACE
   ```

   These variables ensure flexibility and security by keeping sensitive database details outside the codebase.

2. **Singleton Pattern**:

   ```javascript
   let dbInstance = null
   ```

   Ensures that only one instance of the database connection is created and reused across the app.

3. **Database Connection Logic**:

   ```javascript
   const db = new Surreal()
   await db.connect(DB_URL)
   await db.signin({
     username: DB_USER,
     password: DB_PASS,
   })
   await db.use({
     namespace: DB_NAMESPACE,
     database: DB_NAME,
   })
   ```

   This code establishes a connection, authenticates, and selects the appropriate namespace and database.

4. **Error Handling**:
   ```javascript
   console.error('Failed to connect to SurrealDB:', error)
   throw error
   ```
   Provides clear error messages to aid debugging when the connection or authentication fails.

### `styles`

- **`globals.css`**: Provides consistent global styling for the application.

---

## Technologies Used

- **Next.js**: Modern React framework for SSR and static generation.
- **SurrealDB**: Scalable and powerful database integration.

---

## Future Updates

- Extended documentation for advanced APIs.
- Theming support for styling.
- Dynamic route management.

---

<div align="center">
    <p>Powered by <strong>Future Wings</strong></p>
</div>
