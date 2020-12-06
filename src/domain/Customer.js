export default class Customer {
    constructor({username, email, firstname, lastname, password, registeredDate}) {
        this.username = username;
        this.password = password;
        this.email = email.toLowerCase();
        this.firstname = firstname;
        this.lastname = lastname;
        this.registeredDate = registeredDate;
    }
}