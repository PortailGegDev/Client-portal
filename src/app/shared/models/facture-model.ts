export class Facture {
    PostingDate!: string;
    UtilitiesInvoicingDocument!: string;
    TotalAmount!: string;
    StatusInvoicingDocument!: string;
    TotalUnpaidHT!: string;

    public constructor(init?: Partial<Facture>) {
        Object.assign(this, init);
    }
}