// GSAP Animation (Unchanged)
// gsap.set(".hero", {y: 400}); 
gsap.fromTo(".hero", { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 3 });

var sortable = new Sortable(document.getElementById('sortable-list'), {
    group: 'shared',
    animation: 150
});
var sortable2 = new Sortable(document.getElementById('sortable-list2'), {
    group: 'shared',
    animation: 150
});
var sortable3 = new Sortable(document.getElementById('sortable-list3'), {
    group: 'shared',
    animation: 150
});


document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById("login-button");

    // Add event listener to the login button
    loginButton.addEventListener('click', function() {
        // Redirect to login.html
        window.location.href = "login.html";
    });
});









// Firebase imports (Unchanged)
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase Configuration (Unchanged)
const firebaseConfig = {
    apiKey: "AIzaSyBkm9J5WvCAzWfN9g0NuodWw3oiedfT6ok",
    authDomain: "uruzendayo-v2.firebaseapp.com",
    projectId: "uruzendayo-v2",
    storageBucket: "uruzendayo-v2.appspot.com",
    messagingSenderId: "683556963058",
    appId: "1:683556963058:web:fda65ceeb7a6f5149e066b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Function to get Task data and store it in Firestore
async function saveTasksToFirestore(db, uid) {
    const todoList = document.getElementById('sortable-list');
    const doingList = document.getElementById('sortable-list2');
    const doneList = document.getElementById('sortable-list3');

    const tasks = {
        todo: extractTasks(todoList),
        doing: extractTasks(doingList),
        done: extractTasks(doneList)
    };

    const userRef = doc(db, "users", uid);
    const tasksRef = collection(userRef, "tasks");
    const currentTasksRef = doc(tasksRef, "currentTasks");

    try {
        await setDoc(currentTasksRef, tasks);
        console.log("Tasks saved successfully!");
    } catch (error) {
        console.error("Error saving tasks: ", error);
    }
}

// Function to load tasks (with fix)
async function getToDoItems(db, uid) {
    console.log('getToDoItems called with UID:', uid);
    const tasksRef = collection(db, "users", uid, "tasks");
    console.log('tasksRef:', tasksRef);
    const currentTasksRef = doc(tasksRef, "currentTasks");
    console.log('currentTasksRef:', currentTasksRef);   

    const taskSnapshot = await getDoc(currentTasksRef);

    if (taskSnapshot.exists()) {
        const tasks = taskSnapshot.data();

        clearList('sortable-list');
        tasks.todo.forEach(task => addTaskToList('sortable-list', task));

        clearList('sortable-list2');
        tasks.doing.forEach(task => addTaskToList('sortable-list2', task));

        clearList('sortable-list3');
        tasks.done.forEach(task => addTaskToList('sortable-list3', task));
    } else {
        // Handle case where the user has no saved tasks yet
    }
}

// Authentication state listener (Unchanged)
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('User logged in, UID:', uid);
        getToDoItems(db, uid);
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('signup-button').style.display = 'none';
    } else {
        document.getElementById('logout-button').style.display = 'none';
    }
});

// Helper functions (Unchanged)
function extractTasks(list) {
    const taskItems = list.querySelectorAll('li');
    const tasks = [];
    taskItems.forEach(item => tasks.push(item.textContent.trim()));
    return tasks;
}

function clearList(listId) {
    const listEl = document.getElementById(listId);
    listEl.innerHTML = '';
}

function addTaskToList(listId, taskText) {
    const listEl = document.getElementById(listId);
    const newLi = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('btn');
    btn.textContent = taskText;
    newLi.appendChild(btn);
    listEl.appendChild(newLi);
}

// Event Listeners, Registration, Logout (Unchanged) 
// ... (Rest of your code) 


const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
            // Redirect to login page (or do something else)
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

let timerInterval; // To store the interval reference

// Start Timer Function
function startTimer() {
    let minutes = parseInt(document.getElementById("minutes").textContent);
    let seconds = parseInt(document.getElementById("seconds").textContent);

    timerInterval = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }

        if (minutes < 0) {
            clearInterval(timerInterval);
            alert("Time's Up!");
            incrementSessionCount(); // Do something when the timer finishes
        }

        // Update the display
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }, 1000); // Execute every 1 second (1000 milliseconds)
}

// Reset Timer Function
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("minutes").textContent = "1";
    document.getElementById("seconds").textContent = "00";
}

