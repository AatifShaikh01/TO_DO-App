// Sample task data with dueDate added
const tasks = {
    all: [
        { id: 1, title: 'Math Homework', type: 'school', description: 'Complete algebra exercises on page 45', status: 'pending', dueDate: '2025-08-10T15:00' },
        { id: 2, title: 'Project Meeting', type: 'office', description: 'Prepare presentation for client meeting', status: 'pending', dueDate: '2025-08-09T10:00' },
        { id: 3, title: 'Chest Workout', type: 'gym', description: 'Bench press and incline dumbbell press', status: 'completed', dueDate: '2025-08-07T18:00' },
        { id: 4, title: 'Physics Assignment', type: 'school', description: 'Solve problems on thermodynamics', status: 'pending', dueDate: '2025-08-11T12:00' },
        { id: 5, title: 'Meditation', type: 'fortune', description: '15 minutes of mindfulness meditation', status: 'completed', dueDate: '2025-08-07T20:00' },
        { id: 6, title: 'Group Study', type: 'college', description: 'Prepare for upcoming exams with friends', status: 'pending', dueDate: '2025-08-12T14:00' }
    ],
    school: [
        { id: 1, title: 'Math Homework', type: 'school', description: 'Complete algebra exercises on page 45', status: 'pending', dueDate: '2025-08-10T15:00' },
        { id: 4, title: 'Physics Assignment', type: 'school', description: 'Solve problems on thermodynamics', status: 'pending', dueDate: '2025-08-11T12:00' },
        { id: 7, title: 'English Essay', type: 'school', description: 'Write 500-word essay on climate change', status: 'pending', dueDate: '2025-08-15T17:00' },
        { id: 8, title: 'Science Project', type: 'school', description: 'Prepare materials for chemistry experiment', status: 'completed', dueDate: '2025-08-08T09:00' }
    ],
    college: [
        { id: 6, title: 'Group Study', type: 'college', description: 'Prepare for upcoming exams with friends', status: 'pending', dueDate: '2025-08-12T14:00' },
        { id: 9, title: 'Thesis Research', type: 'college', description: 'Gather sources for literature review', status: 'pending', dueDate: '2025-08-20T16:00' },
        { id: 10, title: 'Lab Report', type: 'college', description: 'Write conclusion for last week\'s experiment', status: 'completed', dueDate: '2025-08-06T11:00' }
    ],
    office: [
        { id: 2, title: 'Project Meeting', type: 'office', description: 'Prepare presentation for client meeting', status: 'pending', dueDate: '2025-08-09T10:00' },
        { id: 11, title: 'Monthly Report', type: 'office', description: 'Compile sales data for March', status: 'pending', dueDate: '2025-08-10T13:00' },
        { id: 12, title: 'Team Lunch', type: 'office', description: 'Organize team lunch for Friday', status: 'completed', dueDate: '2025-08-08T12:00' }
    ],
    gym: [
        { id: 3, title: 'Chest Workout', type: 'gym', description: 'Bench press and incline dumbbell press', status: 'completed', dueDate: '2025-08-07T18:00' },
        { id: 13, title: 'Leg Day', type: 'gym', description: 'Squats and lunges routine', status: 'pending', dueDate: '2025-08-09T17:00' },
        { id: 14, title: 'Cardio', type: 'gym', description: '30 minutes on the treadmill', status: 'pending', dueDate: '2025-08-10T19:00' }
    ],
    fortune: [
        { id: 5, title: 'Meditation', type: 'fortune', description: '15 minutes of mindfulness meditation', status: 'completed', dueDate: '2025-08-07T20:00' },
        { id: 15, title: 'Journaling', type: 'fortune', description: 'Reflect on the week\'s achievements', status: 'pending', dueDate: '2025-08-08T21:00' },
        { id: 16, title: 'Gratitude List', type: 'fortune', description: 'Write down 5 things you\'re grateful for', status: 'completed', dueDate: '2025-08-06T22:00' }
    ]
};

// DOM Elements
const taskContainer = document.getElementById('taskContainer');
const pageTitle = document.querySelector('.page-title');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const themeToggle = document.querySelector('.theme-toggle');
const newTaskBtn = document.querySelector('.btn-new-task');
const editModal = document.getElementById('editModal');
const newTaskModal = document.getElementById('newTaskModal');
const editTaskForm = document.getElementById('editTaskForm');
const newTaskForm = document.getElementById('newTaskForm');
const cancelButtons = document.querySelectorAll('.btn-cancel');

