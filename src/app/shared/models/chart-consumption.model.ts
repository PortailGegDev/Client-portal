export class ChartConsumption {
    date!: Date;
    monthNumber: number = 0;
    year: number = 0;
    value: number = 0;
    idSeasonal: string = '';
    Energy: string = '';

    public constructor(init?: Partial<ChartConsumption>) {
        Object.assign(this, init);
    }
}
