import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ClassListItem, {
  ClassListItemRow,
  ClassListItemSubject,
  ClassListItemStatus,
  ClassListItemArrow,
  ClassListItemDivider,
} from '../../../component/organism/subject-details/SubjectDetails';

const meta: Meta<typeof ClassListItem> = {
  title: 'Organism/ClassListItem',
  component: ClassListItem,
  tags: ['autodocs'],
  argTypes: {
    bgColor: {
      control: 'color',
      description: 'Background color for the card',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ClassListItem>;

// Class item with 5 columns (Class, Subject, Status, Assignment, Additional Problem)
export const ClassWith5Columns: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Class 245" value="10, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Next Class" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Navigate to class details')} />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};

// Assignment item with 4 columns (Assignment, Subject, Status, Score)
export const AssignmentItem: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Assignment 245" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Partially Completed" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log('Navigate to assignment')} />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};

// Completed assignment with score
export const CompletedAssignment: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Assignment 243" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log('Navigate to assignment')} />
      </>
    ),
    bgColor: '#FFFFFF',
  },
};

// Multiple class items example
export const MultipleClassItems: StoryObj = {
  render: () => (
    <div style={{ margin: '0 auto' }}>
      {/* Class items with 5 columns */}
      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 245" value="10, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Next Class" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 245')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 244" value="09, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Upcoming" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 244')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 243" value="08, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 243')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 242" value="07, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 242')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 241" value="06, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 241')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 240" value="05, June" highlight />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log('Class 240')} />
      </ClassListItem>
    </div>
  ),
};

// Multiple assignment items example
export const MultipleAssignmentItems: StoryObj = {
  render: () => (
    <div style={{ margin: '0 auto' }}>
      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 245" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Partially Completed" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log('Assignment 245')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 244" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Pending" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log('Assignment 244')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 243" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log('Assignment 243')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 242" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log('Assignment 242')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 241" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log('Assignment 241')} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 240" value="10, June" highlight />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemDivider />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log('Assignment 240')} />
      </ClassListItem>
    </div>
  ),
};
