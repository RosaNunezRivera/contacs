'use strict';

//Import utilities functions  
import {
    onEvent,
    select,
    selectById,
    selectAll,
} from "./utils.js";

//Import class 
import {
    Contact
} from "../script/contact.js";

/*--------------------------------------------------------------------------------*/
/* Function: Click Ad button                                                  */
/*--------------------------------------------------------------------------------*/
const createButton = select('.add-button');
const mensaggeError = select('.error-message');
const gridContainer = select('.container-div-list');

//Array to save contacts 
const master = [];

let nameUser;
let cityUser;
let emailUser;

onEvent(createButton, 'click', function (e) {
    e.preventDefault();
    AddContact();
});

/*-------------------------------------------------------*/
/*  Function: Add Contact                                */
/*-------------------------------------------------------*/
function AddContact() {
    try {
        if (master.length <= 15) {
            mensaggeError.style.display = 'none';
            const { nameUser, cityUser, emailUser } = getContactInfo();
            const newContact = new Contact(nameUser, cityUser, emailUser);
            master.unshift(newContact);
            listContacts();
            displayContactsSaved();
        } else {
            throw new Error('The containter is full, please detele some one contacts');
        }

    } catch (error) {
        displayError(error.message);
    }
}
/*-------------------------------------------------------*/
/*  Function: Display error                              */
/*-------------------------------------------------------*/
function displayError(errorMessage) {
    mensaggeError.textContent = errorMessage;
    mensaggeError.style.display = 'block';
}

/*-------------------------------------------------------*/
/*  Function: Get Contact Info  Name, City, email        */
/*-------------------------------------------------------*/
const contactUser = selectById('contact-info');
function getContactInfo() {
    let commaCount = -1;
    let cleanText;

    if (contactUser.value.trim().length === 0) {
        commaCount = -1;
    } else {
        if (!contactUser.value.includes(',')) {
            cleanText = contactUser.value; // Corregir la asignación aquí
            commaCount = 0;
        } else {
            cleanText = contactUser.value.trim().split(',');
            commaCount = cleanText.length - 1;

            if (commaCount === 1 && cleanText[1] === '') {
                commaCount = 0;
            }
            if (commaCount === 1 && cleanText[2] === '') {
                commaCount = 0;
            }
            if (commaCount === 2 && cleanText[2] === '') {
                commaCount = 1;
            }
        }
    }

    if (commaCount !== 2) {
        if (commaCount === -1) {
            throw new Error('Please, enter name, city, and email');
        } else if (commaCount === 0) {
            throw new Error('Please, enter a valid city and email');
        } else if (commaCount === 1) {
            throw new Error('Please, enter a valid email like email@domain.com');
        } else if (commaCount > 2) {
            throw new Error('Ops! please, enter three values name, city, and email');
        }
    } else {
        nameUser = cleanText[0].trim();
        cityUser = cleanText[1].trim();
        emailUser = cleanText[2].toLowerCase().trim();
        return { nameUser, cityUser, emailUser };
    }
}

/*-------------------------------------------------------*/
/*  Function: Get List of contacts                      */
/*-------------------------------------------------------*/
function listContacts() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < master.length; i++) {
        let currentContact = master[i];
        const contactDiv = document.createElement("div");
        contactDiv.classList.add('div-contact');
        contactDiv.classList.add('animate');

        contactDiv.innerHTML = `<p><strong>Name:</strong> ${currentContact.getName()}</p>`;
        contactDiv.innerHTML += `<p><strong>City:</strong> ${currentContact.getCity()}</p>`;
        contactDiv.innerHTML += `<p><strong>Email:</strong> ${currentContact.getEmail()}</p>`;


        // Event listener to delete the current contact 
        contactDiv.addEventListener('click', function () {
            setInterval(contactDiv.classList.add('clicked'), 2000);
            deleteContact(currentContact);
        });

        gridContainer.appendChild(contactDiv);
    }
}

/*-----------------------------------------------------------*/
/*  Function: Delete contact clicked                         */
/*-----------------------------------------------------------*/
function deleteContact(contact) {
    let index = master.indexOf(contact);
    if (index !== -1) {
        master.splice(index, 1);
        listContacts();
        displayContactsSaved();
    }
}

/*-------------------------------------------------------*/
/*  Function: To Display counter of contacts saved       */
/*-------------------------------------------------------*/
const contactsSavedDiv = select('.container-counter');
let contactsSaved = 0;
function displayContactsSaved() {
    contactsSaved = master.length;
    contactsSavedDiv.innerHTML = `<p><strong>Contacst Saved: </strong> ${contactasSaved}</p>`;
}