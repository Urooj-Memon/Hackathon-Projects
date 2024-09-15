// Get form and output sections
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
// Sections for displaying the resume
var personalInfoOutput = document.getElementById('personal-info-output');
var educationOutput = document.getElementById('education-output');
var workExperienceOutput = document.getElementById('work-experience-output');
var skillsOutput = document.getElementById('skills-output');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Get form values and ensure type safety
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('work-experience').value;
        var skills = document.getElementById('skills').value.split(',');
        // Profile picture handling
        var profilePicInput = document.getElementById('profile-pic');
        var profilePic = (profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.files) ? profilePicInput.files[0] : null;
        if (profilePic && personalInfoOutput) {
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                var imgElement = document.createElement('img');
                imgElement.src = reader_1.result;
                personalInfoOutput.innerHTML = ''; // Clear previous content
                personalInfoOutput.appendChild(imgElement); // Append image
            };
            reader_1.readAsDataURL(profilePic); // Read the image file
        }
        // Populate resume sections if output elements exist
        if (personalInfoOutput) {
            personalInfoOutput.innerHTML += "\n                <h2>Personal Information</h2>\n                <p><strong>Name:</strong> ".concat(name, "</p>\n                <p><strong>Email:</strong> ").concat(email, "</p>\n                <p><strong>Phone:</strong> ").concat(phone, "</p>\n            ");
        }
        if (educationOutput) {
            educationOutput.innerHTML = "\n                <h2>Education</h2>\n                <p>".concat(education, "</p>\n            ");
        }
        if (workExperienceOutput) {
            workExperienceOutput.innerHTML = "\n                <h2>Work Experience</h2>\n                <p>".concat(workExperience, "</p>\n            ");
        }
        if (skillsOutput) {
            skillsOutput.innerHTML = "\n                <h2>Skills</h2>\n                <ul>".concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n            ");
        }
        // Show the resume output if the resume section exists
        if (resumeOutput) {
            resumeOutput.classList.remove('hidden');
        }
    });
}
