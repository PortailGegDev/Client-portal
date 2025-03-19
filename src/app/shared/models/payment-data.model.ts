export class PaymentData {
    orderId!: string;
    amount!: number;

    public constructor(init?: Partial<PaymentRequest>) {
        Object.assign(this, init);
    }
}