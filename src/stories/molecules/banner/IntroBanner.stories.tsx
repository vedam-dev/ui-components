import type { Meta, StoryObj } from '@storybook/react';
import IntroBanner from '../../../component/molecule/IntroBanner/IntroBanner';

const meta = {
  title: 'Moluecule/banner/IntroBanner',
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
      logoUrl: 'https://picsum.photos/512/282',
      title: 'Mega Millions',
      secondaryTitle: 'Secondary Title',
      titleColor: '#ee3a3a'
    },
    outlineStyle: 'Gradient',
    desktopUrl: 'https://picsum.photos/1434/380',
    mobileUrl: 'https://picsum.photos/369/328',
    tabletUrl: 'https://picsum.photos/764/325',
    onClick: (): void => {},
    decorativeBanner: true
  }
};
