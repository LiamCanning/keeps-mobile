import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import IntroScreen from '@/components/IntroScreen';
import Colors from '@/constants/colors';

export default function IntroPreview() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Intro Screen Preview',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
        }} 
      />
      
      {showIntro ? (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Intro Screen Completed</Text>
          <Text style={styles.subtitle}>This is what users see after the intro</Text>
          
          <Pressable 
            style={styles.button}
            onPress={() => setShowIntro(true)}
          >
            <Text style={styles.buttonText}>Replay Intro Screen</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.accent.blue,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
});