import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

const FIRST_LAUNCH_KEY = 'hasLaunchedBefore';

export const [AppStateProvider, useAppState] = createContextHook(() => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      const isFirst = hasLaunched === null;
      setIsFirstLaunch(isFirst);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(false);
      setIsLoading(false);
    }
  };

  const markAsLaunched = async () => {
    try {
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error marking as launched:', error);
    }
  };

  return {
    isFirstLaunch,
    isLoading,
    markAsLaunched,
  };
});