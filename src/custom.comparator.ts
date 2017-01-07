import { ChainableComparator } from './chainable.comparator';
import { compareFn } from './utils';

export class CustomComparator<T> extends ChainableComparator<T> {
    constructor(private compareFn: compareFn<T>) {
        super();
    }

    compare(value1: T, value2: T): number {
        return this.compareFn(value1, value2);
    }
}
