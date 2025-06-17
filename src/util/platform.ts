export const getIsWindows = (): boolean =>
  navigator?.userAgent?.includes?.('Windows') || navigator?.platform?.includes?.('Win');
