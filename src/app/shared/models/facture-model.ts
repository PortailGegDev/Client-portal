export class Facture {
    postingDate!: string;
    utilitiesInvoicingDocument!: string;
    totalAmount!: string;
    statusInvoicingDocument!: string;
    totalUnpaidHT!: string;

    public constructor(init?: Partial<Facture>) {
        Object.assign(this, init);
    }
}