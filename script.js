// ===============================
// JOB HUB - MAIN JAVASCRIPT
// ===============================


// ===============================
// APPLY FOR JOB
// ===============================

function applyJob(jobName) {

    if (!jobName) {

        alert("Please select a job first!");

        return;

    }


    let applications =
        JSON.parse(
            localStorage.getItem("jobApplications")
        ) || [];


    // Check if already applied

    for (let i = 0; i < applications.length; i++) {

        if (
            applications[i].jobName === jobName
        ) {

            alert(
                "You have already applied for this job!"
            );

            return;

        }

    }


    // Create application

    let newApplication = {

        jobName: jobName,

        status: "Applied"

    };


    applications.push(newApplication);


    localStorage.setItem(
        "jobApplications",
        JSON.stringify(applications)
    );


    localStorage.setItem(
        "applications",
        applications.length
    );


    alert(
        "Application submitted for " +
        jobName
    );


    window.location.href =
        "applications.html";

}


// ===============================
// REGISTER USER
// ===============================

function registerUser(event) {

    event.preventDefault();


    let name =
        document.getElementById(
            "registerName"
        ).value;


    let email =
        document.getElementById(
            "registerEmail"
        ).value;


    let password =
        document.getElementById(
            "registerPassword"
        ).value;


    localStorage.setItem(
        "userName",
        name
    );


    localStorage.setItem(
        "userEmail",
        email
    );


    localStorage.setItem(
        "userPassword",
        password
    );


    alert(
        "Account created successfully!"
    );


    window.location.href =
        "login.html";

}


// ===============================
// LOGIN USER
// ===============================

function loginUser(event) {

    event.preventDefault();


    let email =
        document.getElementById(
            "loginEmail"
        ).value;


    let password =
        document.getElementById(
            "loginPassword"
        ).value;


    let savedEmail =
        localStorage.getItem(
            "userEmail"
        );


    let savedPassword =
        localStorage.getItem(
            "userPassword"
        );


    if (
        email === savedEmail &&
        password === savedPassword
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        alert(
            "Login successful!"
        );


        window.location.href =
            "dashboard.html";

    }

    else {

        alert(
            "Wrong email or password!"
        );

    }

}


// ===============================
// APPLICATION COUNT
// ===============================

let applicationCount =
    localStorage.getItem(
        "applications"
    );


if (
    applicationCount === null
) {

    applicationCount = 0;

}


let countElement =
    document.getElementById(
        "applicationCount"
    );


if (countElement) {

    countElement.innerText =
        applicationCount;

}


// ===============================
// SEARCH JOBS
// ===============================

function searchJobs() {

    let searchText =
        document.getElementById(
            "jobSearch"
        )?.value.toLowerCase() || "";


    let locationText =
        document.getElementById(
            "locationSearch"
        )?.value.toLowerCase() || "";


    let jobs =
        document.getElementsByClassName(
            "job-card"
        );


    for (
        let i = 0;
        i < jobs.length;
        i++
    ) {

        let job =
            jobs[i].innerText.toLowerCase();


        if (
            job.includes(searchText) &&
            job.includes(locationText)
        ) {

            jobs[i].style.display =
                "block";

        }

        else {

            jobs[i].style.display =
                "none";

        }

    }

}


// ===============================
// PROFILE
// ===============================

let profileName =
    document.getElementById(
        "profileName"
    );


let profileEmail =
    document.getElementById(
        "profileEmail"
    );


if (profileName) {

    profileName.innerText =
        localStorage.getItem(
            "userName"
        ) || "User Name";

}


if (profileEmail) {

    profileEmail.innerText =
        localStorage.getItem(
            "userEmail"
        ) || "user@email.com";

}


// ===============================
// DISPLAY APPLICATIONS
// ===============================

