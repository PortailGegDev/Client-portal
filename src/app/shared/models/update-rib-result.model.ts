export class UpdateRibResult {
    RibChanged!: boolean;
    ErrorMessage!: string;

    public constructor(init?: Partial<UpdateRibResult>) {
        Object.assign(this, init);
    }
}