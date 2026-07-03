# Backend Developer Assignment

## Project

This is a simple full stack application made for the Backend Developer Internship assignment.

The project has a backend built with Node.js, Express.js, and MongoDB. The frontend is built with React.

Users can register, log in, and manage their own tasks. Authentication is done using JWT.

## Features

### Backend

* User registration
* User login
* Password hashing using bcrypt
* JWT authentication
* User and Admin roles
* CRUD operations for tasks
* Input validation
* Error handling
* API versioning
* MongoDB database
* Postman collection for API testing

### Frontend

* Register page
* Login page
* Protected dashboard
* Create task
* View tasks
* Update task
* Delete task
* Success and error messages

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv

### Frontend

* React
* React Router
* Axios

## Project Structure

```text
backEnd/
    controllers/
    middleware/
    models/
    routes/
    config/
    app.js
    server.js

frontEND/
    src/
        components/
        pages/
        api.js
        App.jsx
```

## Installation

Clone the repository.

```bash
git clone <repository url>
```

Go to the backend folder.

```bash
cd backEnd
```

Install packages.

```bash
npm install
```

Create a `.env` file (you can copy from `.env.example`).

Example:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend (development):

```bash
npm run dev
```

Start the backend (production):

```bash
npm start
```

Open another terminal and go to the frontend folder.

```bash
cd frontEND
```

Install packages.

```bash
npm install
```

Start the frontend.

```bash
npm run dev
```

## API Endpoints

### Authentication

`POST /api/v1/auth/register`

Create a new user.

`POST /api/v1/auth/login`

Login and get JWT token.

### Tasks

`GET /api/v1/tasks`

Get all tasks.

`POST /api/v1/tasks`

Create a task.

`PUT /api/v1/tasks/:id`

Update a task.

`DELETE /api/v1/tasks/:id`

Delete a task.

## API Documentation

The Postman collection is included in this project.

Swagger UI is available at: `http://localhost:5000/api-docs`

Example env file: `backEnd/.env.example`

## Security

* Passwords are hashed before saving.
* JWT is used for authentication.
* Protected routes require a valid token.
* Input validation is added.
* Error messages are handled properly.

## Scalability

This project is made in a modular way. Controllers, models, routes, and middleware are kept in separate folders, so new features can be added easily.

If this project grows bigger, Redis can be used for caching, Docker can be used for deployment, and the application can be divided into different services. A load balancer can also be added to handle more users.
