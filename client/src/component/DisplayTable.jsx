import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'

const DisplayTable = ({data, columns}) => {
    const table = useReactTable({
        data, 
        columns,
        getCoreRowModel: getCoreRowModel()
    })
  return (
    <div className="p-2">
      <table className="w-full py-0 px-0 border-collapse">
        <thead className='bg-black text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} >
              <th>S. No</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td  className='border px-2 py-1'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border px-2 py-1 whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export default DisplayTable