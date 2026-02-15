// Global variables
let tasksArray = [];
let editingTaskIndex = null;
let isEditMode = false;

// DOM elements
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskPrioritySelect = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');
const submitButton = document.getElementById('submit-btn');
const cancelButton = document.getElementById('cancel-btn');
const tasksTbody = document.getElementById('tasks-tbody');
const currentDateElement = document.getElementById('current-date');

// Initialize app
function initializeApp() {
    displayCurrentDate();
    loadTasksFromStorage();
    renderTasks();
    setMinimumDate();
}

// Display date
function displayCurrentDate() {
    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Set minimum date
function setMinimumDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minimumDate = `${year}-${month}-${day}`;
    taskDueDateInput.setAttribute('min', minimumDate);
}

// Load tasks
function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem('studentTasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
    }
}

// Save tasks
function saveTasksToStorage() {
    localStorage.setItem('studentTasks', JSON.stringify(tasksArray));
}

// Form submit
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate fields
    if (!validateForm()) {
        return;
    }
    
    // Validate date
    if (!validateDueDate()) {
        return;
    }
    
    if (isEditMode) {
        updateTask();
    } else {
        addNewTask();
    }
});

// Validate form
function validateForm() {
    const titleValue = taskTitleInput.value.trim();
    const descriptionValue = taskDescriptionInput.value.trim();
    const priorityValue = taskPrioritySelect.value;
    const dueDateValue = taskDueDateInput.value;
    
    if (titleValue === '') {
        alert('Please enter a task title.');
        taskTitleInput.focus();
        return false;
    }
    
    if (descriptionValue === '') {
        alert('Please enter a task description.');
        taskDescriptionInput.focus();
        return false;
    }
    
    if (priorityValue === '') {
        alert('Please select a priority level.');
        taskPrioritySelect.focus();
        return false;
    }
    
    if (dueDateValue === '') {
        alert('Please select a due date.');
        taskDueDateInput.focus();
        return false;
    }
    
    return true;
}

// Validate date
function validateDueDate() {
    const selectedDate = new Date(taskDueDateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Due date cannot be in the past. Please select today or a future date.');
        taskDueDateInput.focus();
        return false;
    }
    
    return true;
}

// Add task
function addNewTask() {
    const newTask = {
        id: Date.now(),
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        priority: taskPrioritySelect.value,
        dueDate: taskDueDateInput.value,
        status: 'Pending',
        completed: false
    };
    
    tasksArray.push(newTask);
    saveTasksToStorage();
    renderTasks();
    resetForm();
    showSuccessMessage('Task added!');
}

// Edit task
function editTask(taskIndex) {
    isEditMode = true;
    editingTaskIndex = taskIndex;
    const taskToEdit = tasksArray[taskIndex];
    
    // Populate form
    taskTitleInput.value = taskToEdit.title;
    taskDescriptionInput.value = taskToEdit.description;
    taskPrioritySelect.value = taskToEdit.priority;
    taskDueDateInput.value = taskToEdit.dueDate;
    
    // Update buttons
    submitButton.textContent = 'Update Task';
    submitButton.className = 'btn-save';
    cancelButton.style.display = 'inline-block';
    
    // Scroll up
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update task
function updateTask() {
    tasksArray[editingTaskIndex] = {
        ...tasksArray[editingTaskIndex],
        title: taskTitleInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        priority: taskPrioritySelect.value,
        dueDate: taskDueDateInput.value
    };
    
    saveTasksToStorage();
    renderTasks();
    resetForm();
    showSuccessMessage('Task updated!');
}

// Delete task
function deleteTask(taskIndex) {
    const taskToDelete = tasksArray[taskIndex];
    
    if (confirm(`Delete "${taskToDelete.title}"?`)) {
        tasksArray.splice(taskIndex, 1);
        saveTasksToStorage();
        renderTasks();
        showSuccessMessage('Task deleted!');
    }
}

// Toggle complete
function toggleComplete(taskIndex) {
    tasksArray[taskIndex].completed = !tasksArray[taskIndex].completed;
    tasksArray[taskIndex].status = tasksArray[taskIndex].completed ? 'Completed' : 'Pending';
    saveTasksToStorage();
    renderTasks();
}

// Render tasks
function renderTasks() {
    tasksTbody.innerHTML = '';
    
    if (tasksArray.length === 0) {
        displayEmptyState();
        return;
    }
    
    tasksArray.forEach((task, index) => {
        const taskRow = createTaskRow(task, index);
        tasksTbody.appendChild(taskRow);
    });
}

// Create row
function createTaskRow(task, index) {
    const row = document.createElement('tr');
    
    // Apply styling
    if (task.completed) {
        row.classList.add('completed-task');
    }
    
    row.innerHTML = `
        <td>${escapeHtml(task.title)}</td>
        <td>${escapeHtml(task.description)}</td>
        <td><span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
        <td>${formatDate(task.dueDate)}</td>
        <td><span class="status-badge status-${task.status.toLowerCase()}">${task.status}</span></td>
        <td class="task-actions">
            <button class="btn-complete" onclick="toggleComplete(${index})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="btn-edit" onclick="editTask(${index})" ${task.completed ? 'disabled' : ''}>
                Edit
            </button>
            <button class="btn-delete" onclick="deleteTask(${index})">
                Delete
            </button>
        </td>
    `;
    
    return row;
}

// Empty state
function displayEmptyState() {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-state';
    emptyRow.innerHTML = `
        <td colspan="6">
            <p style="font-size: 1.2em; margin-bottom: 10px;">📝 No tasks yet!</p>
            <p>Create your first task using the form above.</p>
        </td>
    `;
    tasksTbody.appendChild(emptyRow);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Reset form
function resetForm() {
    taskForm.reset();
    isEditMode = false;
    editingTaskIndex = null;
    submitButton.textContent = 'Save Task';
    submitButton.className = 'btn-save';
    cancelButton.style.display = 'none';
}

// Cancel button
cancelButton.addEventListener('click', function() {
    resetForm();
});

// Success message
function showSuccessMessage(message) {
    const originalTitle = document.querySelector('header h1').textContent;
    document.querySelector('header h1').textContent = message;
    setTimeout(() => {
        document.querySelector('header h1').textContent = originalTitle;
    }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', initializeApp);;