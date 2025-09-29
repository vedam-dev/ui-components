import type { Meta, StoryObj } from '@storybook/react';
import SurveyOptions, {
  SurveyOption,
} from '../../../component/organism/surveyOptions/SurveyOptions';

const meta: Meta<typeof SurveyOptions> = {
  title: 'Organism/SurveyOptions',
  component: SurveyOptions,
  tags: ['autodocs'],
  argTypes: {
    question: {
      control: 'text',
      description: 'Optional question/title shown above the options',
    },
    options: { table: { disable: true } },
    value: { control: 'text', description: 'Controlled selected option id' },
    textValue: { control: 'text', description: 'Controlled text for the textarea' },
    textPlaceholder: { control: 'text', description: 'Placeholder for the text input' },
    textMaxLength: {
      control: 'number',
      defaultValue: 80,
      description: 'Max characters for textbox',
    },
    showGlobalOther: { control: 'boolean', description: "Always show bottom 'Other' textarea" },
    onChange: { action: 'changed' },
    sx: { table: { disable: true } },
  },
} satisfies Meta<typeof SurveyOptions>;

export default meta;
type Story = StoryObj<typeof SurveyOptions>;

const defaultOptions: SurveyOption[] = [
  { id: 'clarity', label: 'Content Clarity' },
  { id: 'teaching', label: 'Teaching Method' },
  { id: 'topic', label: 'Topic of Discussion' },
  { id: 'resources', label: 'Resources Shared' },
  { id: 'other', label: 'Other', allowText: true },
];

export const Default: Story = {
  args: {
    question: 'What did you like about this lecture?',
    options: defaultOptions,
    textMaxLength: 80,
    textPlaceholder: 'Other',
    showGlobalOther: false,
  },
};

export const WithGlobalOther: Story = {
  args: {
    question: 'What did you like about this lecture?',
    options: defaultOptions,
    textMaxLength: 120,
    textPlaceholder: 'Other',
    showGlobalOther: true,
  },
};

export const ControlledExample: Story = {
  args: {
    question: 'What did you like about this lecture?',
    options: defaultOptions,
    value: 'topic',
    textValue: 'I liked the specific topic about optimization',
    textMaxLength: 120,
    textPlaceholder: 'Other',
    showGlobalOther: false,
  },
};
