let editingRow = null;

document.getElementById('saveTaskBtn').addEventListener('click', function () {
    // Get input values
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    // Validities
    // not work if not complete input
    if (!title || !desc || priority === "Select Priority" || !dueDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Valid date
    const today = new Date();
    const todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

    if (dueDate < todayString) {
        alert("You cannot add a task with a past due date.");
        return;
    }

    // class priority color
    let priorityClass = "";
    if (priority === "High") {
        p
        ty-high";
    } else if (priority === "Medium") {
        priorityClass = "priority-medium";
    } else if (priority === "Low") {
        priorityClass = "priority-low";
    }

    if (editingRow) {
        // Update existing row
        editingRow.cells[0].textContent = title;
        editingRow.cells[1].textContent = desc;
        editingRow.cells[2].textContent = priority;
        editingRow.cells[2].className = priorityClass;
        editingRow.cells[3].textContent = dueDate;

        // Condition
        editingRow = null;
        document.getElementById('saveTaskBtn').textContent = 'Save Task';
    } else {
        // Creating tables
        const tableBody = document.getElementById('taskTableBody');
        const newRow = document.createElement('tr');

        // table data
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${desc}</td>
            <td class="${priorityClass}">${priority}</td>
            <td>${dueDate}</td>
            <td><span class="badge bg-secondary">Pending</span></td>
            <td>
                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                <button class="btn btn-success btn-sm done-btn">✓</button>
            </td>
        `;

        // Append add the row to the table
        tableBody.appendChild(newRow);

        //-------------------------event listeners----------------------------
        //delete
        newRow.querySelector('.delete-btn').addEventListener('click', function () {
            newRow.remove();
        });

        //done
        newRow.querySelector('.done-btn').addEventListener('click', function () {
            newRow.querySelector('.badge').textContent = "Done";
            newRow.querySelector('.badge').classList.remove('bg-secondary');
            newRow.querySelector('.badge').classList.add('bg-success');

            // strike putter
            newRow.classList.add("gray");
            newRow.cells[0].style.textDecoration = "line-through";
            newRow.cells[1].style.textDecoration = "line-through";
            newRow.cells[2].style.textDecoration = "line-through";
            newRow.cells[3].style.textDecoration = "line-through";
            newRow.cells[5].style.textDecoration = "line-through";
        });

        //edit
        newRow.querySelector('.edit-btn').addEventListener('click', function () {
            const title = newRow.querySelector('td:nth-child(1)').textContent;
            const desc = newRow.querySelector('td:nth-child(2)').textContent;
            const priority = newRow.querySelector('td:nth-child(3)').textContent;
            const dueDate = newRow.querySelector('td:nth-child(4)').textContent;

            document.getElementById('taskTitle').value = title;
            document.getElementById('taskDesc').value = desc;
            document.getElementById('taskPriority').value = priority;
            document.getElementById('taskDueDate').value = dueDate;

            editingRow = newRow;
            document.getElementById('saveTaskBtn').textContent = 'Update Task';
        });
    }

    // Clear specific input
    document.getElementById('taskTitle').value = "";
    document.getElementById('taskDesc').value = "";
    document.getElementById('taskPriority').value = "";
    document.getElementById('taskDueDate').value = "";
});
