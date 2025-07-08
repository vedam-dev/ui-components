import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Drawer, { DrawerProps } from "../../../component/atom/drawer/Drawer";
import {
  Button,
  Box,
  Typography,
  List,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";

const meta: Meta<DrawerProps> = {
  title: "Atom/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    anchor: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    width: { control: "text" },
    title: { control: "text" },
    transitionDuration: {
      table: {
        disable: true,
      },
    },
    container: {
      table: {
        disable: true,
      },
    },
    componentsProps: {
      table: {
        disable: true,
      },
    },
    slotProps: {
      table: {
        disable: true,
      },
    },
    slots: {
      table: {
        disable: true,
      },
    },
    paperSx: {
      table: {
        disable: true,
      },
    },
    components: {
      table: {
        disable: true,
      },
    },
    classes: {
      table: {
        disable: true,
      },
    },
    component: {
      table: {
        disable: true,
      },
    },
    elevation: {
      table: {
        disable: true,
      },
    },
    BackdropComponent: {
      table: {
        disable: true,
      },
    },
    closeAfterTransition: {
      table: {
        disable: true,
      },
    },
    disableEnforceFocus: {
      table: {
        disable: true,
      },
    },
    disableEscapeKeyDown: {
      table: {
        disable: true,
      },
    },
    disablePortal: {
      table: {
        disable: true,
      },
    },
    hideBackdrop: {
      table: {
        disable: true,
      },
    },
    keepMounted: {
      table: {
        disable: true,
      },
    },
    onTransitionExited: {
      table: {
        disable: true,
      },
    },
    ModalProps: {
      table: {
        disable: true,
      },
    },
    PaperProps: {
      table: {
        disable: true,
      },
    },
    SlideProps: {
      table: {
        disable: true,
      },
    },
    onTransitionEnter: {
      table: {
        disable: true,
      },
    },
    disableRestoreFocus: {
      table: {
        disable: true,
      },
    },
    disableScrollLock: {
      table: {
        disable: true,
      },
    },
    disableAutoFocus: {
      table: {
        disable: true,
      },
    },
    BackdropProps: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<DrawerProps>;

const Template: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          {args.children}
        </Drawer>
      </>
    );
  },
};

export const Default: Story = {
  ...Template,
  args: {
    anchor: "left",
    title: "My Drawer",
    width: 300,
    children: (
      <Box p={1}>
        <Typography>This is drawer content</Typography>
      </Box>
    ),
  },
};

export const WithItems: Story = {
  ...Template,
  name: "Drawer With List Items",
  args: {
    anchor: "left",
    title: "Menu",
    width: 250,
    children: (
      <>
        <List>
          <ListItemButton>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Send email" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemText primary="All mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </>
    ),
  },
};

export const RightAnchor: Story = {
  ...Default,
  name: "Anchor Right",
  args: {
    ...Default.args,
    anchor: "right",
    title: "Right Drawer",
  },
};

export const TopAnchor: Story = {
  ...Default,
  name: "Anchor Top",
  args: {
    ...Default.args,
    anchor: "top",
    title: "Top Drawer",
    width: "100%",
  },
};

export const BottomAnchor: Story = {
  ...Default,
  name: "Anchor Bottom",
  args: {
    ...Default.args,
    anchor: "bottom",
    title: "Bottom Drawer",
    width: "100%",
  },
};
