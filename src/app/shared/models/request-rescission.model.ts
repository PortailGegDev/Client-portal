import { Address } from "./address.model";

export class RequestRecission {
    contractISU!: string;
    firstName!: string;
    lastName!: string;
    sourceCreation!: string;
    canal!: string;
    email!: string;
    phone!: string;
    departureDate!: string;
  
    resiliationAddress!: Address;
    billingAddress!:Address;
    
    referenceClient!: string;
    requestReason!: string;
    dataUsageConsent!: string;
  
    constructor(init?: Partial<RequestRecission>) {
      Object.assign(this, init);
    }
  }
  