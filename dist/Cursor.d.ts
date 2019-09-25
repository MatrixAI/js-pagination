/**
 * Cursor pagination
 */
declare type Pagination<I extends Iterable<[S, any]>, S> = Readonly<{
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
    length: number;
    seekFirst: S;
    seekLast: S;
    items: I;
}>;
declare function pageCurr<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S> | PatchSeekAfterBefore<S>;
declare function pageCurrA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pageCurrA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
declare function pagePrev<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S>;
declare function pagePrevA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pagePrevA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
declare function pageNext<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, limit?: number): PatchSeekLimit<S>;
declare function pageNextA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionAsync<I, S>, limit?: number): Promise<Pagination<I, S>>;
declare function pageNextA<I extends Iterable<[S, any]>, S>(page: Pagination<I, S>, action: ActionSync<I, S>, limit?: number): Pagination<I, S>;
export { Pagination, PatchSeekLimit, PatchSeekAfterBefore, ActionAsync, ActionSync, ActionResult, pageCurr, pageCurrA, pagePrev, pagePrevA, pageNext, pageNextA };
