export class Profil {
    HouseNumber!: string;
    StreetName!: string;
    PostalCode!: string;
    CityName!: string;
    PostalAddress!: string;
    FullName!: string;
    PhoneNumber!:string;
    SocialStatus!:string;

    public constructor(init?: Partial<Profil>) {
        Object.assign(this, init);
    }
}