# To-Doish: A Full-Stack Smart To-Do Dashboard

Welcome to To-Doish, a modern and intuitive full-stack to-do list application designed to help you organize your tasks, track your progress, and stay motivated. This web-based dashboard features a secure backend, a persistent database, and a clean, responsive user interface.

## Key Features

- **Full-Stack Architecture:** Built with a robust Node.js and Express backend, ensuring reliable and scalable performance.
- **Persistent Database Storage:** User data, including tasks and routines, is securely stored in a PostgreSQL database, allowing access from any device.
- **Secure User Authentication:** A complete login and registration system using JSON Web Tokens (JWT) keeps user data private and secure. Passwords are encrypted using `bcryptjs`.
- **Dynamic Task Management:** Add, edit, and delete tasks with ease. Mark tasks as complete and watch your progress update in real-time.
- **Task Categorization:** Assign categories (Personal, Startup, Learning, Goals) to your tasks for better organization.
- **Daily Routine Tracker:** Manage and persist your daily habits separately from your main tasks.
- **Progress Visualization:** A dynamic progress circle and statistics panel provide an at-a-glance view of your daily achievements.
- **Dark & Light Mode:** Switch between themes for your viewing comfort.
- **Responsive Design:** The layout is optimized for both desktop and mobile devices.

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
