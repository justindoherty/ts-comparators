import { ChainableComparator } from './chainable.comparator';

export class StringComparator extends ChainableComparator<string> {
    private readonly collator: Intl.Collator;
    constructor() {
        super();
        this.collator = new Intl.Collator(undefined, {
            sensitivity: 'accent',
            ignorePunctuation: true
        });
    }
    compare(value1: string, value2: string): number {
        if (value1 == null && value2 == null) {
            return 0;
        }
        return this.collator.compare(value1, value2);
    };
}
