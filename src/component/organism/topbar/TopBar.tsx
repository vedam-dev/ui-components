
import React from "react";
import {
  Box,
  Typography,
  styled,
  Avatar,
  Badge,
  IconButton,
  SxProps,
  Theme,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';

export interface TopBarProps {
  collegeLogo?: string;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  streakCount?: number;
  coinCount?: number;
  notificationCount?: number;
  sx?: SxProps<Theme>;
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  isSidebarExpanded?: boolean;
  hideStatsContainer?: boolean;
  hideHamburger?: boolean;
}

const TopBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 6),
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  boxShadow: theme.shadows[1],
}));


const LeftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const CollegeInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const StudentInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(6),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(6),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#FF7829",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    borderRadius: "50%",
    width: 18,
    height: 18,
    padding: 0,
    top: 0,
    right: 0,
  },
}));

const TopBar: React.FC<TopBarProps> = ({
  collegeLogo,
  studentId,
  studentName,
  studentPhoto,
  streakCount = 0,
  coinCount = 0,
  notificationCount = 0,
  onMenuClick,
  sx,
  onLogoClick,
  onProfileClick,
  isSidebarExpanded = false,
  hideStatsContainer = false,
  hideHamburger = false,

}) => {
    const theme = useCoreTheme() as CoreTheme;
  return (
    <TopBarContainer sx={sx}>

      <LeftContainer>
        {!hideHamburger && (<Paper
          elevation={4}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)",
          }}
        >
          <IconButton
            onClick={onMenuClick}
            sx={{
              color: "#000",
              transition: "transform 0.1s ease",
              transform: isSidebarExpanded ? "rotate(90deg)" : "rotate(0deg)",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
              {isSidebarExpanded
              ? <CloseIcon sx={{ fontSize: 32, width: "24px", height: "20px" }} />
              : <MenuIcon sx={{ fontSize: 32, width: "24px", height: "20px" }} />
            }
          </IconButton>
        </Paper>)}

        <CollegeInfo>
          <IconButton onClick={onLogoClick}>
            {collegeLogo ? (
              <Avatar src={collegeLogo} alt={`college logo`} />
            ) : (
              <img
                src="https://images.ctfassets.net/wrc4czfp4sk8/4LUdrH0t4U1C85faXgaj8O/3a268801a825ddb4652e1a33d91df655/a19c08cf0281aa052e17edc302ef904b1c753e86.png"
                alt="Vedam Logo"
                style={{ width: "161px", height: "90px" }}
              />
            )}
          </IconButton>
        </CollegeInfo>
      </LeftContainer>

    
      <StudentInfo>
        <StatsContainer sx={{ display: hideStatsContainer ? 'none' : 'flex' }}>
          <StatItem>
            <img
              src="https://images.ctfassets.net/wrc4czfp4sk8/4rCsCMy8FIAN8H7YJhigCm/cf6902982ed3d5ba42b11f205c6f4016/Group_1261155655.png"
              alt="streak"
              style={{ width: "20px", height: "26px" }}
            />
            <Typography
              sx={{
                fontSize: "18px",
                color: "#484848",
                fontWeight: 600,
              }}
            >
              {streakCount}
            </Typography>
          </StatItem>

          <StatItem>
            <img
              src="https://images.ctfassets.net/wrc4czfp4sk8/4WLrUumMGx1BNu7AAMZFAD/d355dc956e2fc24afafcc22a1c8c2a87/Group.png"
              alt="coins"
              style={{ width: "24px", height: "20px" }}
            />
            <Typography
              sx={{
                fontSize: "18px",
                color: "#484848",
                fontWeight: 600,
              }}
            >
              {coinCount}
            </Typography>
          </StatItem>

          <StyledBadge badgeContent={notificationCount} max={99}>
            <IconButton sx={{ padding: "4px" }}>
              <img
                src="https://images.ctfassets.net/wrc4czfp4sk8/3myU8tgPpIJSuvFXH929UD/bfdf8a1e7336f2ed585376bb710f4585/notification.png"
                alt="notifications"
                style={{ width: "20px", height: "24px" }}
              />
            </IconButton>
          </StyledBadge>
        </StatsContainer>

        <Box display="flex" alignItems="center"sx={{ gap: theme.spacing(3) }}>
          <IconButton onClick={onProfileClick} sx={{ padding: 0 }}>
            <Avatar
              src={studentPhoto}
              alt={studentName}
              sx={{ width: "48px", height: "48px" }}
            >
              {!studentPhoto && studentName.charAt(0)}
            </Avatar>
          </IconButton>

          <Box display="flex" flexDirection="column">
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#000000",
              }}
            >
              {studentName}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "14px",
                  color: "#A0A0A0",
                }}
              >
                Student Id: {studentId}
              </Typography>
          
            </Box>
          </Box>
        </Box>
      </StudentInfo>
    </TopBarContainer>
  );
};

export default TopBar;
