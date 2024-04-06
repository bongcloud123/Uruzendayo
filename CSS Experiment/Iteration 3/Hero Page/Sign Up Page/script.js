const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
             // Success! Maybe redirect to a profile page or display a welcome message.
        })
        .catch((error) => {
             // Handle errors like invalid email, weak password etc.
             console.error("Signup Error: ", error);
        });
}); 
// ... (similar form handling logic as above)
firebase.auth().signInWithEmailAndPassword(email, password)
.then(() => {
     // Success! 
})
.catch((error) => {
     // Handle errors
});
l