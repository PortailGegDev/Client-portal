export class Article {
    title!: string;
    description!: string;
    img!: string;
    consumption!: boolean;

    public constructor(init?: Partial<Article>) {
        Object.assign(this, init);
    }
}