function displayApplications() {

    let applicationsList =
        document.getElementById(
            "applicationsList"
        );


    if (!applicationsList) {

        return;

    }


    let applications =
        JSON.parse(
            localStorage.getItem(
                "jobApplications"
            )
        ) || [];


    if (applications.length === 0) {

        applicationsList.innerHTML =
            "<p>You haven't applied for any jobs yet.</p>";

        return;

    }


    applicationsList.innerHTML = "";


    for (
        let i = 0;
        i < applications.length;
        i++
    ) {

        let jobName =
            applications[i].jobName;


        let status =
            applications[i].status;


        let appliedClass = "";

        let reviewClass = "";

        let shortlistedClass = "";

        let rejectedClass = "";


        if (status === "Applied") {

            appliedClass = "active";

        }

        else if (
            status === "Under Review"
        ) {

            appliedClass = "completed";

            reviewClass = "review-active";

        }

        else if (
            status === "Shortlisted"
        ) {

            appliedClass = "completed";

            reviewClass = "completed";

            shortlistedClass =
                "shortlisted-active";

        }

        else if (
            status === "Rejected"
        ) {

            appliedClass = "completed";

            reviewClass = "completed";

            rejectedClass =
                "rejected-active";

        }


        applicationsList.innerHTML += `

            <div class="application-card">

                <h3>
                    ${jobName}
                </h3>


                <p>

                    Application Status:

                    <strong
                        class="status-${status
                            .toLowerCase()
                            .replace(" ", "-")}">

                        <span class="status-dot"></span>

                        ${status}

                    </strong>

                </p>


                <div class="application-progress">


                    <span
                        class="progress-step ${appliedClass}">

                        Applied

                    </span>


                    <span
                        class="progress-line">
                    </span>


                    <span
                        class="progress-step ${reviewClass}">

                        Under Review

                    </span>


                    <span
                        class="progress-line">
                    </span>


                    ${
                        status === "Rejected"

                        ?

                        `<span
                            class="progress-step ${rejectedClass}">

                            Rejected

                        </span>`

                        :

                        `<span
                            class="progress-step ${shortlistedClass}">

                            Shortlisted

                        </span>`
                    }


                </div>


                <button
                    class="update-status-button"
                    onclick="updateApplicationStatus('${jobName}')">

                    Update Status

                </button>


            </div>

        `;

    }

}


// Run applications display

displayApplications();


// ===============================
// UPDATE APPLICATION STATUS
// ===============================

function updateApplicationStatus(
    jobName
) {

    let applications =
        JSON.parse(
            localStorage.getItem(
                "jobApplications"
            )
        ) || [];


    for (
        let i = 0;
        i < applications.length;
        i++
    ) {

        if (
            applications[i].jobName ===
            jobName
        ) {

            if (
                applications[i].status ===
                "Applied"
            ) {

                applications[i].status =
                    "Under Review";

            }

            else if (
                applications[i].status ===
                "Under Review"
            ) {

                applications[i].status =
                    "Shortlisted";

            }

            else if (
                applications[i].status ===
                "Shortlisted"
            ) {

                applications[i].status =
                    "Rejected";

            }

            else {

                applications[i].status =
                    "Applied";

            }

        }

    }


    localStorage.setItem(
        "jobApplications",
        JSON.stringify(applications)
    );


    displayApplications();

}


// ===============================
// LOGOUT
// ===============================

function logoutUser() {

    localStorage.removeItem(
        "loggedIn"
    );


    alert(
        "You have been logged out!"
    );


    window.location.href =
        "login.html";

}


// ===============================
// VIEW JOB
// ===============================

function viewJob(jobName) {

    localStorage.setItem(
        "selectedJob",
        jobName
    );


    window.location.href =
        "job-details.html";

}


// ===============================
// JOB DETAILS DATA
// ===============================

let selectedJob =
    localStorage.getItem(
        "selectedJob"
    );


let jobData = {


    "Frontend Developer": {

        company:
            "ABC Technologies",

        location:
            "Chennai, India",

        salary:
            "₹4 - ₹6 LPA",

        type:
            "Full Time",

        experience:
            "Fresher / 0-2 Years",

        workMode:
            "On-site",

        skills:
            "HTML, CSS, JavaScript, Git",

        description:
            "We are looking for a creative Frontend Developer to build responsive and user-friendly websites."

    },


    "Java Developer": {

        company:
            "XYZ Solutions",

        location:
            "Bangalore, India",

        salary:
            "₹5 - ₹8 LPA",

        type:
            "Full Time",

        experience:
            "Fresher / 0-2 Years",

        workMode:
            "Hybrid",

        skills:
            "Java, SQL, Spring Boot, Git",

        description:
            "We are looking for a Java Developer to develop reliable backend applications and APIs."

    },


    "Python Developer": {

        company:
            "Tech Innovations",

        location:
            "Hyderabad, India",

        salary:
            "₹4 - ₹7 LPA",

        type:
            "Full Time",

        experience:
            "Fresher / 0-2 Years",

        workMode:
            "Remote",

        skills:
            "Python, SQL, Django, Git",

        description:
            "Join our development team and build powerful applications using Python and modern technologies."

    },


    "UI/UX Designer": {

        company:
            "Creative Labs",

        location:
            "Coimbatore, India",

        salary:
            "₹3 - ₹5 LPA",

        type:
            "Full Time",

        experience:
            "Fresher / 0-2 Years",

        workMode:
            "On-site",

        skills:
            "Figma, UI Design, UX Design, Prototyping",

        description:
            "We are looking for a creative UI/UX Designer to design attractive and easy-to-use digital experiences."

    }

};


// ===============================
// DISPLAY JOB DETAILS
// ===============================

