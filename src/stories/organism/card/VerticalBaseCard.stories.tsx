import type { Meta, StoryObj } from '@storybook/react';
import VerticalBaseCard from '../../../component/organism/card/VerticalBasecard';
import { CardActions, CardContent, CardMedia } from '../../../component/atom/card';
import { Typography } from '../../../component/atom/typography';
import { Button } from '../../../component/atom/button';
import { SyntheticEvent } from 'react';

const meta = {
  title: 'Organism/Card/VerticalBaseCard',
  component: VerticalBaseCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof VerticalBaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSingleImage: Story = {
  args: {
    sx: { height: 200, width: 300 },
    cardHeader: (
      <CardMedia sx={{ height: 200 }} image="https://placehold.co/600x400" title="300x200" />
    )
  }
};

export const WithImageContentTitle: Story = {
  args: {
    sx: { height: 'auto', width: 300 },
    cardHeader: (
      <CardMedia sx={{ height: 200 }} image="https://placehold.co/600x400" title="300x200" />
    ),
    cardContent: (
      <CardContent>
        <Typography gutterBottom variant="h4">
          Second Chance
        </Typography>
      </CardContent>
    )
  }
};

export const WithImageContentTitleDescription: Story = {
  args: {
    sx: { height: 'auto', width: 300 },
    cardHeader: (
      <CardMedia sx={{ height: 200 }} image="https://placehold.co/600x400" title="300x200" />
    ),
    cardContent: (
      <CardContent>
        <Typography variant="h4">Second Chance</Typography>

        <Typography variant="body1">
          Earn draw entries from Second Chance games for more opportunities to win!
        </Typography>
      </CardContent>
    )
  }
};

export const WithImageContentTitleAction: Story = {
  args: {
    sx: { height: 'auto', width: 300 },
    cardOnClick: () => {
      alert('clicked on card');
    },
    cardHeader: (
      <CardMedia sx={{ height: 200 }} image="https://placehold.co/600x400" title="300x200" />
    ),
    cardContent: (
      <CardContent>
        <Typography variant="h4">Second Chance</Typography>

        <Typography variant="body1">
          Earn draw entries from Second Chance games for more opportunities to win!
        </Typography>
      </CardContent>
    ),
    cardActions: (
      <CardActions sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <Button
          small={true}
          onClick={(e: SyntheticEvent) => {
            e.stopPropagation();
            e.preventDefault();
            alert('button clicked');
          }}
          color="primary"
        >
          Share
        </Button>
      </CardActions>
    )
  }
};
