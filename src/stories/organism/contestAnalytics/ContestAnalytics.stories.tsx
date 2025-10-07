import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ContestAnalyticsListItem, {
  ContestAnalyticsTitle,
  ContestAnalyticsDate,
  ContestAnalyticsSubmissions,
  ContestAnalyticsAvgScore,
} from '../../../component/organism/contestAnalytics/ContestAnalytics';

const meta: Meta<typeof ContestAnalyticsListItem> = {
  title: 'Organism/ContestAnalyticsListItem',
  component: ContestAnalyticsListItem,
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

type Story = StoryObj<typeof ContestAnalyticsListItem>;

// Single contest item (4 columns: Title, Date, Submissions, Average Score)
export const SingleContest: Story = {
  args: {
    children: (
      <>
        <ContestAnalyticsTitle contestNumber="Contest 1" />
        <ContestAnalyticsDate date="10 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="40/50" />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};


// Multiple contest items - exactly like the screenshot (all 4 columns)
export const TeacherContestRecordsList: StoryObj = {
  render: () => (
    <div style={{ }}>
      <ContestAnalyticsListItem bgColor="#FFFFFF">
        <ContestAnalyticsTitle contestNumber="Contest 1" />
        <ContestAnalyticsDate date="10 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="40/50" />
      </ContestAnalyticsListItem>

      <ContestAnalyticsListItem bgColor="#FFFFFF">
        <ContestAnalyticsTitle contestNumber="Contest 2" />
        <ContestAnalyticsDate date="11 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="30/50" />
      </ContestAnalyticsListItem>

      <ContestAnalyticsListItem bgColor="#FFFFFF">
        <ContestAnalyticsTitle contestNumber="Contest 3" />
        <ContestAnalyticsDate date="12 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="40/50" />
      </ContestAnalyticsListItem>

      <ContestAnalyticsListItem bgColor="#FFFFFF">
        <ContestAnalyticsTitle contestNumber="Contest 4" />
        <ContestAnalyticsDate date="13 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="30/50" />
      </ContestAnalyticsListItem>

      <ContestAnalyticsListItem bgColor="#FFFFFF">
        <ContestAnalyticsTitle contestNumber="Contest 5" />
        <ContestAnalyticsDate date="14 June" />
        <ContestAnalyticsSubmissions submissions="76/80" />
        <ContestAnalyticsAvgScore avgScore="40/50" />
      </ContestAnalyticsListItem>
    </div>
  ),
};