import React from 'react';
import { View, ViewStyle } from 'react-native';
import { getResponsiveStyles, getDesktopContainerStyles } from '@/constants/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  wrapInDesktopContainer?: boolean;
}

export default function ResponsiveContainer({ 
  children, 
  style, 
  wrapInDesktopContainer = false 
}: ResponsiveContainerProps) {
  if (wrapInDesktopContainer) {
    return (
      <View style={[getDesktopContainerStyles(), style]}>
        <View style={getResponsiveStyles()}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[getResponsiveStyles(), style]}>
      {children}
    </View>
  );
}