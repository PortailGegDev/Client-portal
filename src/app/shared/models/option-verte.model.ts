import { Section } from "./section.model";

export class OptionVerte {
    mainTitle!: string;
    subtitle!: string;
    highlights!: string;
    sections!: Section[];
    footer!: string;
    
    constructor(init?: Partial<OptionVerte>) {
        Object.assign(this, init);
      }
  }
  