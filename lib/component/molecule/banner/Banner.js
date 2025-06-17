import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/system';
import { Box } from '../../atom/box';
const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0.5rem'
});
const Banner = ({ imageUrl, label, title, altText, onClick, ...props }) => {
    return (_jsx(Box, { ...props, onClick: onClick, children: _jsx(StyledImage, { src: imageUrl, alt: altText, "aria-label": label, title: title }) }));
};
export default Banner;
