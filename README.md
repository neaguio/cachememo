#### This library provides two functions for optimizing function calls in JavaScript applications: memoize and cache.

**Memoize** is a higher-order function that takes a function as input and returns a new function that caches the results of the original function based on the arguments it receives. When the memoized function is called with the same arguments, it returns the cached result instead of recalculating it. This can significantly improve performance in cases where the original function is computationally expensive or frequently called with the same inputs.

```js
import { memoize } from 'cachememo';

function slowFunction(n: number): number {
  console.log(`Calculating ${n}...`);
  return n * n;
}

const memoizedSlowFunction = memoize(slowFunction);
console.log(memoizedSlowFunction(5)); // logs "Calculating 5..." and "25"
console.log(memoizedSlowFunction(5)); // logs only "25"
console.log(memoizedSlowFunction(6)); // logs "Calculating 6..." and "36"
console.log(memoizedSlowFunction(6)); // logs only "36"
```

**Cache** is a similar function that provides more advanced caching features, such as hit counting and cache clearing. It also allows for caching the results of functions that take objects as arguments, normalizing them to ensure that objects with the same key-value pairs (but different order) are treated as equivalent.

```js
import { cache } from 'cachememo';

// A slow function that adds two numbers together
function add(x, y) {
  console.log('Running add function');
  return x + y;
}

// Cache the results of the add function
const { cachedFn: cachedAdd,clear } = cache(add);

// Call the cached function with the same arguments multiple times
console.log(cachedAdd(2, 3)); // Output: Running add function, 5
console.log(cachedAdd(2, 3)); // Output: 5 (no log message)
console.log(cachedAdd(2, 3)); // Output: 5 (no log message)

// Call the cached function with different arguments
console.log(cachedAdd(4, 5)); // Output: Running add function, 9

// clear cache
clear();
```