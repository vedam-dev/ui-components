import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../component/atom/button';
import FeeTypeModal from '../../../component/organism/addFeeTypeModal/AddFeeTypeModal';

const meta: Meta<typeof FeeTypeModal> = {
  title: 'Organism/FeeTypeModal',
  component: FeeTypeModal,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['create', 'edit'] },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FeeTypeModal>;

// ── Create variant ─────────────────────────────────────────────────────────────

export const Create: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Create Fee Type
        </Button>
        <FeeTypeModal
          {...args}
          variant="create"
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={async (data) => {
            console.log('Create fee type:', data);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};

// ── Edit variant ──────────────────────────────────────────────────────────────

export const Edit: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Fee Type
        </Button>
        <FeeTypeModal
          {...args}
          variant="edit"
          open={open}
          onClose={() => setOpen(false)}
          initialData={{ name: 'Tuition Fee', code: 'TUITION' }}
          onSubmit={async (data) => {
            console.log('Update fee type:', data);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};
