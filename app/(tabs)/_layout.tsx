import { Tabs } from "expo-router";
import { Home, Gift, Newspaper, PieChart, TrendingUp } from "lucide-react-native";
import React from "react";
import { Dimensions, Platform } from "react-native";
import Colors from "@/constants/colors";

export default function TabLayout() {
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.orange,
        tabBarInactiveTintColor: '#CCCCCC',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary.blue,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: isDesktop ? 8 : 6,
          paddingTop: isDesktop ? 8 : 6,
          paddingHorizontal: isDesktop ? 32 : 0,
          height: isDesktop ? 70 : 78,
          maxWidth: isDesktop ? 1200 : undefined,
          alignSelf: isDesktop ? 'center' : undefined,
          width: isDesktop ? '100%' : undefined,
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
          maxWidth: isDesktop ? 200 : undefined,
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
  );
}