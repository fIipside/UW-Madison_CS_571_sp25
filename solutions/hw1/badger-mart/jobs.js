function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    let jobs = document.getElementsByName('job');
    let selected_job;
    // Loop for checking the selected job
    for (let i = 0; i < jobs.length; i ++) {
        if (jobs[i].checked) {
            selected_job = jobs[i].value
        }
    }
    // Output whether a job is selected
    if (selected_job) {
        alert("Thank you for applying to be a " + selected_job + "!")
    } else {
        alert("Please select a job!")
    }
}