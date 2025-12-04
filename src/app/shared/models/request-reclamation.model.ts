import { Address } from "./address.model";

export class RequestReclamation{
    contractISU!: string;
    firstName!: string;
    lastName!: string;
    address!: Address;
    type!: string;
    message!: string;

    requestReason!: string;
    dataUsageConsent!: string;
    canal!: string;
    sourceCreation!: string;
    reclamationAddress!: Address;

     constructor(init?: Partial<RequestReclamation>) {
      Object.assign(this, init);
    }
}