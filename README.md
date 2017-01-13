# ts-comparators
This is a comparators package written in typscript

[![Build Status](https://travis-ci.org/justindoherty/ts-comparators.svg?branch=master)](https://travis-ci.org/justindoherty/ts-comparators)
[![dependencies Status](https://david-dm.org/justindoherty/ts-comparators/status.svg)](https://david-dm.org/justindoherty/ts-comparators)
[![devDependencies Status](https://david-dm.org/justindoherty/ts-comparators/dev-status.svg)](https://david-dm.org/justindoherty/ts-comparators?type=dev)
[![codecov](https://codecov.io/gh/justindoherty/ts-comparators/branch/master/graph/badge.svg)](https://codecov.io/gh/justindoherty/ts-comparators)

## Comparators
### `ChainableComparator`
The `ChainableComparator` is an abstract class that adds the ability to do chaining and reversing of the other comparators.

### `BasicComparator`
The `BasicComparator` is the simplest of all the comparators and doesn't do anything special except that it can be used internally by other comparators and possesses the `ChainableComparator` functionality.

```typescript
let values = [3, 2, 1];
let comparator = new BasicComparator<number>();
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [1, 2, 3]
```

### `StringComparator`
The `StringComparator` is basically a wrapper around [`Intl.collator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator) for it to work with the rest of the comparators in this package.

```typescript
let values = ['one', 'two', 'three'];
let comparator = new StringComparator();
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = ['one', 'three', 'two']
```

### `PropertyComparator`
The `PropertyComparator` is used to compare objects by a specific property in them. It takes the name of the property to use for the comparison as the first parameter and comparator to perform the comparison as the second parameter.

```typescript
interface Obj {
    prop: number;
}
let values: Obj[] = [{prop: 2}, {prop: 3}, {prop: 1}];
let comparator = new PropertyComparator<Obj, 'prop'>('prop', new BasicComparator<number>());
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [{prop: 1}, {prop: 2}, {prop: 3}]
```

### `ValueComparator`
The `ValueComparator` is one of the most powerful comparators because it allows you to transform the value prior to comparison or it can simply by used to pluck values out of an object. It takes function that transforms the value to use for the comparison as the first parameter and comparator to perform the comparison as the second parameter.

```typescript
interface Obj {
    prop: number;
}
let values: Obj[] = [{prop: 2}, {prop: 3}, {prop: 1}];
let comparator = new ValueComparator<Obj, number>(obj => obj.prop, new BasicComparator<number>());
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [{prop: 1}, {prop: 2}, {prop: 3}]
```

### `CustomComparator`
The `CustomComparator` is a utility comparator to convert a regular compare function in to a `ChainableComparator`.

```typescript
let values = [2, 3, 1];
let comparator = new CustomComparator<number>((value1, value2) => value1 - value2);
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [1, 2, 3]
```

## Reversing
Reversing a comparator is as simple as calling its `reverse` method. The `reverse` method will return a new `ChainableComparator` that does the same thing as the original one in the reverse order.

```typescript
let values = [2, 3, 1];
let comparator = new BasicComparator<number>().reverse();
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [3, 2, 1]
```

## Chaining
Chaining comparators is what makes this package really powerful. You can combine multiple comparators to create subsorts in an efficient manner.

```typescript
interface Obj {
    prop1: number,
    prop2: string
}
let values = [
    { prop1: 1, prop2: 'xylophone' },
    { prop1: 1, prop2: 'baseball' },
    { prop1: 2, prop2: 'hello' }
];
let comparator = new PropertyComparator<Obj, 'prop1'>('prop1', new BasicComparator<number>())
    .reverse()
    .then(new ValueComparator<Obj, string>(obj => obj.prop2, new StringComparator()));
values.sort((value1, value2) => comparator.compare(value1, value2));
//values = [,
//    { prop1: 2, prop2: 'hello' },
//    { prop1: 1, prop2: 'baseball' },
//    { prop1: 1, prop2: 'xylophone' }
//];
```
