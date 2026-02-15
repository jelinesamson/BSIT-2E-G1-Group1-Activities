document.getElementById("currentDate").textContent =
    new Date().toDateString();

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const submitBtn = form.querySelector('button[type="submit"]');
let editingRow = null;

form.addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    if(title === "" || description === "" || priority === "" || dueDate === ""){
        alert("All fields are required.");
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(dueDate);
    selectedDate.setHours(0, 0, 0, 0);
    
    if(selectedDate < today){
        alert("Due date cannot be in the past.");
        return;
    }

    let priorityClass = priority.toLowerCase();

    if(editingRow){
        editingRow.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td class="${priorityClass}">${priority}</td>
            <td>${dueDate}</td>
            <td>${editingRow.children[4].textContent}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                <button class="complete-btn" onclick="completeTask(this)">✔</button>
            </td>
        `;

        if(editingRow.children[4].textContent === "Completed"){
            editingRow.classList.add("completed");
        }

        editingRow = null;
        submitBtn.textContent = "Save Task";
    } else {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td class="${priorityClass}">${priority}</td>
            <td>${dueDate}</td>
            <td>Pending</td>
            <td class="actions">
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
                <button class="complete-btn" onclick="completeTask(this)">✔</button>
            </td>
        `;

        taskList.appendChild(row);
    }
    
    form.reset();
});

function editTask(btn){
    const row = btn.parentElement.parentElement;
    editingRow = row;
    
    document.getElementById("title").value = row.children[0].textContent;
    document.getElementById("description").value = row.children[1].textContent;
    document.getElementById("priority").value = row.children[2].textContent;
    document.getElementById("dueDate").value = row.children[3].textContent;
    
    submitBtn.textContent = "Update Task";
}

function completeTask(btn){
    const row = btn.parentElement.parentElement;
    const status = row.children[4];

    if(status.textContent === "Pending"){
        status.textContent = "Completed";
        row.classList.add("completed");
    } else {
        status.textContent = "Pending";
        row.classList.remove("completed");
    }
}

function deleteTask(btn){
    const row = btn.parentElement.parentElement;
    row.remove();
}
