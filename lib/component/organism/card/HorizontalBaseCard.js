import { jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../atom/card';
const HorizontalBaseCard = ({ cardMedia, cardContent, ...props }) => {
    return (_jsxs(Card, { sx: { display: 'flex' }, ...props, children: [cardContent, cardMedia] }));
};
export default HorizontalBaseCard;
