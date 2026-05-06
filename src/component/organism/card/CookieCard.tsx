'use client';

import React, { useState } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import { Box } from '../../atom/box';
import { Typography } from '../../atom/typography';
import { Button } from '../../atom/button';
export interface CookieCardProps {
  title?: string;
  description?: string;
  acceptLabel?: string;
  onAccept?: () => void;
  className?: string;
}

const CookieCard: React.FC<CookieCardProps> = ({
  title,
  description,
  acceptLabel,
  onAccept,
  className,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept?.();
  };

  if (accepted) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: theme.zIndex.modal,
        background: 'rgba(30, 30, 30, 0.80)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        className={className}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: theme.spacing(7.5),
          padding: theme.spacing(7),
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: theme.spacing(3),
          width: '452px',
          textAlign: 'center',
          border: `1px solid ${theme.palette.background.paper}`,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 115,
            height: 61,
            px: `${theme.spacing(18)}`,
            py: `${theme.spacing(10)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background Circle */}
          <svg
            // component="svg"
            viewBox="0 0 53 53"
            style={{
              position: 'absolute',
              width: 52,
              height: 52,
            }}
          >
            <ellipse cx="26.2097" cy="26.2653" rx="26.2097" ry="26.2653" fill={theme.palette.primary[100]} />
          </svg>

          {/* Cookie Icon */}
          <CookieOutlinedIcon
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main, // purple
              zIndex: 2,
            }}
          />

          {/* Sparkles (Top Right) */}
          <svg
            viewBox="0 0 19 19"
            style={{
              position: 'absolute',
              top: 2,
              right: 26,
              width: 10,
              height: 10,
            }}
          >
            <path
              d="M18.149 9.09569C18.1509 9.4046 18.0573 9.70652 17.8809 9.95991C17.7046 10.2133 17.4542 10.4057 17.1642 10.5106L12.2896 12.3157L10.494 17.2045C10.3877 17.494 10.1953 17.7438 9.94282 17.9203C9.69034 18.0968 9.38992 18.1914 9.08209 18.1914C8.77427 18.1914 8.47385 18.0968 8.22137 17.9203C7.96889 17.7438 7.77651 17.494 7.67017 17.2045L5.86322 12.3157L0.984815 10.5163C0.695937 10.4097 0.446628 10.2169 0.270525 9.96392C0.0944215 9.71091 0 9.40985 0 9.10137C0 8.79289 0.0944215 8.49183 0.270525 8.23882C0.446628 7.9858 0.695937 7.79301 0.984815 7.68645L5.86322 5.87566L7.65883 0.986905C7.76517 0.697414 7.95755 0.447576 8.21003 0.271099C8.46251 0.094622 8.76293 0 9.07075 0C9.37858 0 9.679 0.094622 9.93148 0.271099C10.184 0.447576 10.3763 0.697414 10.4827 0.986905L12.2896 5.87566L17.168 7.67509C17.4582 7.78096 17.7084 7.97449 17.8841 8.22895C18.0598 8.48341 18.1524 8.78626 18.149 9.09569Z"
              fill="#FCD845"
            />
          </svg>

          <svg
            viewBox="0 0 19 19"
            style={{
              position: 'absolute',
              top: 5,
              left: 10,
              width: 25,
              height: 25,
            }}
          >
            <path
              d="M18.149 9.09569C18.1509 9.4046 18.0573 9.70652 17.8809 9.95991C17.7046 10.2133 17.4542 10.4057 17.1642 10.5106L12.2896 12.3157L10.494 17.2045C10.3877 17.494 10.1953 17.7438 9.94282 17.9203C9.69034 18.0968 9.38992 18.1914 9.08209 18.1914C8.77427 18.1914 8.47385 18.0968 8.22137 17.9203C7.96889 17.7438 7.77651 17.494 7.67017 17.2045L5.86322 12.3157L0.984815 10.5163C0.695937 10.4097 0.446628 10.2169 0.270525 9.96392C0.0944215 9.71091 0 9.40985 0 9.10137C0 8.79289 0.0944215 8.49183 0.270525 8.23882C0.446628 7.9858 0.695937 7.79301 0.984815 7.68645L5.86322 5.87566L7.65883 0.986905C7.76517 0.697414 7.95755 0.447576 8.21003 0.271099C8.46251 0.094622 8.76293 0 9.07075 0C9.37858 0 9.679 0.094622 9.93148 0.271099C10.184 0.447576 10.3763 0.697414 10.4827 0.986905L12.2896 5.87566L17.168 7.67509C17.4582 7.78096 17.7084 7.97449 17.8841 8.22895C18.0598 8.48341 18.1524 8.78626 18.149 9.09569Z"
              fill="#FCD845"
            />
          </svg>

          <svg
            viewBox="0 0 19 19"
            style={{
              position: 'absolute',
              bottom: 5,
              left: 22,
              width: 10,
              height: 10,
            }}
          >
            <path
              d="M18.149 9.09569C18.1509 9.4046 18.0573 9.70652 17.8809 9.95991C17.7046 10.2133 17.4542 10.4057 17.1642 10.5106L12.2896 12.3157L10.494 17.2045C10.3877 17.494 10.1953 17.7438 9.94282 17.9203C9.69034 18.0968 9.38992 18.1914 9.08209 18.1914C8.77427 18.1914 8.47385 18.0968 8.22137 17.9203C7.96889 17.7438 7.77651 17.494 7.67017 17.2045L5.86322 12.3157L0.984815 10.5163C0.695937 10.4097 0.446628 10.2169 0.270525 9.96392C0.0944215 9.71091 0 9.40985 0 9.10137C0 8.79289 0.0944215 8.49183 0.270525 8.23882C0.446628 7.9858 0.695937 7.79301 0.984815 7.68645L5.86322 5.87566L7.65883 0.986905C7.76517 0.697414 7.95755 0.447576 8.21003 0.271099C8.46251 0.094622 8.76293 0 9.07075 0C9.37858 0 9.679 0.094622 9.93148 0.271099C10.184 0.447576 10.3763 0.697414 10.4827 0.986905L12.2896 5.87566L17.168 7.67509C17.4582 7.78096 17.7084 7.97449 17.8841 8.22895C18.0598 8.48341 18.1524 8.78626 18.149 9.09569Z"
              fill="#FCD845"
            />
          </svg>

          <svg
            viewBox="0 0 19 19"
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              width: 25,
              height: 25,
            }}
          >
            <path
              d="M18.149 9.09569C18.1509 9.4046 18.0573 9.70652 17.8809 9.95991C17.7046 10.2133 17.4542 10.4057 17.1642 10.5106L12.2896 12.3157L10.494 17.2045C10.3877 17.494 10.1953 17.7438 9.94282 17.9203C9.69034 18.0968 9.38992 18.1914 9.08209 18.1914C8.77427 18.1914 8.47385 18.0968 8.22137 17.9203C7.96889 17.7438 7.77651 17.494 7.67017 17.2045L5.86322 12.3157L0.984815 10.5163C0.695937 10.4097 0.446628 10.2169 0.270525 9.96392C0.0944215 9.71091 0 9.40985 0 9.10137C0 8.79289 0.0944215 8.49183 0.270525 8.23882C0.446628 7.9858 0.695937 7.79301 0.984815 7.68645L5.86322 5.87566L7.65883 0.986905C7.76517 0.697414 7.95755 0.447576 8.21003 0.271099C8.46251 0.094622 8.76293 0 9.07075 0C9.37858 0 9.679 0.094622 9.93148 0.271099C10.184 0.447576 10.3763 0.697414 10.4827 0.986905L12.2896 5.87566L17.168 7.67509C17.4582 7.78096 17.7084 7.97449 17.8841 8.22895C18.0598 8.48341 18.1524 8.78626 18.149 9.09569Z"
              fill="#FCD845"
            />
          </svg>
        </Box>

        <Typography
          sx={{
            fontSize: { md: '18px', lg: '22px' },
            fontWeight: 600,
            color: theme.palette.primary.main,
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: { md: '14px', lg: '16px' },
            color: theme.palette.text.secondary,
            lineHeight: 1.4,
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 400,
          }}
        >
          {description?.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Typography>

        <Button
          onClick={handleAccept}
          aria-label="Accept cookie usage"
          sx={{
            display: 'block',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            border: 'none',
            borderRadius: theme.spacing(3),
            padding: theme.spacing(1.75, 0),
            fontSize: { md: '16px', lg: '18px' },
            fontWeight: 400,
            fontFamily: 'Outfit, sans-serif',
            textTransform: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {acceptLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default CookieCard;
