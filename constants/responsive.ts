import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const MOBILE_MAX_WIDTH = 430; // iPhone 14 Pro Max width
export const DESKTOP_BREAKPOINT = 768;

export const isDesktop = Platform.OS === 'web' && screenWidth >= DESKTOP_BREAKPOINT;
export const isMobile = !isDesktop;

export const getResponsiveWidth = () => {
  if (isDesktop) {
    return Math.min(MOBILE_MAX_WIDTH, screenWidth);
  }
  return screenWidth;
};

export const getResponsiveStyles = () => {
  if (isDesktop) {
    return {
      maxWidth: MOBILE_MAX_WIDTH,
      alignSelf: 'center' as const,
      marginHorizontal: 'auto' as const,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    };
  }
  return {};
};

export const getDesktopContainerStyles = () => {
  if (isDesktop) {
    return {
      backgroundColor: '#0a0a0a', // Dark background for desktop
      minHeight: screenHeight,
      justifyContent: 'center' as const,
    };
  }
  return {};
};