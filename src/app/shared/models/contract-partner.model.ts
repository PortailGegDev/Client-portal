export class Contract {
    contractISU!: string;
    businessPartner!: string;
    ccBusinessPartner!: string;
    partnerFunction!: string;
    contractAccount!: string;
    isPartner!: boolean;
    ContractISU!: string;
    AddressCompteur!: string;

    public constructor(init?: Partial<Contract>) {
        Object.assign(this, init);
    }
}