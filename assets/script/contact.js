'use strict';

//Class Shapes
class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.setName(name);
        this.setCity(city);
        this.setEmail(email);
    }

    setName(name) {
        const letterPattern = /^[A-Za-z\s]+$/;
        if (name !== "" && letterPattern.test(name)) {
            this.#name = name;
        } else {
            throw new Error('Name must be letters');
        }
    }

    getName() {
        return this.#name;
    }

    setCity(city) {
        const letterPattern = /^[A-Za-z\s]+$/;
        if (city !== "" && letterPattern.test(city)) {
            this.#city = city;
        } else {
            throw new Error('City must be a lettrs');
        }

    }

    getCity() {
        return this.#city;
    }

    setEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email.length !== 0 && emailPattern.test(email)) {
            this.#email = email;
        }
        else {
            throw new Error('Email must be a valid email like name@domain.com');
        }
    }

    getEmail() {
        return this.#email;
    }
}

//Export functions
export {
    Contact
};




