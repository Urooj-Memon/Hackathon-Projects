// Get form and output sections
const form = document.getElementById('resume-form') as HTMLFormElement | null;
const resumeOutput = document.getElementById('resume-output') as HTMLElement | null;

// Sections for displaying the resume
const personalInfoOutput = document.getElementById('personal-info-output') as HTMLElement | null;
const educationOutput = document.getElementById('education-output') as HTMLElement | null;
const workExperienceOutput = document.getElementById('work-experience-output') as HTMLElement | null;
const skillsOutput = document.getElementById('skills-output') as HTMLElement | null;

if (form) {
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // Get form values and ensure type safety
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split(',');

        // Profile picture handling
        const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
        const profilePic = profilePicInput?.files ? profilePicInput.files[0] : null;

        if (profilePic && personalInfoOutput) {
            const reader = new FileReader();
            reader.onload = function () {
                const imgElement = document.createElement('img');
                imgElement.src = reader.result as string;
                personalInfoOutput.innerHTML = '';  // Clear previous content
                personalInfoOutput.appendChild(imgElement);  // Append image
            };
            reader.readAsDataURL(profilePic);  // Read the image file
        }

        // Populate resume sections if output elements exist
        if (personalInfoOutput) {
            personalInfoOutput.innerHTML += `
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
            `;
        }

        if (educationOutput) {
            educationOutput.innerHTML = `
                <h2>Education</h2>
                <p>${education}</p>
            `;
        }

        if (workExperienceOutput) {
            workExperienceOutput.innerHTML = `
                <h2>Work Experience</h2>
                <p>${workExperience}</p>
            `;
        }

        if (skillsOutput) {
            skillsOutput.innerHTML = `
                <h2>Skills</h2>
                <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
            `;
        }

        // Show the resume output if the resume section exists
        if (resumeOutput) {
            resumeOutput.classList.remove('hidden');
        }
    });
}
