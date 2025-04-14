export class ContractDetails {
    ContractISU!: string;
    ContractId!: string;
    BusinessPartner!: string;
    BusinessPartnerB2B!: string;
    BusinessPartnerId!: string;
    CustomerCategoryCode!: string;
    CustomerCategory!: string;
    ContractAccount!: string;
    StatLifecycle!: string;
    Product!: string;
    ProductName!: string;
    BusinessSector!: string;
    BusinessSectorText!: string;
    PODExt!: string;
    PDS_SF_ID!: string;
    ItemStart!: string;
    ItemEnd?: string;
    ContractStart!: string;
    ContractEnd?: string;
    ContractStatus!: string;
    PaymentMethod!: string;
    PaymentProcedure?: string;
    BillingDay?: string;
    PaymentTerms!: string;
    ChorusId?: string;
    CodeEngagement?: string;
    CodeService?: string;
    Siret?: string;
    MeterReadingUnit!: string;
    AddressCompteur!: string;
    ProductSupplier!:string;
    ProductBrand!: string;
    ProductType!: string;
    BaremeDate?: string;
    DueDate?: string;
    EffectiveDate!: string;
    SegmtCustomer!: string;
    SegmtCustomerContract!: string;
    GazRate?: string;
    GazDeliveryRate?: string;
    TensionDomain!: string;
    ContractType!: string;
    TarifOption!: string;
    TarifOptionVersion?: string;
    Power_BTINF!: number;
    Power_HTA_PTE!: number;
    PowerHPH!: number;
    PowerHCH!: number;
    PowerHPB!: number;
    PowerHCB!: number;
    FTA!: string;
    CAR!: number;
    GreenOptin!: string;
    TauxEnergieVerte!: number;
    ServicesPack!: string;
    SrvArrondiSol!: boolean;
    SrvEuroSol!: boolean;
    SrvYeliGrCoeur!: boolean;

    public constructor(init?: Partial<ContractDetails>) {
        Object.assign(this, init);
    }
}