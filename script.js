// ===============================
// LOGIN
// ===============================

function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("loggedIn", "true");

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");

        showModule("dashboard");

    } else {

        document.getElementById("loginMessage").innerText =
            "Invalid username or password";

    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedIn");

    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


// ===============================
// CHECK LOGIN
// ===============================

window.onload = function () {

    if (localStorage.getItem("loggedIn") === "true") {

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");

    }

    displayStudents();
    displayFaculty();
    displayCourses();
    displayAttendance();
    displayMarks();
    displayFees();
    displayNotices();

    updateDashboard();
};


// ===============================
// MODULE NAVIGATION
// ===============================

function showModule(moduleName) {

    let modules = document.querySelectorAll(".module");

    modules.forEach(function(module) {
        module.classList.add("hidden");
    });

    document.getElementById(moduleName).classList.remove("hidden");

}


// ===============================
// STUDENTS
// ===============================

function saveStudent() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let name = document.getElementById("studentName").value;
    let roll = document.getElementById("studentRoll").value;
    let department = document.getElementById("studentDepartment").value;
    let year = document.getElementById("studentYear").value;
    let email = document.getElementById("studentEmail").value;

    if (name === "" || roll === "") {
        alert("Please enter student name and roll number");
        return;
    }

    let index = document.getElementById("studentIndex").value;

    let student = {
        name: name,
        roll: roll,
        department: department,
        year: year,
        email: email
    };

    if (index === "") {

        students.push(student);

    } else {

        students[index] = student;

    }

    localStorage.setItem("students", JSON.stringify(students));

    clearStudentForm();
    displayStudents();
    updateDashboard();

    alert("Student saved successfully");
}


function displayStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let search = document
        .getElementById("studentSearch")
        .value
        .toLowerCase();

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student, index) {

        if (
            student.name.toLowerCase().includes(search) ||
            student.roll.toLowerCase().includes(search) ||
            student.department.toLowerCase().includes(search)
        ) {

            table.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.department}</td>
                    <td>${student.year}</td>
                    <td>${student.email}</td>

                    <td>
                        <button class="edit-btn"
                            onclick="editStudent(${index})">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteStudent(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        }

    });
}


function editStudent(index) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentRoll").value = student.roll;
    document.getElementById("studentDepartment").value = student.department;
    document.getElementById("studentYear").value = student.year;
    document.getElementById("studentEmail").value = student.email;

    document.getElementById("studentIndex").value = index;

}


function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
        updateDashboard();

    }

}


function clearStudentForm() {

    document.getElementById("studentName").value = "";
    document.getElementById("studentRoll").value = "";
    document.getElementById("studentDepartment").value = "";
    document.getElementById("studentYear").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentIndex").value = "";

}


// ===============================
// FACULTY
// ===============================

function saveFaculty() {

    let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

    let name = document.getElementById("facultyName").value;
    let id = document.getElementById("facultyId").value;
    let department = document.getElementById("facultyDepartment").value;
    let subject = document.getElementById("facultySubject").value;

    if (name === "" || id === "") {
        alert("Please enter faculty name and ID");
        return;
    }

    let index = document.getElementById("facultyIndex").value;

    let data = {
        name: name,
        id: id,
        department: department,
        subject: subject
    };

    if (index === "") {
        faculty.push(data);
    } else {
        faculty[index] = data;
    }

    localStorage.setItem("faculty", JSON.stringify(faculty));

    clearFacultyForm();
    displayFaculty();
    updateDashboard();

    alert("Faculty saved successfully");
}


function displayFaculty() {

    let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

    let table = document.getElementById("facultyTable");

    table.innerHTML = "";

    faculty.forEach(function(person, index) {

        table.innerHTML += `
            <tr>
                <td>${person.name}</td>
                <td>${person.id}</td>
                <td>${person.department}</td>
                <td>${person.subject}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editFaculty(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteFaculty(${index})">
                        Delete
                    </button>

                </td>
            </tr>
        `;

    });

}


function editFaculty(index) {

    let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

    let person = faculty[index];

    document.getElementById("facultyName").value = person.name;
    document.getElementById("facultyId").value = person.id;
    document.getElementById("facultyDepartment").value = person.department;
    document.getElementById("facultySubject").value = person.subject;

    document.getElementById("facultyIndex").value = index;

}


