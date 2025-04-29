const h1 = document.querySelector('h1 i');
const openAlarmBtn = document.querySelector('#alarm button');
const closeAlarmBtn = document.querySelector('#close-btn i');
const popupModal = document.querySelector('.container');
const hourSelect = document.querySelector('#hour');
const minuteSelect = document.querySelector('#minute');
const ampmSelect = document.querySelector('#ampm');
const submitAlarmBtn = document.querySelector('#done button');
const alarmTitle = document.querySelector('#alarm-title')
const alarmAudio = document.querySelector('audio')

// Populate hour options (1 to 12)
for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = option.textContent = String(i).padStart(2, '0');
    hourSelect.appendChild(option);
}

// Populate minute options (00 to 59)
for (let i = 0; i <= 59; i++) {
    const option = document.createElement('option');
    option.value = option.textContent = String(i).padStart(2, '0');
    minuteSelect.appendChild(option);
}

// Alarm time variables
let alarmHour = null;
let alarmMinute = null;
let alarmAmPm = null;

// Update clock every second
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentAmPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 24-hour to 12-hour
    const displayHours = String(hours).padStart(2, '0');

    h1.textContent = `${displayHours}:${minutes}:${seconds} ${currentAmPm}`;

    // Check if alarm should ring
    if (alarmHour === displayHours && alarmMinute === minutes && alarmAmPm === currentAmPm) {
        alarmAudio.play();
        resetAlarm();
    }
}

// Change clock color randomly every 5 seconds
function changeClockColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    h1.style.color = `rgb(${r}, ${g}, ${b})`;
}

// Show alarm setup popup
function showAlarmPopup() {
    popupModal.style.display = 'flex';
}

// Hide alarm setup popup
function hideAlarmPopup() {
    popupModal.style.display = 'none';
}

// Set the alarm
function setAlarm() {
    alarmHour = hourSelect.value;
    alarmMinute = minuteSelect.value;
    alarmAmPm = ampmSelect.value;

    if (alarmHour && alarmMinute && alarmAmPm) {
        alarmTitle.textContent = ` ${alarmHour} : ${alarmMinute} ${alarmAmPm}`
    } else {
        alert('⚠️ Please select a valid time!');
        return;
    }

    // Reset selects after setting
    hourSelect.selectedIndex = 0;
    minuteSelect.selectedIndex = 0;
    ampmSelect.selectedIndex = 0;
    hideAlarmPopup();
}

// Reset alarm after it rings
function resetAlarm() {
    alarmHour = null;
    alarmMinute = null;
    alarmAmPm = null;
    alarmTitle.textContent = ` 00 : 00`
    alarmTitle.style.color = 'crimson'
}

// Event listeners
openAlarmBtn.addEventListener('click', showAlarmPopup);
closeAlarmBtn.addEventListener('click', hideAlarmPopup);
submitAlarmBtn.addEventListener('click', setAlarm);

// Start clock and color changing
setInterval(updateClock, 1000);
setInterval(changeClockColor, 5000);
