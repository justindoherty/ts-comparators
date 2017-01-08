import { Comparator } from './comparator';
import { PropertyComparator } from './property.comparator';

type Value = { prop: any };
type Property = {};
const prop1: Property = {}, prop2: Property = {};
const value1: Value = { prop: prop1 }, value2: Value = { prop: prop2 };
const result = {};

describe(`Comparator: ${PropertyComparator.name}`, () => {
    let comparator: PropertyComparator<any, any>;
    let compareSpy: jasmine.Spy;

    beforeEach(() => {
        compareSpy = jasmine.createSpy('compare');
        comparator = new PropertyComparator<Value, 'prop'>('prop', { compare: compareSpy } as any);
    });

    it('calls comparator with transformed values', () => {
        comparator.compare(value1, value2);
        expect(compareSpy).toHaveBeenCalledWith(prop1, prop2);
    });

    it('returns compare results', () => {
        compareSpy.and.returnValue(result);
        expect(comparator.compare(value1, value2)).toBe(result);
    });
});
