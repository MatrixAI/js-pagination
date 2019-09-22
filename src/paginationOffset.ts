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

type Pagination<I> = Readonly<{
  seek: number;
  limit: number;
  total: number;
  items: I;
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

function* pagesI (count: number): Iterator<number> {
  for (let i = 1; i <= count; ++i) {
      yield i;
  }
}

function pageCurr<I> (
  page: Pagination<I>,
  limit?: number
): [number, number] {
  const limitNew = (limit != null) ? limit : page.limit;
  const indexNew = pageIndex(page.seek, limitNew);
  const seekNew = indexNew * limitNew;
  return [seekNew, limitNew];
};

function pagePrev<I> (
  page: Pagination<I>,
  limit?: number
): [number, number] {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = Math.max(indexNew - 1, 0);
  const seekNew = indexNew * limitNew;
  return [seekNew, limitNew];
}

function pageNext<I> (
  page: Pagination<I>,
  limit?: number
) {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(page.seek, limitNew);
  indexNew = indexNew + 1;
  const seekNew = indexNew * limitNew;
  return [seekNew, limitNew];
}

function pageSeek<I> (
  page: Pagination<I>,
  seek: number,
  limit?: number
) {
  const limitNew = (limit != null) ? limit : page.limit;
  let indexNew = pageIndex(seek, limitNew);
  indexNew = Math.max(indexNew, 0);
  const seekNew = indexNew * limitNew;
  return [seekNew, limitNew];
}

export {
  Pagination,
  pageIndex,
  pageCount,
  pageFirst,
  pageLast,
  pages,
  pagesI
  pageCurr,
  pagePrev,
  pageNext,
  pageSeek
};
