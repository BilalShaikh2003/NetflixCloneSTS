//  Global Var
let currentUser = null;
let myList = [];
let currentSection = 'home';
const API_BASE = "http://localhost:8080"; // ✅ change if backend hosted elsewhere

//Authentication
async function signup(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        username: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        password: form.querySelector('input[type="password"]').value
    };

    try {
        const res = await fetch(`${API_BASE}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Signup successful! Please login.");
            closeModal("signupModal");
            showLogin();
        } else {
            alert("Signup failed!");
        }
    } catch (err) {
        console.error("Signup error:", err);
    }
}

async function login(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        email: form.querySelector('input[type="email"]').value,
        password: form.querySelector('input[type="password"]').value
    };

    try {
        const res = await fetch(`${API_BASE}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            currentUser = await res.json();
            alert(`Welcome ${currentUser.username || "User"}!`);
            closeModal("loginModal");
        } else {
            alert("Invalid credentials!");
        }
    } catch (err) {
        console.error("Login error:", err);
    }
}

function logout() {
    currentUser = null;
    alert("You have been logged out!");
}
//
async function loadMovies() {
    try {
        const res = await fetch(`${API_BASE}/movies`);
        const movies = await res.json();

       
        document.getElementById("trendingRow").innerHTML = "";
        document.getElementById("originalsRow").innerHTML = "";
        document.getElementById("topRatedRow").innerHTML = "";
        document.getElementById("actionRow").innerHTML = "";
        document.getElementById("comedyRow").innerHTML = "";
        document.getElementById("horrorRow").innerHTML = "";

        // Render movies dynamically
        movies.forEach(m => {
            const poster = document.createElement("div");
            poster.classList.add("poster");
            poster.textContent = m.title; 
            poster.onclick = () => playVideo(m.id, m.title, m.description);

            if (m.genre.toLowerCase().includes("action")) document.getElementById("actionRow").appendChild(poster);
            else if (m.genre.toLowerCase().includes("comedy")) document.getElementById("comedyRow").appendChild(poster);
            else if (m.genre.toLowerCase().includes("horror")) document.getElementById("horrorRow").appendChild(poster);
            else if (m.rating >= 8.5) document.getElementById("topRatedRow").appendChild(poster);
            else if (m.type === "series") document.getElementById("originalsRow").appendChild(poster);
            else document.getElementById("trendingRow").appendChild(poster);
        });
    } catch (err) {
        console.error("Failed to fetch movies:", err);
    }
}

function playVideo(id, title, description) {
    document.getElementById("videoTitle").textContent = title;
    document.getElementById("videoDescription").textContent = description;
    document.getElementById("videoPlayer").src = `${API_BASE}/movies/${id}/stream`; 
    document.getElementById("videoModal").style.display = "block";
}

function showSection(section) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(section + "Section").classList.remove("hidden");
    currentSection = section;
}

function showLogin() { document.getElementById("loginModal").style.display = "block"; }
function showSignup() { document.getElementById("signupModal").style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

document.getElementById("signupForm").addEventListener("submit", signup);
document.getElementById("loginForm").addEventListener("submit", login);
window.onload = loadMovies;
