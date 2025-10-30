# To-Doish: A Smart To-Do Dashboard

Welcome to To-Doish, a modern and intuitive to-do list application designed to help you organize your tasks, track your progress, and stay motivated. This web-based dashboard provides a clean, three-column layout that separates daily routines, project tasks, and personal stats, creating a holistic view of your productivity.

## Key Features

- **Dynamic Task Management:** Add, edit, and delete tasks with ease. Mark tasks as complete and watch your progress update in real-time.
- **Task Categorization:** Assign categories (Personal, Startup, Learning, Goals) to your tasks for better organization.
- **Daily Routine Tracker:** Manage your daily habits separately from your main tasks.
- **Gamified Progress:** Earn points for completing tasks and routines, and build up a daily completion streak to stay motivated.
- **Progress Visualization:** A dynamic progress circle and statistics panel provide an at-a-glance view of your daily achievements.
- **Dark & Light Mode:** Switch between themes for your viewing comfort.
- **Inspirational Quotes:** Get a new dose of motivation every time you load the dashboard.
- **Persistent Storage:** Your tasks and stats are saved in the browser's `localStorage`, so your data is preserved between sessions.
- **Responsive Design:** The layout is optimized for both desktop and mobile devices.

## File Structure

The project is organized into a clean and professional structure, separating the frontend assets from the server logic.

```
to-doish/
├── public/
│   ├── css/
│   │   └── style.css       # Main stylesheet for the application
│   └── js/
│       └── main.js         # Core JavaScript logic for the dashboard
├── views/
│   └── index.html          # The main dashboard HTML file
├── .gitignore              # Specifies files for Git to ignore
├── index.html              # The landing page for the application
├── package.json            # Project metadata and dependencies
├── README.md               # This file
└── server.js               # Express server to run the application
```

- **`public/`**: Contains all static assets that are served to the client.
  - **`css/`**: Holds the stylesheets.
  - **`js/`**: Contains the client-side JavaScript files.
- **`views/`**: Contains the main HTML file for the to-do list dashboard.
- **`index.html`**: The main landing page for the project.
- **`server.js`**: A simple Node.js Express server that serves the static files and the HTML pages.
- **`package.json`**: Defines the project's dependencies and scripts.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd to-doish
    ```

2.  **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command in the root directory of the project:
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```

4.  **Open the application:**
    The server will start, and you can access the application at [http://localhost:3000](http://localhost:3000).

---

This `README.md` file will now be a part of your project, making it much more professional and easier to manage.
