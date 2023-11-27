'use strict'

/*-------------------------------------------------------*/
/*  Utility functions                                    */
/*-------------------------------------------------------*/
// Add event listener
function onEvent(selector, event, callback) {
    return selector.addEventListener(event, callback);
}

// Select HTML element
function select(selector, parent = document) {
    return parent.querySelector(selector);
}
// Get HTML element by id
function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

// Get a (node) list of HTML elements
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

// Print
function print(arg) {
    console.log(arg);
}

// Sleep
function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    });
}

// Generate random number between - and including - 'min' and 'max'
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Filter array
function filterArray(array, callback) {
    return array.filter(callback);
}

//Export functions to use in add file
export {
    onEvent,
    select,
    selectById,
    selectAll,
    print,
    sleep,
    randomNumber,
    filterArray
};

