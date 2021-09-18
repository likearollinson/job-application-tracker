const addJobButtonEl = document.querySelector('#add-job-button');

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
}

async function handleAddJob() {
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

  console.log(newJobBody);

  // POST new job
  const newJobData = await fetch('/api/job/', {
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
