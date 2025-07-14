import BaseCard from '@mui/material/Card';
import { ComponentProps, FC } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface ICardProps {
  shadow?: 'y8' | 'y12' | 'y16' | 'none';
}
export type CardProps = ComponentProps<typeof BaseCard> & ICardProps;

const Card: FC<CardProps> = ({ children, style, shadow, sx, ...props }) => {
  const {
    vd: { shadows },
    palette: {
      common: { white },
      grey
    }
  } = useCoreTheme() as CoreTheme;

  const shadowVal = shadow ? shadows[shadow] : shadows.y12;
  return (
    <BaseCard
      {...props}
      style={{ boxShadow: shadowVal, ...style }}
      sx={{
        '&:focus-visible': {
          border: `solid 1px ${white}`,
          outline: `solid 2px ${grey[900]}`
        },
        ...sx
      }}
    >
      {children}
    </BaseCard>
  );
};

export default Card;
