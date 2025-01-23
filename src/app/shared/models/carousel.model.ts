export class Carousel {
    title!: string;
    subtitle!: string;
    img!: string;
    action!: string;

    public constructor(init?: Partial<Carousel>) {
        Object.assign(this, init);
    }
}
