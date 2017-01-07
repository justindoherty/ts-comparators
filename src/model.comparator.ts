import { Comparator } from './comparator';
import { ChainableComparator } from './chainable.comparator';

export class ModelComparator<T, V> extends ChainableComparator<T> {
    constructor(private propertyGetter: (T) => V, private comparator: Comparator<V>) {
        super();
    }

    compare(value1: T, value2: T): number {
        return this.comparator.compare(this.propertyGetter(value1), this.propertyGetter(value2));
    }
}
