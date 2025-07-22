import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start(() => {
      onComplete();
    });
  }, []);

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const sparkleRotation = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B1426', '#1E3A8A', '#3B82F6', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {Platform.OS !== 'web' && (
          <BlurView intensity={20} style={styles.blur} />
        )}
        
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Animated.View
              style={[
                styles.sparkle,
                {
                  opacity: sparkleOpacity,
                  transform: [{ rotate: sparkleRotation }],
                },
              ]}
            >
              <Text style={styles.sparkleText}>✨</Text>
            </Animated.View>
            
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#FFD700', '#FFA500', '#FF6B35']}
                style={styles.logoGradient}
              >
                <Text style={styles.logoText}>⚡</Text>
              </LinearGradient>
            </View>
            
            <Animated.View
              style={[
                styles.sparkle,
                styles.sparkle2,
                {
                  opacity: sparkleOpacity,
                  transform: [{ rotate: sparkleRotation }],
                },
              ]}
            >
              <Text style={styles.sparkleText}>✨</Text>
            </Animated.View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Are you ready to</Text>
            <Text style={styles.highlightText}>invest in sports?</Text>
            <Text style={styles.subText}>Come on in...</Text>
          </View>

          <View style={styles.decorativeElements}>
            {[...Array(6)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.floatingDot,
                  {
                    left: `${15 + i * 12}%`,
                    top: `${20 + (i % 2) * 60}%`,
                    opacity: sparkleOpacity,
                    transform: [
                      {
                        translateY: sparkleAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10 + (i % 3) * 5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    textAlign: 'center',
  },
  sparkle: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  sparkle2: {
    top: 80,
    left: -20,
    right: 'auto' as any,
  },
  sparkleText: {
    fontSize: 24,
    color: '#FFD700',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainText: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  highlightText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#E2E8F0',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  floatingDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#60A5FA',
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});