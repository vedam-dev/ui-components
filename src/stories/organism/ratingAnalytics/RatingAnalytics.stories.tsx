import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RatingAnalytics, {
  RatingAnalyticsDate,
  RatingAnalyticsDay,
  RatingAnalyticsTitle,
  RatingAnalyticsRating,
} from '../../../component/organism/ratingAnalytics/RatingAnalytics';

const meta: Meta<typeof RatingAnalytics> = {
  title: 'Organism/RatingAnalytics',
  component: RatingAnalytics,
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

type Story = StoryObj<typeof RatingAnalytics>;

// Single lecture item
export const SingleLecture: Story = {
  args: {
    children: (
      <>
        <RatingAnalyticsDate date="12/10/2025" day="" />
        <RatingAnalyticsDay day="Wednesday" />
        <RatingAnalyticsTitle title="Unix" />
        <RatingAnalyticsRating rating="4.0" />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};

// Multiple lecture items - matching the screenshot
export const LectureRecordsList: StoryObj = {
  render: () => (
    <div>
      <RatingAnalytics>
        <RatingAnalyticsDate date="12/10/2025" day="" />
        <RatingAnalyticsDay day="Wednesday" />
        <RatingAnalyticsTitle title="Unix" />
        <RatingAnalyticsRating rating="4.0" />
      </RatingAnalytics>

      <RatingAnalytics>
        <RatingAnalyticsDate date="13/10/2025" day="" />
        <RatingAnalyticsDay day="Thursday" />
        <RatingAnalyticsTitle title="Web Programming" />
        <RatingAnalyticsRating rating="3.0" />
      </RatingAnalytics>

      <RatingAnalytics>
        <RatingAnalyticsDate date="14/10/2025" day="" />
        <RatingAnalyticsDay day="Friday" />
        <RatingAnalyticsTitle title="Physics" />
        <RatingAnalyticsRating rating="2.0" />
      </RatingAnalytics>
    </div>
  ),
};


