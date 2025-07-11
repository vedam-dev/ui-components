import type { Meta, StoryObj } from '@storybook/react';
import SubjectCard from '../../../component/organism/card/SubjectCard';
import { fn } from '@storybook/test';

const meta: Meta<typeof SubjectCard> = {
  title: 'Organism/SubjectCard',
  component: SubjectCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable subject card component with support for various styling options and content configurations.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // Content props
    subject: {
      control: 'text',
      description: 'The subject/title of the card'
    },
    teacher: {
      control: 'text',
      description: 'The teacher/instructor name'
    },
    duration: {
      control: 'text',
      description: 'Duration of the course'
    },
    lectureCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of lectures in the course'
    },
    description: {
      control: 'text',
      description: 'Course description'
    },
    iconUrl: {
      control: 'text',
      description: 'URL for the subject icon'
    },
    iconAlt: {
      control: 'text',
      description: 'Alt text for the subject icon'
    },
    buttonText: {
      control: 'text',
      description: 'Text for the action button'
    },

    // Action prop
    onGoToClass: {
      action: 'Go to Class clicked',
      description: 'Callback when button is clicked'
    },

    // Style props
    width: {
      control: { type: 'number', min: 200, max: 500, step: 10 },
      description: 'Width of the card in pixels'
    },
    height: {
      control: { type: 'number', min: 200, max: 500, step: 10 },
      description: 'Height of the card in pixels'
    },
    cardSx: {
      control: 'object',
      description: 'Custom styles for the card container'
    },
    iconContainerSx: {
      control: 'object',
      description: 'Custom styles for the icon container'
    },
    subjectTextSx: {
      control: 'object',
      description: 'Custom styles for the subject text'
    },
    teacherTextSx: {
      control: 'object',
      description: 'Custom styles for the teacher text'
    },
    durationTextSx: {
      control: 'object',
      description: 'Custom styles for the duration text'
    },
    lectureTextSx: {
      control: 'object',
      description: 'Custom styles for the lecture count text'
    },
    descriptionTextSx: {
      control: 'object',
      description: 'Custom styles for the description text'
    },
    buttonSx: {
      control: 'object',
      description: 'Custom styles for the button'
    }
  },
  args: {
    onGoToClass: fn()
  }
};

export default meta;
type Story = StoryObj<typeof SubjectCard>;

export const Default: Story = {
  args: {
    subject: 'Java',
    teacher: 'Priya Sharma',
    duration: '4 months',
    lectureCount: 24,
    description: 'Advanced calculus, algebra, and mathematical analysis'
  }
};

export const WebDevelopment: Story = {
  args: {
    subject: 'Web Development',
    teacher: 'Priya Sharma',
    duration: '4 months',
    lectureCount: 24,
    description: 'Advanced calculus, algebra, and mathematical analysis'
  }
};

export const Mathematics: Story = {
  args: {
    subject: 'Mathematics',
    teacher: 'Priya Sharma',
    duration: '4 months',
    lectureCount: 24,
    description: 'Advanced calculus, algebra, and mathematical analysis'
  }
};

export const Unix: Story = {
  args: {
    subject: 'Unix',
    teacher: 'Priya Sharma',
    duration: '4 months',
    lectureCount: 24,
    description: 'Advanced calculus, algebra, and mathematical analysis'
  }
};

export const CustomIcon: Story = {
  args: {
    subject: 'Data Science',
    teacher: 'Dr. Chen',
    duration: '12 weeks',
    lectureCount: 32,
    description: 'Machine learning fundamentals and data analysis techniques',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    iconAlt: 'Data science icon'
  }
};

export const CustomButton: Story = {
  args: {
    subject: 'React',
    teacher: 'John Doe',
    duration: '8 weeks',
    lectureCount: 16,
    description: 'Learn modern React with hooks and context API',
    buttonText: 'Start Learning',
    buttonSx: {
      backgroundColor: '#8a18ff',
      color: 'white',
      '&:hover': {
        backgroundColor: '#6a00f0'
      }
    }
  }
};


export const DarkTheme: Story = {
  args: {
    subject: 'Node.js',
    teacher: 'Mike Wilson',
    duration: '6 weeks',
    lectureCount: 18,
    description: 'Backend development with Node.js and Express',
    cardSx: {
      background: 'linear-gradient(180deg, #424242 0%, #212121 100%)',
      border: '1px solid #616161'
    },
    subjectTextSx: {
      color: '#bb86fc'
    },
    teacherTextSx: {
      color: '#bdbdbd'
    },
    durationTextSx: {
      color: '#9e9e9e'
    },
    lectureTextSx: {
      color: '#9e9e9e'
    },
    descriptionTextSx: {
      color: '#e0e0e0'
    },
    buttonSx: {
      backgroundColor: '#bb86fc',
      color: '#121212',
      '&:hover': {
        backgroundColor: '#9c64f4'
      }
    }
  }
};

export const FullyCustomized: Story = {
  args: {
    subject: 'UX Design',
    teacher: 'Alex Morgan',
    duration: '5 weeks',
    lectureCount: 15,
    description: 'Principles of user experience design and research methods',
    width: 350,
    height: 300,
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3242/3242257.png',
    buttonText: 'Enroll Now',
    cardSx: {
      background: 'linear-gradient(180deg, #e1f5fe 0%, #b3e5fc 100%)',
      border: '1px solid #4fc3f7'
    },
    iconContainerSx: {
      bgcolor: '#e1f5fe'
    },
    subjectTextSx: {
      color: '#0277bd',
      fontSize: '24px'
    },
    teacherTextSx: {
      color: '#0288d1'
    },
    buttonSx: {
      backgroundColor: '#0288d1',
      color: 'white',
      '&:hover': {
        backgroundColor: '#0277bd'
      }
    }
  }
};
