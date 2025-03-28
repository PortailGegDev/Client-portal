export class Mandate {
MandateLogicalKey!: string;
SEPAMandate!: string;
BusinessPartnerBankId!: string;
SEPASignatureDate!: string;
ValidityStartDate!: string;
ValidityEndDate!: string;
SEPAMandateStatus!: string;
SEPAMandateSender!: string;
SEPAMandateSenderB2B!: string;
SenderStreetName!: string;
SenderHouseNumber!: string;
SenderPostalCode!: string;
SenderCityName!: string;
SenderCountry!: string;
SEPAMandateSenderIBAN!: string;
SEPAMandateSenderBankSWIFTCode!: string;
SEPAMandateRecipient!: string;
SEPAMandateCreditor!: string;
RecipientStreetName!: string;
RecipientHouseNumber!: string;
RecipientPostalCode!: string;
RecipientCityName!: string;
RecipientCountry!: string;

 public constructor(init?: Partial<Mandate>) {
          Object.assign(this, init);
 }
}
                