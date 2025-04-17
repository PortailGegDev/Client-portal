export class UpdateRib {
    BusinessPartner!: string;
    BusinessPartnerB2B!: string;
    IBAN!: string;
    BankAccountHolderName!: string;

    public constructor(init?: Partial<UpdateRib>) {
        Object.assign(this, init);
    }
}