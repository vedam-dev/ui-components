import React, { ComponentProps } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
export type StatusType = 'success' | 'failure' | 'pending';

export interface IFeeStatusModalProps {
  open: boolean;
  onClose: () => void;
  status: StatusType;
  infoText: string;
  customDownloadButton?: React.ReactNode;
}

export type FeeStatusModalProps = ComponentProps<typeof Modal> & IFeeStatusModalProps;

const statusIconMap: Record<StatusType, string> = {
  success:
    'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/certificate/Group%201261155609-2.jpg',
  failure: 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155609-3.jpg',
  pending: 'https://acjlsquedaotbhbxmtee.supabase.co/storage/v1/object/public/vedam-website-assets/images/videoInfo/Group%201261155609-3.jpg',
};
 
const FeeStatusModal: React.FC<FeeStatusModalProps> = ({
  open,
  onClose,
  status,
  infoText,
  customDownloadButton,
  ...props
}) => {
  const theme = useCoreTheme() as CoreTheme;
  return (
    <Modal open={open} onClose={onClose} {...props} BackdropProps={{
    sx: {
      backgroundColor: 'transparent',
    },
  }}>
      <Box
        sx={{
          display:'flex',
          mx:'auto',
          height:'100vh',
          width: '100%',
          bgcolor: 'transparent',
          outline: 'none',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        {/* Modal Content Box */}
        <Box
          sx={{
            position:'relative',
            p: 5,
            pt: 6,
            pb:8,
            borderRadius: '36px',
            background: 'linear-gradient(180deg, #FFA26B 0%, #8C2BE0 100%)',
            textAlign: 'center',
            width:'100%',
            maxWidth:theme.spacing(108)
          }}
        >
          {/* Status Icon */}
          <Box
            component="img"
            src={statusIconMap[status]}
            alt={`${status} icon`}
            sx={{
              width: 64,
              height: 64,
              position: 'absolute',
              top: -32,
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              backgroundColor: 'white',
              padding: 1,
              boxShadow: 2,
            }}
          />

          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 15,
              right: 15,
              color: '#fff',
              border: '1px solid white',
              borderRadius: '50%',
              height: '27px',
              width: '27px',
            }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton>

          {/* Info Text */}
          <Typography  sx={{ color: '#fff', mt: 6,fontSize:theme.spacing(5),maxWidth:theme.spacing(80), textAlign:'center',mx:'auto' }}>
            {infoText}
          </Typography>

          {/* Optional Custom Button */}
              {customDownloadButton}
              
        </Box>
      </Box>
    </Modal>
  );
};

export default FeeStatusModal;
