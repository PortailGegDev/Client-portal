export class ChartConsumption {
    date!: Date;
    monthNumber: number = 0;
    value: number = 0;


    public constructor(init?: Partial<ChartConsumption>) {
        Object.assign(this, init);
    }
}
