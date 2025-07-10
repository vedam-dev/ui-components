import React, { ComponentProps } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

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
  failure: '/icons/failure.png',
  pending: '/icons/pending.png',
};

const FeeStatusModal: React.FC<FeeStatusModalProps> = ({
  open,
  onClose,
  status,
  infoText,
  customDownloadButton,
  ...props
}) => {
  return (
    <Modal open={open} onClose={onClose} {...props}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30%',
          bgcolor: 'transparent',
          outline: 'none',
        }}
      >
        {/* Modal Content Box */}
        <Box
          sx={{
            position: 'relative',
            p: 4,
            pt: 6,
            borderRadius: '36px',
            background: 'linear-gradient(180deg, #FFA26B 0%, #8C2BE0 100%)',
            textAlign: 'center',
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
              backgroundColor: '#fff',
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
          <Typography variant="h6" sx={{ color: '#fff', mt: 6 }}>
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
