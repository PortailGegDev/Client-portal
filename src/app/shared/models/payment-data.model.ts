export class PaymentData {
    orderId!: string;
    amount!: number;
    userEmail!: string;
    productSupplier!: string;

    public constructor(init?: Partial<PaymentRequest>) {
        Object.assign(this, init);
    }
}