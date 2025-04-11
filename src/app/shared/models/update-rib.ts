export class UpdateRib {
    BusinessPartner!: string;
    IBAN!: string;
    BankAccountHolderName!: string;

    public constructor(init?: Partial<UpdateRib>) {
        Object.assign(this, init);
    }
}