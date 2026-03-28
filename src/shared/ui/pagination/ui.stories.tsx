import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';
import { Pagination } from './ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared-UI/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    total: { control: 'number', description: '전체 아이템 수' },
    pageSize: { control: 'number', description: '페이지당 보여지는 아이템 수' },
    onPageChange: { action: 'onPageChange', description: '페이지 변경 시 호출되는 함수' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { total: 100, pageSize: 10, onPageChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  // 이름 한국어로 할지 영어로 할지 결정하기!!!
  args: {
    total: 100,
    pageSize: 10,
    onPageChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 페이지네이션(default)',
      },
    },
  },
};
