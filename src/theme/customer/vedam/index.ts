  import { createCoreTheme } from '../../core-theme';
  import defaultTheme from '../default';
  import colors from './colors';

  const index = createCoreTheme({
    isStorybook: true,
    vd: {
      useMaterialButtons: false,
      shadows: {
        none: 'none',
        y4: `0px 2px 8px  ${colors.shadowsY4}`,
        y8: `0 8px 16px 0 ${colors.shadowsY8}`,
        y12: `0 12px 24px 0 ${colors.shadowsY12}`,
        y16: `0 16px 32px -4px ${colors.shadowsY16}`
      },
      typography: {
        buttonS: {
          ...defaultTheme.typography.button,
          fontFamily: `Outfit, system-ui`,
          fontSize: `14px`,
          fontWeight: `bold`,
          fontStretch: `normal`,
          fontStyle: `normal`,
          lineHeight: `1.71`,
          letterSpacing: `normal`,
          textTransform: 'none'
        },
        avatar: { fontFamily: `Outfit, system-ui`, fontWeight: 'bold', fontSize: '14pt', lineHeight: '24pt' }
      },
      palette: {
        vedamRed: colors.vedamRed,
        vedamBlue: colors.vedamBlue,
        maintenanceBanner: colors.warningW100,
        errorModalBackground: colors.dangerD100,
        powerball: colors.powerball,
        lottoAmerica: colors.lottoAmerica,
        megaMillions: colors.megaMillions
      }
    },
    spacing: 4,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        //@ts-expect-error - Mobile is not defined in the breakpoints
        mobile: 0,
        tablet: 900,
        web: 1200,
        'web-xl': 1536
      }
    },
    typography: {
      h1: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `60px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `80px`,
        letterSpacing: `normal`
      },
      h2: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `42px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `50px`,
        letterSpacing: `normal`
      },
      h3: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `32px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `44px`,
        letterSpacing: `normal`
      },
      h4: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `24px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `32px`,
        letterSpacing: `normal`
      },
      h5: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `18px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `26px`,
        letterSpacing: `normal`
      },
      h6: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `16px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `24px`,
        letterSpacing: `normal`
      },
      button: {
        ...defaultTheme.typography.button,
        fontFamily: `Nunito Sans, Outfit, system-ui`,
        fontSize: `16px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.5`,
        letterSpacing: `normal`,
        textTransform: 'none',
        padding:'24px'
      },
      subtitle1: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `16px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.5`,
        letterSpacing: `normal`
      },
      subtitle2: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `14px`,
        fontWeight: `bold`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.57`,
        letterSpacing: `normal`
      },
      body1: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `16px`,
        fontWeight: `normal`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.5`,
        letterSpacing: `normal`
      },
      body2: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `14px`,
        fontWeight: `normal`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.57`,
        letterSpacing: `normal`
      },
      caption: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `12px`,
        fontWeight: `normal`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.67`,
        letterSpacing: `normal`
      },
      overline: {
        fontFamily: `Outfit, system-ui`,
        fontSize: `12px`,
        fontWeight: `normal`,
        fontStretch: `normal`,
        fontStyle: `normal`,
        lineHeight: `1.67`,
        letterSpacing: `normal`,
        textTransform: `uppercase`
      }
    },
    palette: {
      mode: 'light',
      primary: {
        main: colors.primaryP600Primary,
        dark: colors.primaryP700,
        50: colors.primaryP800,
        100: colors.primaryP100,
        200: colors.primaryP200,
        300: colors.primaryP300,
        400: colors.primaryP400,
        500: colors.primaryP500,
        600: colors.primaryP600Primary,
        700: colors.primaryP700,
        800: colors.primaryP800,
        900: colors.primaryP800,
        
      },
      
      secondary: {
        main: colors.secondaryS500Secondary,
        dark: colors.secondaryS700,
        50: colors.secondaryS050,
        100: colors.secondaryS100,
        200: colors.secondaryS200,
        300: colors.secondaryS300,
        400: colors.secondaryS400,
        500: colors.secondaryS500Secondary,
        600: colors.secondaryS600,
        700: colors.secondaryS700,
        800: colors.secondaryS800,
        900: colors.secondaryS900
      },
      error: {
        main: colors.dangerD400Danger,
        dark:colors.dangerD300,
        100: colors.dangerD100,
        200: colors.dangerD200,
        300: colors.dangerD300,
        400: colors.dangerD400Danger
      },
      warning: {
        main: colors.warningW400Warning,
        dark:colors.warningW300,
        100: colors.warningW100,
        200: colors.warningW200,
        300: colors.warningW300,
        400: colors.warningW400Warning
      },
      info: {
        main: colors.infoI400Info,
        100: colors.infoI100,
        200: colors.infoI200,
        300: colors.infoI300,
        400: colors.infoI400Info
      },
      success: {
        main: colors.successSc400Success,
        dark: colors.successSc300,
        100: colors.successSc100,
        200: colors.successSc200,
        300: colors.successSc300,
        400: colors.successSc400Success
      },
      text: {
        primary: colors.textColors1TxPrimary,
        secondary: colors.textColors2TxSecondary,
        disabled: colors.textColors3TxDisabled
      },
      common: { white: colors.neutralsNWhite, black: colors.neutralsNBlack },
      grey: {
        50: colors.neutralsNWhite,
        100: colors.neutralsN100,
        200: colors.neutralsN200,
        300: colors.neutralsN300,
        400: colors.neutralsN400,
        500: colors.neutralsN500,
        600: colors.neutralsN600,
        700: colors.neutralsN700,
        800: colors.neutralsN800,
        900: colors.neutralsN900
      }
    },
    components: {
      MuiButton: {
        defaultProps: { disableFocusRipple: true, disableTouchRipple: true, disableRipple: true }
      },
      MuiCard: { defaultProps: { sx: { boxShadow: colors.shadowsY8 } } }
    }
  });
  export default index;
