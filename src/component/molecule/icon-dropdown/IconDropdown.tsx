import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    Box,
    Typography,
} from '@mui/material';
import { useCoreTheme } from '../../../theme/core-theme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IconDropdownProps {
    label: string;
    iconUrl: string;
    options: string[];
    onSelect?: (option: string) => void;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
    label,
    iconUrl,
    options,
    onSelect,
}) => {

    const theme = useCoreTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState<string>(label);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect?.(option);
        handleClose();
    };

    return (
        <>
            <Box
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleOpen(e as any)}
                sx={{
                    display: 'inline-flex',
                    padding: theme.spacing(3, 4),
                    alignItems: 'center',
                    gap: theme.spacing(3),
                    width: '180px',
                    borderRadius: theme.spacing(3),
                    border: '1px solid #E7E7E7',
                    background: '#FFF',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
            >
                <Box
                    component="img"
                    src={iconUrl}
                    alt="dropdown icon"
                    sx={{ width: 20, height: 20 }}
                />
                <Typography
                    fontSize="16px"
                    fontWeight={500}
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    {selected}
                </Typography>
                <ArrowDropDownIcon fontSize="small" />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
                }}
                PaperProps={{
                    sx: {
                        width: '180px'
                    },
                }}
            >

                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => handleSelect(option)}
                        selected={option === selected}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default IconDropdown;
