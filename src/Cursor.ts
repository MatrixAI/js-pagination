/**
 * Cursor pagination
 */

type Pagination<I extends Iterable<[S, any]>, S> = Readonly<{
  order: true;
  seek: S;
  limit: number;
  length: number;
  seekFirst: S;
  seekLast: S;
  items: I;
} | {
  order: false;
  seek: S;
  limit: number;
  length: number;
  seekFirst: S;
  seekLast: S;
  items: I;
} | {
  order: null;
  seekAfter: S;
  seekBefore: S;
  seekFirst: S;
  seekLast: S;
  length: number;
  items: I;
}>;

type PatchSeekLimit<S> = Readonly<{
  order: boolean,
  seek: S,
  limit: number
}>;
type PatchSeekAfterBefore<S> = Readonly<{
  order: null,
  seekAfter: S,
  seekBefore: S
}>;

type ActionAsync<I, S> = {
  (order: boolean, seek: S, limit: number): Promise<ActionResult<I, S>>
  (order: null, seekAfter: S, seekBefore:S): Promise<ActionResult<I, S>>
};
type ActionSync<I, S> = {
  (order: boolean, seek: S, limit: number): ActionResult<I, S>
  (order: null, seekAfter: S, seekBefore: S): ActionResult<I, S>
};
type ActionResult<I, S> = Readonly<{
  length: number,
  seekFirst: S,
  seekLast: S,
  items: I
}>;

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
    limitNew = (limit != null) ? limit : page.length;
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
    limitNew = (limit != null) ? limit : page.length;
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
    return result.then((result_) => ({
      ...patch,
      length: result_.length,
      seekFirst: result_.seekFirst,
      seekLast: result_.seekLast,
      items: result_.items
    }));
  } else {
    return {
      ...patch,
      length: result.length,
      seekFirst: result.seekFirst,
      seekLast: result.seekLast,
      items: result.items
    };
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
