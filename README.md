# Project Documentation

## Project Overview
This project is a web application built using **Vite** for the frontend and **Express.js** for the backend. The application incorporates **JWT-based authentication** for both admin and user roles. It features distinct functionalities for admin and user accounts.

---

## Key Features

### Admin Features
1. **Add User**: Admin can create new user accounts.
2. **Create a Lab**: Admin can set up new labs within the application.
3. **Assign Lab to User**: Admin can assign specific labs to individual users.
4. **Assign Instructor**: Admin can assign an instructor to a lab.

### User Features
1. **View Assigned Labs**: Users can log in and view the list of labs assigned to them.
2. **Change Password**: Users can update their password through a secure functionality.

---

## Technology Stack

### Frontend
- **Vite**: High-performance frontend tooling.
- **React**: For building user interfaces.

### Backend
- **Express.js**: For handling server-side logic and APIs.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **bcryptjs**: For hashing and comparing passwords.

### Database
- **MongoDB**: For storing user and lab data.

---

## Authentication Flow

1. **JWT Generation**: On successful login, a JWT is generated and returned to the client.
2. **Token Verification**: All protected routes are secured using middleware that verifies the JWT.

### Middleware
- **authMiddleware.js**: Verifies the JWT for protected routes and determines the role of the user (admin/user).

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Environment Variables**
   Create a `.env` file in the `backend` directory with the following:
   ```env
   PORT=8080
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the Application**
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`

---

## Future Enhancements
1. Implement email notifications for user actions.
2. Add reporting and analytics for admins.
3. Enhance the user dashboard with more lab-related insights.

---

## Conclusion
This application provides a robust platform for managing lab assignments and user interactions. Its modular architecture ensures scalability and maintainability.

