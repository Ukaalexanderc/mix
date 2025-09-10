// Function to handle the login form submission
async function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful
            console.log('Login successful:', data);
            // Store the token (or user info) in local storage for a "real" app
            localStorage.setItem('authToken', data.token);

            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Login failed
            console.error('Login failed:', data.error);
            alert(`Login failed: ${data.error}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred during login. Please try again.');
    }
}

// Function to handle the sign-up form submission
async function handleSignup(event) {
    event.preventDefault();

    const form = event.target;
    const fullName = form['full-name'].value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Sign-up successful
            console.log('Sign-up successful:', data);
            alert(`Sign-up successful, ${fullName}! Your token is: ${data.token}`);
            // Redirect to the login page or dashboard
            window.location.href = 'login.html';
        } else {
            // Sign-up failed
            console.error('Sign-up failed:', data.error);
            alert(`Sign-up failed: ${data.error}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred during sign-up. Please try again.');
    }
}

// Function to fetch and display courses
async function fetchCourses() {
    try {
        // We'll use the Fake Store API as suggested
        const response = await fetch('https://fakestoreapi.com/products');
        const courses = await response.json();
        
        const coursesGrid = document.getElementById('courses-grid');
        if (coursesGrid) {
            coursesGrid.innerHTML = courses.map(course => `
                <div class="bg-white rounded-lg shadow-md p-4">
                    <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover rounded-md mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">${course.title}</h3>
                    <p class="text-gray-600 mt-2 line-clamp-3">${course.description}</p>
                    <p class="text-blue-600 font-bold mt-4">$${course.price}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }
}

// Function to fetch and display assignments
async function fetchAssignments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10'); // Fetching a limited number
        const assignments = await response.json();
        
        const assignmentsList = document.getElementById('assignments-list');
        if (assignmentsList) {
            assignmentsList.innerHTML = assignments.map(assignment => `
                <li class="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <input type="checkbox" ${assignment.completed ? 'checked' : ''} disabled class="h-4 w-4 text-blue-600 rounded">
                    <span class="text-gray-900 ${assignment.completed ? 'line-through text-gray-500' : ''}">${assignment.title}</span>
                </li>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to fetch assignments:', error);
    }
}

// Function to fetch and display user profile
async function fetchUserProfile() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        
        const profileContainer = document.getElementById('profile-container');
        if (profileContainer) {
            profileContainer.innerHTML = `
                <div class="flex items-center space-x-6">
                    <img class="h-24 w-24 rounded-full border-4 border-white shadow-lg" src="${user.picture.large}" alt="Profile Picture">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">${user.name.first} ${user.name.last}</h1>
                        <p class="text-gray-600">${user.email}</p>
                        <button class="mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Edit Profile
                        </button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
    }
}


// A simple router to run the correct function based on the current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('login.html')) {
        const form = document.getElementById('login-form');
        if (form) form.addEventListener('submit', handleLogin);
    } else if (path.includes('signup.html')) {
        const form = document.getElementById('signup-form');
        if (form) form.addEventListener('submit', handleSignup);
    } else if (path.includes('courses.html')) {
        fetchCourses();
    } else if (path.includes('assignments.html')) {
        fetchAssignments();
    } else if (path.includes('profile.html')) {
        fetchUserProfile();
    }
});