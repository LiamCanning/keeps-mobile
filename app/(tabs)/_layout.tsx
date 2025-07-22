import { Tabs } from "expo-router";
import { Home, Gift, Newspaper, PieChart, TrendingUp } from "lucide-react-native";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;
  
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary.orange,
          tabBarInactiveTintColor: '#CCCCCC',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.primary.blue,
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            paddingBottom: isDesktop ? 12 : 6,
            paddingTop: isDesktop ? 12 : 6,
            paddingHorizontal: isDesktop ? 0 : 0,
            height: isDesktop ? 80 : 78,
            position: 'absolute',
            bottom: 0,
            left: isDesktop ? '50%' : 0,
            right: isDesktop ? undefined : 0,
            width: isDesktop ? Math.min(1200, width * 0.9) : '100%',
            transform: isDesktop ? [{ translateX: -Math.min(1200, width * 0.9) / 2 }] : undefined,
            borderRadius: isDesktop ? 16 : 0,
            marginBottom: isDesktop ? 20 : 0,
            marginHorizontal: isDesktop ? 'auto' : 0,
            shadowColor: isDesktop ? '#000' : 'transparent',
            shadowOffset: isDesktop ? { width: 0, height: 4 } : { width: 0, height: 0 },
            shadowOpacity: isDesktop ? 0.15 : 0,
            shadowRadius: isDesktop ? 8 : 0,
            elevation: isDesktop ? 5 : 0,
          },
          tabBarLabelStyle: {
            fontSize: isDesktop ? 14 : 12,
            fontWeight: '600',
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: isDesktop ? 8 : 0,
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={isDesktop ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: "Benefits",
          tabBarIcon: ({ color }) => <Gift color={color} size={isDesktop ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="content"
        options={{
          title: "Content",
          tabBarIcon: ({ color }) => <Newspaper color={color} size={isDesktop ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color }) => <PieChart color={color} size={isDesktop ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Trade",
          tabBarIcon: ({ color }) => <TrendingUp color={color} size={isDesktop ? 24 : 22} />,
        }}
      />
    </Tabs>
    </View>
  );
}