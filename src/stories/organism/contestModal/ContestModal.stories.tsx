import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../../component/atom/button';
import ContestModal from '../../../component/organism/contestModal/ContestModal';

const meta: Meta<typeof ContestModal> = {
  title: 'Organism/ContestModal',
  component: ContestModal,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['create', 'edit'] },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ContestModal>;

const courseOfferings = [
  { id: 61, label: 'DSA 101' },
  { id: 60, label: 'Web Development' },
  { id: 36, label: 'Python' },
];

export const Create: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Create Contest
        </Button>
        <ContestModal
          {...args}
          variant="create"
          open={open}
          onClose={() => setOpen(false)}
          courseOfferings={courseOfferings}
          onSubmit={async (data) => {
            console.log('Create contest:', data);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};

export const Edit: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Contest
        </Button>
        <ContestModal
          {...args}
          variant="edit"
          open={open}
          onClose={() => setOpen(false)}
          courseOfferings={courseOfferings}
          initialData={{
            title: 'Data Structures & Algorithms Contest',
            label: 'DSA 107363',
            courseOfferingId: 61,
            date: '2026-06-10',
            time: '14:00',
            duration: 120,
            maxScore: 100,
          }}
          onSubmit={async (data) => {
            console.log('Update contest:', data);
            await new Promise((r) => setTimeout(r, 800));
          }}
        />
      </>
    );
  },
};
