export class Bank {
BusinessPartnerBankId!: string;
BusinessPartner!: string;
BusinessPartnerB2B!: string;
BusinessPartnerId!: string;
SAPAccountId!: string;
BankIdentification!: string;
BankCountryKey!: string;
BankName!: string;
BankNumber!: string;
SWIFTCode!: string;
BankControlKey!: string;
BankAccountHolderName!: string;
BankAccountName!: string;
ValidityStartDate!: string;
ValidityEndDate!: string;
IBAN!: string;
IBANValidityStartDate!: string;
BankAccount!: string;
BankAccountReferenceText!: string;
CollectionAuthInd!: string;
CityName!: string;
AuthorizationGroup!: string;

public constructor(init?: Partial<Bank>) {
    Object.assign(this, init);
}
}
