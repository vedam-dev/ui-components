import type { Meta, StoryObj } from '@storybook/react';
import UploadResourceModal from '../../../component/organism/uploadResourceModal/UploadResourceModal';
import { useState } from 'react';
import { Button } from '@mui/material';

const meta: Meta<typeof UploadResourceModal> = {
  title: 'Organism/UploadResourceModal',
  component: UploadResourceModal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    onUpload: { action: 'uploaded' },
    title: {
      control: 'text',
      defaultValue: 'Upload Resource',
    },
    subtitle: {
      control: 'text',
      defaultValue: 'Upload the material you want to attach',
    },
    fileUploadText: {
      control: 'text',
      defaultValue: 'Choose a file to upload here',
    },
    resourceIdText: {
      control: 'text',
      defaultValue: 'Paste Resource ID',
    },
    cancelButtonText: {
      control: 'text',
      defaultValue: 'Cancel',
    },
    uploadButtonText: {
      control: 'text',
      defaultValue: 'Upload',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadResourceModal>;

const Template = (args: any) => {
  const [open, setOpen] = useState(false);

  const handleUpload = (file: File | null, resourceId: string | null) => {
    if (file) {
      console.log('File uploaded:', file.name, file);
    } else if (resourceId) {
      console.log('Resource ID provided:', resourceId);
    }
    args.onUpload?.(file, resourceId);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Upload Resource Modal
      </Button>
      <UploadResourceModal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
};

export const CustomTexts: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleUpload = (file: File | null, resourceId: string | null) => {
      if (file) {
        console.log('File uploaded:', file.name);
      } else if (resourceId) {
        console.log('Resource ID:', resourceId);
      }
      args.onUpload?.(file, resourceId);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Custom Text Modal
        </Button>
        <UploadResourceModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onUpload={handleUpload}
          title="Upload Document"
          subtitle="Select a document from your computer or paste a resource link"
          fileUploadText="Drag and drop or browse files"
          resourceIdText="Enter Resource URL"
          cancelButtonText="Discard"
          uploadButtonText="Submit"
        />
      </div>
    );
  },
  args: {},
};

export const FileOnlyUpload: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleUpload = (file: File | null, resourceId: string | null) => {
      if (file) {
        console.log('File uploaded:', file.name);
        alert(`File "${file.name}" uploaded successfully!`);
      }
      args.onUpload?.(file, resourceId);
    };

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Upload File Only
        </Button>
        <UploadResourceModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onUpload={handleUpload}
          title="Upload Assignment"
          subtitle="Upload your completed assignment file"
        />
      </div>
    );
  },
  args: {},
};

export const WithCallbackLogging: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [uploadHistory, setUploadHistory] = useState<string[]>([]);

    const handleUpload = (file: File | null, resourceId: string | null) => {
      const timestamp = new Date().toLocaleTimeString();
      if (file) {
        setUploadHistory((prev) => [...prev, `[${timestamp}] File uploaded: ${file.name}`]);
      } else if (resourceId) {
        setUploadHistory((prev) => [...prev, `[${timestamp}] Resource ID: ${resourceId}`]);
      }
      args.onUpload?.(file, resourceId);
    };

    return (
      <div style={{ padding: '20px' }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal with Logging
        </Button>

        {uploadHistory.length > 0 && (
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <h3>Upload History:</h3>
            <ul>
              {uploadHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        )}

        <UploadResourceModal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onUpload={handleUpload}
        />
      </div>
    );
  },
  args: {},
};
