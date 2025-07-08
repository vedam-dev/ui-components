import { Box, Typography, SxProps, Theme } from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import { Button } from '../../atom/button';

export enum FeeStatus {
    OVERDUE = 'overdue',
    DUE = 'due',
    PAID = 'paid',
}

export interface FeeItem {
    label: string;
    value: string | React.ReactNode;
}

export interface FeeStatusListProps {
    status: FeeStatus;
    feeItems: FeeItem[];
    sx?: SxProps<Theme>;
    onPayNow?: () => void;
}

const statusIcons = {
    [FeeStatus.OVERDUE]: '⚠️',
    [FeeStatus.DUE]: '⏳',
    [FeeStatus.PAID]: '✅',
};

const statusColors = {
    [FeeStatus.OVERDUE]: 'error.main',
    [FeeStatus.DUE]: 'warning.main',
    [FeeStatus.PAID]: 'success.main',
};

const statusBackgrounds = {
    [FeeStatus.OVERDUE]: 'linear-gradient(135deg, #FFE5E5 0%, #F8D7DA 100%)',
    [FeeStatus.DUE]: 'linear-gradient(135deg, #FFF3CD 0%, #FCF4A3 100%)',
    [FeeStatus.PAID]: 'linear-gradient(135deg, #D4EDDA 0%, #C3E6CB 100%)',
};

export const FeeStatusList = ({
    status,
    feeItems,
    sx,
    onPayNow,
    ...rest
}: FeeStatusListProps) => {
    const theme = useCoreTheme();

    // Extract semester info
    const semesterItem = feeItems.find(item => item.label.toLowerCase() === 'semester');
    const otherItems = feeItems.filter(item => item.label.toLowerCase() !== 'semester');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(180deg, #EDDBFF 0%, #FFE6CE 100%)',
                borderRadius: '36px',
                padding: theme.spacing(3, 4),
                marginBottom: theme.spacing(2),
                width: '100%',
                maxWidth: '1200px',
                border: '1px solid #7B2CBF',
                boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.10)',
                position: 'relative',
                ...sx,
            }}
            {...rest}
        >
            {/* Status Badge - Positioned on top border */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    left: theme.spacing(4),
                    backgroundColor: theme.palette.common.white,
                    color: statusColors[status],
                    padding: theme.spacing(0.5, 1.5),
                    borderRadius: theme.spacing(3),
                    border: `1px solid ${statusColors[status]}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(0.5),
                    zIndex: 1,
                }}
            >
                <Box sx={{ fontSize: '0.875rem' }}>{statusIcons[status]}</Box>
                <Typography
                    variant="body2"
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                    }}
                >
                    {status}
                </Typography>
            </Box>

            {/* Left Section - Icon and Semester Info */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(2),
                    minWidth: '250px',
                    marginTop: theme.spacing(1), 
                }}
            >
                <Box
                    sx={{
                        backgroundImage: `url('https://acjlsquedaotbhbxmtee.storage.supabase.co/v1/object/public/vedam-website-assets/images/certificate/Group%201261155605.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        border: `2px solid ${theme.palette.divider}`,
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        minHeight: '60px',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            textTransform: 'capitalize',
                            fontWeight: 500,
                            lineHeight: 1.2,
                        }}
                    >
                        {semesterItem?.label || 'Semester'}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 'bold',
                            marginTop: theme.spacing(0.5),
                            lineHeight: 1.2,
                        }}
                    >
                        {semesterItem?.value || 'Semester 1 Fees'}
                    </Typography>
                </Box>
            </Box>

            {/* Middle Section - Fee Items */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing(6),
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                {otherItems.map((item, index) => (
                    <Box
                        key={`${item.label}-${index}`}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            textAlign: 'left',
                            minHeight: '60px',
                            minWidth: '100px',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                marginBottom: theme.spacing(0.5),
                                lineHeight: 1.2,
                            }}
                        >
                            {item.label}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 'bold',
                                lineHeight: 1.2,
                            }}
                        >
                            {item.value}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Right Section - Pay Button */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: '200px',
                    justifyContent: 'flex-end',
                    minHeight: '60px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '120px',
                    }}
                >
                    {/* Pay Now Button (only for overdue/due) */}
                    {status !== FeeStatus.PAID && (
                        <Button
                            variant="contained"
                            onClick={onPayNow}
                            sx={{
                                minWidth: '120px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                backgroundColor: '#7C3AED',
                                '&:hover': {
                                    backgroundColor: '#6D28D9',
                                },
                            }}
                        >
                            Pay Now
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};