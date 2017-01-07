import { Comparator } from './comparator';
import { compareFn } from './utils';

export abstract class ChainableComparator<T> implements Comparator<T> {
    abstract compare(value1: T, value2: T): number;

    reverse(): Comparator<T> {
        return new ChainedComparator((value1: T, value2: T): number => this.compare(value2, value1));
    }

    then(nextComparator: Comparator<T>): Comparator<T> {
        return new ChainedComparator((value1: T, value2: T): number => {
            let result = this.compare(value1, value2);
            if (result === 0) {
                result = nextComparator.compare(value1, value2);
            }
            return result;
        });
    }
}

class ChainedComparator<T> extends ChainableComparator<T> {
    constructor(private compareFn: compareFn<T>) {
        super();
    }

    compare(value1: T, value2: T): number {
        return this.compareFn(value1, value2);
    }
}
