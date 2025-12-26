import React from 'react';
import { Box, Typography, Rating as MuiRating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
  title?: string;
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number | null) => void;
  readOnly?: boolean;
  max?: number;
  backgroundImage?: string;
  sx?: any;
};

const RatingCard: React.FC<Props> = ({
  title = 'Overall Rating',
  value = 4,
  onChange,
  readOnly = true,
  max = 5,
  backgroundImage = 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Container-2.png',
  sx,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 200,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        boxShadow: '0 4px 18px rgba(10,10,10,0.06)',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 3,
        maxWidth: '235px',
        maxHeight: '250px',
        ...sx,

        '& .MuiRating-root': {
          zIndex: 2,
          position: 'relative',
        },
        '& .MuiRating-iconFilled': {
          color: '#FBBC01',
        },
        '& .MuiRating-iconHover': {
          color: '#FBBC01',
        },
        '& .MuiRating-iconEmpty': {
          color: '#e5e7eb',
        },
      }}
      aria-label={title}
    >
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Typography
          sx={{
            fontWeight: 500,
            color: (t) => (t.palette.mode === 'light' ? '#111' : '#fff'),
            zIndex: 2,
            position: 'relative',
            textAlign: 'center',
            fontSize: '20px',
            mt: 1,
          }}
        >
          {title}
        </Typography>

        <MuiRating
          name="rating-card"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          max={max}
          precision={1}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          sx={{
            fontSize: 36,
            mt: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default RatingCard;
