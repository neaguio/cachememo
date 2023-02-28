type CacheKey = string | number | boolean | object

export default function cache<T extends (...args: any[]) => any>(fn: T) {
  const cacheMap = new Map<CacheKey, ReturnType<T>>()
  const hitCounts = new Map<CacheKey, number>()

  function cachedFn(...args: Parameters<T>): ReturnType<T> {
    const cacheKey: CacheKey =
      args.length === 1 && typeof args[0] === 'object'
        ? JSON.stringify(Object.entries(args[0]).sort())
        : (args.join('-') as CacheKey)

    if (cacheMap.has(cacheKey)) {
      hitCounts.set(cacheKey, (hitCounts.get(cacheKey) ?? 0) + 1)
      return cacheMap.get(cacheKey)!
    } else {
      const result = fn(...args)
      cacheMap.set(cacheKey, result)
      hitCounts.set(cacheKey, 0)
      return result
    }
  }

  function hitCount(...args: Parameters<T>): number | undefined {
    const cacheKey: CacheKey =
      args.length === 1 && typeof args[0] === 'object'
        ? JSON.stringify(Object.entries(args[0]).sort())
        : (args.join('-') as CacheKey)
    return hitCounts.get(cacheKey) || 0
  }

  function clear(): void {
    cacheMap.clear()
    hitCounts.clear()
  }

  return { cachedFn, hitCount, clear }
}
