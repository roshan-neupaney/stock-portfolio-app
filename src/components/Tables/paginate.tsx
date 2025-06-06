import { Table } from "@tanstack/react-table";
import { tablePaginationSizes } from "../../config/constants";
import { TData } from "./Table";

interface TablePaginationProps {
  table: Table<TData>;
}

const TablePagination = ({ table }: TablePaginationProps) => {
  let pageIndex = table.getState().pagination.pageIndex;
  let pageCount = table.getPageCount();
  let pageSize = table.getState().pagination.pageSize;
  const currentPage = pageIndex + 1;
  const data = table.getPrePaginationRowModel().rows;

  const renderPageNumbers = () => {
    const pagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(pageCount, startPage + pagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(<li key={i}>{renderPageButton(i)}</li>);
    }

    if (startPage > 1) {
      pages.unshift(<li key="ellipsis-start">{renderEllipsis()}</li>);
    }
    if (endPage < pageCount) {
      pages.push(<li key="ellipsis-end">{renderEllipsis()}</li>);
    }

    return pages;
  };

  const renderPageButton = (page: number) => {
    return (
      <button
        onClick={() => table.setPageIndex(page - 1)}
        className={`rounded px-4 py-2 ${
          currentPage === page
            ? "bg-brand-500 text-white"
            : "text-gray-700 dark:text-gray-400"
        } flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
      >
        {page}
      </button>
    );
  };

  const renderEllipsis = () => {
    return (
      <span className="flex h-10 w-10 items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-400">
        ...
      </span>
    );
  };
  return (
    <>
      <div className="flex justify-between border-t border-gray-200 px-4 py-3 dark:border-transparent">
        <div className="flex items-center justify-center gap-4 xl:justify-end">
          <button
            className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:p-2.5"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715C2.58301 9.99766 2.58301 9.99817 2.58301 9.99868Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <ul className="flex items-center gap-1">{renderPageNumbers()}</ul>

          <button
            className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:p-2.5"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="sm:flex items-center gap-1 hidden">
          <span className="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
            Showing{"  "}
            {pageIndex * pageSize + 1} -{" "}
            {currentPage * pageSize > data?.length
              ? data.length
              : currentPage * pageSize}{" "}
            of {data?.length}
          </span>
          <span className="text-gray-500 dark:text-gray-400 sm:flex hidden">
            | Go to page:{" "}
            <input
              className="appearance-none rounded-lg border pl-2 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              style={{ border: "1px solid #92959a", borderRadius: "4px" }}
              type="number"
              defaultValue={1}
              min={1}
              max={pageCount}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
        </div>

        <div className="flex max-w-[240px] items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">Show</span>
          <select
            name="page-size"
            id="page-size"
            className="h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {tablePaginationSizes.map((items: number, index: any) => {
              return (
                <option
                  key={index}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                  value={items}
                >
                  {items}
                </option>
              );
            })}
          </select>
          <span className="text-gray-500 dark:text-gray-400 hidden lg:block">entries</span>
        </div>
      </div>
    </>
  );
};

export default TablePagination;
