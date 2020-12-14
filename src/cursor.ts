/**
 * Cursor pagination
 */

import { CustomError } from 'ts-custom-error';

class ErrorPagination extends CustomError {}

type Pagination<I extends Iterable<[S, any]>, S> = Readonly<
  | {
      direction: true;
      seek?: S;
      limit?: number;
      length: number;
      firstSeek?: S;
      lastSeek?: S;
      items: I;
    }
  | {
      direction: false;
      seek?: S;
      limit?: number;
      length: number;
      firstSeek?: S;
      lastSeek?: S;
      items: I;
    }
  | {
      direction: null;
      seekAfter: S;
      seekBefore: S;
      firstSeek?: S;
      lastSeek?: S;
      length: number;
      items: I;
    }
>;

/**
 * Query used for fetching pages.
 * Note that seek and limit are optional.
 * Cursor pagination doesn't rely on the seek and limit.
 * Instead it relies on the firstSeek and lastSeek derived from items.
 */
type QuerySeekLimit<S> = Readonly<{
  direction: boolean;
  seek?: S;
  limit?: number;
}>;
type QuerySeekAfterBefore<S> = Readonly<{
  direction: null;
  seekAfter: S;
  seekBefore: S;
}>;
type Query<S> = QuerySeekLimit<S> | QuerySeekAfterBefore<S>;

type FetchSync<I, S> = (query: Query<S>) => FetchResult<I, S>;
type FetchAsync<I, S> = (query: Query<S>) => Promise<FetchResult<I, S>>;
type FetchResult<I, S> = Readonly<{
  length: number;
  firstSeek?: S;
  lastSeek?: S;
  items: I;
}>;

/**
 * Constructs the initial pagination
 */
function pageInit<I extends Iterable<[S, any]>, S>(
  fetch: FetchSync<I, S>,
  query: Query<S>,
): Pagination<I, S>;
function pageInit<I extends Iterable<[S, any]>, S>(
  fetch: FetchAsync<I, S>,
  query: Query<S>,
): Promise<Pagination<I, S>>;
function pageInit(fetch: any, query: any): any {
  return processFetch(fetch, query);
}

/**
 * Performs fetching the current page
 */
function pageCurr<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchSync<I, S>,
  limit?: number,
): Pagination<I, S>;
function pageCurr<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchAsync<I, S>,
  limit?: number,
): Promise<Pagination<I, S>>;
function pageCurr(page: any, fetch: any, limit?: any): any {
  const query = pageCurr_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching the current page.
 * This could be using seek-limit or seek-after and seek-before.
 */
function pageCurr_<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  limit?: number,
): Query<S> {
  if (page.direction === true) {
    const limitNew = limit != null ? limit : page.limit;
    return {
      direction: true,
      seek: page.seek,
      limit: limitNew,
    };
  } else if (page.direction === false) {
    const limitNew = limit != null ? limit : page.limit;
    return {
      direction: false,
      seek: page.seek,
      limit: limitNew,
    };
  } else {
    return {
      direction: null,
      seekAfter: page.seekAfter,
      seekBefore: page.seekBefore,
    };
  }
}

/**
 * Performs fetching the previous page
 */
function pagePrev<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchSync<I, S>,
  limit?: number,
): Pagination<I, S>;
function pagePrev<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchAsync<I, S>,
  limit?: number,
): Promise<Pagination<I, S>>;
function pagePrev(page: any, fetch: any, limit?: any): any {
  const query = pagePrev_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching previous page.
 * This will convert seek-after and seek-before to seek-limit.
 * If the items is empty, this will throw an error.
 */
function pagePrev_<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  limit?: number,
): QuerySeekLimit<S> {
  if (page.length < 1) {
    throw new ErrorPagination('Cannot paginate from an empty page');
  }
  let limitNew;
  if (page.direction === null) {
    limitNew = limit != null ? limit : page.length;
  } else {
    limitNew = limit != null ? limit : page.limit;
  }
  return {
    direction: false,
    seek: page.firstSeek,
    limit: limitNew,
  };
}

/**
 * Performs fetching the next page
 */
function pageNext<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchSync<I, S>,
  limit?: number,
): Pagination<I, S>;
function pageNext<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  fetch: FetchAsync<I, S>,
  limit?: number,
): Promise<Pagination<I, S>>;
function pageNext(page: any, fetch: any, limit?: any): any {
  const query = pageNext_(page, limit);
  return processFetch(fetch, query);
}

/**
 * Calculates query for fetching next page.
 * This will convert seek-after and seek-before to seek-limit.
 * If the items is empty, this will throw an error.
 */
function pageNext_<I extends Iterable<[S, any]>, S>(
  page: Pagination<I, S>,
  limit?: number,
): QuerySeekLimit<S> {
  if (page.length < 1) {
    throw new ErrorPagination('Cannot paginate from an empty page');
  }
  let limitNew;
  if (page.direction === null) {
    limitNew = limit != null ? limit : page.length;
  } else {
    limitNew = limit != null ? limit : page.limit;
  }
  return {
    direction: true,
    seek: page.lastSeek,
    limit: limitNew,
  };
}

function processFetch<I extends Iterable<[S, any]>, S>(
  fetch: FetchSync<I, S>,
  query: Query<S>,
): Pagination<I, S>;
function processFetch<I extends Iterable<[S, any]>, S>(
  fetch: FetchAsync<I, S>,
  query: Query<S>,
): Promise<Pagination<I, S>>;
function processFetch(fetch: any, query: any): any {
  const result = fetch(query);
  if (result instanceof Promise) {
    return result.then((result_) => ({
      ...query,
      length: result_.length,
      firstSeek: result_.firstSeek,
      lastSeek: result_.lastSeek,
      items: result_.items,
    }));
  } else {
    return {
      ...query,
      length: result.length,
      firstSeek: result.firstSeek,
      lastSeek: result.lastSeek,
      items: result.items,
    };
  }
}

export type {
  Pagination,
  QuerySeekLimit,
  QuerySeekAfterBefore,
  Query,
  FetchAsync,
  FetchSync,
  FetchResult,
};

export {
  ErrorPagination,
  pageInit,
  pageCurr,
  pageCurr_,
  pagePrev,
  pagePrev_,
  pageNext,
  pageNext_,
};
