export class CreateMandat {
    SEPAMandate!: string;
    BusinessPartnerBankId!: string;
    SEPASignatureCityName!: string;
    SEPASignatureDate!: string;
    SEPAMandateStatus!: string;
    SEPAMandateRecipient!: string;

    public constructor(init?: Partial<CreateMandat>) {
        Object.assign(this, init);
    }
}