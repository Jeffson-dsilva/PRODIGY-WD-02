let startTime, totalTime = 0, timerUpdate;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetStopBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000)/10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;

}

function updateDisplay() {
    display.textContent = formatTime(totalTime);
}

function start() {
    startTime = Date.now() - totalTime;
    timerUpdate = setInterval(() => {
        totalTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetStopBtn.disabled = false;
    lapBtn.disabled = false;
    resetStopBtn.textContent='Stop';
}

function pause() {
    clearInterval(timerUpdate);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetOrStop() {
    if (timerUpdate) {
        clearInterval(timerUpdate);
        timerUpdate = null;
        resetStopBtn.textContent = 'Reset';
    }
    else {
        totalTime = 0;
        updateDisplay();
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetStopBtn.disabled = true;
        lapBtn.disabled = true;
        laps.innerHTML = '';
    }
}

function recordLap() {
    if (timerUpdate) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(totalTime);
        laps.appendChild(lapTime);
    }
}
