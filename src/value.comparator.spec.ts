import { Comparator } from './comparator';
import { ValueComparator } from './value.comparator';

const value1 = {}, value2 = {}, newValue1 = {}, newValue2 = {}, result = {};

describe(`Comparator: ${ValueComparator.name}`, () => {
    let comparator: ValueComparator<any, any>;
    let getterSpy: jasmine.Spy;
    let compareSpy: jasmine.Spy;

    beforeEach(() => {
        getterSpy = jasmine.createSpy('getter');
        compareSpy = jasmine.createSpy('compare');
        comparator = new ValueComparator(getterSpy, { compare: compareSpy } as any);
    });

    it('calls getter with correct values', () => {
        comparator.compare(value1, value2);
        expect(getterSpy).toHaveBeenCalledWith(value1);
        expect(getterSpy).toHaveBeenCalledWith(value2);
        expect(getterSpy).toHaveBeenCalledTimes(2);
    });

    it('calls comparator with transformed values', () => {
        getterSpy.and.callFake(value => {
            if (value === value1) {
                return newValue1;
            } else if (value === value2) {
                return newValue2;
            }
            return null;
        });
        comparator.compare(value1, value2);
        expect(compareSpy).toHaveBeenCalledWith(newValue1, newValue2);
    });

    it('returns compare results', () => {
        compareSpy.and.returnValue(result);
        expect(comparator.compare(value1, value2)).toBe(result);
    });
});
