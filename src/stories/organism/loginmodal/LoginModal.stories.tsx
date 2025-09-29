import type { Meta, StoryObj } from '@storybook/react';
import LoginModal from '../../../component/organism/loginModal/LoginModal';

const meta: Meta<typeof LoginModal> = {
  title: 'Organism/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: 'text',
      description: 'URL or path to the logo image',
    },
    logoAlt: {
      control: 'text',
      description: 'Alt text for the logo image',
      defaultValue: 'School Logo',
    },
    logoHeight: {
      control: 'number',
      description: 'Height of the logo in pixels',
      defaultValue: 60,
    },
    logoWidth: {
      control: 'number',
      description: 'Width of the logo in pixels (optional)',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text',
      defaultValue: 'Login',
    },
    onGoogleLoginClick: {
      action: 'clicked',
      description: 'Handler for Google login button click',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {};

export const CustomLogo: Story = {
  args: {
    logo: 'https://media.istockphoto.com/id/473954724/photo/a-footpath-through-a-forest-with-sunshine.jpg?s=1024x1024&w=is&k=20&c=tSyQWMH-R5csowOxumeZg9lEFHNFcHQirv22EOHflM8=',
    logoAlt: 'Custom School Logo',
    logoWidth: 200,
    logoHeight: 60,
    subtitle: 'Institute of Technology',
  },
};
