import { Dimensions, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const getResponsiveDimensions = () => {
  const isSmallDevice = screenWidth < 375;
  const isMediumDevice = screenWidth >= 375 && screenWidth < 414;

  return {
    itemSize: isSmallDevice ? 100 : isMediumDevice ? 120 : 140,
    radius: isSmallDevice ? 200 : isMediumDevice ? 280 : 320,
    controlsBottom: isSmallDevice ? 120 : 140,
    descriptionBottom: isSmallDevice ? 60 : 80,
    centerX: screenWidth / 2,
    centerY: (screenHeight - (StatusBar.currentHeight || 0)) / 2,
  };
};
