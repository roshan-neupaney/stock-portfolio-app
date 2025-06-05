import { flexRender, Table } from "@tanstack/react-table";
import { Trash2, Pencil } from 'lucide-react';
import { TData } from "./Table";


interface CustomTableBodyProps {
  table: Table<TData>
  toggleModal?: (value: { id?: string; state: boolean }) => void
  hideDelete?: boolean
  hideEdit?: boolean
}

const CustomTableBody = ({
  table,
  toggleModal,
  hideDelete = false,
  hideEdit = false,
}: CustomTableBodyProps) => {
  return (
    <tbody>
      {table?.getRowModel()?.rows?.map((row, i: number) => {
        return (
          <tr
            key={i}
            className="border-b border-gray-100 transition-colors hover:bg-gray-50/50 dark:border-gray-800 dark:hover:bg-gray-800/30"
          >
            {row?._getAllVisibleCells().map((cell, _index: number) => {
              const id = cell.row.original["id"]
              return (
                <td className="min-w-28 px-4 py-4 text-sm text-gray-700 dark:text-gray-300" key={_index}>
                  {cell.column.id.includes("image") ? (
                    <div className="table-image relative h-12 w-12 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                      {/* Image placeholder */}
                    </div>
                  )   : cell.column.id == "id" ? (
                    <div className="font-mono text-xs text-gray-500 dark:text-gray-400">{cell.row.original["id"]}</div>
                  ) : cell.column.id == "action" ? (
                    <div className="flex items-center gap-2">
                      <>
                        {!hideEdit && (
                         
                            <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400" onClick={() => toggleModal?.({state: true, id})}>
                              <Pencil />
                              <span className="sr-only">Edit</span>
                            </button>
                        )}
                        {!hideDelete && (
                          <button
                            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400"
                            onClick={() => toggleModal?.({ state: true, id: id })}
                          >
                            <Trash2 />
                            <span className="sr-only">Delete</span>
                          </button>
                        )}
                      </>
                    </div>
                  ) : (
                    <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                  )}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
export default CustomTableBody
