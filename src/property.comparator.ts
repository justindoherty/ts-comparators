import { Comparator } from './comparator';
import { ChainableComparator } from './chainable.comparator';

export class PropertyComparator<T, K extends keyof T> extends ChainableComparator<T> {
    constructor(private property: K, private comparator: Comparator<T[K]>) {
        super();
    }

    compare(value1: T, value2: T): number {
        return this.comparator.compare(value1[this.property], value2[this.property]);
    }
}
