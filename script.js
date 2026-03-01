// LOGIN FUNCTION WITH VALIDATION
function loginUser(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!validateEmail(email)) {
        alert("Enter valid email address!");
        return;
    }

    // Save user data in LocalStorage
    localStorage.setItem("username", username);
    localStorage.setItem("age", age);
    localStorage.setItem("email", email);

    alert("Login Successful!");
    window.location.href = "home.html";
}

// EMAIL VALIDATION FUNCTION
function validateEmail(email) {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}


// SHOW USERNAME ON HOME PAGE
window.onload = function () {
    let name = localStorage.getItem("username");
    if (name && document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerText = "Welcome " + name + " 💪";
    }

    // Load saved workouts
    loadWorkouts();
};


// WORKOUT TRACKER WITH LOCAL STORAGE
let total = 0;

function addWorkout() {
    let name = document.getElementById("workoutName").value;
    let duration = parseInt(document.getElementById("duration").value);

    if (name === "" || isNaN(duration)) {
        alert("Fill all fields");
        return;
    }

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push({ name, duration });
    localStorage.setItem("workouts", JSON.stringify(workouts));

    document.getElementById("workoutName").value = "";
    document.getElementById("duration").value = "";

    loadWorkouts();
}

function loadWorkouts() {
    let list = document.getElementById("workoutList");
    if (!list) return;

    list.innerHTML = "";
    total = 0;

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    workouts.forEach((w, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${w.name} - ${w.duration} mins 
        <button onclick="deleteWorkout(${index})">X</button>`;

        list.appendChild(li);
        total += w.duration;
    });

    let totalElement = document.getElementById("totalMinutes");
    if (totalElement) totalElement.innerText = total;
}

function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    loadWorkouts();
}


// BMI FUNCTION (ADD THIS TO HOME PAGE)
function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (weight === "" || height === "") {
        alert("Enter values!");
        return;
    }

    height = height / 100;
    let bmi = (weight / (height * height)).toFixed(2);

    let status = "";

    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 24.9) status = "Normal weight";
    else if (bmi < 29.9) status = "Overweight";
    else status = "Obese";

    document.getElementById("bmiResult").innerText =
        "Your BMI is " + bmi + " (" + status + ")";
}


// RESET PASSWORD
function resetPassword() {
    alert("Password reset link sent to your email!");
    window.location.href = "index.html";
}


// LOGOUT FUNCTION
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

window.onload = function () {
    let dark = localStorage.getItem("darkMode");
    if (dark === "true") {
        document.body.classList.add("dark-mode");
    }

    loadWorkouts();
    updateProgress();

    let name = localStorage.getItem("username");
    if (name && document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerText = "Welcome " + name + " 💪";
    }

    updateProgress();
};
function updateProgress() {
    let goal = 300;
    let percent = (total / goal) * 100;
    if (percent > 100) percent = 100;

    let fill = document.getElementById("progressFill");
    if (fill) fill.style.width = percent + "%";
}