import { Tabs } from "expo-router";
import { Home, Gift, Newspaper, PieChart, TrendingUp } from "lucide-react-native";
import React from "react";
import Colors from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.orange,
        tabBarInactiveTintColor: '#CCCCCC',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary.blue,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 0,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
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
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: "Benefits",
          tabBarIcon: ({ color }) => <Gift color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="content"
        options={{
          title: "Content",
          tabBarIcon: ({ color }) => <Newspaper color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color }) => <PieChart color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Trade",
          tabBarIcon: ({ color }) => <TrendingUp color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}