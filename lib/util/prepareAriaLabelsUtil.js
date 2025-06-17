/**
 * Prepare area-labels for screen readers.
 * @param {string} text - The text to decode.
 * @returns {string} - The decoded text.
 */
export default function prepareAriaLabels(text) {
    if (text) {
        return text.toLowerCase();
    }
    return '';
}
