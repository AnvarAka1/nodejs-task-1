export const getQueryParams = (query: string | null): Record<string, string> => {
  if (query) {
    return query
      .split('&')
      .map((queryPair) => queryPair.split('='))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: decodeURIComponent(value)
      }), {})
  }
  return {}
}