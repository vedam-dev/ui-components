import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ClassListItem, {
  ClassListItemRow,
  ClassListItemSubject,
  ClassListItemStatus,
  ClassListItemArrow,
} from "../../../component/organism/subject-details/SubjectDetails";

const meta: Meta<typeof ClassListItem> = {
  title: "Organism/ClassListItem",
  component: ClassListItem,
  tags: ["autodocs"],
  argTypes: {
    bgColor: {
      control: "color",
      description: "Background color for the card",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ClassListItem>;

// Default class item with 4 columns
export const ClassWith4Columns: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Class 245" value="10, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Next Class" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Navigate to class details")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Class item with 5 columns
export const ClassWith5Columns: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Class 244" value="09, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Upcoming" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Navigate to class details")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Class with two-word subject name
export const ClassWithMultiWordSubject: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Class 243" value="08, June" />
        <ClassListItemSubject subject="Machine Learning" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Navigate to class details")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Assignment item
export const AssignmentItem: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Assignment 245" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Partially Completed" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log("Navigate to assignment")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Pending assignment
export const PendingAssignment: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Assignment 244" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Pending" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log("Navigate to assignment")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Completed assignment with score
export const CompletedAssignment: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Assignment 243" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log("Navigate to assignment")} />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};

// Multiple items example (similar to the images you showed)
export const MultipleClassItems: StoryObj = {
  render: () => (
    <div style={{ margin: "0 auto" }}>
      {/* Class items */}
      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 245" value="10, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Next Class" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 245")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 244" value="09, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Upcoming" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 244")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 243" value="08, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 243")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 242" value="07, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 242")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 241" value="06, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 241")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Class 240" value="05, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
        <ClassListItemArrow onClick={() => console.log("Class 240")} />
      </ClassListItem>
    </div>
  ),
};

// Multiple assignment items example
export const MultipleAssignmentItems: StoryObj = {
  render: () => (
    <div style={{ margin: "0 auto" }}>
      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 245" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Partially Completed" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log("Assignment 245")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 244" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Pending" />
        <ClassListItemRow title="Score" value="-" />
        <ClassListItemArrow onClick={() => console.log("Assignment 244")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 243" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log("Assignment 243")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 242" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log("Assignment 242")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 241" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log("Assignment 241")} />
      </ClassListItem>

      <ClassListItem bgColor="#FFFFFF">
        <ClassListItemRow title="Assignment 240" value="10, June" />
        <ClassListItemSubject subject="Backend LLD: Machine Learning Coding" />
        <ClassListItemStatus status="Completed" />
        <ClassListItemRow title="Score" value="90/100" />
        <ClassListItemArrow onClick={() => console.log("Assignment 240")} />
      </ClassListItem>
    </div>
  ),
};

// Without arrow (if needed)
export const WithoutArrow: Story = {
  args: {
    children: (
      <>
        <ClassListItemRow title="Class 245" value="10, June" />
        <ClassListItemSubject subject="Mathematics" />
        <ClassListItemStatus status="Next Class" />
        <ClassListItemRow title="Assignment" value="0/5" />
        <ClassListItemRow title="Additional Problem" value="0/5" />
      </>
    ),
    bgColor: "#FFFFFF",
  },
};