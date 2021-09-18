const addJobButtonEl = document.querySelector('#add-job-button');

// Assign new job variables
const companyInputEl = document.querySelector('#company');
const positionInputEl = document.querySelector('#vat');
const locationInputEl = document.querySelector('#street');
const descriptionInputEl = document.querySelector('#desc');
const contactInfoInputEl = document.querySelector('#con-info');
const jobUrlInputEl = document.querySelector('#url');
const salaryInputEl = document.querySelector('#salary');
const applicationStatusInputEl = document.querySelector('#app-status');
const commentsInputEl = document.querySelector('#comments');

function init() {
  addJobButtonEl.addEventListener('click', handleAddJob);
}

async function handleAddJob() {
  // Create job object with user's input
  const newJobBody = {
    title: positionInputEl.value.trim(),
    link: jobUrlInputEl.value.trim(),
    company_name: companyInputEl.value.trim(),
    description: descriptionInputEl.value.trim(),
    salary_information: salaryInputEl.value.trim(),
    contact_information: contactInfoInputEl.value.trim(),
    application_status: applicationStatusInputEl.value.trim(),
    additional_comments: commentsInputEl.value.trim(),
  };

  // POST new job
  const newJobData = await fetch('/api/jobs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJobBody),
  });

  return newJobData.json();
}

// Delete Job button
    // Fetch DELETE

    // Refresh screen to load without job

// Job button
    // Redirect user to job.html

// Calendar button
    // Redirect user to calendar.html

init();
