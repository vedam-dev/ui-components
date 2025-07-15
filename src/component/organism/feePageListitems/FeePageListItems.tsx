import React from "react";
import { Box, Typography } from "@mui/material";
import Chip from "../../atom/chip/Chip";
import Button from "../../atom/button/Button";
export interface FeeListItemRowProps {
  title: string;
  value: string;
}

export const FeeListItemRow: React.FC<FeeListItemRowProps> = ({
  title,
  value,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flex: 1,
      px: 1,
    }}
  >
    <Typography
      variant="caption"
      color="textSecondary"
      sx={{ color: "#5D5C5C", fontSize: "14px", fontWeight: "500px" }}
    >
      {title}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "16px", fontWeight: "400px" }}>
      {value}
    </Typography>
  </Box>
);

interface FeeListItemStatusProps {
  status: "Success" | "Pending" | "Failed";
}

export const FeeListItemStatus: React.FC<FeeListItemStatusProps> = ({
  status,
}) => {
  const chipVariant =
    status === "Success"
      ? "success"
      : status === "Pending"
        ? "warning"
        : "error";  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flex: 1,
        // px: 1,
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ color: "#5D5C5C", fontSize: "14px", fontWeight: "500px" }}
      >
        Status
      </Typography>
      <Chip
        variant={chipVariant}
        label={status}
        sx={{
          padding: 0,
          height: "auto",
          minHeight: "auto",
          "& .MuiChip-label": {
            padding: 0,
            lineHeight: 1.5,
          },
        }}
      />
    </Box>
  );
};

interface FeeListItemButtonProps {
  onClick: () => void;
}

export const FeeListItemButton: React.FC<FeeListItemButtonProps> = ({
  onClick,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        padding: "4px 10px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        borderRadius: "100px",
        border: "1px solid #87B3FA",
        textTransform: "none",
        fontWeight: 500,
        color: "#30353cff",
        "&:hover": {
          border: "1px solid #5D9BFB",
          backgroundColor: "rgba(135, 179, 250, 0.04)",
        },
      }}
    >
      View Receipt
    </Button>
  </Box>
);

interface FeeListItemProps {
  bgColor?: string;
  children: React.ReactNode;
}

const FeeListItem: React.FC<FeeListItemProps> = ({ bgColor, children }) => {
  return (
    <Box
      sx={{
        borderRadius: "24px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        backgroundColor: "background.paper",
        mb: 2,
        width: "100%",
        px: 9,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          py: 4,
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FeeListItem;
