export class User {
    firstname!: string;
    lastname!: string;
    email!: string;
    name!: string;
    scopes!: string[];
    displayName!: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}