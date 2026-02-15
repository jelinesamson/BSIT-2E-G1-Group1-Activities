const currentDate = new Date();
document.getElementById('currentDate').textContent = currentDate.toDateString();

const taskForm = document.getElementById('taskForm');
const taskTableBody = document.getElementById('taskTableBody');
const warningMsg = document.getElementById('warningMsg');

let tasks = [];

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;

    if (!title || !description || !priority || !dueDate) {
        warningMsg.textContent = "Please fill in all fields.";
        return;
    }
    warningMsg.textContent = "";

    const task = { title, description, priority, dueDate, completed: false };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskTableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        if (task.completed) row.classList.add('completed');

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${task.dueDate}</td>
            <td>${task.completed ? "Done ✅" : "Pending ⏳"}</td>
            <td>
                <button class="actionBtn completeBtn" onclick="toggleComplete(${index})">Done ✅</button>
                <button class="actionBtn editBtn" onclick="editTask(${index})">Edit ✏️</button>
                <button class="actionBtn deleteBtn" onclick="deleteTask(${index})">Remove 🗑️</button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('priority').value = task.priority;
    document.getElementById('dueDate').value = task.dueDate;

    tasks.splice(index, 1);
    renderTasks();
}
