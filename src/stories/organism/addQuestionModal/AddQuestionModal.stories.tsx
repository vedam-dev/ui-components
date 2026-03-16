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
    title: { control: 'text' },
    subtitle: { control: 'text' },
    questionTitleLabel: { control: 'text' },
    questionTitlePlaceholder: { control: 'text' },
    questionLabelLabel: { control: 'text' },
    questionLabelPlaceholder: { control: 'text' },
    maximumMarksLabel: { control: 'text' },
    maximumMarksPlaceholder: { control: 'text' },
    showMaximumMarks: { control: 'boolean' },
    difficultyLabel: { control: 'text' },
    questionTypeLabel: { control: 'text' },
    showQuestionType: { control: 'boolean' },
    cancelButtonText: { control: 'text' },
    createButtonText: { control: 'text' },
    requireMaximumMarks: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AddQuestionModal>;

const Template = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Add Question Modal
      </Button>
      <AddQuestionModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(title, label, type, difficulty, marks) => {
          console.log('Created:', { title, label, type, difficulty, marks });
          args.onCreate?.(title, label, type, difficulty, marks);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

export const EditQuestion: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const apiData = {
      questionTitle: 'Two Sum',
      questionLabel: '1224',
      maximumMarks: '10',
      difficulty: 'MEDIUM',
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Edit Question Modal
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={(title, label, type, difficulty, marks) => {
            console.log('Saved:', { title, label, type, difficulty, marks });
            args.onCreate?.(title, label, type, difficulty, marks);
          }}
          title="Edit Question"
          subtitle="Edit details for the question"
          titleTypographyProps={{}}
          subtitleTypographyProps={{}}
          showMaximumMarks
          requireMaximumMarks
          showQuestionType={false}
          cancelButtonText="Cancel"
          createButtonText="Save"
          initialData={apiData}
        />
      </div>
    );
  },
  args: {},
};

export const WithMaximumMarks: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (with Marks)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          showMaximumMarks
          requireMaximumMarks
          onCreate={(title, label, type, difficulty, marks) => {
            console.log('Created:', { title, label, type, difficulty, marks });
            args.onCreate?.(title, label, type, difficulty, marks);
          }}
        />
      </div>
    );
  },
  args: {},
};

export const CustomTexts: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Custom Text Modal
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onCreate={(title, label, type, difficulty, marks) => {
            args.onCreate?.(title, label, type, difficulty, marks);
          }}
          title="Create New Assessment"
          subtitle="Configure your assessment question"
          titleTypographyProps={{ fontWeight: 800, fontSize: '26px', color: '#1A1A1A' }}
          subtitleTypographyProps={{ fontSize: '14px', color: '#999' }}
          questionTitleLabel="Assessment Name"
          questionTitlePlaceholder="Enter assessment name..."
          questionLabelLabel="Assessment Label"
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
    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (2 Types)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          questionTypes={[
            { id: 'theory', label: 'Theory' },
            { id: 'practical', label: 'Practical' },
          ]}
          onCreate={(t, l, ty, d, m) => args.onCreate?.(t, l, ty, d, m)}
        />
      </div>
    );
  },
  args: {},
};

export const SixQuestionTypes: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal (6 Types)
        </Button>
        <AddQuestionModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          questionTypes={[
            { id: 'mcq', label: 'Multiple Choice' },
            { id: 'true_false', label: 'True/False' },
            { id: 'short_answer', label: 'Short Answer' },
            { id: 'essay', label: 'Essay' },
            { id: 'dsa', label: 'DSA' },
            { id: 'descriptive', label: 'Descriptive' },
          ]}
          onCreate={(t, l, ty, d, m) => args.onCreate?.(t, l, ty, d, m)}
        />
      </div>
    );
  },
  args: {},
};
