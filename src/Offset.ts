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

type Patch = Readonly<{
  seek: number;
  limit: number;
}>;

type ActionAsync<I> = (seek: number, limit: number) => Promise<ActionResult<I>>;
type ActionSync<I> = (seek: number, limit: number) => ActionResult<I>;
type ActionResult<I> = Readonly<{
  total: number,
  count: number,
  items: I
}>;

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

function pageCurrRaw<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  const seekNew = page.seek;
  return {seek: seekNew, limit: limitNew};
};

function pageCurrRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageCurrRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageCurrRawM (page: any, action: any, limit?: any): any {
  const patch = pageCurrRaw(page, limit);
  return processAction(action, patch);
}

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
  const patch = pagePrev(page, limit);
  return processAction(action, patch);
}

function pagePrevRaw<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  const seekNew = page.seek - limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pagePrevRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pagePrevRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pagePrevRawM (page: any, action: any, limit?: any): any {
  const patch = pagePrevRaw(page, limit);
  return processAction(action, patch);
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
  const patch = pageNext(page, limit);
  return processAction(action, patch);
}

function pageNextRaw<I extends Iterable<any>> (
  page: Pagination<I>,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  const seekNew = page.seek + limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pageNextRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageNextRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageNextRawM (page: any, action: any, limit?: any): any {
  const patch = pageNextRaw(page, limit);
  return processAction(action, patch);
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
  const patch = pageSeek(page, seek, limit);
  return processAction(action, patch);
}

function pageSeekRaw<I extends Iterable<any>> (
  page: Pagination<I>,
  seek: number,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  return {seek: seek, limit: limitNew};
}

function pageSeekRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageSeekRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageSeekRawM (page: any, action: any, seek: any, limit?: any): any {
  const patch = pageSeekRaw(page, seek, limit);
  return processAction(action, patch);
}

function pageJump<I extends Iterable<any>> (
  page: Pagination<I>,
  index: number,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = Math.max(index, 0);
  const seekNew = indexNew * limitNew;
  return {seek: seekNew, limit: limitNew};
}

function pageJumpM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageJumpM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageJumpM (page: any, action: any, index: any, limit?: any): any {
  const patch = pageJump(page, index, limit);
  return processAction(action, patch);
}

function pageJumpRaw<I extends Iterable<any>> (
  page: Pagination<I>,
  index: number,
  limit?: number
): Patch {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = Math.max(index, 0);
  const seekNew = indexNew * page.limit;
  return {seek: seekNew, limit: limitNew};
}

function pageJumpRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageJumpRawM<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageJumpRawM (page: any, action: any, index: any, limit?: any): any {
  const patch = pageJumpRaw(page, index, limit);
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
      return {
        ...patch,
        total: result_.total,
        count: result_.count,
        items: result_.items
      }
    });
  } else {
    return {
      ...patch,
      total: result.total,
      count: result.count,
      items: result.items
    };
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
  pageCurrM,
  pageCurrRaw,
  pageCurrRawM,
  pagePrev,
  pagePrevM,
  pagePrevRaw,
  pagePrevRawM,
  pageNext,
  pageNextM,
  pageNextRaw,
  pageNextRawM,
  pageSeek,
  pageSeekM,
  pageSeekRaw,
  pageSeekRawM,
  pageJump,
  pageJumpM,
  pageJumpRaw,
  pageJumpRawM
};
