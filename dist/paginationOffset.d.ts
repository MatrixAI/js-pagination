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
declare type Pagination<I extends Iterable<any>> = Readonly<{
    seek: number;
    limit: number;
    total: number;
    count: number;
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
    count: number;
    items: I;
}>;
declare function pageIndex(seek: number, limit: number): number;
declare function pageCount(total: number, limit: number): number;
declare function pageFirst(index: number): boolean;
declare function pageLast(index: number, count: number): boolean;
declare function pages(pageCount: number): Array<number>;
declare function pagesI(pageCount: number): IterableIterator<number>;
declare function pageCurr<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pagePrev<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageNext<I extends Iterable<any>>(page: Pagination<I>, limit?: number): Patch;
declare function pageSeek<I extends Iterable<any>>(page: Pagination<I>, seek: number, limit?: number): Patch;
declare function pageCurrM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageCurrM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pagePrevM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pagePrevM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageNextM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, limit?: number): Promise<Pagination<I>>;
declare function pageNextM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, limit?: number): Pagination<I>;
declare function pageSeekM<I extends Iterable<any>>(page: Pagination<I>, action: ActionAsync<I>, seek: number, limit?: number): Promise<Pagination<I>>;
declare function pageSeekM<I extends Iterable<any>>(page: Pagination<I>, action: ActionSync<I>, seek: number, limit?: number): Pagination<I>;
export { Pagination, Patch, ActionAsync, ActionSync, ActionResult, pageIndex, pageCount, pageFirst, pageLast, pages, pagesI, pageCurr, pagePrev, pageNext, pageSeek, pageCurrM, pagePrevM, pageNextM, pageSeekM };
