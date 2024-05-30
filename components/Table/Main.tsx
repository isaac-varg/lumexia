import { Table } from "jspdf-autotable";
import React from "react";

type TableRootProps = {
  headers: string[];
  data: any[];
  onRowClick: () => void;
};

const TableRoot = ({ headers, data, onRowClick }: TableRootProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full">
        <thead className="text-xs p-4 text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => {
              return (
                <th key={index} className="p-4 ">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr
                key={index}
                onClick={() => onRowClick()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {row.map((datum: string | number, index: number) => (
                  <td key={index} className="p-4">{datum}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableRoot;
