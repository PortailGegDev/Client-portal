export class Section {
    id!: string;
    title!: string;
    content!: string;

    constructor(init?: Partial<Section>) {
        Object.assign(this, init);
      }
  }