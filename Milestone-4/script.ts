// Function to generate an editable section with Edit and Save buttons
function generateEditableSection(title: string, content: string): string {
    return `
      <div class="editable-section">
        <h2>${title}</h2>
        <p class="editable-content" contenteditable="false">${content}</p>
        <div class="button-group">
          <button class="edit-button">Edit</button>
          <button class="save-button hidden">Save</button>
        </div>
      </div>
    `;
}

// Function to generate an editable list section (for Skills)
function generateEditableListSection(title: string, items: string[]): string {
    const listItems = items.map(item => `<li>${item.trim()}</li>`).join('');
    return `
      <div class="editable-section">
        <h2>${title}</h2>
        <ul class="editable-content" contenteditable="false">
          ${listItems}
        </ul>
        <div class="button-group">
          <button class="edit-button">Edit</button>
          <button class="save-button hidden">Save</button>
        </div>
      </div>
    `;
}

// Function to generate the personal information section with profile picture and Edit Picture button
function generatePersonalInfoSectionWithEdit(name: string, email: string, phone: string, profilePicSrc: string | undefined): string {
    let imgHtml = '';
    if (profilePicSrc) {
        imgHtml = `
        <img src="${profilePicSrc}" alt="Profile Picture" id="profile-pic-output" />
        <div class="button-group">
          <button class="edit-profile-pic-button">Edit Picture</button>
        </div>
      `;
    }
    return `
      <div class="editable-section" id="personal-info-section">
        <h2>Personal Information</h2>
        ${imgHtml}
        <p class="editable-content" contenteditable="false"><strong>Name:</strong> ${name}</p>
        <p class="editable-content" contenteditable="false"><strong>Email:</strong> ${email}</p>
        <p class="editable-content" contenteditable="false"><strong>Phone:</strong> ${phone}</p>
        <div class="button-group">
          <button class="edit-button">Edit</button>
          <button class="save-button hidden">Save</button>
        </div>
      </div>
    `;
}

// Get elements from the DOM
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeOutput = document.getElementById('resume-output') as HTMLElement;
const personalInfoOutput = document.getElementById('personal-info-output') as HTMLElement;
const educationOutput = document.getElementById('education-output') as HTMLElement;
const workExperienceOutput = document.getElementById('work-experience-output') as HTMLElement;
const skillsOutput = document.getElementById('skills-output') as HTMLElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    // Get form values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.split(',');
    const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    const profilePicFile = profilePicInput.files ? profilePicInput.files[0] : null;

    // Function to handle profile picture upload
    const handleProfilePic = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject('Error reading profile picture.');
            reader.readAsDataURL(file);
        });
    };

    // Function to populate the resume sections
    const populateResume = (profilePicSrc?: string | ArrayBuffer | null) => {
        const picSrc = profilePicSrc ? profilePicSrc as string : undefined;

        // Populate personal information section
        personalInfoOutput.innerHTML = generatePersonalInfoSectionWithEdit(name, email, phone, picSrc);

        // Populate other sections
        educationOutput.innerHTML = generateEditableSection('Education', education);
        workExperienceOutput.innerHTML = generateEditableSection('Work Experience', workExperience);
        skillsOutput.innerHTML = generateEditableListSection('Skills', skills);

        // Show the resume output
        resumeOutput.classList.remove('hidden');

        // Reset the form
        form.reset();
    };

    if (profilePicFile) {
        handleProfilePic(profilePicFile).then((profilePicSrc) => {
            populateResume(profilePicSrc);
        }).catch((error) => {
            console.error(error);
            populateResume(); // Proceed without profile picture on error
        });
    } else {
        populateResume();
    }
});

// Function to make content editable and toggle buttons
function toggleEditSave(button: HTMLElement, saveButton: HTMLElement, contentElement: HTMLElement) {
    if (button.textContent === 'Edit') {
        // Switch to edit mode
        contentElement.setAttribute('contenteditable', 'true');
        contentElement.focus();
        button.classList.add('hidden');
        saveButton.classList.remove('hidden');
    }
}

// Function to save the edited content and toggle buttons
function saveContent(button: HTMLElement, editButton: HTMLElement, contentElement: HTMLElement) {
    if (button.textContent === 'Save') {
        // Switch to view mode
        contentElement.setAttribute('contenteditable', 'false');
        button.classList.add('hidden');
        editButton.classList.remove('hidden');
    }
}

// Add event listener for handling edit/save and edit picture actions
document.addEventListener('click', function (event: Event) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('edit-button')) {
        const parentSection = target.closest('.editable-section') as HTMLElement;
        if (parentSection) {
            const saveButton = parentSection.querySelector('.save-button') as HTMLElement;
            const contentElement = parentSection.querySelector('.editable-content') as HTMLElement;
            toggleEditSave(target, saveButton, contentElement);
        }
    }

    if (target.classList.contains('save-button')) {
        const parentSection = target.closest('.editable-section') as HTMLElement;
        if (parentSection) {
            const editButton = parentSection.querySelector('.edit-button') as HTMLElement;
            const contentElement = parentSection.querySelector('.editable-content') as HTMLElement;
            saveContent(target, editButton, contentElement);
        }
    }

    if (target.classList.contains('edit-profile-pic-button')) {
        const parentSection = target.closest('.editable-section') as HTMLElement;
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = (e: Event) => {
            const input = e.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = function () {
                    const imgElement = parentSection.querySelector('#profile-pic-output') as HTMLImageElement;
                    if (imgElement) {
                        imgElement.src = reader.result as string;
                    }
                };
                reader.readAsDataURL(file);
            }
        };

        fileInput.click();
    }

    if (target.id === 'print-resume') {
        window.print();
    }
});

