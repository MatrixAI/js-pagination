/**
 * Offset pagination
 *
 * @remarks
 *
 * Offset pagination relies on a seek and limit number.
 *
 * Consider the resource we are paginating is:
 *
 * ```ts
 * ['A', 'B', 'C', 'D']
 * ```
 *
 * The seek index starts at 0.
 * The limit is entire length of the returned pagination view.
 * A seek and limit of `[0, 2]` would return `['A', 'B']`.
 *
 * The page numbers start at 1. So by using `[0, 2]`
 * we get page numbers of `[1, 2]`. We still refer to these numbers
 * with the page index.
 *
 * Note that the total represents the total number of items
 * when the pagination was fetched. The true total of items may have
 * changed on the server side since fetching a pagination.
 */

type Pagination<I extends Iterable<any>> = Readonly<{
  seek: number;
  limit: number;
  total: number;
  count: number;
  items: I;
}>;

type Patch = {
  seek: number;
  limit: number;
};

type ActionAsync<I> = (seek: number, limit: number) => Promise<ActionResult<I>>;
type ActionSync<I> = (seek: number, limit: number) => ActionResult<I>;
type ActionResult<I> = {
  total: number,
  count: number,
  items: I
};

function pageIndex (seek: number, limit: number): number {
  return Math.floor(seek / limit);
}

function pageCount (total: number, limit: number): number {
  return Math.ceil(total / limit);
}

function pageFirst (index: number): boolean {
  return index === 0;
}

function pageLast (index: number, count: number): boolean {
  return index === (count - 1);
}

function pages (pageCount: number): Array<number> {
  return Array.from({length: pageCount}, (_, i) => i + 1);
}

function* pagesI (pageCount: number): IterableIterator<number> {
  for (let i = 1; i <= pageCount; ++i) {
      yield i;
  }
}

function pageCurr<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  const indexNew = pageIndex(page.seek, limitNew);
  const seekNew = indexNew * limitNew;
  return {seek: seekNew, limit: limitNew};
};

function pagePrev<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = Math.max(indexNew - 1, 0);
  const seekNew = indexNew * limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pageNext<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = indexNew + 1;
  const seekNew = indexNew * limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pageSeek<I extends Iterable<any>> (
  page: Pagination<I>,
  seek: number,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(seek, limitNew);
  indexNew = Math.max(indexNew, 0);
  const seekNew = indexNew * limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pageCurrM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageCurrM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageCurrM (page: any, action: any, limit?: any): any {
  const patch = pageCurr(page, limit);
  return processAction(action, patch);
}

function pagePrevM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pagePrevM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pagePrevM (page: any, action: any, limit?: any): any {
  const patch = pageCurr(page, limit);
  return processAction(action, patch);
}

function pageNextM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageNextM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageNextM (page: any, action: any, limit?: any): any {
  const patch = pageCurr(page, limit);
  return processAction(action, patch);
}

function pageSeekM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageSeekM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageSeekM (page: any, action: any, seek: any, limit?: any): any {
  const patch = pageCurr(page, limit);
  return processAction(action, patch);
}

function processAction<I extends Iterable<any>> (
  action: ActionAsync<I>,
  patch: Patch,
): Promise<Pagination<I>>;
function processAction<I extends Iterable<any>> (
  action: ActionSync<I>,
  patch: Patch
): Pagination<I>;
function processAction (action: any, patch: any): any {
  const result = action(patch.seek, patch.limit);
  if (result instanceof Promise) {
    return result.then((result_) => {
      return {...patch, ...result_};
    });
  } else {
    return {...patch, ...result};
  }
}

export {
  Pagination,
  Patch,
  ActionAsync,
  ActionSync,
  ActionResult,
  pageIndex,
  pageCount,
  pageFirst,
  pageLast,
  pages,
  pagesI,
  pageCurr,
  pagePrev,
  pageNext,
  pageSeek,
  pageCurrM,
  pagePrevM,
  pageNextM,
  pageSeekM
};
