// LoginModal.tsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CoreTheme, useCoreTheme } from "../../../theme/core-theme";

interface LoginModalProps {
  logo?: string;
  logoAlt?: string;
  logoHeight?: number;
  logoWidth?: number;
  subtitle?: string;
  onGoogleLoginClick?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  logo = "https://www.edtechreview.in/wp-content/uploads/vedam-sot-aims-to-transform-computer-science-education-909x487.webp",
  logoAlt = "School Logo",
  logoHeight = 118,
  logoWidth = 208,
  subtitle = "Login",
  onGoogleLoginClick,
}) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        borderRadius: "40px",
        maxWidth: 400,
        margin: "auto",
        background: "linear-gradient(to bottom, #FF7829, #8A18FF)",
      }}
    >
      <Box
        sx={{
          py:theme.spacing(7),
          px:theme.spacing(6),
          textAlign: "center",
          borderRadius: "36px",
          backgroundColor: "white",
        }}
      >
        {logo && (
          <Box mb={2} sx={{ display: "flex", justifyContent: "flex-start" }}>
            <img
              src={logo}
              alt={logoAlt}
              style={{
                height: `${logoHeight}px`,
                width: `${logoWidth}px`,
              }}
            />
          </Box>
        )}

        <Typography
          sx={{
            color: "#000",
            fontFamily: "Outfit",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "36px",
            letterSpacing: "-0.64px",
            textAlign: "left",
          }}
        >
          {subtitle}
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            position: "relative", 
            justifyContent: "center",
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "Outfit",
            fontSize: "22px",
            paddingLeft: "40px", 
            py:theme.spacing(4),
            px:theme.spacing(2),
            marginTop:'24px',
            color:'#E11C1C;',
            borderRadius:'16px' 
          }}
        >
       
          <img
            src="https://image.similarpng.com/file/similarpng/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
            alt="Google"
            width={24}
            height={24}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              
            }}
          />
          Sign in with Google
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginModal;
