import React, { FC, useState } from 'react';

interface TabsProps {
  items: {
    key: string | number;
    label: string;
    children: React.ReactNode;
  }[];
  onChange: (key: string | number) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
  const { items, onChange } = props;
  const [activeTab, setActiveTab] = useState(items[0].key);

  const handleClickTab = (key: TabsProps['items'][number]['key']) => {
    setActiveTab(key);
    onChange(key);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => handleClickTab(item.key)}
            className={`px-3 py-2 shadow-[inset_0_0_0_1px_var(--divider)] rounded-md text-sm ${activeTab === item.key ? 'bg-(--color-white) text-(--color-gray-900)' : 'text-(--color-white)'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div>{items.find((item) => item.key === activeTab)?.children}</div>
    </div>
  );
};