function deleteFaculty(index) {

    if (confirm("Delete this faculty?")) {

        let faculty = JSON.parse(localStorage.getItem("faculty")) || [];

        faculty.splice(index, 1);

        localStorage.setItem("faculty", JSON.stringify(faculty));

        displayFaculty();
        updateDashboard();

    }

}


function clearFacultyForm() {

    document.getElementById("facultyName").value = "";
    document.getElementById("facultyId").value = "";
    document.getElementById("facultyDepartment").value = "";
    document.getElementById("facultySubject").value = "";
    document.getElementById("facultyIndex").value = "";

}


// ===============================
// COURSES
// ===============================

function saveCourse() {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let name = document.getElementById("courseName").value;
    let code = document.getElementById("courseCode").value;
    let department = document.getElementById("courseDepartment").value;
    let semester = document.getElementById("courseSemester").value;

    if (name === "" || code === "") {
        alert("Please enter course name and code");
        return;
    }

    let index = document.getElementById("courseIndex").value;

    let data = {
        name: name,
        code: code,
        department: department,
        semester: semester
    };

    if (index === "") {
        courses.push(data);
    } else {
        courses[index] = data;
    }

    localStorage.setItem("courses", JSON.stringify(courses));

    clearCourseForm();
    displayCourses();
    updateDashboard();

    alert("Course saved successfully");
}


