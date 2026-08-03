import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AddDataButton } from './ui';
import AddBloodSugarDataModal from '@/features/blood-sugar/ui/AddBloodSugarDataModal';
import AddBloodPressureDataModal from '@/features/blood-pressure/ui/AddBloodPressureDataModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared-UI/AddDataButton',
  component: AddDataButton,
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
    title: {
      description: '버튼 제목',
      control: 'text',
    },
    modalComponent: {
      description: '버튼 클릭 시 openModal로 열리는 모달 컴포넌트',
      control: false,
    },
  },
} satisfies Meta<typeof AddDataButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddBloodSugarData: Story = {
  // 이름 한국어로 할지 영어로 할지 결정하기!!!
  args: {
    title: '혈당 데이터 추가',
    modalComponent: AddBloodSugarDataModal,
  },
  parameters: {
    docs: {
      description: {
        story: '혈당 데이터 추가 버튼',
      },
    },
  },
};

export const AddBloodPressureData: Story = {
  args: {
    title: '혈압 데이터 추가',
    modalComponent: AddBloodPressureDataModal,
  },
  parameters: {
    docs: {
      description: {
        story: '혈압 데이터 추가 버튼',
      },
    },
  },
};
