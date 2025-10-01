import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BackButton from '../../../component/molecule/backButton/BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Molecule/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Callback function when button is clicked',
    },
    size: {
      control: 'text',
      description: 'Size of the button (width and height)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '37px' },
      },
    },
    borderColor: {
      control: 'color',
      description: 'Border color of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#C2C2C2' },
      },
    },
    bgColor: {
      control: 'color',
      description: 'Background color of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#FFFFFF' },
      },
    },
    iconColor: {
      control: 'color',
      description: 'Color of the arrow icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {
    onClick: action('back-clicked'),
  },
};

export const Small: Story = {
  args: {
    onClick: action('back-clicked'),
    size: '28px',
  },
};