function displayCourses() {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let table = document.getElementById("courseTable");

    table.innerHTML = "";

    courses.forEach(function(course, index) {

        table.innerHTML += `
            <tr>

                <td>${course.name}</td>
                <td>${course.code}</td>
                <td>${course.department}</td>
                <td>${course.semester}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editCourse(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteCourse(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}


function editCourse(index) {

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let course = courses[index];

    document.getElementById("courseName").value = course.name;
    document.getElementById("courseCode").value = course.code;
    document.getElementById("courseDepartment").value = course.department;
    document.getElementById("courseSemester").value = course.semester;

    document.getElementById("courseIndex").value = index;

}


function deleteCourse(index) {

    if (confirm("Delete this course?")) {

        let courses = JSON.parse(localStorage.getItem("courses")) || [];

        courses.splice(index, 1);

        localStorage.setItem("courses", JSON.stringify(courses));

        displayCourses();
        updateDashboard();

    }

}


function clearCourseForm() {

    document.getElementById("courseName").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseDepartment").value = "";
    document.getElementById("courseSemester").value = "";
    document.getElementById("courseIndex").value = "";

}


// ===============================
// ATTENDANCE
// ===============================

function saveAttendance() {

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let roll = document.getElementById("attendanceRoll").value;
    let subject = document.getElementById("attendanceSubject").value;
    let percentage =
        document.getElementById("attendancePercentage").value;

    let status =
        document.getElementById("attendanceStatus").value;

    if (roll === "" || subject === "") {
        alert("Please enter roll number and subject");
        return;
    }

    let index =
        document.getElementById("attendanceIndex").value;

    let data = {
        roll: roll,
        subject: subject,
        percentage: percentage,
        status: status
    };

    if (index === "") {
        attendance.push(data);
    } else {
        attendance[index] = data;
    }

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    clearAttendanceForm();
    displayAttendance();

    alert("Attendance saved successfully");
}


function displayAttendance() {

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let table =
        document.getElementById("attendanceTable");

    table.innerHTML = "";

    attendance.forEach(function(data, index) {

        table.innerHTML += `
            <tr>

                <td>${data.roll}</td>
                <td>${data.subject}</td>
                <td>${data.percentage}%</td>
                <td>${data.status}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editAttendance(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteAttendance(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}


function editAttendance(index) {

    let attendance =
        JSON.parse(localStorage.getItem("attendance")) || [];

    let data = attendance[index];

    document.getElementById("attendanceRoll").value = data.roll;
    document.getElementById("attendanceSubject").value = data.subject;
    document.getElementById("attendancePercentage").value =
        data.percentage;
    document.getElementById("attendanceStatus").value =
        data.status;

    document.getElementById("attendanceIndex").value = index;

}


function deleteAttendance(index) {

    if (confirm("Delete attendance record?")) {

        let attendance =
            JSON.parse(localStorage.getItem("attendance")) || [];

        attendance.splice(index, 1);

        localStorage.setItem(
            "attendance",
            JSON.stringify(attendance)
        );

        displayAttendance();

    }

}


function clearAttendanceForm() {

    document.getElementById("attendanceRoll").value = "";
    document.getElementById("attendanceSubject").value = "";
    document.getElementById("attendancePercentage").value = "";
    document.getElementById("attendanceStatus").value = "Present";
    document.getElementById("attendanceIndex").value = "";

}


// ===============================
// MARKS
// ===============================

function saveMarks() {

    let marks =
        JSON.parse(localStorage.getItem("marks")) || [];

    let roll = document.getElementById("marksRoll").value;
    let subject = document.getElementById("marksSubject").value;

    let obtained =
        Number(document.getElementById("marksObtained").value);

    let total =
        Number(document.getElementById("marksTotal").value);

    if (roll === "" || subject === "" || total === 0) {
        alert("Please enter valid marks information");
        return;
    }

    let percentage = (obtained / total) * 100;

    let index =
        document.getElementById("marksIndex").value;

    let data = {
        roll: roll,
        subject: subject,
        obtained: obtained,
        total: total,
        percentage: percentage.toFixed(2)
    };

    if (index === "") {
        marks.push(data);
    } else {
        marks[index] = data;
    }

    localStorage.setItem(
        "marks",
        JSON.stringify(marks)
    );

    clearMarksForm();
    displayMarks();

    alert("Marks saved successfully");
}


function displayMarks() {

    let marks =
        JSON.parse(localStorage.getItem("marks")) || [];

    let table =
        document.getElementById("marksTable");

    table.innerHTML = "";

    marks.forEach(function(data, index) {

        table.innerHTML += `
            <tr>

                <td>${data.roll}</td>
                <td>${data.subject}</td>
                <td>${data.obtained}</td>
                <td>${data.total}</td>
                <td>${data.percentage}%</td>

                <td>

                    <button class="edit-btn"
                        onclick="editMarks(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteMarks(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}


function editMarks(index) {

    let marks =
        JSON.parse(localStorage.getItem("marks")) || [];

    let data = marks[index];

    document.getElementById("marksRoll").value = data.roll;
    document.getElementById("marksSubject").value = data.subject;
    document.getElementById("marksObtained").value = data.obtained;
    document.getElementById("marksTotal").value = data.total;

    document.getElementById("marksIndex").value = index;

}


function deleteMarks(index) {

    if (confirm("Delete marks record?")) {

        let marks =
            JSON.parse(localStorage.getItem("marks")) || [];

        marks.splice(index, 1);

        localStorage.setItem(
            "marks",
            JSON.stringify(marks)
        );

        displayMarks();

    }

}


function clearMarksForm() {

    document.getElementById("marksRoll").value = "";
    document.getElementById("marksSubject").value = "";
    document.getElementById("marksObtained").value = "";
    document.getElementById("marksTotal").value = "";
    document.getElementById("marksIndex").value = "";

}


// ===============================
// FEES
// ===============================

function saveFee() {

    let fees =
        JSON.parse(localStorage.getItem("fees")) || [];

    let roll = document.getElementById("feeRoll").value;

    let amount =
        document.getElementById("feeAmount").value;

    let status =
        document.getElementById("feeStatus").value;

    let date =
        document.getElementById("feeDate").value;

    if (roll === "" || amount === "") {
        alert("Please enter roll number and amount");
        return;
    }

    let index =
        document.getElementById("feeIndex").value;

    let data = {
        roll: roll,
        amount: amount,
        status: status,
        date: date
    };

    if (index === "") {
        fees.push(data);
    } else {
        fees[index] = data;
    }

    localStorage.setItem(
        "fees",
        JSON.stringify(fees)
    );

    clearFeeForm();
    displayFees();

    alert("Fee record saved successfully");
}


function displayFees() {

    let fees =
        JSON.parse(localStorage.getItem("fees")) || [];

    let table =
        document.getElementById("feeTable");

    table.innerHTML = "";

    fees.forEach(function(data, index) {

        table.innerHTML += `
            <tr>

                <td>${data.roll}</td>
                <td>₹${data.amount}</td>
                <td>${data.status}</td>
                <td>${data.date}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editFee(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteFee(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}


function editFee(index) {

    let fees =
        JSON.parse(localStorage.getItem("fees")) || [];

    let data = fees[index];

    document.getElementById("feeRoll").value = data.roll;
    document.getElementById("feeAmount").value = data.amount;
    document.getElementById("feeStatus").value = data.status;
    document.getElementById("feeDate").value = data.date;

    document.getElementById("feeIndex").value = index;

}


function deleteFee(index) {

    if (confirm("Delete fee record?")) {

        let fees =
            JSON.parse(localStorage.getItem("fees")) || [];

        fees.splice(index, 1);

        localStorage.setItem(
            "fees",
            JSON.stringify(fees)
        );

        displayFees();

    }

}


function clearFeeForm() {

    document.getElementById("feeRoll").value = "";
    document.getElementById("feeAmount").value = "";
    document.getElementById("feeStatus").value = "Paid";
    document.getElementById("feeDate").value = "";
    document.getElementById("feeIndex").value = "";

}


// ===============================
// NOTICES
// ===============================

function saveNotice() {

    let notices =
        JSON.parse(localStorage.getItem("notices")) || [];

    let title =
        document.getElementById("noticeTitle").value;

    let description =
        document.getElementById("noticeDescription").value;

    let date =
        document.getElementById("noticeDate").value;

    if (title === "" || description === "") {
        alert("Please enter notice details");
        return;
    }

    let index =
        document.getElementById("noticeIndex").value;

    let data = {
        title: title,
        description: description,
        date: date
    };

    if (index === "") {
        notices.push(data);
    } else {
        notices[index] = data;
    }

    localStorage.setItem(
        "notices",
        JSON.stringify(notices)
    );

    clearNoticeForm();
    displayNotices();
    updateDashboard();

    alert("Notice saved successfully");
}


function displayNotices() {

    let notices =
        JSON.parse(localStorage.getItem("notices")) || [];

    let table =
        document.getElementById("noticeTable");

    table.innerHTML = "";

    notices.forEach(function(data, index) {

        table.innerHTML += `
            <tr>

                <td>${data.title}</td>
                <td>${data.description}</td>
                <td>${data.date}</td>

                <td>

                    <button class="edit-btn"
                        onclick="editNotice(${index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteNotice(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

    });

}


function editNotice(index) {

    let notices =
        JSON.parse(localStorage.getItem("notices")) || [];

    let data = notices[index];

    document.getElementById("noticeTitle").value = data.title;
    document.getElementById("noticeDescription").value =
        data.description;
    document.getElementById("noticeDate").value = data.date;

    document.getElementById("noticeIndex").value = index;

}


function deleteNotice(index) {

    if (confirm("Delete this notice?")) {

        let notices =
            JSON.parse(localStorage.getItem("notices")) || [];

        notices.splice(index, 1);

        localStorage.setItem(
            "notices",
            JSON.stringify(notices)
        );

        displayNotices();
        updateDashboard();

    }

}


function clearNoticeForm() {

    document.getElementById("noticeTitle").value = "";
    document.getElementById("noticeDescription").value = "";
    document.getElementById("noticeDate").value = "";
    document.getElementById("noticeIndex").value = "";

}


// ===============================
// DASHBOARD COUNTS
// ===============================

function updateDashboard() {

    let students =
        JSON.parse(localStorage.getItem("students")) || [];

    let faculty =
        JSON.parse(localStorage.getItem("faculty")) || [];

    let courses =
        JSON.parse(localStorage.getItem("courses")) || [];

    let notices =
        JSON.parse(localStorage.getItem("notices")) || [];

    document.getElementById("studentCount").innerText =
        students.length;

    document.getElementById("facultyCount").innerText =
        faculty.length;

    document.getElementById("courseCount").innerText =
        courses.length;

    document.getElementById("noticeCount").innerText =
        notices.length;
}