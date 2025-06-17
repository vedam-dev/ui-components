const SxOverride = (overrides, sx) => {
    const sxValue = Array.isArray(sx) ? sx : [sx];
    const sxValueOverride = Array.isArray(overrides)
        ? overrides
        : [overrides];
    return [...sxValue, ...sxValueOverride];
};
export default SxOverride;
