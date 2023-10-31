import React from "react";
import { useTable } from "react-table";
import "./React-table.css";

export default function Table({ data, columns, footer }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({
    columns,
    data,
  });
  return (
    <table className="table" {...getTableProps()}>
      <thead className="theadNormal">
        {headerGroups.map((headerGroup) => (
          <tr className="trHead" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="th" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="trbody" {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className="trRow" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className="trHead" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      {footer ? (
        <tfoot className="thead">
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      ) : null}
    </table>
  );
}
