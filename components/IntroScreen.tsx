import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, Image } from 'react-native';
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

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);

    sequence.start(() => {
      onComplete();
    });
  }, []);



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2332', '#2d3748', '#4a5568']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {Platform.OS !== 'web' && (
          <BlurView intensity={10} style={styles.blur} />
        )}
        
        <View style={styles.sportsBackground}>
          <View style={styles.fieldLines} />
          <View style={[styles.fieldLines, styles.fieldLinesHorizontal]} />
        </View>
        
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
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://r2-pub.rork.com/attachments/ymjzoje0xv0oxvbe8l7te' }}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.mainTextContainer}>
              <Text style={styles.mainTextPart1}>Are you ready to</Text>
              <Text style={styles.mainTextPart2}>invest in sports?</Text>
            </View>
            <Text style={styles.subText}>Come on in...</Text>
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
  sportsBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  fieldLines: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#ffffff',
    marginLeft: -0.5,
  },
  fieldLinesHorizontal: {
    left: 0,
    right: 0,
    top: '50%',
    bottom: 'auto',
    width: 'auto',
    height: 1,
    marginLeft: 0,
    marginTop: -0.5,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  logoImage: {
    width: 180,
    height: 180,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  mainTextPart1: {
    fontSize: 32,
    fontWeight: '300',
    color: Colors.text.white,
    textAlign: 'center',
    letterSpacing: 1.2,
    lineHeight: 40,
  },
  mainTextPart2: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FF6B35',
    textAlign: 'center',
    letterSpacing: 1.8,
    lineHeight: 46,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 107, 53, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 12,
    marginTop: 8,
  },
  subText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#E2E8F0',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1,
    opacity: 0.9,
  },
});