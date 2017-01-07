import { CustomComparator } from './custom.comparator';

const value1 = { prop: 'value1' }, value2 = { prop: 'value2' };

describe(`Comparator: ${CustomComparator.name}`, () => {
    let comparator: CustomComparator<any>;
    let spyCompare: jasmine.Spy;

    beforeEach(() => {
        spyCompare = jasmine.createSpy('compare');
        comparator = new CustomComparator<any>(spyCompare);
    });

    it('calls compareFn withe correct values', () => {
        comparator.compare(value1, value2);

        expect(spyCompare).toHaveBeenCalledWith(value1, value2);
    });

    it('returns value from compareFn when 0', () => {
        spyCompare.and.returnValue(0);

        expect(comparator.compare(value1, value2)).toBe(0);
    });

    it('returns value from compareFn when 1', () => {
        spyCompare.and.returnValue(1);

        expect(comparator.compare(value1, value2)).toBe(1);
    });

    it('returns value from compareFn when -1', () => {
        spyCompare.and.returnValue(-1);

        expect(comparator.compare(value1, value2)).toBe(-1);
    });

    it('returns value from compareFn when object', () => {
        let result = {};
        spyCompare.and.returnValue(result);

        expect(comparator.compare(value1, value2)).toBe(result);
    });
});
