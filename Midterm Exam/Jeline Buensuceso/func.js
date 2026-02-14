const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskTitle = document.getElementById("taskTitle").value.trim();
  const taskDescrip = document.getElementById("taskDescrip").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  const err = document.getElementById("err");
  err.innerText = "";

  if (!taskTitle || !taskDescrip || !dueDate || !priority) {
    err.innerText = "Please fill all fields!";
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const inputDate = new Date(dueDate);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    err.innerText = "Due date cannot be in the past!";
    return false;
  }

  addTask(taskTitle, taskDescrip, dueDate, priority);

  form.reset();
});

function addTask(name, desc, date, priority) {
  const row = document.createElement("tr");

  const badgeColor =
    priority === "High"
      ? "danger"
      : priority === "Medium"
        ? "warning"
        : "success";

  row.innerHTML = `
    <td>${name}</td>
    <td>${desc}</td>
    <td><span class="badge bg-${badgeColor}">${priority}</span></td>
    <td>${date}</td>
    <td class="status-cell">
      <span class="status-text">Pending</span>
    </td>
    <td>
      <button class="btn btn-sm btn-primary" onclick="editTask(this)">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
      <button class="btn btn-sm btn-success" onclick="markDone(this)">Done</button>
    </td>
  `;

  taskList.appendChild(row);
}

// DELETE TASK
function deleteTask(btn) {
  if (confirm("Are you sure?")) {
    btn.closest("tr").remove();
  }
}

// EDIT TASK (can only edit name, description, priority, due date)
function editTask(btn) {
  const row = btn.closest("tr");

  // If already completed, cannot edit
  const status = row.querySelector(".status-text").innerText;
  if (status === "Completed") return;

  const name = row.children[0].innerText;
  const desc = row.children[1].innerText;
  const priority = row.children[2].innerText;
  const date = row.children[3].innerText;

  row.children[0].innerHTML = `<input type="text" class="form-control" value="${name}">`;
  row.children[1].innerHTML = `<input type="text" class="form-control" value="${desc}">`;

  row.children[2].innerHTML = `
    <select class="form-select">
      <option ${priority === "High" ? "selected" : ""}>High</option>
      <option ${priority === "Medium" ? "selected" : ""}>Medium</option>
      <option ${priority === "Low" ? "selected" : ""}>Low</option>
    </select>
  `;

  row.children[3].innerHTML = `<input type="date" class="form-control" value="${date}">`;

  btn.innerText = "Save";
  btn.classList.replace("btn-primary", "btn-success");
  btn.onclick = function () {
    saveTask(btn);
  };
}

function saveTask(btn) {
  const row = btn.closest("tr");

  const name = row.children[0].querySelector("input").value.trim();
  const desc = row.children[1].querySelector("input").value.trim();
  const priority = row.children[2].querySelector("select").value;
  const date = row.children[3].querySelector("input").value;

  if (!name || !desc || !priority || !date) {
    alert("Please fill all fields!");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    alert("Due date cannot be in the past!");
    return;
  }

  const badgeColor =
    priority === "High"
      ? "danger"
      : priority === "Medium"
        ? "warning"
        : "success";

  // UPDATE ROW
  row.children[0].innerHTML = name;
  row.children[1].innerHTML = desc;
  row.children[2].innerHTML = `<span class="badge bg-${badgeColor}">${priority}</span>`;
  row.children[3].innerHTML = date;

  btn.innerText = "Edit";
  btn.classList.replace("btn-success", "btn-primary");
  btn.onclick = function () {
    editTask(btn);
  };
}

function markDone(btn) {
  const row = btn.closest("tr");

  row.querySelector(".status-text").innerText = "Completed";

  row.classList.add("table-success");
  row.children[0].classList.add("completed");
  row.children[1].classList.add("completed");

  const editBtn = row.querySelector(".btn-primary");
  editBtn.disabled = true;

  btn.disabled = true;
}
