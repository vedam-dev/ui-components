import type { Meta, StoryObj } from '@storybook/react';
import Banner from '../../../component/molecule/banner/Banner';

const meta = {
  title: 'Molecule/banner/Banner',
  component: Banner,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BannerCard: Story = {
  args: {
    sx: { width: '100%' },
    title: 'Banner',
    imageUrl: 'https://placehold.co/600x400',
    label: 'banner image',
    altText: 'banner-image'
  }
};
