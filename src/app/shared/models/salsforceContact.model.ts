export class SalesforceContact {
    Id!: string;
    Name!: string;
    Email!: string;
    Phone!: string;
    FirstName!: string;
    LastName!: string;
    Birthdate!: string;
    MobilePhone!: string;
    

    public constructor(init?: Partial<SalesforceContact>) {
        Object.assign(this, init);
    }
}