// GSAP Animation (Unchanged)
// gsap.set(".hero", {y: 400}); 
gsap.fromTo(".hero", { y: 400, opacity: 0 }, { y: 0, opacity: 1, duration: 3 });

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
    } else {
        // User is not logged in. Do something...
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
    document.getElementById("minutes").textContent = "25";
    document.getElementById("seconds").textContent = "00";
}

// Button Event Listeners
document.getElementById("start-button").addEventListener('click', startTimer);
document.getElementById("reset-button").addEventListener('click', resetTimer);


async function incrementSessionCount() {
    console.log('incrementSessionCount called!'); 

    try { 
        const uid = getAuth().currentUser.uid;
        if (!uid) {
            console.error("No user logged in. Cannot update session count.");
            return; // Exit if no user is logged in 
        } 

        const userRef = doc(db, "users", uid);

        // Get references to the 'sessionCount' collection and 'count' document
        const sessionCountCollectionRef = collection(userRef, "sessionCount"); 
        console.log('Getting sessionCountCollectionRef:', sessionCountCollectionRef); 

        const sessionCountRef = doc(sessionCountCollectionRef, "count");  
        console.log('Getting sessionCountRef:', sessionCountRef);

        // Check if the "count" document exists, create if needed
        let snap = await getDoc(sessionCountRef);
        if (!snap.exists()) {
            console.log("count document doesn't exist, creating it."); // Additional logging
            await setDoc(sessionCountRef, { sessionsCompleted: 0 });
        }        

        // Now we can always update the "count" document
        await updateDoc(sessionCountRef, { 
            sessionsCompleted: increment(1) 
        }, { merge: true }); 

    } catch (error) {
        console.error("Error updating session count:", error); 
    } 
} 

  


