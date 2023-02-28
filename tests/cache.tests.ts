import { cache } from '../index'

describe('cache', () => {
  it('should memoize the results of the underlying function', () => {
    const mockFn = jest.fn((x, y) => x + y)
    const { cachedFn } = cache(mockFn)

    // First call should run the original function
    expect(cachedFn(2, 3)).toBe(5)
    expect(mockFn).toHaveBeenCalledWith(2, 3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Second call with same arguments should use cached result
    expect(cachedFn(2, 3)).toBe(5)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Call with different arguments should run the original function again
    expect(cachedFn(4, 5)).toBe(9)
    expect(mockFn).toHaveBeenCalledWith(4, 5)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should store results separately for different arguments', () => {
    const mockFn = jest.fn((x, y) => x + y)
    const { cachedFn } = cache(mockFn)

    // Call with different arguments should run the original function again
    expect(cachedFn(2, 3)).toBe(5)
    expect(mockFn).toHaveBeenCalledWith(2, 3)
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Call with different arguments should run the original function again
    expect(cachedFn(4, 5)).toBe(9)
    expect(mockFn).toHaveBeenCalledWith(4, 5)
    expect(mockFn).toHaveBeenCalledTimes(2)

    // Call with the same arguments as before should use cached result
    expect(cachedFn(2, 3)).toBe(5)
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should use stringified objects as cache keys', () => {
    const mockFn = jest.fn((obj) => Object.values(obj).join('-'))
    const { cachedFn } = cache(mockFn)

    // Call with an object should run the original function
    expect(cachedFn({ a: 1, b: 2 })).toBe('1-2')
    expect(mockFn).toHaveBeenCalledWith({ a: 1, b: 2 })
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Call with a different object with the same properties should run the original function again
    expect(cachedFn({ b: 2, a: 1 })).toBe('1-2')
    expect(mockFn).toHaveBeenCalledWith({ b: 2, a: 1 })
    expect(mockFn).toHaveBeenCalledTimes(1)

    // Call with the same object as before should use cached result
    expect(cachedFn({ a: 1, b: 2 })).toBe('1-2')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should keep track of the number of hits for each cached result', () => {
    const mockFn = jest.fn((x, y) => x + y)
    const { cachedFn, hitCount } = cache(mockFn)

    // Call with different arguments should run the original function and have 0 hits
    expect(cachedFn(2, 3)).toBe(5)
    expect(hitCount(2, 3)).toBe(0)

    // Call with same arguments as before should use cached result and have 1 hit
    expect(cachedFn(2, 3)).toBe(5)
    expect(hitCount(2, 3)).toBe(1)

    // Call with different arguments should run the original function and have 0 hits
    expect(hitCount(10, 15)).toBe(0)
  })
})
