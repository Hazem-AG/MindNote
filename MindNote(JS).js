const MindNote = document.querySelector(".MindNote");
//?--------------------(Pages)----------------------------//
const DashbordButton = document.getElementById("Dashbord");
const NoteButton = document.getElementById("Note");
const ToDoButton = document.getElementById("Project");
const ProfileButton = document.getElementById("Profile");
const AboutButton = document.getElementById("About");
//-------------------------------------------------------//

DashbordButton.addEventListener("click", () => {
  MindNote.classList.add("activeDashbord");
  MindNote.classList.remove(
    "activeNote",
    "activeProject",
    "activeProfile",
    "activeAbout"
  );
});
NoteButton.addEventListener("click", () => {
  MindNote.classList.remove(
    "activeDashbord",
    "activeProject",
    "activeProfile",
    "activeAbout"
  );
  MindNote.classList.add("activeNote");
});
ToDoButton.addEventListener("click", () => {
  MindNote.classList.remove(
    "activeDashbord",
    "activeNote",
    "activeProfile",
    "activeAbout"
  );
  MindNote.classList.add("activeProject");
});
ProfileButton.addEventListener("click", () => {
  MindNote.classList.remove(
    "activeDashbord",
    "activeNote",
    "activeProject",
    "activeAbout"
  );
  MindNote.classList.add("activeProfile");
});
AboutButton.addEventListener("click", () => {
  MindNote.classList.remove(
    "activeDashbord",
    "activeNote",
    "activeProject",
    "activeProfile"
  );
  MindNote.classList.add("activeAbout");
});

//?--------------------(SginIN-UP)-------------------------//
const SGINinLink = document.querySelector(".SGINin-Link");
const SGINupLink = document.querySelector(".SGINup-Link");
const Submit = document.querySelector(".Submit-Link");
const logout = document.querySelector(".Logout-Link");
//-------------------------------------------------------//

Submit.addEventListener("click", () => {
  MindNote.classList.add("activeSubmit");
});
logout.addEventListener("click", () => {
  MindNote.classList.remove("activeSubmit", "activeProfile");
});
SGINupLink.addEventListener("click", () => {
  MindNote.classList.add("activeSginUp");
});
SGINinLink.addEventListener("click", () => {
  MindNote.classList.remove("activeSginUp");
});
//!-------------------------------------------------(NOTE Page)---------------------------//
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
//?-----------------------------------------------------------(Project Page)---------------------//

function openCreateProjectPopup() {
  const createProjectPopup = document.getElementById("createProjectPopup");
  createProjectPopup.style.display = "block";
}

