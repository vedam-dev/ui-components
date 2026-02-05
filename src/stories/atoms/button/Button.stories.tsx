import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../../../component/atom/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atom/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const DefaultRound: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
  },
};

export const SecondaryRound: Story = {
  args: {
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
    shapeType: 'round',
  },
};

// outline buttons

export const Outline: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
  },
};

export const OutlineRound: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const OutlineDisabled: Story = {
  args: {
    disabled: true,
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
  },
};

// text button.

export const TextButton: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Button',
  },
};

export const TextButtonRound: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const TextButtonDisabled: Story = {
  args: {
    disabled: true,
    variant: 'text',
    color: 'primary',
    children: 'Button',
  },
};

// Small buttons

export const SmallDefault: Story = {
  args: {
    small: true,
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const SmallDefaultRound: Story = {
  args: {
    small: true,
    variant: 'contained',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const SmallDefaultDisabled: Story = {
  args: {
    small: true,
    disabled: true,
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
};

export const SmallSecondary: Story = {
  args: {
    small: true,
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
  },
};

export const SmallSecondaryRound: Story = {
  args: {
    small: true,
    variant: 'contained',
    color: 'secondary',
    children: 'Button',
    shapeType: 'round',
  },
};

// outline buttons

export const SmallOutline: Story = {
  args: {
    small: true,
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
  },
};

export const SmallOutlineRound: Story = {
  args: {
    small: true,
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const SmallOutlineDisabled: Story = {
  args: {
    small: true,
    disabled: true,
    variant: 'outlined',
    color: 'primary',
    children: 'Button',
  },
};

// text button.

export const SmallTextButton: Story = {
  args: {
    small: true,
    variant: 'text',
    color: 'primary',
    children: 'Button',
  },
};

export const SmallTextButtonRound: Story = {
  args: {
    small: true,
    variant: 'text',
    color: 'primary',
    children: 'Button',
    shapeType: 'round',
  },
};

export const SmallTextButtonDisabled: Story = {
  args: {
    small: true,
    disabled: true,
    variant: 'text',
    color: 'primary',
    children: 'Button',
  },
};

// Downloadable button variants

export const DownloadableRightIcon: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'Document 1',
    downloadIconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
    iconPosition: 'right',
  },
};

export const DownloadableLeftIcon: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'Document 1',
    leftIconUrl: 'copy',
    iconPosition: 'left',
  },
};

export const DownloadableLeftCopyIcon: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'Copy Document',
    leftIconUrl: 'copy',
    iconPosition: 'left',
  },
};

export const DownloadableBothIcons: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'Document 1',
    downloadIconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
    leftIconUrl: 'copy',
    iconPosition: 'both',
  },
};

export const DownloadableLongText: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'documentretytverylongname',
    downloadIconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
    iconPosition: 'right',
  },
};

export const DownloadableLongTextLeftIcon: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'documentretytverylongname',
    leftIconUrl: 'copy',
    iconPosition: 'left',
  },
};

export const DownloadableLongTextBothIcons: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'documentretytverylongname',
    downloadIconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
    leftIconUrl: 'copy',
    iconPosition: 'both',
  },
};

// Legacy downloadable (for backwards compatibility)
export const Downloadable: Story = {
  args: {
    isDownloadable: true,
    variant: 'outlined',
    children: 'Document 1',
    downloadIconUrl:
      'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/others/Vector-4.png',
  },
};
