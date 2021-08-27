/**
 * Groups the given list using the given function.
 *
 * @param list the list to group by
 * @param getKey the function specifying the grouping key
 * @returns the grouped list
 */
export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
