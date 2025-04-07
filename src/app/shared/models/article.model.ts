export class Article {
    title!: string;
    description!: string;
    img!: string;
    screen!: string;

    public constructor(init?: Partial<Article>) {
        Object.assign(this, init);
    }
}
