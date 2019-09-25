/**
 * Offset pagination
 */
declare type Pagination<I extends Iterable<any>> = Readonly<{
    seek: number;
    limit: number;
    total: number;
    length: number;
    items: I;
}>;
declare type Patch = Readonly<{
    seek: number;
    limit: number;
}>;
declare type ActionAsync<I> = (seek: number, limit: number) => Promise<ActionResult<I>>;
declare type ActionSync<I> = (seek: number, limit: number) => ActionResult<I>;
declare type ActionResult<I> = Readonly<{
    total: number;
    length: number;
    items: I;
}>;
declare function pageIndex(seek: number, limit: number): number;
declare function pageCount(total: number, limit: number): number;
declare function pageFirst(index: number): boolean;
declare function pageLast(index: number, count: number): boolean;
declare function pages(count: number): Array<number>;
declare function pagesI(count: number): IterableIterator<number>;
declare function pageCurr<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageCurrM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageCurrM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageCurrRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageCurrRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageCurrRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pagePrev<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pagePrevM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pagePrevM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pagePrevRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pagePrevRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pagePrevRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageNext<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageNextM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageNextM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageNextRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageNextRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageNextRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageSeek<I extends Iterable<any>>(page: Pagination<I>, seek: number, limit?: number): Patch;
declare function pageSeekM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageSeekM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageSeekRaw<I extends Iterable<any>>(page: Pagination<I>, seek: number, limit?: number): Patch;
declare function pageSeekRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageSeekRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageJump<I extends Iterable<any>>(page: Pagination<I>, index: number, limit?: number): Patch;
declare function pageJumpM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageJumpM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageJumpRaw<I extends Iterable<any>>(page: Pagination<I>, index: number, limit?: number): Patch;
declare function pageJumpRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageJumpRawM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
export { Pagination, Patch, ActionAsync, ActionSync, ActionResult, pageIndex, pageCount, pageFirst, pageLast, pages, pagesI, pageCurr, pageCurrM, pageCurrRaw, pageCurrRawM, pagePrev, pagePrevM, pagePrevRaw, pagePrevRawM, pageNext, pageNextM, pageNextRaw, pageNextRawM, pageSeek, pageSeekM, pageSeekRaw, pageSeekRawM, pageJump, pageJumpM, pageJumpRaw, pageJumpRawM };
