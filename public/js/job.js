const calendarEl = document.querySelector('#calendar');

const editJobButtonEl = document.querySelector('#edit-job-button');

const companyInputEl = document.querySelector('#company');
const positionInputEl = document.querySelector('#title');
const locationInputEl = document.querySelector('#location');
const descriptionInputEl = document.querySelector('#desc');
const contactInfoInputEl = document.querySelector('#con-info');
const jobUrlInputEl = document.querySelector('#url');
const salaryInputEl = document.querySelector('#salary');
const commentsInputEl = document.querySelector('#comments');
const applicationSelectEl = document.querySelector('#select');

function init() {
  editJobButtonEl.addEventListener('click', handleEditJob);

  fetchEvents();
}

async function handleEditJob(event) {
  event.preventDefault();

  const company_name = companyInputEl.value.trim();
  const title = positionInputEl.value.trim();
  const location = locationInputEl.value.trim();
  const description = checkForNull(descriptionInputEl);
  const contact_information = checkForNull(contactInfoInputEl);
  const link = checkForNull(jobUrlInputEl);
  const salary_information = checkForNull(salaryInputEl);
  const additional_comments = checkForNull(commentsInputEl);
  const application_status =
    applicationSelectEl.options[applicationSelectEl.selectedIndex].text;

  // Create job object with user's input
  const updatedJobBody = {
    title,
    location,
    link,
    company_name,
    description,
    salary_information,
    contact_information,
    additional_comments,
    application_status,
  };

  const id = event.target.dataset.jobId;

  // PUT updated job
  const updatedJobData = await fetch(`/api/job/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedJobBody),
  });

  // Check if valid PUT
  if (updatedJobData.ok) {
    document.location.replace(`/jobPost/${id}`);
  } else {
    window.alert('Please enter information into all required fields.');
  }
}

// Check for user input, return null if no input
function checkForNull(inputEl) {
  if (inputEl.value.trim()) {
    return inputEl.value.trim();
  } else {
    return null;
  }
}

// GET events
async function fetchEvents() {
  const id = editJobButtonEl.dataset.jobId;

  const eventsData = await fetch(`/api/events/job/${id}`);

  generateCalendar(eventsData);
}

// Render calendar to page
function generateCalendar(eventsData) {
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'UTC',
    themeSystem: 'bootstrap',
    initialView: 'listWeek',
    headerToolbar: {
      left: 'prev,next today',
      right: 'title',
      //      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    weekNumbers: false,
    dayMaxEvents: false, // allow "more" link when too many events
    events: eventsData,
  });
  calendar.render();
}

init();
