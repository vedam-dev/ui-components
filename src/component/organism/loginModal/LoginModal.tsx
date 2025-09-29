import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

interface LoginModalProps {
  logo?: string;
  logoAlt?: string;
  logoHeight?: number;
  logoWidth?: number;
  subtitle?: string;
  onGoogleLoginClick?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  logo = 'https://images.ctfassets.net/wrc4czfp4sk8/4LUdrH0t4U1C85faXgaj8O/3a268801a825ddb4652e1a33d91df655/a19c08cf0281aa052e17edc302ef904b1c753e86.png',
  logoAlt = 'School Logo',
  logoHeight = 117,
  logoWidth = 208,
  subtitle = 'Login with your registered email id with Vedam ',
  onGoogleLoginClick,
}) => {
  const theme = useCoreTheme() as CoreTheme;

  return (
    <Paper
      elevation={3}
      sx={{
        p: theme.spacing(1),
        borderRadius: theme.spacing(10),
        maxWidth: '550px',
        mx: 'auto',
        background: 'linear-gradient(to bottom, #FF7829, #8A18FF)',
      }}
    >
      <Box
        sx={{
          py: theme.spacing(8),
          px: theme.spacing(7),
          textAlign: 'center',
          borderRadius: theme.spacing(9),
          backgroundColor: 'white',
        }}
      >
        {logo && (
          <Box mb={1} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <img
              src={logo}
              alt={logoAlt}
              height={logoHeight}
              width={logoWidth}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        )}

        <Typography
          sx={{
            color: 'gray',
            fontFamily: 'Outfit, system-ui',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '16px',
            letterSpacing: '-0.64px',
            textAlign: 'left',
            pl: theme.spacing(3),
          }}
        >
          {subtitle}
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          onClick={onGoogleLoginClick}
          sx={{
            mt: theme.spacing(8),
            py: theme.spacing(2),
            px: theme.spacing(3),
            fontSize: '24px',
            fontWeight: 600,
            fontFamily: 'Outfit, system-ui',
            color: '#E11C1C',
            border: '1px solid #C5C5C5',
            borderRadius: theme.spacing(4),
            textTransform: 'none',
            justifyContent: 'left',
            display: 'flex',
            textWrap: 'nowrap',
            gap: theme.spacing(11),
            mb: theme.spacing(3),
          }}
        >
          <Box
            component="img"
            src="https://images.ctfassets.net/wrc4czfp4sk8/MlLQWcd5d2243FkvhCHsg/b35a214792ec2c7836fffb81e7e237ab/ce354349ec958587fa057b673078953452f344e9.png"
            alt="Google"
            sx={{
              width: 76,
              height: 72,
            }}
          />
          <Box sx={{ textAlign: 'left', mr: theme.spacing(32) }}>Continue with Google</Box>
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginModal;
