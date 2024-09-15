// Function to generate an editable section with Edit and Save buttons
function generateEditableSection(title, content) {
    return "\n      <div class=\"editable-section\">\n        <h2>".concat(title, "</h2>\n        <p class=\"editable-content\" contenteditable=\"false\">").concat(content, "</p>\n        <div class=\"button-group\">\n          <button class=\"edit-button\">Edit</button>\n          <button class=\"save-button hidden\">Save</button>\n        </div>\n      </div>\n    ");
}
// Function to generate an editable list section (for Skills)
function generateEditableListSection(title, items) {
    var listItems = items.map(function (item) { return "<li>".concat(item.trim(), "</li>"); }).join('');
    return "\n      <div class=\"editable-section\">\n        <h2>".concat(title, "</h2>\n        <ul class=\"editable-content\" contenteditable=\"false\">\n          ").concat(listItems, "\n        </ul>\n        <div class=\"button-group\">\n          <button class=\"edit-button\">Edit</button>\n          <button class=\"save-button hidden\">Save</button>\n        </div>\n      </div>\n    ");
}
// Function to generate the personal information section with profile picture and Edit Picture button
function generatePersonalInfoSectionWithEdit(name, email, phone, profilePicSrc) {
    var imgHtml = '';
    if (profilePicSrc) {
        imgHtml = "\n        <img src=\"".concat(profilePicSrc, "\" alt=\"Profile Picture\" id=\"profile-pic-output\" />\n        <div class=\"button-group\">\n          <button class=\"edit-profile-pic-button\">Edit Picture</button>\n        </div>\n      ");
    }
    return "\n      <div class=\"editable-section\" id=\"personal-info-section\">\n        <h2>Personal Information</h2>\n        ".concat(imgHtml, "\n        <p class=\"editable-content\" contenteditable=\"false\"><strong>Name:</strong> ").concat(name, "</p>\n        <p class=\"editable-content\" contenteditable=\"false\"><strong>Email:</strong> ").concat(email, "</p>\n        <p class=\"editable-content\" contenteditable=\"false\"><strong>Phone:</strong> ").concat(phone, "</p>\n        <div class=\"button-group\">\n          <button class=\"edit-button\">Edit</button>\n          <button class=\"save-button hidden\">Save</button>\n        </div>\n      </div>\n    ");
}
// Get elements from the DOM
var form = document.getElementById('resume-form');
var resumeOutput = document.getElementById('resume-output');
var personalInfoOutput = document.getElementById('personal-info-output');
var educationOutput = document.getElementById('education-output');
var workExperienceOutput = document.getElementById('work-experience-output');
var skillsOutput = document.getElementById('skills-output');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value.split(',');
    var profilePicInput = document.getElementById('profile-pic');
    var profilePicFile = profilePicInput.files ? profilePicInput.files[0] : null;
    // Function to handle profile picture upload
    var handleProfilePic = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function () { return reject('Error reading profile picture.'); };
            reader.readAsDataURL(file);
        });
    };
    // Function to populate the resume sections
    var populateResume = function (profilePicSrc) {
        var picSrc = profilePicSrc ? profilePicSrc : undefined;
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
        handleProfilePic(profilePicFile).then(function (profilePicSrc) {
            populateResume(profilePicSrc);
        }).catch(function (error) {
            console.error(error);
            populateResume(); // Proceed without profile picture on error
        });
    }
    else {
        populateResume();
    }
});
// Function to make content editable and toggle buttons
function toggleEditSave(button, saveButton, contentElement) {
    if (button.textContent === 'Edit') {
        // Switch to edit mode
        contentElement.setAttribute('contenteditable', 'true');
        contentElement.focus();
        button.classList.add('hidden');
        saveButton.classList.remove('hidden');
    }
}
// Function to save the edited content and toggle buttons
function saveContent(button, editButton, contentElement) {
    if (button.textContent === 'Save') {
        // Switch to view mode
        contentElement.setAttribute('contenteditable', 'false');
        button.classList.add('hidden');
        editButton.classList.remove('hidden');
    }
}
// Add event listener for handling edit/save and edit picture actions
document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('edit-button')) {
        var parentSection = target.closest('.editable-section');
        if (parentSection) {
            var saveButton = parentSection.querySelector('.save-button');
            var contentElement = parentSection.querySelector('.editable-content');
            toggleEditSave(target, saveButton, contentElement);
        }
    }
    if (target.classList.contains('save-button')) {
        var parentSection = target.closest('.editable-section');
        if (parentSection) {
            var editButton = parentSection.querySelector('.edit-button');
            var contentElement = parentSection.querySelector('.editable-content');
            saveContent(target, editButton, contentElement);
        }
    }
    if (target.classList.contains('edit-profile-pic-button')) {
        var parentSection_1 = target.closest('.editable-section');
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = function (e) {
            var input = e.target;
            if (input.files && input.files[0]) {
                var file = input.files[0];
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    var imgElement = parentSection_1.querySelector('#profile-pic-output');
                    if (imgElement) {
                        imgElement.src = reader_1.result;
                    }
                };
                reader_1.readAsDataURL(file);
            }
        };
        fileInput.click();
    }
    if (target.id === 'print-resume') {
        window.print();
    }
});
