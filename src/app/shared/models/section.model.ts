export class Section {
    id!: number;
    title!: string;
    content!: string;

    constructor(init?: Partial<Section>) {
        Object.assign(this, init);
      }
  }