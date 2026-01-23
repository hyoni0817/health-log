import React from 'react';

type DataRecord = Record<string, any>;

export type ColumnProps<T> = {
  [K in keyof T]: {
    title: string;
    key: string;
    dataIndex: K;
    render?: (value: T[K], record: T) => React.ReactNode;
  };
}[keyof T];

interface TableProps<T> {
  columns: ColumnProps<T>[];
  data: T[];
}

export const Table = <T extends DataRecord>({ columns, data }: TableProps<T>) => {
  return (
    <div className="w-full border-1 border-(--divider) rounded-md">
      <table className="w-full">
        <thead className="text-(--text-subtitle) text-sm text-left">
          <tr className="border-b-1 border-(--divider)">
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-4">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-(--text) text-sm">
          {data.map((item, index) => {
            return (
              <tr key={`tr-${item[columns[index].key]}`} className="border-b-1 border-(--divider)">
                {columns.map((column) => {
                  return (
                    <td key={`td-${column.key}`} className="px-3 py-4">
                      {column.render
                        ? (column.render(item[column.dataIndex], item) as React.ReactNode)
                        : item[column.dataIndex]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
