import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayerModal from '../../../component/organism/video-player-modal/VideoPlayerModal';
import { useState } from 'react';
import { Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const meta: Meta<typeof VideoPlayerModal> = {
  title: 'Organism/VideoPlayerModal',
  component: VideoPlayerModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'modalClosed' },
    videoUrl: {
      control: 'text',
      defaultValue: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    title: {
      control: 'text',
      defaultValue: 'Video Player',
    },
    autoPlay: {
      control: 'boolean',
      defaultValue: true,
    },
    controls: {
      control: 'boolean',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayerModal>;

// Play button component to trigger the modal
const VideoPlayButton = ({ onClick, style = {} }: { onClick: () => void; style?: any }) => (
  <Box
    sx={{
      position: 'relative',
      display: 'inline-block',
      borderRadius: '12px',
      overflow: 'hidden',
      cursor: 'pointer',
      ...style,
    }}
    onClick={onClick}
  >
    <img
      src="https://via.placeholder.com/400x225/4A90E2/FFFFFF?text=Video+Thumbnail"
      alt="Video thumbnail"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          transform: 'translate(-50%, -50%) scale(1.1)',
        },
        transition: 'all 0.2s ease',
      }}
    >
      <PlayArrowIcon
        sx={{
          color: 'white',
          fontSize: '32px',
          marginLeft: '4px',
        }}
      />
    </Box>
  </Box>
);

const Template = (args: any) => {
  const [open, setOpen] = useState(false);

  const handlePlayClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    args.onClose?.();
  };

  return (
    <Box sx={{ p: 4 }}>
      <VideoPlayButton onClick={handlePlayClick} />

      <VideoPlayerModal {...args} open={open} onClose={handleClose} />
    </Box>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Sample Video',
  },
};

export const WithCustomVideo: Story = {
  render: Template,
  args: {
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    title: 'Custom Video Example',
    autoPlay: false,
  },
};

export const AutoPlayDisabled: Story = {
  render: Template,
  args: {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Manual Play Video',
    autoPlay: false,
  },
};

export const NoControls: Story = {
  render: Template,
  args: {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'No Controls Video',
    controls: false,
    autoPlay: true,
  },
};
