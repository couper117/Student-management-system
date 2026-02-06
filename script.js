// ---------------------------------------------------------
// STARTER DATA
// ---------------------------------------------------------
let students = [
    { id: 1, name: "Mugisha Yvan", age: 18, gender: "male", grade: 11 },
    { id: 2, name: "Shimwa Jane", age: 17, gender: "female", grade: 10 },
    { id: 3, name: "Manzi Smith", age: 19, gender: "male", grade: 11 }
];

// Load table on start
document.addEventListener('DOMContentLoaded', () => renderTable(students));

// ---------------------------------------------------------
// DOM HELPER FUNCTIONS (To show results on screen)
// ---------------------------------------------------------
function renderTable(data) {
    const tbody = document.getElementById("student-body");
    tbody.innerHTML = ""; // Clear current list

    if (data.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center'>No students found.</td></tr>";
        return;
    }

    data.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.gender}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="edit-btn" onclick="prepareUpdate(${student.id})">Edit</button>
                    <button class="danger-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showMessage(msg, type) {
    const box = document.getElementById("message-box");
    box.textContent = msg;
    box.className = `message-box ${type}`;
    box.style.display = "block";
    setTimeout(() => box.style.display = "none", 3000);
}

// ---------------------------------------------------------
// 1. CREATE – Add a Student Logic
// ---------------------------------------------------------
function handleAdd() {
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const grade = parseInt(document.getElementById("grade").value);

    // Validations
    if (!name || name.trim() === "") return showMessage("Error: Name required.", "error");
    if (isNaN(age) || age <= 0) return showMessage("Error: Invalid Age.", "error");
    if (gender !== "male" && gender !== "female") return showMessage("Error: Select Gender.", "error");
    if (isNaN(grade)) return showMessage("Error: Invalid Grade.", "error");
    
    // Check Duplicate
    if (students.some(s => s.name === name)) return showMessage("Error: Name exists.", "error");

    // Generate ID
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    students.push({ id: newId, name, age, gender, grade });
    
    showMessage(`Success: Added ${name}`, "success");
    renderTable(students);
    clearForm();
}

// ---------------------------------------------------------
// 2. DELETE Logic
// ---------------------------------------------------------
function deleteStudent(id) {
    if(!confirm("Are you sure you want to delete this student?")) return;
    
    const initialLength = students.length;
    students = students.filter(student => student.id !== id);

    if (students.length < initialLength) {
        showMessage("Student deleted successfully.", "success");
        renderTable(students);
    } else {
        showMessage("Error: ID not found.", "error");
    }
}

// ---------------------------------------------------------
// 3. UPDATE Logic
// ---------------------------------------------------------
// Fill the form with data for editing
function prepareUpdate(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById("student-id").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("gender").value = student.gender;
    document.getElementById("grade").value = student.grade;

    // Switch buttons
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("update-btn").style.display = "inline-block";
}

function handleUpdate() {
    const id = parseInt(document.getElementById("student-id").value);
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const grade = parseInt(document.getElementById("grade").value);

    const index = students.findIndex(s => s.id === id);
    if (index === -1) return showMessage("Error: Student not found.", "error");

    students[index] = { id, name, age, gender, grade };

    showMessage(`Success: Updated student ${id}`, "success");
    renderTable(students);
    clearForm();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("grade").value = "";
    document.getElementById("student-id").value = "";
    
    // Reset buttons
    document.getElementById("add-btn").style.display = "inline-block";
    document.getElementById("update-btn").style.display = "none";
}

// ---------------------------------------------------------
// 4. FILTER & SORT TASKS (Connected to Buttons)
// ---------------------------------------------------------
function showMaleStudents() {
    const males = students.filter(s => s.gender === "male");
    renderTable(males);
    document.getElementById("stats-output").textContent = `Showing ${males.length} Male Students`;
}

function sortByName() {
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    renderTable(sorted);
}

function showOldest() {
    if (students.length === 0) return;
    const oldest = students.reduce((old, curr) => (curr.age > old.age) ? curr : old);
    alert(`The Oldest Student is: ${oldest.name} (${oldest.age} years old)`);
}

function countGrade11() {
    const count = students.filter(s => s.grade === 11).length;
    alert(`Total Students in Grade 11: ${count}`);
}