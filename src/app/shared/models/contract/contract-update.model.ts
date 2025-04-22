 export class ContractUpdate{
 ContractISU!: string;
  BusinessPartnerBankId!: string;
  BillingDay?:string;
  Action!: string;

  public constructor(init?: Partial<ContractUpdate>) {
    Object.assign(this, init);
}
}