// Initialize the app
function init() {
    loadTasks('all');
    setupEventListeners();
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Load tasks based on type
function loadTasks(type) {
    taskContainer.innerHTML = '';
    pageTitle.textContent = type === 'all' ? 'All Tasks' : `${type.charAt(0).toUpperCase() + type.slice(1)} Tasks`;
    
    const taskList = tasks[type];
    
    taskList.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.dataset.id = task.id;
        taskCard.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <span class="task-type">${task.type}</span>
            <p class="task-description">${task.description}</p>
            <p class="task-due-date">Due: ${formatDate(task.dueDate)}</p>
            <div class="task-actions">
                <span class="task-status status-${task.status}">${task.status}</span>
                <div>
                    ${task.status === 'pending' ? '<button class="task-btn btn-complete">Complete</button>' : ''}
                    <button class="task-btn btn-edit">Edit</button>
                    <button class="task-btn btn-delete">Delete</button>
                </div>
            </div>
        `;
        taskContainer.appendChild(taskCard);
    });
    
    // Add event listeners for buttons
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskCard = e.target.closest('.task-card');
            const taskId = parseInt(taskCard.dataset.id);
            openEditModal(type, taskId);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskCard = e.target.closest('.task-card');
            const taskId = parseInt(taskCard.dataset.id);
            deleteTask(type, taskId);
        });
    });

    document.querySelectorAll('.btn-complete').forEach(button => {
        button.addEventListener('click', (e) => {
            const taskCard = e.target.closest('.task-card');
            const taskId = parseInt(taskCard.dataset.id);
            completeTask(type, taskId);
        });
    });

    // Update active nav link
    updateActiveNavLink(type);
}

// Open edit modal with task details
function openEditModal(type, taskId) {
    const taskList = tasks[type];
    const task = taskList.find(t => t.id === taskId);
    if (task) {
        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDescription').value = task.description;
        document.getElementById('editDueDate').value = task.dueDate || '';
        document.getElementById('editStatus').value = task.status;
        document.getElementById('editTaskId').value = taskId;
        document.getElementById('editTaskType').value = type;
        editModal.classList.add('show');
    }
}

// Complete task
function completeTask(type, taskId) {
    const taskList = tasks[type];
    const taskIndex = taskList.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex].status = 'completed';
        if (type !== 'all') {
            const allTaskIndex = tasks.all.findIndex(t => t.id === taskId);
            if (allTaskIndex !== -1) {
                tasks.all[allTaskIndex].status = 'completed';
            }
        }
        loadTasks(type);
    }
}

// Edit task
function editTask(type, taskId, updatedTask) {
    const taskList = tasks[type];
    const taskIndex = taskList.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex] = { ...taskList[taskIndex], ...updatedTask };
        if (type !== 'all') {
            const allTaskIndex = tasks.all.findIndex(t => t.id === taskId);
            if (allTaskIndex !== -1) {
                tasks.all[allTaskIndex] = { ...tasks.all[allTaskIndex], ...updatedTask };
            }
        }
        loadTasks(type);
    }
}

// Delete task
function deleteTask(type, taskId) {
    tasks[type] = tasks[type].filter(task => task.id !== taskId);
    if (type !== 'all') {
        tasks.all = tasks.all.filter(task => task.id !== taskId);
    }
    loadTasks(type);
}

// Add new task
function addTask(newTask) {
    const taskId = Math.max(...tasks.all.map(t => t.id), 0) + 1;
    const task = { id: taskId, ...newTask };
    tasks[newTask.type].push(task);
    tasks.all.push(task);
    loadTasks(newTask.type);
}

// Update active navigation link
function updateActiveNavLink(type) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === type) {
            link.classList.add('active');
        }
    });
    
    mobileMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === type) {
            link.classList.add('active');
        }
    });
}

// Set up event listeners
function setupEventListeners() {
    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            loadTasks(page);
        });
    });
    
    // Mobile menu link clicks
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            loadTasks(page);
            mobileMenu.classList.remove('show');
        });
    });
    
    // Mobile menu button
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-btn')) {
            mobileMenu.classList.remove('show');
        }
    });

    // New task button
    newTaskBtn.addEventListener('click', () => {
        newTaskModal.classList.add('show');
    });

    // Edit task form submission
    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('editTaskType').value;
        const taskId = parseInt(document.getElementById('editTaskId').value);
        const updatedTask = {
            title: document.getElementById('editTitle').value,
            description: document.getElementById('editDescription').value,
            dueDate: document.getElementById('editDueDate').value,
            status: document.getElementById('editStatus').value
        };
        editTask(type, taskId, updatedTask);
        editModal.classList.remove('show');
    });

    // New task form submission
    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            title: document.getElementById('newTitle').value,
            description: document.getElementById('newDescription').value,
            dueDate: document.getElementById('newDueDate').value,
            type: document.getElementById('newType').value,
            status: 'pending'
        };
        addTask(newTask);
        newTaskModal.classList.remove('show');
        newTaskForm.reset();
    });

    // Cancel buttons for modals
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            editModal.classList.remove('show');
            newTaskModal.classList.remove('show');
            newTaskForm.reset();
        });
    });
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.textContent = isDarkMode ? '🌞' : '🌓';
}

// Check for saved theme preference
function checkThemePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌞';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    checkThemePreference();
    init();
});