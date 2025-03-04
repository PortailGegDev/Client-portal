export class Contract {
    BusinessSector!: string;
    CityName!: string;
    ContractAccount!: string;
    ContractISU!: string;
    ContractStatus!: string;
    ContratCRM!: string;
    Country!: string;
    DescriptionI!: string;
    HouseNumber!: string;
    Installation!: string;
    OrderedProd!: string;
    PartnerFct!: string;
    PartnerGuid!: string;
    PartnerId!: string;
    PayerFullName!: string;
    PayerPartnerId!: string;
    Pod!: string;
    PostalCode!: string;
    Premise!: string;
    StreetName!: string;
    Title?: string;
    contend!: string;
    contstart!: string;

    public constructor(init?: Partial<Contract>) {
        Object.assign(this, init);
    }
}