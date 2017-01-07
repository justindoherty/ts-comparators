import { ChainableComparator } from './chainable.comparator';

export class BasicComparator<T> extends ChainableComparator<T> {
    compare(value1: T, value2: T): number {
        if (value1 === value2 || (value1 == null && value2 == null)) {
            return 0;
        } else if (value2 != null && (value1 == null || value1 > value2)) {
            return 1;
        } else {
            return -1;
        }
    };
}
