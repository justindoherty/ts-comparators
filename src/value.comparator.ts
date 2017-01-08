import { Comparator } from './comparator';
import { ChainableComparator } from './chainable.comparator';

export class ValueComparator<T, V> extends ChainableComparator<T> {
    constructor(private valueGetterGetter: (T) => V, private comparator: Comparator<V>) {
        super();
    }

    compare(value1: T, value2: T): number {
        return this.comparator.compare(this.valueGetterGetter(value1), this.valueGetterGetter(value2));
    }
}
