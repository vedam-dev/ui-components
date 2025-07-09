import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface FeeItem {
  id: string;
  description: string;
  amount: string;
  bgColor?: string; // Optional background color for each item
}

interface FeeSelectionModalProps {
  open: boolean;
  onClose: () => void;
  feeItems: FeeItem[];
  onPayNow: (feeId: string) => void;
}

const FeeSelectionModal: React.FC<FeeSelectionModalProps> = ({
  open,
  onClose,
  feeItems,
  onPayNow,
}) => {
  const theme = useTheme();
  
  // Default colors for first two items if not provided
  const getItemBackgroundColor = (index: number, bgColor?: string) => {
    if (bgColor) return bgColor;
    return index === 0 ? '#F6EBFF' : index === 1 ? '#FFE8D2' : '#FFFFFF';
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '700px' },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: 3,
          outline: 'none',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Select Fees to Pay
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Fee Cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {feeItems.map((fee, index) => (
            <Card
              key={fee.id}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                backgroundColor: getItemBackgroundColor(index, fee.bgColor),
                
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Description and Amount */}
                  <Box sx={{ display:'flex', flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 'bold',
                        }}
                      >
                        Description
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {fee.description}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 'bold',
                        }}
                      >
                        Amount
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        ₹{fee.amount}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Pay Now Button */}
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => onPayNow(fee.id)}
                      sx={{
                        backgroundColor: '#7C3AED',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        px: 3,
                        py: 1.5,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#6D28D9',
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