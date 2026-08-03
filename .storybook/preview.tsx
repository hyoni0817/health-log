import React, { useEffect } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';
import { ModalProvider } from '../src/shared/ui/Modal';
import { QueryProvider } from '../src/providers/QueryProvider';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    // next/navigation(useRouter 등)을 사용하는 컴포넌트를 App Router 환경으로 렌더링
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - 접근성 위반 사항을 테스트 UI에만 표시
      // 'error' - 접근성 위반 사항이 있으면 CI 실패
      // 'off' - 접근성 검사를 하지 않음
      test: 'todo',
    },
  },
  decorators: [
    // (Story, context) => {
    //   document.documentElement.setAttribute('data-theme', 'dark');
    //   return <Story {...context} />;
    // },
    (Story, context) => {
      const theme = context.globals.theme || 'dark'; // globalTypes에서 theme 설정값

      useEffect(() => {
        // HTML에 data-theme 설정
        document.documentElement.setAttribute('data-theme', theme);

        // Docs Story 배경색 설정
        const docsStories = document.querySelectorAll('.docs-story');
        if (docsStories) {
          docsStories.forEach((story) => {
            (story as HTMLElement).style.backgroundColor =
              theme === 'dark' ? 'var(--color-gray-900)' : 'var(--color-gray-50)';
            (story as HTMLElement).style.color = theme === 'dark' ? 'var(--color-white)' : 'var(--color-gray-700)';
          });
        }
      }, [theme]);

      return <Story {...context} />;
    },
    (Story, context) => (
      <QueryProvider>
        <ModalProvider>
          <Story {...context} />
        </ModalProvider>
      </QueryProvider>
    ),
  ],
};

export default preview;