// Button Event Listeners
document.getElementById("start-button").addEventListener('click', startTimer);
document.getElementById("reset-button").addEventListener('click', resetTimer);


// refer to script copy for the old function 


document.addEventListener('DOMContentLoaded', function() {
    // Select the "Add Task" button and the text input field
    const addTaskButton = document.getElementById('adt');
    const taskInput = addTaskButton.querySelector('input[type="text"]');

    // Select the "To-Do" list
    const todoList = document.getElementById('sortable-list');

    // Add an event listener to the "Add Task" button
    addTaskButton.addEventListener('click', function() {
        // Prevent the default form submission
        event.preventDefault();

        // Get the value from the text input field
        const taskValue = taskInput.value.trim();

        // Check if the input field is not empty
        if (taskValue) {
            // Create a new list item with the task value
            const newTask = document.createElement('li');
            const newButton = document.createElement('button');
            newButton.type = 'button';
            newButton.className = 'btn';
            newButton.textContent = taskValue;
            newTask.appendChild(newButton);

            // Append the new list item to the "To-Do" list
            todoList.appendChild(newTask);

            // Clear the text input field
            taskInput.value = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons and filter them to find the one with the text "Remove Task"
    const removeTaskButton = [...document.querySelectorAll('button')].find(button => button.innerText.trim() === "Remove Task");

    // Select the "Done" list
    const doneList = document.getElementById('sortable-list3');

    // Add an event listener to the "Remove Task" button
    removeTaskButton.addEventListener('click', function() {
        // Check if the "Done" list has at least one child
        if (doneList.firstChild) {
            // Remove the first child of the "Done" list
            doneList.removeChild(doneList.firstChild);
        }
    });
});

async function incrementSessionCount() {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const sessionsRef = collection(userRef, "sessions");
        const sessionDoc = doc(sessionsRef, "currentSession");

        // Increment the session count by 1
        await setDoc(sessionDoc, {
            count: increment(1)
        }, { merge: true });

        console.log("Session count incremented successfully!");
    } else {
        console.error("No user is currently logged in.");
    }
}

if (minutes < 0) {
    clearInterval(timerInterval);
    alert("Time's Up!");
    incrementSessionCount(); // Increment the session count
}
function updateSessionCountDisplay(user) {
    if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const sessionsRef = collection(userRef, "sessions");
        const sessionDoc = doc(sessionsRef, "currentSession");

        // Fetch the current session count
        getDoc(sessionDoc).then((docSnap) => {
            if (docSnap.exists()) {
                // Get the session count from the document
                const sessionCount = docSnap.data().count;

                // Update the DOM
                const sessDiv = document.querySelector('.sess');
                // Find the text node within the .sess div and update its content
                if (sessDiv.childNodes.length > 0) {
                    sessDiv.childNodes[0].textContent = `${sessionCount}`;
                } else {
                    // If there's no text node, create one and append it
                    const textNode = document.createTextNode(`${sessionCount}`);
                    sessDiv.appendChild(textNode);
                }

                console.log("Session count updated successfully!");
            } else {
                console.error("No session document found!");
            }
        });
    } else {
        console.error("No user is currently logged in.");
    }
}


// Use onAuthStateChanged to wait for the user's authentication state to be restored
onAuthStateChanged(auth, (user) => {
    updateSessionCountDisplay(user);
});


document.querySelector('.dropdown-btn').addEventListener('click', function() {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

const fileInput = document.getElementById('fileInput');
const viewerContainer = document.getElementById('viewerContainer');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageNum = document.getElementById('pageNum');

let pdfDoc = null;
let currentPage = 1;

fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function() {
    const typedArray = new Uint8Array(this.result);
    renderPDF(typedArray);
  };
  fileReader.readAsArrayBuffer(file);
});

function renderPDF(data) {
  pdfjsLib.getDocument(data).promise.then(function(pdf) {
    pdfDoc = pdf;
    renderPage(currentPage);
  }).catch(function(reason) {
    console.error('Error loading PDF: ' + reason);
  });
}

function renderPage(pageNumber) {
  pdfDoc.getPage(pageNumber).then(function(page) {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);
    renderTask.promise.then(function() {
      viewerContainer.innerHTML = '';
      viewerContainer.appendChild(canvas);
    });

    // Update page number display
    pageNum.textContent = pageNumber;
  });
}

// Event listener for previous page button
prevPageBtn.addEventListener('click', function() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

// Event listener for next page button
nextPageBtn.addEventListener('click', function() {
  if (currentPage < pdfDoc.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});