#### This library provides two functions for optimizing function calls in JavaScript applications: memoize and cache.

**Memoize** is a higher-order function that takes a function as input and returns a new function that caches the results of the original function based on the arguments it receives. When the memoized function is called with the same arguments, it returns the cached result instead of recalculating it. This can significantly improve performance in cases where the original function is computationally expensive or frequently called with the same inputs.

**Cache** is a similar function that provides more advanced caching features, such as hit counting and cache clearing. It also allows for caching the results of functions that take objects as arguments, normalizing them to ensure that objects with the same key-value pairs (but different order) are treated as equivalent.
