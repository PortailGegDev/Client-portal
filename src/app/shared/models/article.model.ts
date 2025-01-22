export class Article {
    title!: string;
    description!: string;
    img!: string;

    public constructor(init?: Partial<Article>) {
        Object.assign(this, init);
    }
}
