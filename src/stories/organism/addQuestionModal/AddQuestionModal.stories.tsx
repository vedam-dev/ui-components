import type { Meta, StoryObj } from '@storybook/react';
import AddQuestionModal from '../../../component/organism/addQuestionModal/AddQuestionModal';
import { useState } from 'react';
import { Button } from '@mui/material';

const meta: Meta<typeof AddQuestionModal> = {
  title: 'Organism/AddQuestionModal',
  component: AddQuestionModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onCreate: { action: 'created' },
    title: {
      control: 'text',
      defaultValue: 'Add New Question',
    },
    subtitle: {
      control: 'text',
      defaultValue: 'Enter details for the question',
    },
    questionTitleLabel: {
      control: 'text',
      defaultValue: 'Question Title',
    },
    questionTitlePlaceholder: {
      control: 'text',
      defaultValue: 'Eg. Two Sum',
    },
    difficultyLabel: {
      control: 'text',
      defaultValue: 'Difficulty',
    },
    questionTypeLabel: {
      control: 'text',
      defaultValue: 'Question Type',
    },
    cancelButtonText: {
      control: 'text',
      defaultValue: 'Cancel',
    },
    createButtonText: {
      control: 'text',
      defaultValue: 'Create',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AddQuestionModal>;

const Template = (args: any) => {
  const [open, setOpen] = useState(false);

  const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
    console.log('Question Created:', { questionTitle, questionType, difficulty });
    alert(
      `Question "${questionTitle}" of type "${questionType}" with difficulty "${difficulty}" created successfully!`
    );
    args.onCreate?.(questionTitle, questionType, difficulty);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Add Question Modal
      </Button>
      <AddQuestionModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

export const CustomTexts: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
      console.log('Question Created:', { questionTitle, questionType, difficulty });
      alert(
        `Assessment "${questionTitle}" of category "${questionType}" with difficulty "${difficulty}" saved!`
      );
      args.onCreate?.(questionTitle, questionType, difficulty);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Custom Text Modal
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          title="Create New Assessment"
          subtitle="Configure your assessment question"
          questionTitleLabel="Assessment Name"
          questionTitlePlaceholder="Enter assessment name..."
          difficultyLabel="Complexity Level"
          questionTypeLabel="Assessment Category"
          cancelButtonText="Discard"
          createButtonText="Save"
        />
      </div>
    );
  },
  args: {},
};

export const TwoQuestionTypes: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
      console.log('Question Created:', { questionTitle, questionType, difficulty });
      args.onCreate?.(questionTitle, questionType, difficulty);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (2 Types)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          questionTypes={[
            { id: 'theory', label: 'Theory' },
            { id: 'practical', label: 'Practical' },
          ]}
        />
      </div>
    );
  },
  args: {},
};

export const ThreeQuestionTypes: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
      console.log('Question Created:', { questionTitle, questionType, difficulty });
      alert(
        `Question "${questionTitle}" of type "${questionType}" with difficulty "${difficulty}" created!`
      );
      args.onCreate?.(questionTitle, questionType, difficulty);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (3 Types)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          questionTypes={[
            { id: 'easy', label: 'Easy' },
            { id: 'medium', label: 'Medium' },
            { id: 'hard', label: 'Hard' },
          ]}
        />
      </div>
    );
  },
  args: {},
};

export const SixQuestionTypes: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
      console.log('Question Created:', { questionTitle, questionType, difficulty });
      alert(
        `Question "${questionTitle}" of type "${questionType}" with difficulty "${difficulty}" created!`
      );
      args.onCreate?.(questionTitle, questionType, difficulty);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (6 Types)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          questionTypes={[
            { id: 'mcq', label: 'Multiple Choice' },
            { id: 'true_false', label: 'True/False' },
            { id: 'short_answer', label: 'Short Answer' },
            { id: 'essay', label: 'Essay' },
            { id: 'dsa', label: 'DSA' },
            { id: 'descriptive', label: 'Descriptive' },
          ]}
        />
      </div>
    );
  },
  args: {},
};

export const AllQuestionTypes: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleCreate = (questionTitle: string, questionType: string, difficulty: string) => {
      console.log('Question Created:', { questionTitle, questionType, difficulty });
      alert(
        `Question "${questionTitle}" of type "${questionType}" with difficulty "${difficulty}" created!`
      );
      args.onCreate?.(questionTitle, questionType, difficulty);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (All Types - Default 6)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
        />
      </div>
    );
  },
  args: {},
};