if (
    selectedJob &&
    jobData[selectedJob]
) {

    let job =
        jobData[selectedJob];


    let title =
        document.querySelector(
            ".detail-title h1"
        );


    if (title) {

        title.innerText =
            selectedJob;

    }


    let smallTitle =
        document.querySelector(
            ".detail-title .small-title"
        );


    if (smallTitle) {

        smallTitle.innerText =
            job.company.toUpperCase();

    }


    let meta =
        document.querySelectorAll(
            ".detail-meta span"
        );


    if (meta.length >= 3) {

        meta[0].innerText =
            "🏢 " + job.company;

        meta[1].innerText =
            "📍 " + job.location;

        meta[2].innerText =
            "💼 " + job.type;

    }


    let overview =
        document.querySelectorAll(
            ".overview-grid strong"
        );


    if (overview.length >= 4) {

        overview[0].innerText =
            job.salary;

        overview[1].innerText =
            job.type;

        overview[2].innerText =
            job.experience;

        overview[3].innerText =
            job.workMode;

    }


    let description =
        document.querySelector(
            ".detail-section p"
        );


    if (description) {

        description.innerText =
            job.description;

    }


    let skillContainer =
        document.querySelector(
            ".skill-list"
        );


    if (skillContainer) {

        skillContainer.innerHTML = "";


        let skills =
            job.skills.split(",");


        for (
            let i = 0;
            i < skills.length;
            i++
        ) {

            skillContainer.innerHTML +=

                "<span>" +

                skills[i].trim() +

                "</span>";

        }

    }

}


// ===============================
// SAVE JOB
// ===============================

function saveJob() {

    let selectedJob =
        localStorage.getItem(
            "selectedJob"
        );


    if (!selectedJob) {

        alert(
            "Please select a job first!"
        );

        return;

    }


    let savedJobs =
        JSON.parse(
            localStorage.getItem(
                "savedJobs"
            )
        ) || [];


    if (
        savedJobs.indexOf(
            selectedJob
        ) !== -1
    ) {

        alert(
            "This job is already saved!"
        );

        return;

    }


    savedJobs.push(
        selectedJob
    );


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    alert(
        selectedJob +
        " saved successfully!"
    );

}


// ===============================
// DISPLAY SAVED JOBS
// ===============================

function displaySavedJobs() {

    let savedJobsList =
        document.getElementById(
            "savedJobsList"
        );


    if (!savedJobsList) {

        return;

    }


    let savedJobs =
        JSON.parse(
            localStorage.getItem(
                "savedJobs"
            )
        ) || [];


    if (savedJobs.length === 0) {

        savedJobsList.innerHTML =
            "<p>You haven't saved any jobs yet.</p>";

        return;

    }


    savedJobsList.innerHTML = "";


    for (
        let i = 0;
        i < savedJobs.length;
        i++
    ) {

        savedJobsList.innerHTML += `

            <div class="application-card">

                <h3>
                    ${savedJobs[i]}
                </h3>


                <p>
                    Status: Saved Job
                </p>


                <button
                    onclick="openSavedJob('${savedJobs[i]}')">

                    View Job

                </button>


                <button
                    class="remove-job-button"
                    onclick="removeSavedJob('${savedJobs[i]}')">

                    Remove

                </button>

            </div>

        `;

    }

}


// Run saved jobs display

displaySavedJobs();


// ===============================
// OPEN SAVED JOB
// ===============================

function openSavedJob(jobName) {

    localStorage.setItem(
        "selectedJob",
        jobName
    );


    window.location.href =
        "job-details.html";

}


// ===============================
// REMOVE SAVED JOB
// ===============================

function removeSavedJob(
    jobName
) {

    let savedJobs =
        JSON.parse(
            localStorage.getItem(
                "savedJobs"
            )
        ) || [];


    let updatedJobs = [];


    for (
        let i = 0;
        i < savedJobs.length;
        i++
    ) {

        if (
            savedJobs[i] !==
            jobName
        ) {

            updatedJobs.push(
                savedJobs[i]
            );

        }

    }


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(
            updatedJobs
        )
    );


    displaySavedJobs();


    alert(
        jobName +
        " removed from saved jobs!"
    );

}


// ===============================
// EDIT PROFILE
// ===============================

function editProfile() {

    let currentName =
        localStorage.getItem(
            "userName"
        ) || "Alan";


    let currentEmail =
        localStorage.getItem(
            "userEmail"
        ) || "alan@gmail.com";


    let newName =
        prompt(
            "Enter your name:",
            currentName
        );


    if (
        newName === null ||
        newName.trim() === ""
    ) {

        return;

    }


    let newEmail =
        prompt(
            "Enter your email:",
            currentEmail
        );


    if (
        newEmail === null ||
        newEmail.trim() === ""
    ) {

        return;

    }


    localStorage.setItem(
        "userName",
        newName
    );


    localStorage.setItem(
        "userEmail",
        newEmail
    );


    let profileName =
        document.getElementById(
            "profileName"
        );


    let profileEmail =
        document.getElementById(
            "profileEmail"
        );


    if (profileName) {

        profileName.innerText =
            newName;

    }


    if (profileEmail) {

        profileEmail.innerText =
            newEmail;

    }


    alert(
        "Profile updated successfully!"
    );

}