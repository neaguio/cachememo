import { memoize } from '../index'

describe('memoize', () => {
  it('should memoize a function with a single argument', () => {
    const fn = jest.fn().mockImplementation((x) => x * 2)
    const memoizedFn = memoize(fn)

    expect(memoizedFn(2)).toBe(4)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(2)).toBe(4)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(3)).toBe(6)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(memoizedFn(3)).toBe(6)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should memoize a function with multiple arguments', () => {
    const fn = jest.fn().mockImplementation((x, y) => x * y)
    const memoizedFn = memoize(fn)

    expect(memoizedFn(2, 3)).toBe(6)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(2, 3)).toBe(6)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(3, 4)).toBe(12)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(memoizedFn(3, 4)).toBe(12)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should memoize a function with object arguments', () => {
    const fn = jest.fn().mockImplementation((obj) => obj.x + obj.y)
    const memoizedFn = memoize(fn)

    expect(memoizedFn({ x: 2, y: 3 })).toBe(5)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn({ x: 2, y: 3 })).toBe(5)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn({ x: 3, y: 4 })).toBe(7)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(memoizedFn({ x: 3, y: 4 })).toBe(7)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should memoize a function with mixed argument types', () => {
    const fn = jest.fn().mockImplementation((x, y, obj) => x + y + obj.z)
    const memoizedFn = memoize(fn)

    expect(memoizedFn(2, 3, { z: 4 })).toBe(9)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(2, 3, { z: 4 })).toBe(9)
    expect(fn).toHaveBeenCalledTimes(1)

    expect(memoizedFn(3, 4, { z: 5 })).toBe(12)
    expect(fn).toHaveBeenCalledTimes(2)

    expect(memoizedFn(3, 4, { z: 5 })).toBe(12)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
