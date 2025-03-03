export class ContractPartner {
    contractISU!: string;
    businessPartner!: string;
    ccBusinessPartner!: string;
    partnerFunction!: string;
    contractAccount!: string;
    isPartner!: boolean;
    ContractISU!: string;
    AddressCompteur!: string;
    BusinessSectorText!: string;

    public constructor(init?: Partial<ContractPartner>) {
        Object.assign(this, init);
    }
}