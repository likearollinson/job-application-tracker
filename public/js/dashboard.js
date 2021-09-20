const addJobButtonEl = document.querySelector('#add-job-button');
const deleteJobButtonEls = document.querySelectorAll('.delete-job-button');

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
  addJobButtonEl.addEventListener('click', handleAddJob);

  deleteJobButtonEls.forEach((deleteButton) =>
    deleteButton.addEventListener('click', handleDeleteJob)
  );
}

async function handleAddJob(event) {
  event.preventDefault();

  const company_name = companyInputEl.value.trim();
  const title = positionInputEl.value.trim();
  const location = checkForNull(locationInputEl);
  const description = checkForNull(descriptionInputEl);
  const contact_information = checkForNull(contactInfoInputEl);
  const link = checkForNull(jobUrlInputEl);
  const salary_information = checkForNull(salaryInputEl);
  const additional_comments = checkForNull(commentsInputEl);
  const application_status =
    applicationSelectEl.options[applicationSelectEl.selectedIndex].text;

  // Create job object with user's input
  const newJobBody = {
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

  // POST new job
  const newJobData = await fetch('/api/job/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJobBody),
  });

  // Check if valid post
  if (newJobData.ok) {
    document.location.replace('/');
  } else {
    window.alert('Please enter information into all required fields.');
  }
}

async function handleDeleteJob(event) {
  let id;

  // Find data-job-id
  if (event.target.dataset.jobId) {
    id = event.target.dataset.jobId;
  } else {
    id = event.target.parentNode.dataset.jobId;
  }

  // DELETE job
  const newJobData = await fetch(`/api/job/${id}`, {
    method: 'DELETE',
  });

  document.location.replace('/');
}

// Check for user input, return null if no input
function checkForNull(inputEl) {
  if (inputEl.value.trim()) {
    return inputEl.value.trim();
  } else {
    return null;
  }
}

init();
