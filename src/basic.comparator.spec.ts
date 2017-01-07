import { BasicComparator } from './basic.comparator';
import { commonNullTests, commonStringTests } from './common-tests';

describe(`Comparator: ${BasicComparator.name}`, () => {

    describe('sorts null and undefined', () => {
        let comparator: BasicComparator<null | undefined>;

        beforeEach(() => comparator = new BasicComparator());

        commonNullTests(() => comparator);
    });

    describe('sorts strings', () => {
        let comparator: BasicComparator<string>;

        beforeEach(() => comparator = new BasicComparator<string>());

        commonStringTests(() => comparator);
    });

    describe('sorts numbers', () => {
        let comparator: BasicComparator<number>;

        beforeEach(() => comparator = new BasicComparator<number>());

        it('is less than when first number is zero and the second number is null', () => {
            expect(comparator.compare(0, null)).toBe(-1);
        });

        it('is less than when first number is greater than zero and the second number is null', () => {
            expect(comparator.compare(1, null)).toBe(-1);
        });

        it('is less than when first number is less than zero and the second number is null', () => {
            expect(comparator.compare(-1, null)).toBe(-1);
        });

        it('is less than when the first number is zero second number is undefined', () => {
            expect(comparator.compare(0, undefined)).toBe(-1);
        });

        it('is less than when the first number is greater than zero second number is undefined', () => {
            expect(comparator.compare(1, undefined)).toBe(-1);
        });

        it('is less than when the first number is less than zero second number is undefined', () => {
            expect(comparator.compare(-1, undefined)).toBe(-1);
        });

        it('is greater than when the first number is null and the second number is 0', () => {
            expect(comparator.compare(null, 0)).toBe(1);
        });

        it('is greater than when the first number is null and the second number is greater than 0', () => {
            expect(comparator.compare(null, 1)).toBe(1);
        });

        it('is greater than when the first number is null and the second number is less than 0', () => {
            expect(comparator.compare(null, -1)).toBe(1);
        });

        it('is greater than when the first number is undefined and the second number is 0', () => {
            expect(comparator.compare(undefined, 0)).toBe(1);
        });

        it('is greater than when the first number is undefined and the second number is greater than 0', () => {
            expect(comparator.compare(undefined, 1)).toBe(1);
        });

        it('is greater than when the first number is undefined and the second number is less than 0', () => {
            expect(comparator.compare(undefined, -1)).toBe(1);
        });

        it('is equal when the first number is equal to the second', () => {
            expect(comparator.compare(1, 1)).toBe(0);
        });

        it('is greater than when the first number is greater than the second', () => {
            expect(comparator.compare(100, -100)).toBe(1);
        });

        it('is less than when the first number is less than the second', () => {
            expect(comparator.compare(-1, 1)).toBe(-1);
        });
    });
});
