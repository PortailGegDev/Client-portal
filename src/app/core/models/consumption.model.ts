import moment from "moment";
import { convertSAPDate } from "../../shared/utils/date-utilities";

// TODO : Vérfier les valeurs nullable et modifier le model
export class Consumption {
    meterReadingDocument!: string;
    pODExt!: string;
    pDS_SF_ID!: string;
    contractISU!: string;
    energy!: string;
    utilitiesRegister!: string;
    Consumption!: number;
    meterReadingMeasurementUnit!: string;
    MeterReadingDate!: string;
    meterReadingStatus!: string;
    meterReadingType!: string;
    meterReadingCategory!: string;
    startIndexDate!: string;
    endIndex!: string;
    endIndexDate!: string;
    transitionToZero!: string;
    idCalSupplier!: string;
    idSeasonal!: string;

    public constructor(init?: Partial<Consumption>) {
        Object.assign(this, init);
      }
}
