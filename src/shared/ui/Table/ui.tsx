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

const getCellStyle = (width?: number | string): React.CSSProperties => {
  if (!width) return { flex: 1, minWidth: 0 };
  const widthValue = typeof width === 'string' ? width : `${width}px`;
  return { width: widthValue, flexShrink: 0 };
};

export const Table = <T extends DataRecord>({ columns, data, getRowKey }: TableProps<T>) => {
  return (
    <div role="table" className="w-full border-1 border-(--divider) rounded-md">
      <div role="rowgroup" className="text-(--text-subtitle) text-sm text-left">
        <div role="row" className="flex border-b-1 border-(--divider)">
          {columns.map((column) => (
            <div key={column.key} role="columnheader" className="px-3 py-4" style={getCellStyle(column.width)}>
              {column.title}
            </div>
          ))}
        </div>
      </div>

      <div role="rowgroup" className="text-(--text) text-sm">
        {data.length > 0 ? (
          data.map((item, index) => {
            const rowKey = getRowKey ? getRowKey(item, index) : item['id'];
            return (
              <div key={rowKey} role="row" className="flex border-b-1 border-(--divider)">
                {columns.map((column) => (
                  <div key={`td-${column.key}`} role="cell" className="px-3 py-4" style={getCellStyle(column.width)}>
                    {column.render
                      ? (column.render(item[column.dataIndex], item) as React.ReactNode)
                      : item[column.dataIndex]}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div role="row">
            <div role="cell" className="px-3 py-20 text-center">
              <span className="text-(--text-subtitle)">저장된 데이터가 없습니다.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
