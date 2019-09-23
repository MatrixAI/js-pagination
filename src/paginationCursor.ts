/**
 * Cursor pagination
 *
 * @remarks
 *
 * Cursor pagination relies on unique orderable seek key.
 *
 * Consider the resource we are paginating is:
 *
 * ```ts
 * ['A', 'B', 'C', 'D']
 * ```
 *
 * Assume that the seek key is `[0, 1, 2, 3]`.
 * Using `order = true`, `seek = 0` and `limit = 2`, you would get `['B', 'C']`.
 * Using `order = false`, `seek = 2` and `limit = 2`, you would get `['A', 'B']`.
 * Using `order = null`, `seekAfter = 1`, `seekBefore = 3`, you would get `['C']`.
 *
 * Cursor pagination does not allow random access of the pages.
 * You can however randomly access if you know the seek key you want.
 */

type Pagination<I extends Iterable<[S, any]>, S> = Readonly<{
  order: true;
  seek: S;
  limit: number;
  count: number;
  seekFirst: S;
  seekLast: S;
  items: I;
} | {
  order: false;
  seek: S;
  limit: number;
  count: number;
  seekFirst: S;
  seekLast: S;
  items: I;
} | {
  order: null;
  seekAfter: S;
  seekBefore: S;
  seekFirst: S;
  seekLast: S;
  count: number;
  items: I;
}>;

type PatchSeekLimit<S> = {
  order: boolean,
  seek: S,
  limit: number
};
type PatchSeekAfterBefore<S> = {
  order: null,
  seekAfter: S,
  seekBefore: S
};

type ActionAsync<I, S> = {
  (order: boolean, seek: S, limit: number): Promise<ActionResult<I, S>>
  (order: null, seekAfter: S, seekBefore:S): Promise<ActionResult<I, S>>
};
type ActionSync<I, S> = {
  (order: boolean, seek: S, limit: number): ActionResult<I, S>
  (order: null, seekAfter: S, seekBefore: S): ActionResult<I, S>
};
type ActionResult<I, S> = {
  count: number,
  seekFirst: S,
  seekLast: S,
  items: I
};

function pageCurr<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  limit?: number
): PatchSeekLimit<S> | PatchSeekAfterBefore<S> {
  if (page.order === true) {
    const limitNew = (limit != null) ? limit : page.limit;
    return {
      order: true,
      seek: page.seek,
      limit: limitNew
    };
  } else if (page.order === false) {
    const limitNew = (limit != null) ? limit : page.limit;
    return {
      order: false,
      seek: page.seek,
      limit: limitNew
    };
  } else {
    return {
      order: null,
      seekAfter: page.seekAfter,
      seekBefore: page.seekBefore
    };
  }
}

function pagePrev<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  limit?: number
): PatchSeekLimit<S> {
  let limitNew;
  if (page.order === null) {
    limitNew = (limit != null) ? limit : page.count;
  } else {
    limitNew = (limit != null) ? limit : page.limit;
  }
  return {
    order: false,
    seek: page.seekFirst,
    limit: limitNew
  };
}

function pageNext<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  limit?: number
): PatchSeekLimit<S> {
  let limitNew;
  if (page.order === null) {
    limitNew = (limit != null) ? limit : page.count;
  } else {
    limitNew = (limit != null) ? limit : page.limit;
  }
  return {
    order: true,
    seek: page.seekLast,
    limit: limitNew
  };
}

function pageCurrM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionAsync<I, S>,
  limit?: number
): Promise<Pagination<I, S>>;
function pageCurrM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionSync<I, S>,
  limit?: number
): Pagination<I, S>;
function pageCurrM (page: any, action: any, limit?: any): any {
  const patch = pageCurr(page, limit);
  return processAction(action, patch);
}

function pagePrevM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionAsync<I, S>,
  limit?: number
): Promise<Pagination<I, S>>;
function pagePrevM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionSync<I, S>,
  limit?: number
): Pagination<I, S>;
function pagePrevM (page: any, action: any, limit?: any): any {
  const patch = pagePrev(page, limit);
  return processAction(action, patch);
}

function pageNextM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionAsync<I, S>,
  limit?: number
): Promise<Pagination<I, S>>;
function pageNextM<I extends Iterable<[S, any]>, S> (
  page: Pagination<I, S>,
  action: ActionSync<I, S>,
  limit?: number
): Pagination<I, S>;
function pageNextM (page: any, action: any, limit?: any): any {
  const patch = pageNext(page, limit);
  return processAction(action, patch);
}

function processAction<I extends Iterable<[S, any]>, S> (
  action: ActionAsync<I, S>,
  patch: PatchSeekLimit<S> | PatchSeekAfterBefore<S>
): Promise<Pagination<I, S>>;
function processAction<I extends Iterable<[S, any]>, S> (
  action: ActionSync<I, S>,
  patch: PatchSeekLimit<S> | PatchSeekAfterBefore<S>
): Pagination<I, S>;
function processAction (action: any, patch: any): any {
  let result;
  if (patch.order === null) {
    result = action(patch.order, patch.seekAfter, patch.seekBefore);
  } else {
    result = action(patch.order, patch.seek, patch.limit);
  }
  if (result instanceof Promise) {
    return result.then((result_) => ({...patch, ...result_}));
  } else {
    return {...patch, ...result};
  }
}

export {
  Pagination,
  PatchSeekLimit,
  PatchSeekAfterBefore,
  ActionAsync,
  ActionSync,
  ActionResult,
  pageCurr,
  pagePrev,
  pageNext,
  pageCurrM,
  pagePrevM,
  pageNextM
};
