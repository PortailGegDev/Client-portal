 export class ContractUpdate{
 ContractISU?: string;
  BusinessPartnerBankId?: string;
  Action?: string;

  public constructor(init?: Partial<ContractUpdate>) {
    Object.assign(this, init);
}
}