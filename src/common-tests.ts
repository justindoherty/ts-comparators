import { Comparator } from './comparator';

export function commonNullTests(getComparator: () => Comparator<any>): void {
    it('is equal when both values are null', () => {
        expect(getComparator().compare(null, null)).toBe(0);
    });

    it('is equal when both values are undefined', () => {
        expect(getComparator().compare(undefined, undefined)).toBe(0);
    });

    it('is equal when the values string is null and the second is undefined', () => {
        expect(getComparator().compare(null, undefined)).toBe(0);
    });

    it('is equal when the values string is undefined and the second is null', () => {
        expect(getComparator().compare(undefined, null)).toBe(0);
    });
}

export function commonStringTests(getComparator: () => Comparator<string>): void {
    it('is less than when the second string is null', () => {
        expect(getComparator().compare('', null)).toBe(-1);
    });

    it('is less than when the second string is undefined', () => {
        expect(getComparator().compare('', undefined)).toBe(-1);
    });

    it('is greater than when the first string is null', () => {
        expect(getComparator().compare(null, '')).toBe(1);
    });

    it('is greater than when the first string is undefined', () => {
        expect(getComparator().compare(undefined, '')).toBe(1);
    });

    it('is equal when the first string is the same as the second', () => {
        expect(getComparator().compare('one', 'one')).toBe(0);
    });

    it('is greater than when the first string is greater than the second', () => {
        expect(getComparator().compare('two', 'one')).toBe(1);
    });

    it('is less than when the first string is less than the second', () => {
        expect(getComparator().compare('one', 'two')).toBe(-1);
    });
}