function createProjectFromPopup() {
  const projectName = document.getElementById("projectName").value;

  const newProject = createProject(projects.length + 1, projectName);
  projects.push(newProject);

  const createProjectPopup = document.getElementById("createProjectPopup");
  createProjectPopup.style.display = "none";
}
function showModalPrompt(message) {
  const modalPrompt = document.createElement("div");
  modalPrompt.classList.add("modal");

  const promptText = document.createElement("p");
  promptText.textContent = message;

  const inputField = document.createElement("input");
  inputField.type = "text";

  const closeButton = document.createElement("button");
  closeButton.textContent = "OK";
  closeButton.onclick = function () {
    modalPrompt.style.display = "none";
  };

  modalPrompt.appendChild(promptText);
  modalPrompt.appendChild(inputField);
  modalPrompt.appendChild(closeButton);

  document.body.appendChild(modalPrompt);

  modalPrompt.style.display = "block";

  return new Promise((resolve) => {
    closeButton.addEventListener("click", function () {
      resolve(inputField.value);
      modalPrompt.remove();
    });
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

let editingTodoLabel = null;
let projects = [];

function showCreateProjectPopup() {
  const editPopup = document.getElementById("editPopup");
  editPopup.classList.add("show");
  document.getElementById("projectName").focus();
}

function createProjects() {
  const numberOfProjects = parseInt(
    document.getElementById("numberOfProjects").value
  );

  const projectsContainer = document.getElementById("projectsContainer");
  projectsContainer.innerHTML = "";

  for (let i = 1; i <= numberOfProjects; i++) {
    projects.push(createProject(i));
  }
}

function createProject(projectNumber) {
  const project = {
    months: [],
  };

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project");

  const projectHeader = document.createElement("h2");
  projectHeader.innerHTML = `Project ${projectNumber} <span class="toggle" onclick="toggleProject(${projectNumber})">&#x25BC;</span>`;
  projectContainer.appendChild(projectHeader);

  const projectContent = document.createElement("div");
  projectContent.classList.add("project-container");
  projectContainer.appendChild(projectContent);

  const numberOfMonths = prompt(
    `Enter the number of months for Project ${projectNumber}:`
  );
  const todosInDay = prompt(
    `Enter the number of tasks/todos in each day for Project ${projectNumber}:`
  );

  if (isNaN(numberOfMonths) || isNaN(todosInDay)) {
    alert("Please enter valid numbers for months and tasks.");
    return;
  }

  for (let i = 1; i <= numberOfMonths; i++) {
    project.months.push(
      createMonthFolder(projectNumber, i, todosInDay, projectContent)
    );
  }

  const projectsContainer = document.getElementById("projectsContainer");
  projectsContainer.appendChild(projectContainer);

  return project;
}

function createMonthFolder(
  projectNumber,
  monthNumber,
  todosInDay,
  projectContainer
) {
  const monthFolder = document.createElement("div");
  monthFolder.classList.add("folder");

  const monthTitle = document.createElement("h2");
  monthTitle.innerHTML = `Month ${monthNumber} <span class="toggle" onclick="toggleVisibility('month-${projectNumber}-${monthNumber}', 'month', this)">&#x25BC;</span>`;
  monthFolder.appendChild(monthTitle);

  const monthContainer = document.createElement("div");
  monthContainer.classList.add("month-container");
  monthFolder.appendChild(monthContainer);

  const todosInDayForMonth = prompt(
    `Enter the number of tasks/todos for Month ${monthNumber} in Project ${projectNumber}:`
  );

  if (isNaN(todosInDayForMonth)) {
    alert("Please enter a valid number for tasks.");
    return;
  }

  for (let week = 1; week <= 4; week++) {
    createWeekFolder(
      projectNumber,
      monthNumber,
      week,
      todosInDayForMonth,
      monthContainer
    );
  }

  projectContainer.appendChild(monthFolder);

  monthFolder.addEventListener("click", function (event) {
    if (event.target.tagName !== "SPAN") {
      toggleVisibility(`week-${projectNumber}-${monthNumber}`, monthFolder);
    }
  });

  return monthFolder;
}

function createWeekFolder(
  projectNumber,
  monthNumber,
  weekNumber,
  todosInDay,
  monthContainer
) {
  const weekFolder = document.createElement("div");
  weekFolder.classList.add(
    "folder-content",
    "week",
    `month-${projectNumber}-${monthNumber}`
  );

  const weekTitle = document.createElement("h3");
  weekTitle.innerHTML = `Week ${weekNumber} <span class="toggle" onclick="toggleVisibility('week-${projectNumber}-${monthNumber}-${weekNumber}', 'week', this)">&#x25BC;</span>`;
  weekFolder.appendChild(weekTitle);

  for (let day = 1; day <= 7; day++) {
    createDayFolder(
      projectNumber,
      monthNumber,
      weekNumber,
      day,
      todosInDay,
      weekFolder
    );
  }

  monthContainer.appendChild(weekFolder);

  weekFolder.addEventListener("click", function (event) {
    if (event.target.tagName !== "SPAN") {
      toggleVisibility(
        `day-${projectNumber}-${monthNumber}-${weekNumber}`,
        weekFolder
      );
    }
  });

  return weekFolder;
}

function createDayFolder(
  projectNumber,
  monthNumber,
  weekNumber,
  dayNumber,
  todosInDay,
  weekFolder
) {
  const dayFolder = document.createElement("div");
  dayFolder.classList.add(
    "folder-content",
    "day",
    `week-${projectNumber}-${monthNumber}-${weekNumber}`
  );

  const dayTitle = document.createElement("h4");
  dayTitle.innerHTML = `Day ${dayNumber} <span class="toggle" onclick="toggleVisibility('task-${projectNumber}-${monthNumber}-${weekNumber}-${dayNumber}', 'day', this)">&#x25BC;</span>`;
  dayFolder.appendChild(dayTitle);

  for (let todo = 1; todo <= todosInDay; todo++) {
    createTodoFolder(
      projectNumber,
      monthNumber,
      weekNumber,
      dayNumber,
      todo,
      dayFolder
    );
  }

  weekFolder.appendChild(dayFolder);
}

function createTodoFolder(
  projectNumber,
  monthNumber,
  weekNumber,
  dayNumber,
  todoNumber,
  dayFolder
) {
  const todoFolder = document.createElement("div");
  todoFolder.classList.add(
    "folder-content",
    "task",
    `task-${projectNumber}-${monthNumber}-${weekNumber}-${dayNumber}`
  );

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.classList.add("task-checkbox");
  todoCheckbox.id = `todo-${projectNumber}-${monthNumber}-${weekNumber}-${dayNumber}-${todoNumber}`;

  const todoLabel = document.createElement("span");
  todoLabel.textContent = `Todo ${todoNumber}`;
  todoLabel.id = `todo-label-${projectNumber}-${monthNumber}-${weekNumber}-${dayNumber}-${todoNumber}`;
  todoLabel.classList.add("editable");
  todoLabel.onclick = function () {
    editTodoLabel(todoLabel);
  };

  todoFolder.appendChild(todoCheckbox);
  todoFolder.appendChild(todoLabel);

  dayFolder.appendChild(todoFolder);
}

function editTodoLabel(label) {
  editingTodoLabel = label;
  const editPopup = document.getElementById("editPopup");
  const editInput = document.getElementById("editTodoInput");
  editInput.value = label.textContent;
  editPopup.style.display = "block";
  editInput.focus();
}

function saveEditedTodo() {
  const editInput = document.getElementById("editTodoInput");
  if (editingTodoLabel && editInput.value.trim() !== "") {
    editingTodoLabel.textContent = editInput.value.trim();
  }

  const editPopup = document.getElementById("editPopup");
  editPopup.style.display = "none";

  editingTodoLabel = null;
}

function toggleVisibility(className, type, toggleElement) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    element.style.display =
      element.style.display === "none" || element.style.display === ""
        ? "block"
        : "none";
  });

  toggleElement.classList.toggle(
    "folder-open",
    elements[0].style.display !== "none"
  );

  switch (type) {
    case "month":
      break;
    case "week":
      break;
    case "day":
      break;
    default:
      break;
  }
}

function toggleProject(projectNumber) {
  const projectContent = document.querySelector(
    `#projectsContainer .project:nth-child(${projectNumber}) .project-container`
  );
  projectContent.style.display =
    projectContent.style.display === "none" ||
    projectContent.style.display === ""
      ? "block"
      : "none";
}
