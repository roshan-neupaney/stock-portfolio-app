import { flexRender, Table } from "@tanstack/react-table";
import { TData } from "./Table";

// import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface CustomTableHeadProps {
  table: Table<TData>
  clientSort?: boolean
}

const CustomTableHead = ({ table, clientSort = false }: CustomTableHeadProps) => {
  return (
      <thead>
      {table.getHeaderGroups().map((headerGroup) => {
        return (
            <tr
                key={headerGroup.id}
                className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
            >
              {headerGroup.headers.map((header, index: number) => {
                return (
                    <th
                        className={header.id === "selection" ? "w-10 p-3" : "px-4 py-4 text-left"}
                        key={index}
                        colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                          <div
                              className={header.column.getCanSort() ? "group cursor-pointer select-none transition-colors" : ""}
                              onClick={clientSort ? header.column.getToggleSortingHandler() : () => {}}
                          >
                            <div className="flex items-center justify-between text-sm font-semibold text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {/* {!(header.id == "image" || header.id == "action" || header.id == "selection") && clientSort && (
                                  <div className="ml-2 flex items-center">
                                    {header.column.getIsSorted() === "asc" ? (
                                        <AiOutlineUp className="h-4 w-4" />
                                    ) : header.column.getIsSorted() === "desc" ? (
                                        <AiOutlineDown className="h-4 w-4" />
                                    ) : (
                                        <div className="flex flex-col opacity-0 transition-opacity group-hover:opacity-70">
                                          <AiOutlineUp className="h-3 w-3" />
                                          <AiOutlineDown className="h-3 w-3 -mt-1" />
                                        </div>
                                    )}
                                  </div>
                              )} */}
                            </div>
                          </div>
                      )}
                    </th>
                )
              })}
            </tr>
        )
      })}
      </thead>
  )
}

export default CustomTableHead
