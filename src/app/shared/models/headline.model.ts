export class Headline {
    icon!: string;
    text!: string;
    img!: string;

    public constructor(init?: Partial<Headline>) {
        Object.assign(this, init);
    }
}
