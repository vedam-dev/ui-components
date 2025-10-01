import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ContestListItem, {
  ContestListItemTitle,
  ContestListItemSubject,
  ContestListItemDate,
  ContestListItemStatus,
  ContestListItemScore,
} from '../../../component/organism/contestList/ContestList';

const meta: Meta<typeof ContestListItem> = {
  title: 'Organism/ContestListItem',
  component: ContestListItem,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Background color for the card',
    },
    borderColor: {
      control: 'color',
      description: 'Border color for the card',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContestListItem>;

// Submitted contest with border (5 columns: Title, Subject, Date, Status, Score)
export const SubmittedContest: Story = {
  args: {
    children: (
      <>
        <ContestListItemTitle contestNumber="Contest 1" />
        <ContestListItemSubject subject="DSA" />
        <ContestListItemDate date="10 June" />
        <ContestListItemStatus status="Submitted" />
        <ContestListItemScore score="30/50" />
      </>
    ),
    bgColor: '#FFFFFF',
    borderColor: '#8A18FF',
  },
};

// Absent contest (5 columns: Title, Subject, Date, Status, Score)
export const AbsentContest: Story = {
  args: {
    children: (
      <>
        <ContestListItemTitle contestNumber="Contest 2" />
        <ContestListItemSubject subject="Web Development" />
        <ContestListItemDate date="11 June" />
        <ContestListItemStatus status="Absent" />
        <ContestListItemScore score="0/50" />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};

// Multiple contest items - exactly like the screenshot (all 5 columns)
export const ContestRecordsList: StoryObj = {
  render: () => (
    <div style={{ margin: '0 auto', maxWidth: '1400px', padding: '20px' }}>
      <ContestListItem bgColor="#FFFFFF">
        <ContestListItemTitle contestNumber="Contest 1" />
        <ContestListItemSubject subject="DSA" />
        <ContestListItemDate date="10 June" />
        <ContestListItemStatus status="Submitted" />
        <ContestListItemScore score="30/50" />
      </ContestListItem>

      <ContestListItem bgColor="#FFFFFF">
        <ContestListItemTitle contestNumber="Contest 2" />
        <ContestListItemSubject subject="Web Development" />
        <ContestListItemDate date="11 June" />
        <ContestListItemStatus status="Absent" />
        <ContestListItemScore score="0/50" />
      </ContestListItem>

      <ContestListItem bgColor="#FFFFFF">
        <ContestListItemTitle contestNumber="Contest 3" />
        <ContestListItemSubject subject="Java" />
        <ContestListItemDate date="13 June" />
        <ContestListItemStatus status="Submitted" />
        <ContestListItemScore score="30/50" />
      </ContestListItem>

      <ContestListItem bgColor="#FFFFFF">
        <ContestListItemTitle contestNumber="Contest 4" />
        <ContestListItemSubject subject="DSA" />
        <ContestListItemDate date="15 June" />
        <ContestListItemStatus status="Submitted" />
        <ContestListItemScore score="30/50" />
      </ContestListItem>

      <ContestListItem bgColor="#FFFFFF">
        <ContestListItemTitle contestNumber="Contest 5" />
        <ContestListItemSubject subject="DSA" />
        <ContestListItemDate date="21 June" />
        <ContestListItemStatus status="Submitted" />
        <ContestListItemScore score="30/50" />
      </ContestListItem>
    </div>
  ),
};
