export class UpdateRib {
    contractISU!: string;
    businessPartnerBankId!: string;
    action!: string;

    public constructor(init?: Partial<UpdateRib>) {
        Object.assign(this, init);
    }
}