import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';
import { ExportProgressModal } from './ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared-UI/ExportProgressModal',
  component: ExportProgressModal,
  parameters: {
    layout: 'centered',
  },
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
    progress: { control: 'number', description: '다운로드 중인 데이터 개수' },
    isError: { control: 'boolean', description: '에러 발생 여부', table: { defaultValue: { summary: 'false' } } },
    onCancel: { action: 'onCancel', description: '취소 버튼 클릭 시 호출되는 함수' },
    close: {
      action: 'close',
      description:
        '모달 닫기 시 호출되는 함수 **(ModalProvider의 closeModal 함수를 사용하기 때문에 따로 close 함수를 작성할 필요 없음.)**',
      table: { defaultValue: { summary: `() => closeModal('modalId')` } },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { progress: 0, isError: false, onCancel: fn() },
} satisfies Meta<typeof ExportProgressModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithProgress: Story = {
  args: {
    progress: 0,
    isError: false,
    onCancel: fn(),
    close: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '다운로드 중인 데이터 개수를 함께 표시하는 모달',
      },
    },
  },
};

export const Error: Story = {
  args: {
    progress: 0,
    isError: true,
    onCancel: fn(),
    close: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '다운로드 중 오류가 발생했을 때 표시하는 모달',
      },
    },
  },
};
