import React from 'react';

type DataRecord = Record<string, any>;

export type ColumnProps<T> = {
  [K in keyof T]: {
    title: string;
    key: string;
    dataIndex: K;
    width?: number | string;
    render?: (value: T[K], record: T) => React.ReactNode;
  };
}[keyof T];

interface TableProps<T> {
  columns: ColumnProps<T>[];
  data: T[];
  /**
   * 유니크한 key를 만들기 위한 함수. 기본값은 item['id'] 사용
   * @param item 데이터 아이템
   * @param index 데이터 인덱스
   * @returns 유니크한 key
   * @example getRowKey={(item, index) => item['id']}
   */
  getRowKey?: (item: T, index: number) => string | number;
}

export const Table = <T extends DataRecord>({ columns, data, getRowKey }: TableProps<T>) => {
  return (
    <div className="w-full border-1 border-(--divider) rounded-md">
      <table className="w-full">
        <thead className="text-(--text-subtitle) text-sm text-left">
          <tr className="border-b-1 border-(--divider)">
            {columns.map((column) => {
              const isWidthString = typeof column.width === 'string';
              const widthValue = isWidthString ? column.width : `${column.width}px`;

              return (
                <th key={column.key} className="px-3 py-4" style={{ ...(column.width ? { width: widthValue } : {}) }}>
                  {column.title}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-(--text) text-sm">
          {data.map((item, index) => {
            const rowKey = getRowKey ? getRowKey(item, index) : item['id'];
            return (
              <tr key={rowKey} className="border-b-1 border-(--divider)">
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
