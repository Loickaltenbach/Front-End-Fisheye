export function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// form inputs + REGEX for formatting data
const form = document.getElementById ('form');
const firstName = document.getElementById ('first');
const lastName = document.getElementById ('last');
const mail = document.getElementById ('email');
const message = document.getElementById ('message');

const nameFormat = /(.*[a-z]){2}/i;
const mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// HANDLE error
const errorFirstName = document.getElementById ('error-first-name');
const errorLastName = document.getElementById ('error-last-name');
const errorMail = document.getElementById ('error-mail');
const errorMessage = document.getElementById ('error-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

export function validate () {
    let firstChecked;
    let lastChecked;
    let mailChecked;
    let messageChecked;

    if (!firstName.value.match(nameFormat) || firstName.value == ' ' || firstName.value == null || firstName.value.length < 2) {
        errorFirstName.innerText = 'Entrez 2 caractères ou plus pour ce champ.';
        errorFirstName.style.color = 'red';
        errorFirstName.style.fontSize = '12px';
        firstName.style.border = 'solid red 2px';
    } else {
        errorFirstName.style.display = 'none';
        firstName.style.border = 'none';
        firstChecked = true;
    }
    
    if (!lastName.value.match(nameFormat) || lastName.value == ' ' || lastName.value == null || lastName.value.length < 2) { 
        errorLastName.innerText = 'Entrez 2 caractères ou plus pour ce champ.';
        errorLastName.style.color = 'red';
        errorLastName.style.fontSize = '12px';
        lastName.style.border = 'solid red 2px';      
    }  else {
        errorLastName.style.display = 'none';
        lastName.style.border = 'none';
        lastChecked = true;
      }
    
    if (!mailFormat.test(mail.value)) { 
        errorMail.innerText = 'Renseignez une addresse mail valide';
        errorMail.style.color = 'red';
        errorMail.style.fontSize = '12px';
        mail.style.border = 'solid red 2px';
    } else {
        errorMail.style.display = 'none';
        mail.style.border = 'none';
        mailChecked = true;
    }
    
    if (!message.value.match(nameFormat)) { 
        errorMessage.innerText = 'Renseignez un message';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        message.style.border = 'solid red 2px';
        } else {
        errorMessage.style.display = 'none';
        message.style.border = 'none';
        messageChecked = true;      
    }

    if (firstChecked == true && lastChecked == true && mailChecked == true && messageChecked == true) {
        form.style.display = "none";
    }
}