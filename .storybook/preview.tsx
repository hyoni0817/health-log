import React, { useEffect } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
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
  ],
};

export default preview;
