export class Invoice {
    PostingDate!: string;
    PeriodEndDate!: string;
    PeriodStartDate!: string;
    NetDueDate!: string;
    NetDueYear!: number;
    UtilitiesInvoicingDocument!: string;
    TotalAmount!: number;
    TotalAmountHT!: number;
    TotalCurrency!: string;
    TotalPaidTTC!: number;
    TotalUnpaidTTC!: number;
    StatusInvoicingDocument!: string;
    TotalUnpaidHT!: number;
    Canceled!:  string;
    Energy!:  string;
    FactureType!:  string;
    ISUContract!:  string;
    PaymentMethod!: string;
    Quantity!: number;

    public constructor(init?: Partial<Invoice>) {
        Object.assign(this, init);
    }
}