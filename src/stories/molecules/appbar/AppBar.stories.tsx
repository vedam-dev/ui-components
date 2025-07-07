import type { Meta, StoryObj } from '@storybook/react';
import AppBar from '../../../component/molecule/appbar/AppBar';
import { Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const meta = {
  title: 'Molecule/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'inherit',
        'primary',
        'secondary',
        'transparent',
        'error',
        'info',
        'success',
        'warning'
      ]
    },
    position: {
      control: 'select',
      options: ['absolute', 'fixed', 'relative', 'static', 'sticky']
    },
    enableColorOnDark: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Primary AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Secondary AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Default: Story = {
  args: {
    color: 'default',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ color: 'text.primary' }}>
          Default AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Transparent: Story = {
  args: {
    color: 'transparent',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ color: 'text.primary' }}>
          Transparent AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const AppError: Story = {
  args: {
    color: 'error',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Error AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Success: Story = {
  args: {
    color: 'success',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Success AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Warning: Story = {
  args: {
    color: 'warning',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Warning AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const Info: Story = {
  args: {
    color: 'info',
    position: 'static',
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Info AppBar
        </Typography>
      </Toolbar>
    )
  }
};

export const WithButtons: Story = {
  args: {
    color: 'primary',
    position: 'static',
    children: (
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AppBar with Actions
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    )
  }
};

export const Fixed: Story = {
  render: args => (
    <Box sx={{ height: '100vh' }}>
      <AppBar {...args}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Fixed AppBar
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8, p: 2 }}>
        <Typography variant="body1">
          This is content below the fixed AppBar. The AppBar stays at the top when scrolling.
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    color: 'primary',
    position: 'fixed'
  }
};

export const Sticky: Story = {
  render: args => (
    <Box sx={{ height: '200vh' }}>
      <Box sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1">
          Content above the sticky AppBar. Scroll down to see the sticky behavior.
        </Typography>
      </Box>
      <AppBar {...args}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Sticky AppBar
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, height: '100vh' }}>
        <Typography variant="body1">
          This is content below the sticky AppBar. The AppBar becomes sticky when you scroll past
          it.
        </Typography>
      </Box>
    </Box>
  ),
  args: {
    color: 'primary',
    position: 'sticky'
  }
};

export const EnableColorOnDark: Story = {
  args: {
    color: 'primary',
    position: 'static',
    enableColorOnDark: true,
    children: (
      <Toolbar>
        <Typography variant="h6" component="div">
          Color on Dark Mode
        </Typography>
      </Toolbar>
    )
  }
};
