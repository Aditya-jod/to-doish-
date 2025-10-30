document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    // --- API Helper ---
    const api = {
        get: (endpoint) => fetch(endpoint, { headers: { 'x-auth-token': token } }),
        post: (endpoint, body) => fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(body)
        }),
        put: (endpoint, body) => fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(body)
        }),
        delete: (endpoint) => fetch(endpoint, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        })
    };
    
    // --- Menu and Logout ---
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    const logoutButton = document.getElementById('logout-button');

    if (menuButton) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('hidden');
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/login';
        });
    }

    document.addEventListener('click', (e) => {
        if (menuDropdown && !menuDropdown.classList.contains('hidden') && !menuButton.contains(e.target)) {
            menuDropdown.classList.add('hidden');
        }
    });

    // --- State Management ---
    let tasks = [];
    let currentFilter = 'all';
    let notesTimeout;

    // --- DOM Selectors ---
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('current-date');
    const progressCircle = document.getElementById('progress-circle');
    const progressText = document.getElementById('progress-text');
    
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const emptyState = document.getElementById('empty-state');
    const emptyStartMessage = document.getElementById('empty-start-message');
    const emptyCelebrateMessage = document.getElementById('empty-celebrate-message');
    
    const totalTasksEl = document.getElementById('total-tasks');
    const pendingTasksEl = document.getElementById('pending-tasks');
    const completedTasksEl = document.getElementById('completed-tasks');
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    
    const categoryDropdownBtn = document.getElementById('category-dropdown-btn');
    const categoryOptions = document.getElementById('category-options');

    const routineList = document.getElementById('routine-list');
    const addRoutineForm = document.getElementById('add-routine-form');
    const routineInput = document.getElementById('routine-input');

    // --- Core Functions ---
    const fetchTasks = async () => {
        try {
            const res = await api.get('/api/tasks');
            if (res.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }
            if (!res.ok) throw new Error('Failed to fetch tasks');
            tasks = await res.json();
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRoutines = async () => {
        try {
            const res = await api.get('/api/routines');
            if (!res.ok) throw new Error('Failed to fetch routines');
            const routines = await res.json();
            renderRoutines(routines);
        } catch (error) {
            console.error(error);
        }
    };

    // --- Render Functions ---
    const renderTasks = () => {
         const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'pending') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });
        if (taskList) taskList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
             if (emptyState) emptyState.classList.remove('hidden');
             if (taskList) taskList.classList.add('hidden');
            if (tasks.length > 0) {
                if (emptyStartMessage) emptyStartMessage.classList.add('hidden');
                if (emptyCelebrateMessage) emptyCelebrateMessage.classList.remove('hidden');
            } else {
                if (emptyStartMessage) emptyStartMessage.classList.remove('hidden');
                if (emptyCelebrateMessage) emptyCelebrateMessage.classList.add('hidden');
            }
        } else {
             if (emptyState) emptyState.classList.add('hidden');
             if (taskList) taskList.classList.remove('hidden');
            filteredTasks.forEach((task, index) => {
                const li = document.createElement('li');
                const categoryStyles = getCategoryStyles(task.category);
                const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const capitalizedCategory = task.category.charAt(0).toUpperCase() + task.category.slice(1);
                li.className = `task-item flex items-center card-panel p-3 rounded-lg ${categoryStyles.border} ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;
                li.style.animationDelay = `${index * 50}ms`;
                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} class="custom-checkbox mr-4 flex-shrink-0">
                    <div class="flex-grow">
                        <p class="leading-snug">${task.text}</p>
                        <div class="flex items-center mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <span class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${categoryStyles.badge}">${capitalizedCategory}</span>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    <div class="task-actions space-x-1 ml-2 flex-shrink-0">
                        <button class="edit-btn p-2 text-zinc-400 hover:text-yellow-500 rounded-full transition-colors"><i data-lucide="pencil" class="w-4 h-4"></i></button>
                        <button class="delete-btn p-2 text-zinc-400 hover:text-red-500 rounded-full transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>`;
                if (taskList) taskList.appendChild(li);
            });
        }
        lucide.createIcons();
        updateStats();
    };

    const renderRoutines = (routines) => {
        if (!routineList) return;
        routineList.innerHTML = '';
        if (routines.length === 0) {
            routineList.innerHTML = '<p class="text-zinc-400 text-sm text-center col-span-full">No routines added yet.</p>';
            return;
        }
        routines.forEach(routine => {
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between bg-zinc-100 dark:bg-zinc-700/50 p-2 rounded-md';
            div.dataset.id = routine.id;
            div.innerHTML = `
                <span class="text-sm">${routine.text}</span>
                <button class="delete-routine-btn text-zinc-400 hover:text-red-500 transition-colors p-1">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            `;
            routineList.appendChild(div);
        });
        lucide.createIcons();
    };

    const updateStats = () => {
        const total = tasks.length;
        const completedCount = tasks.filter(task => task.completed).length;
        const percent = total > 0 ? (completedCount / total) * 100 : 0;
        
        if (totalTasksEl) totalTasksEl.textContent = total;
        if (pendingTasksEl) pendingTasksEl.textContent = total - completedCount;
        if (completedTasksEl) completedTasksEl.textContent = completedCount;

        if (progressCircle) {
            const radius = progressCircle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        }
        if (progressText) progressText.textContent = `${Math.round(percent)}%`;
    };

    const getCategoryStyles = (category) => {
         const styles = {
            personal: { badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300', border: 'border-l-indigo-500' },
            startup: { badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', border: 'border-l-purple-500' },
            learning: { badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', border: 'border-l-yellow-500' },
            goals: { badge: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', border: 'border-l-red-500' },
            default: { badge: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-300', border: 'border-l-zinc-500' }
        };
        return styles[category] || styles.default;
    };

    // --- Task Handlers ---
    const toggleTaskComplete = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        try {
            const res = await api.put(`/api/tasks/${id}`, { completed: !task.completed });
            if (!res.ok) throw new Error('Failed to update task');
            const updatedTask = await res.json();
            
            const taskIndex = tasks.findIndex(t => t.id === id);
            tasks[taskIndex] = updatedTask;
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const addTask = async (text, category) => {
        try {
            const res = await api.post('/api/tasks', { text, category });
            if (!res.ok) throw new Error('Failed to add task');
            const newTask = await res.json();
            tasks.unshift(newTask);
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await api.delete(`/api/tasks/${id}`);
            if (!res.ok) throw new Error('Failed to delete task');
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        } catch (error) {
            console.error(error);
        }
    };
    
    const editTask = async (id, li) => {
        const task = tasks.find(t => t.id === id);
        const p = li.querySelector('p');
        const originalText = task.text;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-500 rounded p-1 focus:ring-1 focus:ring-primary-500 focus:outline-none';
        
        li.classList.add('editing');
        p.replaceWith(input);
        input.focus();
        input.select();

        const saveEdit = async () => {
            const newText = input.value.trim();
            if (newText && newText !== originalText) {
                try {
                    const res = await api.put(`/api/tasks/${id}`, { text: newText });
                    if (!res.ok) throw new Error('Failed to save edit');
                    const updatedTask = await res.json();
                    const taskIndex = tasks.findIndex(t => t.id === id);
                    tasks[taskIndex] = updatedTask;
                } catch (error) {
                    console.error(error);
                    // Revert on failure
                    task.text = originalText;
                }
            }
            renderTasks(); 
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
            if (e.key === 'Escape') {
                input.value = originalText;
                input.blur();
            }
        });
    };

    // --- Routine Handlers ---
    const addRoutine = async (text) => {
        try {
            const res = await api.post('/api/routines', { text });
            if (!res.ok) throw new Error('Failed to add routine');
            await fetchRoutines(); // Refetch all routines to render
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRoutine = async (id) => {
        try {
            const res = await api.delete(`/api/routines/${id}`);
            if (!res.ok) throw new Error('Failed to delete routine');
            await fetchRoutines(); // Refetch all routines to render
        } catch (error) {
            console.error(error);
        }
    };

    // --- Event Listeners ---
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskText = taskInput.value.trim();
            const category = document.getElementById('category-dropdown-btn').dataset.value;
            if (taskText) {
                addTask(taskText, category);
                taskInput.value = '';
            }
        });
    }

    if (addRoutineForm) {
        addRoutineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const routineText = routineInput.value.trim();
            if (routineText) {
                addRoutine(routineText);
                routineInput.value = '';
            }
        });
    }

    if (routineList) {
        routineList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-routine-btn');
            if (deleteBtn) {
                const routineEl = e.target.closest('div[data-id]');
                const id = Number(routineEl.dataset.id);
                deleteRoutine(id);
            }
        });
    }

    if (taskList) {
        taskList.addEventListener('click', (e) => {
            const li = e.target.closest('li.task-item');
            if (!li) return;
            const id = Number(li.dataset.id);

            if (e.target.type === 'checkbox') {
                toggleTaskComplete(id);
            } else if (e.target.closest('.delete-btn')) {
                li.style.animation = 'none';
                setTimeout(() => {
                    li.style.transform = 'translateX(100%)';
                    li.style.opacity = '0';
                }, 10);
                setTimeout(() => deleteTask(id), 300);
            } else if (e.target.closest('.edit-btn')) {
                editTask(id, li);
            }
        });
    }
    
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentActive = document.querySelector('.filter-btn.bg-primary-500');
            if (currentActive) {
                currentActive.classList.remove('bg-primary-500', 'text-white');
            }
            e.target.classList.add('bg-primary-500', 'text-white');
            currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateThemeToggleIcons(isDark);
        });
    }

    function updateThemeToggleIcons(isDark) {
        if (themeIconLight) themeIconLight.classList.toggle('hidden', isDark);
        if (themeIconDark) themeIconDark.classList.toggle('hidden', !isDark);
    }
    
    const notesTextarea = document.getElementById('notes');
    if (notesTextarea) {
        notesTextarea.addEventListener('input', () => {
             clearTimeout(notesTimeout);
             notesTimeout = setTimeout(() => {
                 localStorage.setItem('smart-todo-notes', notesTextarea.value);
                 const indicator = document.getElementById('notes-saved-indicator');
                 if(indicator) {
                    indicator.classList.remove('opacity-0');
                    setTimeout(() => indicator.classList.add('opacity-0'), 1500);
                 }
             }, 500);
        });
    }

    const deleteAllBtn = document.getElementById('delete-all-btn');
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', async () => {
            const toDelete = tasks.map(t => t.id);
            try {
                await Promise.all(toDelete.map(id => api.delete(`/api/tasks/${id}`)));
                tasks = [];
                renderTasks();
            } catch (error) {
                console.error("Failed to delete all tasks", error);
            }
        });
    }

    const deleteCompletedBtn = document.getElementById('delete-completed-btn');
    if (deleteCompletedBtn) {
        deleteCompletedBtn.addEventListener('click', async () => {
            const toDelete = tasks.filter(t => t.completed).map(t => t.id);
            try {
                await Promise.all(toDelete.map(id => api.delete(`/api/tasks/${id}`)));
                tasks = tasks.filter(t => !t.completed);
                renderTasks();
            } catch (error) {
                console.error("Failed to delete completed tasks", error);
            }
        });
    }
     
    if (categoryDropdownBtn) {
        categoryDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryOptions.classList.toggle('hidden');
        });
    }
    if (categoryOptions) {
        categoryOptions.addEventListener('click', (e) => {
            if(e.target.tagName === 'LI') {
               document.getElementById('selected-category-text').textContent = e.target.textContent;
               categoryDropdownBtn.dataset.value = e.target.dataset.value;
               categoryOptions.classList.add('hidden');
           }
        });
    }
    document.addEventListener('click', (e) => {
        const dropdownContainer = document.getElementById('custom-category-dropdown');
        if (categoryOptions && !categoryOptions.classList.contains('hidden') && dropdownContainer && !dropdownContainer.contains(e.target)) {
            categoryOptions.classList.add('hidden');
        }
    });

    // --- Initial Load ---
    const initializeApp = () => {
        if (greetingEl) greetingEl.textContent = new Date().getHours() < 12 ? "Good morning!" : new Date().getHours() < 18 ? "Good afternoon!" : "Good evening!";
        if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', isDark);
        updateThemeToggleIcons(isDark);

        if (notesTextarea) {
            notesTextarea.value = localStorage.getItem('smart-todo-notes') || '';
        }
        
        fetchTasks();
        fetchRoutines();
        lucide.createIcons();
    };

    initializeApp();
});