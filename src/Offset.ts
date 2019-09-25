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

type Patch = Readonly<{
  seek: number;
  limit: number;
}>;

type ActionAsync<I> = (seek: number, limit: number) => Promise<ActionResult<I>>;
type ActionSync<I> = (seek: number, limit: number) => ActionResult<I>;
type ActionResult<I> = Readonly<{
  total: number,
  length: number,
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

function pages (count: number): Array<number> {
  return Array.from({length: count}, (_, i) => i + 1);
}

function* pagesI (count: number): IterableIterator<number> {
  for (let i = 1; i <= count; ++i) {
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

function pageCurrA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageCurrA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageCurrA (page: any, action: any, limit?: any): any {
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

function pageCurrRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageCurrRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageCurrRawA (page: any, action: any, limit?: any): any {
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

function pagePrevA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pagePrevA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pagePrevA (page: any, action: any, limit?: any): any {
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

function pagePrevRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pagePrevRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pagePrevRawA (page: any, action: any, limit?: any): any {
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

function pageNextA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageNextA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageNextA (page: any, action: any, limit?: any): any {
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

function pageNextRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  limit?: number
): Promise<Pagination<I>>;
function pageNextRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  limit?: number
): Pagination<I>;
function pageNextRawA (page: any, action: any, limit?: any): any {
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

function pageSeekA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageSeekA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageSeekA (page: any, action: any, seek: any, limit?: any): any {
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

function pageSeekRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageSeekRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageSeekRawA (page: any, action: any, seek: any, limit?: any): any {
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

function pageJumpA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageJumpA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageJumpA (page: any, action: any, index: any, limit?: any): any {
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

function pageJumpRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionAsync<I>,
  seek: number,
  limit?: number
): Promise<Pagination<I>>;
function pageJumpRawA<I extends Iterable<any>> (
  page: Pagination<I>,
  action: ActionSync<I>,
  seek: number,
  limit?: number
): Pagination<I>;
function pageJumpRawA (page: any, action: any, index: any, limit?: any): any {
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
        length: result_.length,
        items: result_.items
      }
    });
  } else {
    return {
      ...patch,
      total: result.total,
      length: result.length,
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
  pageCurrA,
  pageCurrRaw,
  pageCurrRawA,
  pagePrev,
  pagePrevA,
  pagePrevRaw,
  pagePrevRawA,
  pageNext,
  pageNextA,
  pageNextRaw,
  pageNextRawA,
  pageSeek,
  pageSeekA,
  pageSeekRaw,
  pageSeekRawA,
  pageJump,
  pageJumpA,
  pageJumpRaw,
  pageJumpRawA
};
