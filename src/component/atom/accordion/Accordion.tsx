import React, { FC, ComponentProps } from 'react';
import {
  Accordion as BaseAccordion,
  AccordionSummary as BaseAccordionSummary,
  AccordionDetails as BaseAccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import SxOverride from '../../../util/SxOverride';


export interface IAccordionProps {
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  variant?: 'default' | 'outlined' | 'elevation';
  size?: 'small' | 'medium' | 'large';
  sx?: ComponentProps<typeof BaseAccordion>['sx'];
}

export type AccordionProps = IAccordionProps & ComponentProps<typeof BaseAccordion>;


const StyledAccordion = styled(BaseAccordion)(({ theme }) => ({
  '&:before': { display: 'none' },
  '&.Mui-expanded': { margin: 0 },
}));

const StyledAccordionSummary = styled(BaseAccordionSummary)(({ theme }) => ({
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary,
    transition: 'transform 0.2s ease-in-out',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const StyledAccordionDetails = styled(BaseAccordionDetails)(({ theme }) => ({
  overflow: 'hidden',
  transition: 'height 300ms ease, padding 300ms ease',
  padding: theme.spacing(0, 4),
  '&.Mui-expanded': {
    padding: theme.spacing(0, 4, 4),
  },
}));

export interface AccordionComponent
  extends FC<AccordionProps> {
  Summary: typeof StyledAccordionSummary;
  Details: typeof StyledAccordionDetails;
}

const Accordion: AccordionComponent = ({
  defaultExpanded = false,
  disabled = false,
  expanded,
  onChange,
  variant = 'default',
  size = 'medium',
  sx,
  children,
  ...props
}) => {
  const { palette, spacing, shadows } = useCoreTheme() as CoreTheme;


  let summaryNode: React.ReactElement | null = null;
  let detailsNode: React.ReactElement | null = null;
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return;
    if (child.type === StyledAccordionSummary) summaryNode = child;
    if (child.type === StyledAccordionDetails) detailsNode = child;
  });

  if (!summaryNode) {
    console.warn("<Accordion> missing <Accordion.Summary>");
    return null;
  }

  const handleChange = (e: React.SyntheticEvent, isExpanded: boolean) => {
    onChange?.(e, isExpanded);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return { border: `1px solid ${palette.divider}`, boxShadow: 'none' };
      case 'elevation':
        return { boxShadow: shadows[2], border: 'none' };
      default:
        return { border: 'none', boxShadow: 'none' };
    }
  };

  const getSizeStyles = () => {
    const sizes = {
      small: { summaryMinHeight: spacing(4), contentMargin: spacing(1) },
      medium: { summaryMinHeight: spacing(6), contentMargin: spacing(1.5) },
      large: { summaryMinHeight: spacing(8), contentMargin: spacing(2) },
    };
    const { summaryMinHeight, contentMargin } = sizes[size] || sizes.medium;

    return {
      '& .MuiAccordionSummary-root': { minHeight: `${summaryMinHeight}px !important` },
      '& .MuiAccordionSummary-content': { margin: `${contentMargin}px 0` },
    };
  };

  const sxValue = SxOverride(
    {
      ...getVariantStyles(),
      ...getSizeStyles(),
      '&.Mui-disabled': { backgroundColor: palette.action.disabledBackground },
      backgroundColor: palette.background.paper,
      overflow: 'hidden',
    },
    sx
  );

  return (
    <StyledAccordion
      disableGutters
      defaultExpanded={defaultExpanded}
      disabled={disabled}
      expanded={expanded}
      onChange={handleChange}
      sx={sxValue}
      {...props}
    >
      {React.cloneElement(summaryNode, {
        expandIcon: <ExpandMoreIcon />,
        'aria-controls': props.id ? `${props.id}-content` : undefined,
        id: props.id ? `${props.id}-header` : undefined,
      })}
      {detailsNode}
    </StyledAccordion>
  );
};


Accordion.Summary = StyledAccordionSummary;
Accordion.Details = StyledAccordionDetails;

export default Accordion;
