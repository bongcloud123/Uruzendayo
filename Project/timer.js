let timeLeft = 1500; 
let timerInterval;

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
    document.getElementById('start').textContent = 'Pause';
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('time').textContent = formatTime(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert('Time is up! Take a break.');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    document.getElementById('start').textContent = 'Resume';
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 1500; // Reset to 25 minutes
    document.getElementById('time').textContent = formatTime(timeLeft);
    document.getElementById('start').textContent = 'Start';
}

document.getElementById('start').addEventListener('click', function() {
    if (document.getElementById('start').textContent === 'Start') {
        startTimer();
    } else if (document.getElementById('start').textContent === 'Pause') {
        pauseTimer();
    } else {
        startTimer();
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);
