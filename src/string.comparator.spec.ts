import { StringComparator } from './string.comparator';
import { commonNullTests } from './common-tests';

const value1 = 'value1', value2 = 'value2';
const result = {};

describe(`Comparator: ${StringComparator.name}`, () => {
    let originalIntl: any;
    let comparator: StringComparator;
    let spyCompare: jasmine.Spy;

    beforeAll(() => originalIntl = window['Intl']);

    afterAll(() => window['Intl'] = originalIntl);

    beforeEach(() => {
        spyCompare = jasmine.createSpy('compare');
        spyCompare.and.returnValue(result);
        window['Intl'] = {
            Collator: () => { return { compare: spyCompare }; }
        };
        comparator = new StringComparator();
    });

    commonNullTests(() => comparator);

    describe('collator calls', () => {
        it('calls collator if first argument is null', () => {
            expect(comparator.compare(null, value2)).toBe(result);
            expect(spyCompare).toHaveBeenCalledWith(null, value2);
        });

        it('calls collator if first argument is undefined', () => {
            expect(comparator.compare(undefined, value2)).toBe(result);
            expect(spyCompare).toHaveBeenCalledWith(undefined, value2);
        });

        it('calls collator if second argument is null', () => {
            expect(comparator.compare(value1, null)).toBe(result);
            expect(spyCompare).toHaveBeenCalledWith(value1, null);
        });

        it('calls collator if second argument is undefined', () => {
            expect(comparator.compare(value1, undefined)).toBe(result);
            expect(spyCompare).toHaveBeenCalledWith(value1, undefined);
        });

        it('calls collator if both arguments are defined', () => {
            expect(comparator.compare(value1, value2)).toBe(result);
            expect(spyCompare).toHaveBeenCalledWith(value1, value2);
        });
    });
});
