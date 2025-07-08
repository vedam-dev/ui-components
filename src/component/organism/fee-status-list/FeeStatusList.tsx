import React, { ComponentProps } from 'react';
import { Box, Typography } from '@mui/material';
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

export interface IFeeStatusListProps {
    status: FeeStatus;
    feeItems: FeeItem[];
    onPayNow?: () => void;
}

export type FeeStatusListProps = ComponentProps<typeof Box> & IFeeStatusListProps;

const statusIcons = {
    [FeeStatus.OVERDUE]: '⚠️',
    [FeeStatus.DUE]: '⏳',
    [FeeStatus.PAID]: '✅',
};

const FeeStatusList: React.FC<FeeStatusListProps> = ({
    status,
    feeItems,
    onPayNow,
    ...props
}) => {
    const theme = useCoreTheme();

    // Define status colors using theme
    const getStatusColor = (status: FeeStatus) => {
        switch (status) {
            case FeeStatus.OVERDUE:
                return theme.palette.error.main;
            case FeeStatus.DUE:
                return theme.palette.warning.main;
            case FeeStatus.PAID:
                return theme.palette.success.main;
            default:
                return theme.palette.text.primary;
        }
    };

    // Extract semester info
    const semesterItem = feeItems.find(item => item.label.toLowerCase() === 'semester');
    const otherItems = feeItems.filter(item => item.label.toLowerCase() !== 'semester');

    // Split other items into two groups for the two parts
    const firstPartItems = otherItems.slice(0, 2);
    const secondPartItems = otherItems.slice(2, 4);

    const statusColor = getStatusColor(status);

    return (
        <Box
            {...props}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(180deg, #EDDBFF 0%, #FFE6CE 100%)',
                borderRadius: '36px',
                padding: theme.spacing(5, 10),
                marginBottom: theme.spacing(2),
                width: '100%',
                maxWidth: '1200px',
                border: '1px solid #7B2CBF',
                boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.10)',
                position: 'relative',
                ...props.sx,
            }}
        >
            {/* Status Badge - Positioned on top border */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    left: theme.spacing(10),
                    backgroundColor: theme.palette.common.white,
                    color: statusColor,
                    padding: theme.spacing(0.5, 1.5),
                    borderRadius: theme.spacing(3),
                    border: `1px solid ${statusColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'100px',
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
                        width: 69,
                        height: 69,
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

            {/* Middle Section - Container with 2 parts, each having 2 boxes */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    gap: theme.spacing(4),
                }}
            >
                {/* First Part - First 2 boxes */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1,
                        gap: theme.spacing(3),
                    }}
                >
                    {firstPartItems.map((item, index) => (
                        <Box
                            key={`first-${item.label}-${index}`}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                textAlign: 'left',
                                minHeight: '60px',
                                minWidth: '100px',
                                flex: 1,
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

                {/* Second Part - Last 2 boxes */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1,
                        gap: theme.spacing(3),
                    }}
                >
                    {secondPartItems.map((item, index) => (
                        <Box
                            key={`second-${item.label}-${index}`}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                textAlign: 'left',
                                minHeight: '60px',
                                minWidth: '100px',
                                flex: 1,
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
                    }}
                >
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
                </Box>
            </Box>
        </Box>
    );
};

export default FeeStatusList;