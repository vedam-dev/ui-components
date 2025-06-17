export const handleSkipTo = (event) => {
    event.preventDefault();
    const mainContent = document.getElementsByTagName('main')[0];
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.style.setProperty('border', 'none');
        mainContent.style.setProperty('outline', 'none');
        mainContent.focus();
    }
};
