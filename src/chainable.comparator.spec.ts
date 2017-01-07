import { ChainableComparator } from './chainable.comparator';

const value1 = { prop: 'value1' }, value2 = { prop: 'value2' };

describe(`Comparator: ${ChainableComparator.name}`, () => {
    let comparator: ChainableComparator<any>;
    let spiedCompare: jasmine.Spy;

    beforeEach(() => {
        comparator = new TestComparator();
        spiedCompare = spyOn(comparator, 'compare');
    });

    describe('method: reverse', () => {
        let reversedComparator: ChainableComparator<any>;

        beforeEach(() => reversedComparator = comparator.reverse());

        it('calls compare method reversing parameters', () => {
            reversedComparator.compare(value1, value2);

            expect(comparator.compare).toHaveBeenCalledWith(value2, value1);
        });

        it('returns the comparator value when 0', () => {
            spiedCompare.and.returnValue(0);

            expect(reversedComparator.compare(value1, value2)).toBe(0);
        });

        it('returns the comparator value when 1', () => {
            spiedCompare.and.returnValue(1);

            expect(reversedComparator.compare(value1, value2)).toBe(1);
        });

        it('returns the comparator value when -1', () => {
            spiedCompare.and.returnValue(-1);

            expect(reversedComparator.compare(value1, value2)).toBe(-1);
        });

        it('returns the comparator value when any object', () => {
            const returnValue = {};
            spiedCompare.and.returnValue(returnValue);

            expect(reversedComparator.compare(value1, value2)).toBe(returnValue);
        });
    });

    describe('method: then', () => {
        let secondComparator: ChainableComparator<any>;
        let spiedSecondCompare: jasmine.Spy;
        let chainedComparator: ChainableComparator<any>;

        beforeEach(() => {
            secondComparator = new TestComparator();
            spiedSecondCompare = spyOn(secondComparator, 'compare');
            chainedComparator = comparator.then(secondComparator);
        });

        it('only calls the second comparator when the first is equal', () => {
            spiedCompare.and.returnValue(0);
            chainedComparator.compare(value1, value2);

            expect(secondComparator.compare).toHaveBeenCalledWith(value1, value2);
        });

        it('skips calling the second comparator when the first is 1', () => {
            spiedCompare.and.returnValue(1);
            chainedComparator.compare(value1, value2);

            expect(secondComparator.compare).not.toHaveBeenCalled();
        });

        it('skips calling the second comparator when the first is -1', () => {
            spiedCompare.and.returnValue(-1);
            chainedComparator.compare(value1, value2);

            expect(secondComparator.compare).not.toHaveBeenCalled();
        });

        it('skips calling the second comparator when the first is an object', () => {
            spiedCompare.and.returnValue({});
            chainedComparator.compare(value1, value2);

            expect(secondComparator.compare).not.toHaveBeenCalled();
        });

        it('skips calling the second comparator when the first is false', () => {
            spiedCompare.and.returnValue(false);
            chainedComparator.compare(value1, value2);

            expect(secondComparator.compare).not.toHaveBeenCalled();
        });

        it('returns the comparator value when 0', () => {
            spiedCompare.and.returnValue(0);
            spiedSecondCompare.and.returnValue(0);

            expect(chainedComparator.compare(value1, value2)).toBe(0);
        });

        it('returns the comparator value when 1', () => {
            spiedCompare.and.returnValue(0);
            spiedSecondCompare.and.returnValue(1);

            expect(chainedComparator.compare(value1, value2)).toBe(1);
        });

        it('returns the comparator value when -1', () => {
            spiedCompare.and.returnValue(0);
            spiedSecondCompare.and.returnValue(-1);

            expect(chainedComparator.compare(value1, value2)).toBe(-1);
        });

        it('returns the comparator value when any object', () => {
            spiedCompare.and.returnValue(0);
            const returnValue = {};
            spiedSecondCompare.and.returnValue(returnValue);

            expect(chainedComparator.compare(value1, value2)).toBe(returnValue);
        });
    });
});

class TestComparator extends ChainableComparator<any> {
    compare(v1: any, v2: any): number {
        return 0;
    }
}
