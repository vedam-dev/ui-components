import { jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../atom/card';
const VerticalBaseCard = ({ cardHeader, cardMedia, cardContent, cardActions, cardOnClick, ...props }) => {
    return (_jsxs(Card, { ...props, onClick: cardOnClick, style: {
            cursor: cardOnClick ? 'pointer' : undefined
        }, children: [cardHeader, cardMedia, cardContent, cardActions] }));
};
export default VerticalBaseCard;
