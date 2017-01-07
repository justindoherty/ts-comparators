export interface Comparator<T> {
    compare(value1: T, value2: T): number;
    reverse(): Comparator<T>;
    then(nextComparator: Comparator<T>): Comparator<T>;
}
