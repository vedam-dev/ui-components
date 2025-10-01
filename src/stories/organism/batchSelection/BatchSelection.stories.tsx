import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import BatchSelection from '../../../component/organism/batchSelection/BatchSelection';

const meta: Meta<typeof BatchSelection> = {
  title: 'Organism/BatchSelection',
  component: BatchSelection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card-based batch selection component (styled to match provided design).',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    sx: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof BatchSelection>;

const Interactive = (args: any) => {
  const [value, setValue] = useState(args.value ?? 'overall');
  return <BatchSelection {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'overall', label: 'Overall' },
      { value: 'batch1', label: 'Batch 1' },
      { value: 'batch2', label: 'Batch 2' },
    ],
    value: 'overall',
  },
};

export const Many: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    options: [
      { value: 'overall', label: 'Overall' },
      { value: 'batch1', label: 'Batch 1' },
      { value: 'batch2', label: 'Batch 2' },
      { value: 'batch3', label: 'Batch 3' },
      { value: 'batch4', label: 'Batch 4' },
    ],
    value: 'batch1',
  },
};

export const Disabled: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    disabled: true,
  },
};
