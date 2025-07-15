import React from "react";
import {
  Modal,
  Box,
  Typography,
  Card,
  IconButton,
  useTheme,
} from "@mui/material";
import Button from "../../../component/atom/button/Button";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
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
    return index%2===0 ? "#F6EBFF" : "#FFE8D2";
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
          pt:"30px",
          pb: "44px",
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
          <IconButton onClick={onClose} sx={{p:0}}>
            <CancelOutlinedIcon sx={{width:'27px',height:'27px',fill: '#1E1E1E'}}/>
          </IconButton>
        </Box>

   
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
      
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent:'space-between', alignItems:'center', width:'100%' }}>
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
                          
                        }}
                      >
                        Amount
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "400", fontSize: "20px" }}
                      >
                        {fee.amount}
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
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default FeeSelectionModal;
