import type { Meta, StoryObj } from '@storybook/react';
import VedamLoginPage from '../../../component/organism/Login-Page/LoginPage';
import { fn } from '@storybook/test';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { JSX } from 'react';

const storybookTheme = createTheme({
  spacing: 4,
});

const meta: Meta<typeof VedamLoginPage> = {
  title: 'Pages/VedamLoginPage',
  component: VedamLoginPage,
  decorators: [
    (Story): JSX.Element => (
      <ThemeProvider theme={storybookTheme}>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A split-screen login page with branding and Google authentication.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading state on button',
    },
    logoSrc: {
      control: 'text',
      description: 'Custom logo image URL',
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
  args: {
    onGoogleLogin: fn(),
    loading: false,
    logoSrc:
      'https://images.ctfassets.net/wrc4czfp4sk8/4LUdrH0t4U1C85faXgaj8O/3a268801a825ddb4652e1a33d91df655/a19c08cf0281aa052e17edc302ef904b1c753e86.png',
    logoAlt: 'Vedam School of Technology',
    subtitle: 'Login with your email-id registered with Vedam',
  },
};

export default meta;
type Story = StoryObj<typeof VedamLoginPage>;

export const Default: Story = {
  render: (args) => <VedamLoginPage {...args} />,
};

export const LoadingState: Story = {
  render: (args) => <VedamLoginPage {...args} />,
  args: {
    loading: true,
  },
};

export const WithCustomLogo: Story = {
  render: (args) => <VedamLoginPage {...args} />,
  args: {
    logoSrc: 'https://via.placeholder.com/200x80?text=Custom+Logo',
  },
};

export const CustomText: Story = {
  render: (args) => <VedamLoginPage {...args} />,
  args: {
    title: 'Welcome to Vedam',
    subtitle: 'Sign in to continue your learning journey',
  },
};
