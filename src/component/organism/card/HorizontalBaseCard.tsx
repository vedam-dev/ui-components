import React, { ComponentProps, ReactElement } from 'react';
import { Card, CardContent, CardMedia } from '../../atom/card';
export interface IVerticalBaseCardProps {
  cardMedia?: ReactElement<ComponentProps<typeof CardMedia>>;
  cardContent?: ReactElement<ComponentProps<typeof CardContent>>;
}

export type HorizontalBaseCardProps = ComponentProps<typeof Card> & IVerticalBaseCardProps;

const HorizontalBaseCard: React.FC<HorizontalBaseCardProps> = ({
  cardMedia,
  cardContent,
  ...props
}) => {
  return (
    <Card sx={{ display: 'flex' }} {...props}>
      {cardContent}
      {cardMedia}
    </Card>
  );
};

export default HorizontalBaseCard;
