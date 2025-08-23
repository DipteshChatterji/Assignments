import React, { PropsWithChildren } from 'react';
import { View, SafeAreaView, Platform, StyleProp, ViewStyle } from 'react-native';

interface ResponsiveContainerProps {
  style?: StyleProp<ViewStyle>;
}

const ResponsiveContainer: React.FC<PropsWithChildren<ResponsiveContainerProps>> = ({ children, style }) => {
  const Container = Platform.OS === 'web' ? View : SafeAreaView;
  return <Container style={style}>{children}</Container>;
};

export default ResponsiveContainer;
