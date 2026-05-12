import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../../component/atom/box';
import { Typography } from '../../../component/atom/typography';
import CookieCard from '../../../component/organism/card/CookieCard';

const meta: Meta<typeof CookieCard> = {
  title: 'Organism/Card/CookieCard',
  component: CookieCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: true,
        iframeHeight: 400,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading text displayed at the top of the card',
    },
    description: {
      control: 'text',
      description: 'Body text describing cookie usage. Use \\n for line breaks',
    },
    acceptLabel: {
      control: 'text',
      description: 'Label for the accept button',
    },
    onAccept: {
      action: 'accepted',
      description: 'Callback fired when the accept button is clicked',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class applied to the card Box element',
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: '100%',
          height: '400px',
          position: 'relative', // gives fixed children a real containing block
          overflow: 'hidden', // clips the overlay inside the preview box
          backgroundColor: '#f5f5f5',
        }}
      >
        {/* Simulated background content */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5">Login Page</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Your underlying page content is visible here behind the overlay.
          </Typography>
        </Box>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CookieCard>;

export const Default: Story = {
  args: {
    title: 'This site uses cookies',
    description:
      'We use cookies to enhance your browsing experience and analyze our traffic.\nBy clicking Accept, you consent to our use of cookies.',
    acceptLabel: 'Got it!',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'This site uses cookies',
    description:
      'We use cookies to enhance your browsing experience and analyze our traffic.\nBy clicking Accept, you consent to our use of cookies.',
    acceptLabel: 'Got it!',
  },
};

export const MinimalDescription: Story = {
  args: {
    title: 'Cookie Notice',
    description: 'We use essential cookies to keep this site running.',
    acceptLabel: 'Accept',
  },
};

export const WithOnAcceptCallback: Story = {
  args: {
    title: 'We use cookies!',
    description:
      'Certain cookies are essential for the proper functioning of this website.\nBy clicking on the button below, you acknowledge and accept the use of these necessary cookies.',
    acceptLabel: 'Accept',
    onAccept: () => alert('Cookies accepted!'),
  },
};

export const CustomAcceptLabel: Story = {
  args: {
    title: 'We use cookies!',
    description:
      'Certain cookies are essential for the proper functioning of this website.\nBy clicking on the button below, you acknowledge and accept the use of these necessary cookies.',
    acceptLabel: 'I Understand',
  },
};
