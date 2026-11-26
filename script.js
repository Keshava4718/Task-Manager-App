/* =================================
   1. DOM ELEMENTS
================================= */

const input = document.querySelector("#task_input");
const add_btn = document.querySelector("#add_task");

const task_area = document.querySelector("#task_area");
const ul = document.querySelector("#task_list");

const len = document.querySelector("#len");
const complete_len = document.querySelector("#task_complete");
const incomplete_len = document.querySelector("#task_not_complete");

/* =================================
   2. INITIAL VALUES
================================= */

let complete_count = 0;

/* =================================
   3. UPDATE STATISTICS
================================= */

function updateValues() {
  const total = ul.children.length;

  const remaining = total - complete_count;

  len.textContent = total;
  complete_len.textContent = complete_count;
  incomplete_len.textContent = remaining;

  task_area.style.display = total > 0 ? "block" : "none";
}

/* =================================
   4. ADD TASK
================================= */

function addTask(task) {
  const li = document.createElement("li");

  const textname = document.createElement("span");
  textname.textContent = task;
  textname.classList.add("task-name");

  // Button container

  const buttons_set = document.createElement("span");
  buttons_set.className = "btn_set";

  // Create buttons

  const undo_btn = document.createElement("button");
  const complete_btn = document.createElement("button");
  const delete_btn = document.createElement("button");

  // Button text

  undo_btn.textContent = "↩";
  complete_btn.textContent = "✔";
  delete_btn.textContent = "✘";

  // Button classes

  undo_btn.classList.add("undo-btn");
  complete_btn.classList.add("complete-btn");
  delete_btn.classList.add("delete-btn");

  // Initial button states

  undo_btn.disabled = true;
  complete_btn.disabled = false;

  // Accessibility labels

  undo_btn.setAttribute("aria-label", "Undo completion");
  complete_btn.setAttribute("aria-label", "Complete task");
  delete_btn.setAttribute("aria-label", "Delete task");

  // Append buttons

  buttons_set.append(undo_btn, complete_btn, delete_btn);

  // Append task elements

  li.append(textname, buttons_set);

  ul.append(li);

  // Update UI

  updateValues();

  input.focus();
}

/* =================================
   5. TASK BUTTON EVENT DELEGATION
================================= */

ul.addEventListener("click", function (event) {
  const li = event.target.closest("li");

  if (!li || !ul.contains(li)) return;

  // COMPLETE TASK

  if (event.target.classList.contains("complete-btn")) {
    if (li.classList.contains("completed")) return;

    li.classList.add("completed");

    li.querySelector(".task-name").classList.add("cut");

    event.target.disabled = true;

    li.querySelector(".undo-btn").disabled = false;

    complete_count++;

    updateValues();
  }

  // UNDO TASK
  else if (event.target.classList.contains("undo-btn")) {
    if (!li.classList.contains("completed")) return;

    li.classList.remove("completed");

    li.querySelector(".task-name").classList.remove("cut");

    li.querySelector(".complete-btn").disabled = false;

    event.target.disabled = true;

    complete_count--;

    updateValues();
  }

  // DELETE TASK
  else if (event.target.classList.contains("delete-btn")) {
    if (li.classList.contains("completed")) {
      complete_count--;
    }

    li.remove();

    updateValues();
  }
});

/* =================================
   6. ADD BUTTON EVENT
================================= */

add_btn.addEventListener("click", function () {
  const newtask = input.value.trim();

  // Prevent empty tasks

  if (newtask === "") {
    input.focus();
    return;
  }

  addTask(newtask);

  input.value = "";

  input.focus();
});

/* =================================
   7. ENTER KEY SUPPORT
================================= */

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    add_btn.click();
  }
});
