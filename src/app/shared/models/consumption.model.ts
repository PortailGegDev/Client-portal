// TODO : Vérfier les valeurs nullable et modifier le model
export class Consumption {
    MeterReadingDocument!: string;
    PODExt!: string;
    PDS_SF_ID!: string;
    ContractISU!: string;
    Energy!: string;
    UtilitiesRegister!: string;
    Consumption!: number;
    MeterReadingMeasurementUnit!: string;
    MeterReadingDate!: string;
    MeterReadingStatus!: string;
    MeterReadingType!: string;
    MeterReadingCategory!: string;
    StartIndexDate!: string;
    SndIndex!: string;
    EndIndexDate!: string;
    TransitionToZero!: string;
    IdCalSupplier!: string;
    IdSeasonal!: string;

    public constructor(init?: Partial<Consumption>) {
        Object.assign(this, init);
      }
}
