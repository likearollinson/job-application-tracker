const addJobButtonEl = document.querySelector('#add-job-button');
const deleteJobButtonEls = document.querySelectorAll('.delete-job-button');

const companyInputEl = document.querySelector('#company');
const positionInputEl = document.querySelector('#vat');
const locationInputEl = document.querySelector('#street');
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

  const user_id = 1;
  const title = positionInputEl.value.trim();
  const link = jobUrlInputEl.value.trim();
  const company_name = companyInputEl.value.trim();
  const description = descriptionInputEl.value.trim();
  const salary_information = salaryInputEl.value.trim();
  const contact_information = contactInfoInputEl.value.trim();
  const additional_comments = commentsInputEl.value.trim();
  const application_status = applicationSelectEl.options[applicationSelectEl.selectedIndex].text;
  
  // Create job object with user's input
  const newJobBody = {
    user_id,
    title,
    link,
    company_name,
    description,
    salary_information,
    contact_information,
    application_status,
    additional_comments,
  };

  // POST new job
  const newJobData = await fetch('/api/job/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newJobBody),
  });

  document.location.replace('/');
  return newJobData.json();
}

async function handleDeleteJob(event) {
  const id;

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
  return newJobData.json();
}

// Job button
    // Redirect user to job.html

// Calendar button
    // Redirect user to calendar.html

init();
