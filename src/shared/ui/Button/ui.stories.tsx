import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';
import { Button } from './ui';
import { Heart } from 'lucide-react';

// 아이콘 매핑 객체
const iconMap = {
  None: undefined,
  Heart: <Heart size={16} />,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared-UI/Button',
  component: Button,
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
    variant: {
      description: '버튼 종류',
      control: 'select',
      options: ['primary', 'outline', 'action', 'modal-ok', 'modal-cancel'],
      table: {
        type: { summary: `'primary' | 'outline' | 'action' | 'modal-cancel' | 'modal-ok' | 'modal-cancel-fill'` },
      },
    },
    size: {
      description: '버튼 크기',
      control: 'select',
      options: ['compact', 'default', 'comfortable', 'emphasis'],
      table: {
        type: {
          summary: `'compact' | 'default' | 'comfortable' | 'emphasis'`,
          detail: `
          크기 설명:
          • compact: 32px (4×8) - 좁은 공간용
          • default: 40px (5×8) - 기본 사이즈  
          • comfortable: 48px (6×8) - 여유있는 사이즈
          • emphasis: 56px (7×8) - 강조용 큰 사이즈
                `,
        },
      },
    },
    fullWidth: { description: '버튼 너비 100% 여부', control: 'boolean' },
    leftIcon: {
      description: '버튼 왼쪽에 적용할 아이콘',
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    rightIcon: {
      description: '버튼 오른쪽에 적용할 아이콘',
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
    },
    onClick: {
      description: '버튼 클릭 시 호출되는 함수',
      action: 'onClick',
    },
    children: {
      description: '버튼 내용',
      table: { type: { summary: 'ReactNode | string' }, defaultValue: { summary: '버튼' } },
      control: 'text',
    },
    className: {
      description: '버튼에 적용할 클래스 이름 (ex. tailwindcss 클래스)',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  // 이름 한국어로 할지 영어로 할지 결정하기!!!
  args: {
    variant: 'primary',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 버튼(default)',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '테두리 라인이 있는 버튼',
      },
    },
  },
};

export const Action: Story = {
  args: {
    variant: 'action',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '추가 등의 액션을 수행하는 버튼 (ex. 홈 화면 빠른 실행 > 혈당 데이터 추가)',
      },
    },
  },
};

export const ModalOk: Story = {
  args: {
    variant: 'modal-ok',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '모달 확인/저장 등에 사용되는 버튼 (ex. 혈당 데이터 추가 모달 > 저장 버튼)',
      },
    },
  },
};

export const ModalCancel: Story = {
  args: {
    variant: 'modal-cancel',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story:
          '모달 취소/닫기 등에 사용되는 버튼으로, ModalOk를 사용할 때 같이 사용하는 것을 권장 (ex. 혈당 데이터 추가 모달 > 취소 버튼)',
      },
    },
  },
};

export const ModalCancelFill: Story = {
  args: {
    variant: 'modal-cancel-fill',
    size: 'default',
    fullWidth: false,
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story:
          '모달에서 취소/닫기 등에 사용되는 버튼으로, ModalOk를 사용하지 않고 취소/닫기 버튼이 단독으로만 있을 때 쓰는 것을 권장 (ex. 데이터 내려받기 진행 상태 모달 > 취소 버튼)',
      },
    },
  },
};
