# Pagination

## Offset

Offset pagination relies on a seek and limit number.

Consider the resource we are paginating is:

```ts
['A', 'B', 'C', 'D']
```

The seek index starts at 0.

The limit is the desired length of the returned pagination view.

A seek and limit of `[0, 2]` would return `['A', 'B']`.

Page numbers start from 1. However we refer to them with a page index that starts at 0.

The total represents the total number of items when the pagination was fetched. The true total of items may have changed on the server side since fetching a pagination.

## Cursor

Cursor pagination relies on unique orderable seek key.

Consider the resource we are paginating is:

```ts
['A', 'B', 'C', 'D']
```

Assume that the seek key is `[0, 1, 2, 3]`:

* Using `order = true`, `seek = 0` and `limit = 2`, you would get `['B', 'C']`.
* Using `order = false`, `seek = 2` and `limit = 2`, you would get `['A', 'B']`.
* Using `order = null`, `seekAfter = 1`, `seekBefore = 3`, you would get `['C']`.

Cursor pagination does not allow random access of the pages. You can however randomly access if you know the seek key you want.
