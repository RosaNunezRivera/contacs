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
} from "./contact.js";

/*--------------------------------------------------------------------------------*/
/* Function: Click Ad button                                                  */
/*--------------------------------------------------------------------------------*/
const createButton = select('.add-button');
const mensaggeError = select('.error-message');
const gridContainer = select('.box');

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
        if (master.length <= 10) {
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
    let cleanText = contactUser.value.trim().split(',');

    nameUser = cleanText[0].trim();
    cityUser = cleanText[1].trim();
    emailUser = cleanText[2].toLowerCase().trim();

    if (nameUser.length === 0 || cityUser.length === 0 || emailUser.length === 0) {
        throw new Error('Name, City, and email are required');
    }

    return { nameUser, cityUser, emailUser };
}


/*-------------------------------------------------------*/
/*  Function: Get List of contacts                      */
/*-------------------------------------------------------*/
function listContacts() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < master.length; i++) {
        const contact = master[i];
        const contactDiv = document.createElement("div");
        contactDiv.id = 'div-' + i;
        contactDiv.className = 'div-contact';
        contactDiv.classList.add('animate');


        contactDiv.innerHTML = `<p><strong>Name:</strong> ${contact.getName()}</p>`;
        contactDiv.innerHTML += `<p><strong>City:</strong> ${contact.getCity()}</p>`;
        contactDiv.innerHTML += `<p><strong>Email:</strong> ${contact.getEmail()}</p>`;

        gridContainer.appendChild(contactDiv);

    }
}

/*-------------------------------------------------------*/
/*  Function: To Display contacts saved                  */
/*-------------------------------------------------------*/
const contactsSavedDiv = select('.contacts-saved');
let contactasSaved = 0;
function displayContactsSaved() {
    contactasSaved = master.length;
    contactsSavedDiv.innerHTML = `<p><strong>Contacst Saved: </strong> ${contactasSaved}</p>`;
}


function getContact(divId) {
    const index = parseInt(divId.split('-')[1]);
    if (!isNaN(index) && index >= 0 && index < master.length) {
        return index;
    } else {
        console.error('Invalid Index');
        return -1;
    }
}

/*-----------------------------------------------------------*/
/*  Function: Implemented even lister to delete the contact  */
/*-----------------------------------------------------------*/
const divs = selectAll('.div-contact');
divs.forEach(div => {
    onEvent(div, "click", function (e) {
        e.preventDefault();
        const index = getContact(e.currentTarget.id);

        console.log("Attaching event listener to:", div);
        console.log("Clicked div id:", e.currentTarget.id);
        console.log("Contact id:", id);

        if (index !== -1) {
            master.splice(index, 1);
            listContacts();
            displayContactsSaved();
        }
    });
});