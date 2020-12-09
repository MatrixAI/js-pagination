/**
 * Offset pagination
 */

type Pagination<I extends Iterable<any>> = Readonly<{
  seek: number;
  limit: number;
  total: number;
  length: number;
  items: I;
}>;

/**
 * Query used for fetching pages.
 * Note that seek and limit are not optional.
 * You can default seek to 0.
 * Limit must be defaulted to some number greater than 0 to allow pagination.
 */
type Query = Readonly<{
  seek: number;
  limit: number;
}>;

type FetchSync<I> = (query: Query) => FetchResult<I>;
type FetchAsync<I> = (query: Query) => Promise<FetchResult<I>>;
type FetchResult<I> = Readonly<{
  total: number;
  length: number;
  items: I;
}>;

function range(start: number, end: number): Array<number> {
  return Array.from({ length: end - start }, (_, i) => i + start);
}

function pageIndex(seek: number, limit: number): number {
  return Math.floor(seek / limit);
}

function pageCount(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

function pageFirst(index: number): boolean {
  return index === 0;
}

function pageLast(index: number, count: number): boolean {
  return index === count - 1;
}

function pages(count: number): Array<number> {
  return range(1, count + 1);
}

function* pagesI(count: number): IterableIterator<number> {
  for (let i = 1; i <= count; ++i) {
    yield i;
  }
}

function pagesT(
  count: number,
  index: number,
  countLeft: number,
  countIndex: number,
  countRight: number,
):
  | [Array<number>]
  | [Array<number>, Array<number>]
  | [Array<number>, Array<number>, Array<number>] {
  const countSlots = countLeft + 1 + countIndex + 1 + countRight;
  if (count <= countSlots) {
    return [pages(count)];
  }
  const leftStart = 1;
  const leftEnd = countLeft;
  const indexStart = index - Math.floor(countIndex / 2) + 1;
  const indexEnd = index + Math.floor(countIndex / 2) + 1;
  const rightStart = count - countRight + 1;
  const rightEnd = count;
  if (indexStart <= leftEnd + 1) {
    const countLeftNew = countSlots - countRight;
    return [range(leftStart, countLeftNew), range(rightStart, rightEnd + 1)];
  } else if (indexEnd >= rightStart - 1) {
    const countRightNew = countSlots - countLeft - 2;
    return [
      range(leftStart, leftEnd + 1),
      range(count - countRightNew, rightEnd + 1),
    ];
  } else {
    return [
      range(leftStart, leftEnd + 1),
      range(indexStart, indexEnd + 1),
      range(rightStart, rightEnd + 1),
    ];
  }
}

/**
 * Constructs the initial pagination
 */
function pageInit<I extends Iterable<any>>(
  fetch: FetchSync<I>,
  query: Query,
): Pagination<I>;
function pageInit<I extends Iterable<any>>(
  fetch: FetchAsync<I>,
  query: Query,
): Promise<Pagination<I>>;
function pageInit(fetch: any, query: any): any {
  return processFetch(fetch, query);
}

/**
 * Performs fetching the current page based on page index
 */
function pageCurr<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pageCurr<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pageCurr(page: any, fetch: any, limit?: any): any {
  const query = pageCurr_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the current page.
 * Based on the page index.
 */
function pageCurr_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const indexNew = pageIndex(page.seek, limitNew);
  const seekNew = indexNew * limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching the current page based on seek
 */
function pageCurrRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pageCurrRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pageCurrRaw(page: any, fetch: any, limit?: any): any {
  const query = pageCurrRaw_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the current page.
 * Based on the seek.
 */
function pageCurrRaw_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const seekNew = page.seek;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching the previous page based on page index
 */
function pagePrev<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pagePrev<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pagePrev(page: any, fetch: any, limit?: any): any {
  const query = pagePrev_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the previous page.
 * Based on the page index.
 */
function pagePrev_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = Math.max(indexNew - 1, 0);
  const seekNew = indexNew * limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching the previous page based on seek
 */
function pagePrevRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pagePrevRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pagePrevRaw(page: any, fetch: any, limit?: any): any {
  const query = pagePrevRaw_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the previous page.
 * Based on the seek.
 */
function pagePrevRaw_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const seekNew = page.seek - limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching the next page based on page index
 */
function pageNext<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pageNext<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pageNext(page: any, fetch: any, limit?: any): any {
  const query = pageNext_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the next page.
 * Based on the page index.
 */
function pageNext_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = indexNew + 1;
  const seekNew = indexNew * limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching the next page based on seek
 */
function pageNextRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  limit?: number,
): Promise<Pagination<I>>;
function pageNextRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  limit?: number,
): Pagination<I>;
function pageNextRaw(page: any, fetch: any, limit?: any): any {
  const query = pageNextRaw_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the next page.
 * Based on the seek.
 */
function pageNextRaw_<I extends Iterable<any>>(
  page: Pagination<I>,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const seekNew = page.seek + limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching a seeked page based on page index
 */
function pageSeek<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  seek: number,
  limit?: number,
): Pagination<I>;
function pageSeek<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  seek: number,
  limit?: number,
): Promise<Pagination<I>>;
function pageSeek(page: any, fetch: any, seek: any, limit?: any): any {
  const query = pageSeek_(page, seek, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching a seeked page.
 * Based on the page index.
 */
function pageSeek_<I extends Iterable<any>>(
  page: Pagination<I>,
  seek: number,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  let indexNew = pageIndex(seek, limitNew);
  indexNew = Math.max(indexNew, 0);
  const seekNew = indexNew * limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching a seeked page based on seek
 */
function pageSeekRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  seek: number,
  limit?: number,
): Promise<Pagination<I>>;
function pageSeekRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  seek: number,
  limit?: number,
): Pagination<I>;
function pageSeekRaw(page: any, fetch: any, seek: any, limit?: any): any {
  const query = pageSeekRaw_(page, seek, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching a seeked page.
 * Based on the seek.
 */
function pageSeekRaw_<I extends Iterable<any>>(
  page: Pagination<I>,
  seek: number,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  return { seek: seek, limit: limitNew };
}

/**
 * Performs fetching a jumped page based on page index
 */
function pageJump<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  index: number,
  limit?: number,
): Promise<Pagination<I>>;
function pageJump<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  index: number,
  limit?: number,
): Pagination<I>;
function pageJump(page: any, fetch: any, index: any, limit?: any): any {
  const query = pageJump_(page, index, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching a jumped page.
 * Based on the page index.
 */
function pageJump_<I extends Iterable<any>>(
  page: Pagination<I>,
  index: number,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const indexNew = Math.max(index, 0);
  const seekNew = indexNew * limitNew;
  return { seek: seekNew, limit: limitNew };
}

/**
 * Performs fetching a jumped page based on seek
 */
function pageJumpRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchAsync<I>,
  index: number,
  limit?: number,
): Promise<Pagination<I>>;
function pageJumpRaw<I extends Iterable<any>>(
  page: Pagination<I>,
  fetch: FetchSync<I>,
  index: number,
  limit?: number,
): Pagination<I>;
function pageJumpRaw(page: any, fetch: any, index: any, limit?: any): any {
  const query = pageJumpRaw_(page, index, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching a jumped page.
 * Based on seek.
 */
function pageJumpRaw_<I extends Iterable<any>>(
  page: Pagination<I>,
  index: number,
  limit?: number,
): Query {
  const limitNew = limit != null ? limit : page.limit;
  const indexNew = Math.max(index, 0);
  const seekNew = indexNew * page.limit;
  return { seek: seekNew, limit: limitNew };
}

function processFetch<I extends Iterable<any>>(
  fetch: FetchSync<I>,
  query: Query,
): Pagination<I>;
function processFetch<I extends Iterable<any>>(
  fetch: FetchAsync<I>,
  query: Query,
): Promise<Pagination<I>>;
function processFetch(fetch: any, query: any): any {
  const result = fetch(query);
  if (result instanceof Promise) {
    return result.then((result_) => {
      return {
        ...query,
        total: result_.total,
        length: result_.length,
        items: result_.items,
      };
    });
  } else {
    return {
      ...query,
      total: result.total,
      length: result.length,
      items: result.items,
    };
  }
}

export type { Pagination, Query, FetchAsync, FetchSync, FetchResult };

export {
  pageIndex,
  pageCount,
  pageFirst,
  pageLast,
  pages,
  pagesI,
  pagesT,
  pageInit,
  pageCurr,
  pageCurr_,
  pageCurrRaw,
  pageCurrRaw_,
  pagePrev,
  pagePrev_,
  pagePrevRaw,
  pagePrevRaw_,
  pageNext,
  pageNext_,
  pageNextRaw,
  pageNextRaw_,
  pageSeek,
  pageSeek_,
  pageSeekRaw,
  pageSeekRaw_,
  pageJump,
  pageJump_,
  pageJumpRaw,
  pageJumpRaw_,
};
