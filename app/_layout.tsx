import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import BackButton from "@/components/BackButton";
import Colors from "@/constants/colors";
import IntroScreen from "@/components/IntroScreen";
import { AppStateProvider, useAppState } from "@/contexts/AppStateContext";
import { getDesktopContainerStyles, getResponsiveStyles } from "@/constants/responsive";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { isFirstLaunch, isLoading, markAsLaunched } = useAppState();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!isLoading && isFirstLaunch) {
      setShowIntro(true);
    }
  }, [isLoading, isFirstLaunch]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    markAsLaunched();
  };

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: Colors.primary.blue }} />;
  }

  return (
    <View style={[{ flex: 1 }, getDesktopContainerStyles()]}>
      <View style={[{ flex: 1 }, getResponsiveStyles()]}>
        <Stack 
          screenOptions={{ 
            headerBackTitle: "Back",
            headerLeft: () => <BackButton />,
            headerStyle: { backgroundColor: Colors.primary.blue },
            headerTintColor: Colors.text.white,
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </View>
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </AppStateProvider>
    </QueryClientProvider>
  );
}
