export type PaginatedRecords<T> = {
  page: number;
  size: number;
  totalCount: number;
  records: T[];
  count: number;
};

export type Pagination<
  SortByKeys extends string[] | undefined = undefined,
  ID extends string | number | undefined = undefined,
> = { limit?: number } & (ID extends undefined
  ? {
      offset: number;
    }
  : {
      fromId: ID;
    }) &
  (SortByKeys extends string[]
    ? {
        sortBy: {
          [key in SortByKeys[number]]?: 'asc' | 'desc';
        };
      }
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {});

export function assertPaginationBase(
  pagination: unknown,
): asserts pagination is Pagination {
  if (typeof pagination !== 'object' || pagination === null) {
    throw new TypeError('Pagination must be an object');
  }
  if ('limit' in pagination && typeof pagination.limit !== 'number') {
    throw new TypeError('Pagination limit must be a number');
  }
  // xor between fromId and offset
  if (
    ('fromId' in pagination && 'offset' in pagination) ||
    !('fromId' in pagination || 'offset' in pagination)
  ) {
    throw new TypeError('Pagination must have either fromId or offset');
  }

  if ('fromId' in pagination && typeof pagination.fromId !== 'string') {
    throw new TypeError('Pagination fromId must be a string');
  }

  if ('offset' in pagination && typeof pagination.offset !== 'number') {
    throw new TypeError('Pagination offset must be a number');
  }
}

export function asPagination<
  Keys extends string[] | undefined = undefined,
  ID extends string | number | undefined = undefined,
>(pagination: unknown) {
  assertPaginationBase(pagination);
  return pagination as unknown as Pagination<Keys, ID>;
}

export function isPaginationWithId<
  ID extends string | number | undefined,
  Keys extends string[] | undefined = undefined,
>(pagination: unknown): pagination is Pagination<Keys, ID> {
  assertPaginationBase(pagination);
  return 'fromId' in pagination;
}

export function isPaginationWithSortByKeys<
  Keys extends string[],
  ID extends string | number | undefined = undefined,
>(pagination: unknown): pagination is Pagination<Keys, ID> {
  assertPaginationBase(pagination);
  return 'sortBy' in pagination;
}
