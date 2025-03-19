export class PaymentRedirection {
    redirectionData!: string;
    redirectionStatusCode!: string;
    redirectionStatusMessage!: string;
    redirectionUrl!: string;
    redirectionVersion!: string;
    seal!: string;

    public constructor(init?: Partial<PaymentRedirection>) {
        Object.assign(this, init);
    }
}