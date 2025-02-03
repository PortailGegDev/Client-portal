export class Profil{
    HouseNumber!: string;
    StreetName!: string;
    PostalCode!: string;
    CityName!: string;


    public constructor(init?: Partial<Profil>) {
        Object.assign(this, init);
    }
}