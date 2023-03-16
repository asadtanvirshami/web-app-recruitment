import React from "react";

const PaginationCall = async (
  i,
  fetchMailList,
  setPage,
  setPageCount,
  page,
  pageCount
) => {
  console.log(i);
  if (i == "next") {
    if (pageCount >= 1) {
      let pageNum = pageCount + 1;
      let currentPage = page + 9;
      return (
        fetchMailList(currentPage), setPageCount(pageNum), setPage(currentPage)
      );
    }
  }
  if (i == "previous") {
    if (pageCount > 1) {
      let pageNum = pageCount - 1;
      let currentPage = page - 9;
      return (
        fetchMailList(currentPage), setPageCount(pageNum), setPage(currentPage)
      );
    }
  }
  if (i == "get") {
    let pageNum = 1;
    let currentPage = 0;
    return (
      fetchMailList(currentPage), setPageCount(pageNum), setPage(currentPage)
    );
  }
};

export default PaginationCall;
