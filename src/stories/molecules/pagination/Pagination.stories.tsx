import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CustomPagination } from '../../../component/molecule/pagination/Pagination';
import type { CustomPaginationProps } from '../../../component/molecule/pagination/Pagination';
import { Box } from '@mui/material';
import React, { useState } from 'react';

const meta: Meta<typeof CustomPagination> = {
  title: 'Molecule/Pagination',
  component: CustomPagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable MUI-based pagination component with customizable page ranges, sibling counts, and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the pagination component',
    },
    page: {
      control: 'number',
      description: 'Currently active page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    onChange: {
      description: 'Callback function triggered when page changes',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the pagination is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    siblingCount: {
      control: 'number',
      description: 'Number of sibling pages to show on each side of current page',
      table: {
        defaultValue: { summary: '1' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
        <Box
          sx={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '16px',
          }}
        >
          <Story />
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomPagination>;

const PaginationWithState = (args: Partial<CustomPaginationProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(args.page || 1);

  return (
    <CustomPagination
      {...(args as CustomPaginationProps)}
      page={currentPage}
      onChange={(newPage) => {
        setCurrentPage(newPage);
        if (typeof args.onChange === 'function') args.onChange(newPage);
      }}
    />
  );
};

export const BeginningOfRange: Story = {
  args: {
    label: 'Beginning of range',
    page: 1,
    totalPages: 20,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination at the beginning of the range, showing page 1 selected.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const MiddleRange: Story = {
  args: {
    label: 'Middle range',
    page: 4,
    totalPages: 20,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination in the middle of the range, showing ellipsis on both sides.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const EndRange: Story = {
  args: {
    label: 'End range',
    page: 10,
    totalPages: 10,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination at the end of the range, showing the last page selected.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    page: 10,
    totalPages: 10,
    onChange: action('page-changed'),
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination in disabled state, with grayed out appearance and no interaction.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const WithoutLabel: Story = {
  args: {
    page: 5,
    totalPages: 20,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination without a label.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const SmallRange: Story = {
  args: {
    label: 'Small range',
    page: 2,
    totalPages: 5,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a small total number of pages.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const SinglePage: Story = {
  args: {
    label: 'Single page',
    page: 1,
    totalPages: 1,
    onChange: action('page-changed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with only one page available.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};

export const LargeSiblingCount: Story = {
  args: {
    label: 'Large sibling count',
    page: 10,
    totalPages: 20,
    onChange: action('page-changed'),
    siblingCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination with a larger sibling count, showing more pages around the current page.',
      },
    },
  },
  render: (args) => <PaginationWithState {...(args as Partial<CustomPaginationProps>)} />,
};
