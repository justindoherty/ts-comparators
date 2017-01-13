# ts-comparators
This is a comparators package written in typscript

[![Build Status](https://travis-ci.org/justindoherty/ts-comparators.svg?branch=master)](https://travis-ci.org/justindoherty/ts-comparators)
[![dependencies Status](https://david-dm.org/justindoherty/ts-comparators/status.svg)](https://david-dm.org/justindoherty/ts-comparators)
[![devDependencies Status](https://david-dm.org/justindoherty/ts-comparators/dev-status.svg)](https://david-dm.org/justindoherty/ts-comparators?type=dev)
[![codecov](https://codecov.io/gh/justindoherty/ts-comparators/branch/master/graph/badge.svg)](https://codecov.io/gh/justindoherty/ts-comparators)

## Comparators
### `BasicComparator`
The `BasicComparator` is the simplest of all the comparators and doesn't do anything special except that it can be used internally by other comparators and possesses the `ChainableComparator` functionality.

```typescript
let values = [3, 2, 1];
let comparator = new BasicComparator<number>();
values.sort((value1, value2) => comparator.compare(value1, value2));
// values = [1, 2, 3]
```

### `ChainableComparator`
`ChainableComparator`

### `CustomComparator`
`CustomComparator`

### `PropertyComparator`
`PropertyComparator`

### `StringComparator`
`StringComparator`

### `ValueComparator`
`ValueComparator`

## Reversing
Reversing

## Chaining
Chaining
