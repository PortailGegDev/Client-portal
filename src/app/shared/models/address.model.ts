export class Address{
    street!: string;
    streetNumber!: string;
    postalCode!: string;
    city!: string;
    constructor(init?: Partial<Address>) {
        Object.assign(this, init);
      }
}