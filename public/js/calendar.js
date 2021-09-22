const addEventButtonEl = document.querySelector('#add-event-button');

const jobSelectEl = document.querySelector('#select-job');

const eventTitleEl = document.querySelector('#title');

const startDateMonthEl = document.querySelector('#start-date-month');
const startDateDayEl = document.querySelector('#start-date-day');
const startDateYearEl = document.querySelector('#start-date-year');
const startTimeHourEl = document.querySelector('#start-time-hour');
const startTimeMinutesEl = document.querySelector('#start-time-minutes');
const startAmPmEl = document.querySelector('#select-start-am-pm');

const endDateMonthEl = document.querySelector('#end-date-month');
const endDateDayEl = document.querySelector('#end-date-day');
const endDateYearEl = document.querySelector('#end-date-year');
const endTimeHourEl = document.querySelector('#end-time-hour');
const endTimeMinutesEl = document.querySelector('#end-time-minutes');
const endAmPmEl = document.querySelector('#select-end-am-pm');

const urlEl = document.querySelector('#url');

function init() {
  addEventButtonEl.addEventListener('click', handleAddEvent);

  fetchEvents();
}

async function handleAddEvent(event) {
  event.preventDefault();

  const job_id = jobSelectEl.options[jobSelectEl.selectedIndex].value;

  const title = eventTitleEl.value.trim();

  const startDateMonth = startDateMonthEl.value.trim();
  const startDateDay = startDateDayEl.value.trim();
  const startDateYear = startDateYearEl.value.trim();
  let startTimeHour = startTimeHourEl.value.trim();
  const startTimeMinutes = startTimeMinutesEl.value.trim();
  const startAmPm = startAmPmEl.options[startAmPmEl.selectedIndex].text;

  const endDateMonth = endDateMonthEl.value.trim();
  const endDateDay = endDateDayEl.value.trim();
  const endDateYear = endDateYearEl.value.trim();
  let endTimeHour = endTimeHourEl.value.trim();
  const endTimeMinutes = endTimeMinutesEl.value.trim();
  const endAmPm = endAmPmEl.options[endAmPmEl.selectedIndex].text;

  const url = checkForNull(urlEl);

  startTimeHour = hourToMilitary(startAmPm, startTimeHour);
  endTimeHour = hourToMilitary(endAmPm, endTimeHour);

  const start =
    startDateYear +
    '-' +
    startDateMonth +
    '-' +
    startDateDay +
    'T' +
    startTimeHour +
    ':' +
    startTimeMinutes +
    ':00+00:00';
  const end =
    endDateYear +
    '-' +
    endDateMonth +
    '-' +
    endDateDay +
    'T' +
    endTimeHour +
    ':' +
    endTimeMinutes +
    ':00+00:00';

  const updatedEventsBody = {
    job_id,
    start,
    end,
    title,
    url,
  };

  //POST updated event
  const updatedEventsData = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEventsBody),
  });

  //Check if valid POST
  if (updatedEventsData.ok) {
    document.location.replace('/calendar');
  } else {
    window.alert('Please enter information correctly in required fields');
  }
}

// Convert hours into military time
function hourToMilitary(amPm, hour) {
  if (amPm === 'PM') {
    return parseInt(hour) + 12;
  } else {
    return hour;
  }
}

//Check for user input, return null if no input
function checkForNull(inputEl) {
  if (inputEl.value.trim()) {
    return inputEl.value.trim();
  } else {
    return null;
  }
}

// GET events
async function fetchEvents() {
  const eventsData = await fetch('/api/events/');

  generateCalendar(eventsData);
}

// Render calendar to page
function generateCalendar(eventsData) {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    weekNumbers: false,
    dayMaxEvents: true, // allow "more" link when too many events
    events: eventsData,
  });
  calendar.render();
}

init();
