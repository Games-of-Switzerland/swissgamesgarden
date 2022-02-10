export const prepareInfiniteQuery = data => {
  const pages = data.pages.map(data => ({
    ...data,
    page: data.page === undefined ? null : data.page,
  }));
  const newPageParams = data.pageParams.filter(Boolean);
  const pageParams = data.pageParams.filter(Boolean).length === 0
    ? [null]
    : newPageParams;
  return {...data, pages, pageParams};
};
