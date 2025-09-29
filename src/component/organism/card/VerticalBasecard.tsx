import React, { ComponentProps, ReactElement } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia } from '../../atom/card';
export interface IVerticalBaseCardProps {
  cardHeader?: ReactElement<ComponentProps<typeof CardHeader>>;
  cardMedia?: ReactElement<ComponentProps<typeof CardMedia>>;
  cardContent?: ReactElement<ComponentProps<typeof CardContent>>;
  cardActions?: ReactElement<ComponentProps<typeof CardActions>>;
  cardOnClick?: React.MouseEventHandler<HTMLElement>;
  component?: React.ElementType;
}

export type VerticalBaseCardProps = ComponentProps<typeof Card> & IVerticalBaseCardProps;

const VerticalBaseCard: React.FC<VerticalBaseCardProps> = ({
  cardHeader,
  cardMedia,
  cardContent,
  cardActions,
  cardOnClick,
  ...props
}) => {
  return (
    <Card
      {...props}
      onClick={cardOnClick}
      style={{
        cursor: cardOnClick ? 'pointer' : undefined,
      }}
    >
      {cardHeader}
      {cardMedia}
      {cardContent}
      {cardActions}
    </Card>
  );
};

export default VerticalBaseCard;
