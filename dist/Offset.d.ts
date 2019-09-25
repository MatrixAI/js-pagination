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
declare function pageCurrA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageCurrA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageCurrRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageCurrRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageCurrRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pagePrev<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pagePrevA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pagePrevA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pagePrevRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pagePrevRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pagePrevRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageNext<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageNextA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageNextA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageNextRaw<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageNextRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageNextRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageSeek<I extends Iterable<any>>(page: Pagination<I>, seek: number, limit?: number): Patch;
declare function pageSeekA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageSeekA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageSeekRaw<I extends Iterable<any>>(page: Pagination<I>, seek: number, limit?: number): Patch;
declare function pageSeekRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageSeekRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageJump<I extends Iterable<any>>(page: Pagination<I>, index: number, limit?: number): Patch;
declare function pageJumpA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageJumpA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
declare function pageJumpRaw<I extends Iterable<any>>(page: Pagination<I>, index: number, limit?: number): Patch;
declare function pageJumpRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageJumpRawA<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
export { Pagination, Patch, ActionAsync, ActionSync, ActionResult, pageIndex, pageCount, pageFirst, pageLast, pages, pagesI, pageCurr, pageCurrA, pageCurrRaw, pageCurrRawA, pagePrev, pagePrevA, pagePrevRaw, pagePrevRawA, pageNext, pageNextA, pageNextRaw, pageNextRawA, pageSeek, pageSeekA, pageSeekRaw, pageSeekRawA, pageJump, pageJumpA, pageJumpRaw, pageJumpRawA };
