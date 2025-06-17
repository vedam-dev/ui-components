import type { Meta, StoryObj } from '@storybook/react';
import { SvgIcon } from '../../../component/atom/icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atom/Icon',
  component: SvgIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SvgIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const MonoToneCart: Story = {
  args: {
    iconName: 'monoToneCart',
    color: 'primary'
  }
};

export const MonoToneCartLarge: Story = {
  args: {
    iconName: 'monoToneCart',
    color: 'primary',
    fontSize: 'large'
  }
};

export const MonotoneChevronLeft: Story = {
  args: {
    iconName: 'monotoneChevronLeft'
  }
};

export const MonotoneChevronRight: Story = {
  args: {
    iconName: 'monotoneChevronRight'
  }
};

export const MonotoneChevronDown: Story = {
  args: {
    iconName: 'monotoneChevronDown'
  }
};

export const MonotoneNumber: Story = {
  args: {
    iconName: 'monotoneNumber'
  }
};

export const MonotoneCircle: Story = {
  args: {
    iconName: 'monotoneCircle'
  }
};

export const MonotoneClose: Story = {
  args: {
    iconName: 'monotoneClose'
  }
};

export const MonotoneCheck: Story = {
  args: {
    iconName: 'monotoneCheck'
  }
};

export const MonotoneFilter: Story = {
  args: {
    iconName: 'monotoneFilter'
  }
};

export const MonotoneMenu: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'monotoneMenu'
  }
};

export const MonotoneWallet: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'monotoneWallet'
  }
};

export const MonotoneToken: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'monotoneToken'
  }
};

export const LotteryWVRed80: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'lottery.WVRed80'
  }
};

export const YouTube: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'youtube'
  }
};

export const X: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'x'
  }
};

export const Instagram: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'instagram'
  }
};

export const Facebook: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'facebook'
  }
};

export const OpenNewWindow: Story = {
  args: {
    sx: {
      width: `3em`,
      height: `3em`
    },
    iconName: 'openNewWindow'
  }
};
