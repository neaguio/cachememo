type MemoizeFn<T extends (...args: any[]) => any> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>
  clear: () => void
}

export default function memoize<T extends (...args: any[]) => any>(fn: T): MemoizeFn<T> {
  const cache = new Map<string, ReturnType<T>>()
  const memoizedFn = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)!
    }
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  } as MemoizeFn<T>

  memoizedFn.clear = () => {
    cache.clear()
  }

  return memoizedFn
}
