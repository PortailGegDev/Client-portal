export class ContractUpdate {
  ContractISU!: string;
  BusinessPartnerBankId?: string;
  BillingDay?: string;
  Action!: string;
  StreetName?: string;
  HouseNumber?: string;
  PostalCode?: string;
  CityName?: string;
  PayerFullName?: string;

  public constructor(init?: Partial<ContractUpdate>) {
    Object.assign(this, init);
  }
}