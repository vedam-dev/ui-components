import type { Meta, StoryObj } from '@storybook/react';
import HorizontalBaseCard from '../../../component/organism/card/HorizontalBaseCard';
import { CardContent, CardMedia } from '../../../component/atom/card';
import { Box } from '../../../component/atom/box';
import { Typography } from '../../../component/atom/typography';

const meta = {
  title: 'Organism/Card/HorizontalBaseCard',
  component: HorizontalBaseCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof HorizontalBaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {
  args: {
    cardMedia: (
      <CardMedia
        sx={{ width: 90, height: 90, margin: '1.5rem 1rem' }}
        image="https://placehold.co/600x400"
        title="90x90"
      />
    ),
    cardContent: (
      <CardContent>
        <Box>
          <Typography variant="h6">Header</Typography>
          <Typography variant="body1">This is a sample card content.</Typography>
        </Box>
      </CardContent>
    )
  }
};
export const WithoutDescription: Story = {
  args: {
    cardMedia: (
      <CardMedia
        sx={{ width: 90, height: 90, margin: '1.5rem 1rem' }}
        image="https://placehold.co/600x400"
        title="90x90"
      />
    ),
    cardContent: (
      <CardContent>
        <Box>
          <Typography variant="h6">Header</Typography>
        </Box>
      </CardContent>
    )
  }
};
export const WithoutMediaMargin: Story = {
  args: {
    cardMedia: (
      <CardMedia
        sx={{ width: 150, height: 150 }}
        image="https://placehold.co/600x400"
        title="90x90"
      />
    ),
    cardContent: (
      <CardContent>
        <Box>
          <Typography variant="h6">Header</Typography>
          <Typography variant="body1">This is a sample card content.</Typography>
        </Box>
      </CardContent>
    )
  }
};
export const MediaLeft: Story = {
  args: {
    sx: { display: 'flex', flexDirection: 'row-reverse' },
    cardMedia: (
      <CardMedia
        sx={{ width: 150, height: 150 }}
        image="https://placehold.co/600x400"
        title="90x90"
      />
    ),
    cardContent: (
      <CardContent>
        <Box>
          <Typography variant="h6">Header</Typography>
          <Typography variant="body1">This is a sample card content.</Typography>
        </Box>
      </CardContent>
    )
  }
};
