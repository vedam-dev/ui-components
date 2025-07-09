import React from "react";
import {
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from "@mui/material";
import Button from "../../../component/atom/button/Button";

export interface FeeItem {
  id: string;
  description: string;
  amount: string;
  bgColor?: string; 
}

interface FeeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  feeItems: FeeItem[];
  onPayNow: (feeId: string) => void;
  title: string;
}

const FeeSelectionModal: React.FC<FeeSelectionModalProps> = ({
  open,
  onClose,
  feeItems,
  onPayNow,
  title = "Select Fees to Pay"
}) => {
  const theme = useTheme();

  const getItemBackgroundColor = (index: number, bgColor?: string) => {
    if (bgColor) return bgColor;
    return index === 0 ? "#F6EBFF" : index === 1 ? "#FFE8D2" : "#FFFFFF";
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="fee-selection-modal"
      aria-describedby="select-fees-to-pay"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "775px" },
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "40px",
          px: "33px",
          py: "44px",
          outline: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none", 
          scrollbarWidth: "none", 
        }}
      >
    
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1E1E1E",
              fontFamily: "Outfit",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "normal",
            }}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
            >
              <path
                d="M18.3886 10.0809L14.9681 13.5L18.3886 16.9191C18.485 17.0156 18.5616 17.1302 18.6138 17.2562C18.666 17.3823 18.6929 17.5174 18.6929 17.6538C18.6929 17.7903 18.666 17.9254 18.6138 18.0515C18.5616 18.1775 18.485 18.2921 18.3886 18.3886C18.2921 18.485 18.1775 18.5616 18.0515 18.6138C17.9254 18.666 17.7903 18.6929 17.6538 18.6929C17.5174 18.6929 17.3823 18.666 17.2562 18.6138C17.1302 18.5616 17.0156 18.485 16.9191 18.3886L13.5 14.9681L10.0809 18.3886C9.98439 18.485 9.86984 18.5616 9.74378 18.6138C9.61772 18.666 9.48261 18.6929 9.34616 18.6929C9.20971 18.6929 9.0746 18.666 8.94853 18.6138C8.82247 18.5616 8.70793 18.485 8.61145 18.3886C8.51496 18.2921 8.43843 18.1775 8.38621 18.0515C8.33399 17.9254 8.30712 17.7903 8.30712 17.6538C8.30712 17.5174 8.33399 17.3823 8.38621 17.2562C8.43843 17.1302 8.51496 17.0156 8.61145 16.9191L12.0319 13.5L8.61145 10.0809C8.41659 9.88601 8.30712 9.62172 8.30712 9.34615C8.30712 9.07058 8.41659 8.8063 8.61145 8.61144C8.8063 8.41658 9.07059 8.30711 9.34616 8.30711C9.62173 8.30711 9.88601 8.41658 10.0809 8.61144L13.5 12.0319L16.9191 8.61144C17.0156 8.51496 17.1302 8.43842 17.2562 8.3862C17.3823 8.33399 17.5174 8.30711 17.6538 8.30711C17.7903 8.30711 17.9254 8.33399 18.0515 8.3862C18.1775 8.43842 18.2921 8.51496 18.3886 8.61144C18.485 8.70792 18.5616 8.82247 18.6138 8.94853C18.666 9.07459 18.6929 9.2097 18.6929 9.34615C18.6929 9.4826 18.666 9.61771 18.6138 9.74377C18.5616 9.86984 18.485 9.98438 18.3886 10.0809ZM27 13.5C27 16.17 26.2082 18.7801 24.7248 21.0002C23.2414 23.2203 21.133 24.9506 18.6662 25.9724C16.1994 26.9941 13.485 27.2615 10.8663 26.7406C8.24754 26.2197 5.84207 24.9339 3.95406 23.0459C2.06606 21.1579 0.780305 18.7525 0.259405 16.1337C-0.261496 13.515 0.00584928 10.8006 1.02763 8.33377C2.04941 5.86697 3.77974 3.75856 5.99981 2.27516C8.21987 0.791761 10.83 0 13.5 0C17.0793 0.00377976 20.5108 1.42731 23.0418 3.95823C25.5727 6.48915 26.9962 9.92074 27 13.5ZM24.9231 13.5C24.9231 11.2407 24.2531 9.03219 22.9979 7.15368C21.7428 5.27516 19.9587 3.81104 17.8714 2.94645C15.7841 2.08187 13.4873 1.85565 11.2715 2.29641C9.05561 2.73718 7.02022 3.82512 5.42267 5.42266C3.82512 7.02021 2.73718 9.05561 2.29642 11.2715C1.85566 13.4873 2.08187 15.7841 2.94646 17.8714C3.81104 19.9587 5.27517 21.7428 7.15368 22.9979C9.0322 24.2531 11.2407 24.9231 13.5 24.9231C16.5285 24.9196 19.432 23.715 21.5735 21.5735C23.715 19.432 24.9196 16.5285 24.9231 13.5Z"
                fill="#1E1E1E"
              />
            </svg>
          </IconButton>
        </Box>

   
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {feeItems.map((fee, index) => (
            <Card
              key={fee.id}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                border:
                  "1px solid ${getItemBackgroundColor(index, fee.bgColor)}",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                backgroundColor: getItemBackgroundColor(index, fee.bgColor),
                px: 7,
                py: 2.5,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
      
                  <Box sx={{ display: "flex", flexDirection: "row", gap: 16 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "130px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: "400",
                          fontSize: "16px",
                        }}
                      >
                        Description
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "400", fontSize: "20px" }}
                      >
                        {fee.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "130px",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: "400",
                          fontSize: "16px",
                          mt: 1,
                        }}
                      >
                        Amount
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "400", fontSize: "20px" }}
                      >
                        ₹{fee.amount}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => onPayNow(fee.id)}
                      sx={{
                        backgroundColor: "white",
                        color: theme.palette.primary.dark,
                        fontWeight: "bold",
                        px: 20,
                        py: 2,
                        textTransform: "none",
                        border: `1px solid ${theme.palette.primary.main}`,
                        "&:hover": {
                          backgroundColor: "white",
                          border: `1px solid ${theme.palette.primary.main}`,
                          boxShadow: "none",
                        },
                      }}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default FeeSelectionModal;
