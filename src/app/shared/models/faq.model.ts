export class Faq {
    question!: string;
    answer!: string;
    isOpen!: boolean;

    public constructor(init?: Partial<Faq>) {
        Object.assign(this, init);
    }
}
