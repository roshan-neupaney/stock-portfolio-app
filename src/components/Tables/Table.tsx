import { useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import TablePagination from "./paginate.tsx";
import TableSkeleton from "../skeletonLoading/TableSkeleton.tsx";
import NoDataFound from "../NoDataFound.tsx";
import CustomTableHead from "./TableHeader.tsx";
import CustomTableBody from "./TableBody.tsx";

export interface TData {
  [key: string]: string;
}

interface TableProps<TData> {
  tableColumns: ColumnDef<TData>[];
  tableData: TData[];
  initialPageSize?: number;
  onClickOnEdit?: (id: number) => void;
  onClickOnDelete?: (id: number) => void;
  showDelete?: boolean;
  topRender?: React.ReactNode;
  hideEdit?: boolean;
  hideDelete?: boolean;
  toggleModal?: (value: { id?: string; state: boolean }) => void;
  toggleFormModal?: (value: { id?: string; state: boolean }) => void;
  isLoading?: boolean;
  noDataFound?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

const Table = ({
  tableColumns,
  tableData,
  topRender,
  hideEdit,
  hideDelete,
  toggleModal,
  toggleFormModal,
  isLoading = false,
  noDataFound = false,
  rowSelection = {},
  setRowSelection,
}: TableProps<TData>) => {
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const data = useMemo(() => tableData, [tableData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      rowSelection,
    },
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-800 dark:bg-gray-900">
      {topRender && (
        <div className="border-b border-gray-200 dark:border-gray-800">
          {topRender}
        </div>
      )}
      {isLoading ? (
        <TableSkeleton />
      ) : noDataFound ? (
        <NoDataFound />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse overflow-hidden break-words bg-white text-left dark:bg-gray-900 md:table-fixed md:overflow-auto">
              <CustomTableHead table={table} />
              <CustomTableBody
                table={table}
                hideDelete={hideDelete}
                hideEdit={hideEdit}
                toggleModal={toggleModal}
                toggleFormModal={toggleFormModal}
              />
            </table>
          </div>
          <TablePagination table={table} />
        </>
      )}
    </section>
  );
};

export default Table;
