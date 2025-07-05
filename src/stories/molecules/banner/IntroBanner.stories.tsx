import type { Meta, StoryObj } from '@storybook/react';
import IntroBanner from '../../../component/molecule/IntroBanner/IntroBanner';

const meta = {
  title: 'Molecule/banner/IntroBanner',
  component: IntroBanner,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof IntroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BannerCard: Story = {
  args: {
    gradientColor: '#FFFF00',
    bannerContent: {
      buttonBackgroundColor: '#87e01a',
      buttonColor: '#9b3cbe',
      buttonText: 'Buy Now',
      logoAlt: 'Megamillions',
      logoUrl: 'https://placehold.co/600x400',
      title: 'Mega Millions',
      secondaryTitle: 'Secondary Title',
      titleColor: '#ee3a3a'
    },
    outlineStyle: 'Gradient',
    desktopUrl: 'https://placehold.co/600x400',
    mobileUrl: 'https://placehold.co/600x400',
    tabletUrl: 'https://placehold.co/600x400',
    onClick: (): void => {},
    decorativeBanner: true
  }
};
