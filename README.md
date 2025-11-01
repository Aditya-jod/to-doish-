# To-Doish: A Full-Stack Smart To-Do Dashboard

Welcome to To-Doish, a modern and intuitive full-stack to-do list application designed to help you organize your tasks, track your progress, and stay motivated. This web-based dashboard features a secure backend, a persistent database, and a clean, responsive user interface.

## Key Features

- **Secure User Accounts:** Standard registration and login with password encryption.
- **Cloud-Synced Tasks:** Your to-dos are saved to a database, accessible from anywhere.
- **Task & Routine Management:** A simple interface to add, edit, and delete tasks and daily routines.
- **Progress Tracking:** See your completed tasks and daily progress at a glance.
- **Light & Dark Mode:** Choose your preferred theme.
- **Responsive Design:** Works on both desktop and mobile.

## File Structure

The project is organized into a clean and professional structure, separating the frontend assets from the server logic.

```
to-doish/
├── config/
│   └── database.js         # Sequelize database connection configuration
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── User.js             # User model for Sequelize
│   ├── Task.js             # Task model for Sequelize
│   ├── Routine.js          # Routine model for Sequelize
│   └── index.js            # Model associations and export
├── public/
│   ├── css/
│   │   └── style.css       # Main stylesheet for the application
│   └── js/
│       ├── main.js         # Core JavaScript for the dashboard
│       ├── login.js        # Client-side logic for login
│       └── register.js     # Client-side logic for registration
├── routes/
│   ├── auth.js             # API routes for authentication
│   └── tasks.js            # API routes for tasks
├── views/
│   ├── index.html          # The main dashboard HTML file
│   ├── login.html          # Login page HTML
│   └── register.html       # Registration page HTML
├── .env                    # Environment variables (DB credentials, JWT secret)
├── .gitignore              # Specifies files for Git to ignore
├── index.html              # The landing page for the application
├── package.json            # Project metadata and dependencies
├── README.md               # This file
└── server.js               # Express server to run the application
```

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd to-doish
    ```

2.  **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) installed. Then, run the following command in the root directory of the project:
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a file named `.env` in the root of the project and add the following lines. **Replace the placeholder values with your actual PostgreSQL database credentials.**
    ```
    DB_HOST=localhost
    DB_USER=your_postgres_username
    DB_PASSWORD=your_postgres_password
    DB_NAME=todoish
    DB_PORT=5433
    JWT_SECRET=your_super_secret_jwt_key
    ```
    *Ensure you have created a database named `todoish` in PostgreSQL.*

4.  **Start the server:**
    ```bash
    npm start
    ```

5.  **Open the application:**
    The server will start, and you can access the application at [http://localhost:3000](http://localhost:3000).
