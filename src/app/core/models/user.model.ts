export class User {
    firstname: string;
    lastname: string;
    email: string;
    name: string;
    scopes: string[];
    displayName: string;

    constructor(firstname: string, lastname: string, email: string, name: string, scopes: string[], displayName: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.name = name;
        this.scopes = scopes;
        this.displayName = displayName;
    }
}