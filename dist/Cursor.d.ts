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
declare type Pagination<I extends Iterable<[S, any]>, S> = Readonly<{
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
declare type PatchSeekLimit<S> = Readonly<{
    order: boolean;
    seek: S;
    limit: number;
}>;
declare type PatchSeekAfterBefore<S> = Readonly<{
    order: null;
    seekAfter: S;
    seekBefore: S;
}>;
declare type ActionAsync<I, S> = {
    (order: boolean, seek: S, limit: number): Promise<ActionResult<I, S>>;
    (order: null, seekAfter: S, seekBefore: S): Promise<ActionResult<I, S>>;
};
declare type ActionSync<I, S> = {
    (order: boolean, seek: S, limit: number): ActionResult<I, S>;
    (order: null, seekAfter: S, seekBefore: S): ActionResult<I, S>;
};
declare type ActionResult<I, S> = Readonly<{
    count: number;
    seekFirst: S;
    seekLast: S;
    items: I;
}>;
declare function pageCurr<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S> | PatchSeekAfterBefore<S>;
declare function pagePrev<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S>;
declare function pageNext<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S>;
declare function pageCurrM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pageCurrM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
declare function pagePrevM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pagePrevM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
declare function pageNextM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pageNextM<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
export { Pagination, PatchSeekLimit, PatchSeekAfterBefore, ActionAsync, ActionSync, ActionResult, pageCurr, pagePrev, pageNext, pageCurrM, pagePrevM, pageNextM };
