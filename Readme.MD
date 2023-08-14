# Netflix Backend Application
this is a nodejs application for the backend of the netflix application which is built with reactjs and this is the backend for it.
## Table of Contents

- [Installation](#installation)
- [Technology Used](#technology-used)
- [Usage](#usage)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technology Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Joi

## Installation

1. Clone the repository.
2. Install the required dependencies using the command  `npm install` .
3. Set up the environment variables by creating a  `.env`  file and filling in the necessary information (e.g., PORT MONGO_URI JWT_SECRET AUTH_MAX_AGE ).
4. Run the application using the command  `npm start` .

## Usage
in this application you can do the following:
- ### User authentication: Users can register, log in, and log out of their accounts.

1.  signUp : This function handles the user sign-up process. It takes the user's information (firstName, lastName, email, password, profilePicture) from the request body, checks if the user already exists, hashes the password, creates a new user in the database, generates a JWT token, sets the token as a cookie, and returns the user's information along with the token.

2.  signIn : This function handles the user sign-in process. It takes the user's email and password from the request body, checks if the user exists in the database, compares the passwords, generates a JWT token, sets the token as a cookie, and returns the user's information along with the token.

3.  signOut : This function handles the user sign-out process. It clears the token cookie and returns a success message.

The file also imports necessary dependencies and helper functions from other files, such as bcrypt for password hashing and User model for interacting with the database. It uses the JWT configuration for generating and handling tokens. The  AUTH_MAX_AGE  environment variable is used to set the maximum age of the token cookie.

- ### User management: Users can view and update their profiles.
1.  getAllUsers : Retrieves a paginated list of all users from the database, excluding the password field. Returns the list of users in the response.

2.  getUserById : Retrieves a specific user by their ID from the database, excluding the password field. Returns the user object in the response.

3.  getOwnData : Retrieves the data of the currently authenticated user by their ID from the database, excluding the password field. Returns the user object in the response. This function also checks if the authenticated user ID matches the requested user ID, ensuring authorization.

4.  createUser : Validates the request body using a Joi schema and creates a new user in the database with the provided information. Returns the created user object in the response.

5.  updateUser : Validates the request body using a Joi schema and updates an existing user in the database with the provided information. If a new password is provided, it is hashed before updating. Returns the updated user object in the response.

6.  updateUserRole : Updates the role of an existing user in the database. Validates that the new role is either "admin" or "user". Returns the updated user object in the response.

7.  deleteUser : Deletes a user from the database based on their ID. Returns the deleted user object in the response.
- ### Movie management: Admins can create, view, update, and delete movies.
1.  getAllMovies : Retrieves a paginated list of all movies from the database. Returns the list of movies in the response.

2.  getRandomMovie : Retrieves a random movie from the database. Returns the movie object in the response.

3.  getMovieById : Retrieves a specific movie by its ID from the database. Returns the movie object in the response.

4.  createMovie : Validates the request body using a Joi schema and creates a new movie in the database with the provided information. Returns the created movie object in the response.

5.  updateMovie : Validates the request body using a Joi schema and updates an existing movie in the database with the provided information. Returns the updated movie object in the response.

6.  deleteMovie : Deletes a movie from the database based on its ID. Returns the deleted movie object in the response.

7.  searchMovies : Performs a search for movies based on the provided query parameters (seriesTitle, releasedYear, genres). Returns a list of movies that match the search criteria in the response.
## Routes

-  `/api/auth`  - Authentication routes.
-  `/api/users`  - User routes.
-  `/api/movies`  - Movie routes.

Provide a brief description of each route and its purpose.

## Error Handling

Explain how errors are handled in your application. Mention any specific middleware or techniques used for error handling.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request describing your changes.
