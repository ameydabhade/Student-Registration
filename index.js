const student_name = document.getElementById('student-name');
const student_id = document.getElementById('student-id');
const student_email = document.getElementById('email-id');
const student_phone = document.getElementById('contact-no');
const button = document.querySelector('.btn1');
const cards = document.querySelector('.cards');


document.addEventListener('DOMContentLoaded', loadStudents);

button.addEventListener('click', addItem);

function addItem(event) {
    event.preventDefault();


    if (!validateInputs()) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const Rcard = createStudentCard(student_name.value, student_id.value, student_email.value, student_phone.value);

    cards.appendChild(Rcard);
    saveStudent(student_name.value, student_id.value, student_email.value, student_phone.value);

    student_name.value = '';
    student_id.value = '';
    student_email.value = '';
    student_phone.value = '';
}

function createStudentCard(name, id, email, phone) {
    const Rcard = document.createElement("div");
    Rcard.classList.add("RCard");
    const nameElem = document.createElement("h2");
    nameElem.innerHTML = "Name : " + name;
    const idElem = document.createElement("h2");
    idElem.innerHTML = "ID : " + id;
    const emailElem = document.createElement("h2");
    emailElem.innerHTML = "Email : " + email;
    const phoneElem = document.createElement("h2");
    phoneElem.innerHTML = "Contact : " + phone;
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener('click', function () {
        editItem(Rcard, nameElem, idElem, emailElem, phoneElem);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener('click', function () {
        deleteItem(Rcard, id);
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    Rcard.appendChild(nameElem);
    Rcard.appendChild(idElem);
    Rcard.appendChild(emailElem);
    Rcard.appendChild(phoneElem);
    Rcard.appendChild(buttonContainer);

    return Rcard;
}

function validateInputs() {
    const nameRegex = /^[A-Za-z\s]+$/;
    const idRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    return nameRegex.test(student_name.value) &&
        idRegex.test(student_id.value) &&
        emailRegex.test(student_email.value) &&
        phoneRegex.test(student_phone.value);
}

function saveStudent(name, id, email, phone) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, id, email, phone });
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => {
        const Rcard = createStudentCard(student.name, student.id, student.email, student.phone);
        cards.appendChild(Rcard);
    });
}

function editItem(Rcard, nameElem, idElem, emailElem, phoneElem) {
    const newName = prompt("Enter new name", nameElem.innerHTML.split(": ")[1]);
    const newId = prompt("Enter new ID", idElem.innerHTML.split(": ")[1]);
    const newEmail = prompt("Enter new email", emailElem.innerHTML.split(": ")[1]);
    const newPhone = prompt("Enter new contact number", phoneElem.innerHTML.split(": ")[1]);

    if (newName) nameElem.innerHTML = "Name : " + newName;
    if (newId) idElem.innerHTML = "ID : " + newId;
    if (newEmail) emailElem.innerHTML = "Email : " + newEmail;
    if (newPhone) phoneElem.innerHTML = "Contact : " + newPhone;

    updateStudentInStorage(nameElem.innerHTML.split(": ")[1], newId, newEmail, newPhone);
}

function deleteItem(Rcard, id) {
    cards.removeChild(Rcard);
    removeStudentFromStorage(id);
}

function updateStudentInStorage(name, id, email, phone) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.map(student =>
        student.id === id ? { name, id, email, phone } : student
    );
    localStorage.setItem('students', JSON.stringify(students));
}

function removeStudentFromStorage(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
}
