import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// 保持原生启动屏不自动隐藏
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

// 水滴最终停留位置（屏幕上方40%处）
const DROP_TARGET_Y = height * 0.40;
// 水面位置
const WATER_SURFACE_Y = height * 0.43;

export default function SplashScreenPage() {
  const insets = useSafeAreaInsets();
  
  // 页面淡入
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // 水滴属性
  const dropY = useRef(new Animated.Value(-100)).current;
  const dropOpacity = useRef(new Animated.Value(1)).current;
  const dropScale = useRef(new Animated.Value(1)).current;
  
  // 涟漪1（内圈）
  const ripple1Scale = useRef(new Animated.Value(0)).current;
  const ripple1Opacity = useRef(new Animated.Value(0)).current;
  
  // 涟漪2（中圈）
  const ripple2Scale = useRef(new Animated.Value(0)).current;
  const ripple2Opacity = useRef(new Animated.Value(0)).current;
  
  // 涟漪3（外圈）
  const ripple3Scale = useRef(new Animated.Value(0)).current;
  const ripple3Opacity = useRef(new Animated.Value(0)).current;
  
  // 水面波动
  const waterWave1 = useRef(new Animated.Value(0)).current;
  const waterWave2 = useRef(new Animated.Value(0)).current;
  
  // 主题色
  const textColor = '#000000';
  const mutedColor = '#666666';
  const rippleColor = 'rgba(0, 0, 0, 0.3)';
  const rippleColorLight = 'rgba(0, 0, 0, 0.2)';
  const rippleColorOuter = 'rgba(0, 0, 0, 0.1)';
  const lineColor = '#CCCCCC';
  const backgroundColor = '#FFFFFF';

  useEffect(() => {
    console.log('SplashScreenPage: Component mounted');
    
    // 隐藏原生启动屏
    SplashScreen.hideAsync().then(() => {
      console.log('SplashScreenPage: Native splash hidden');
    });
    
    // 1. 页面淡入
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落
    Animated.timing(dropY, {
      toValue: DROP_TARGET_Y,
      duration: 2000,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: true,
    }).start();

    // 3. 水面波动效果
    const wave1Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(waterWave1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waterWave1, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    wave1Loop.start();

    const wave2Loop = Animated.loop(
      Animated.sequence([
        Animated.timing(waterWave2, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waterWave2, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    wave2Loop.start();

    // 4. 水滴入水效果
    const dropTimer = setTimeout(() => {
      console.log('SplashScreenPage: Drop reached water');
      
      // 水滴消失
      Animated.parallel([
        Animated.timing(dropOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(dropScale, {
          toValue: 1.3,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // 涟漪1（内圈，快速扩散）
      ripple1Opacity.setValue(0.8);
      ripple1Scale.setValue(0.1);
      Animated.parallel([
        Animated.timing(ripple1Scale, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ripple1Opacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // 涟漪2（中圈）
      setTimeout(() => {
        ripple2Opacity.setValue(0.6);
        ripple2Scale.setValue(0.1);
        Animated.parallel([
          Animated.timing(ripple2Scale, {
            toValue: 1.5,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(ripple2Opacity, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 150);

      // 涟漪3（外圈）
      setTimeout(() => {
        ripple3Opacity.setValue(0.4);
        ripple3Scale.setValue(0.1);
        Animated.parallel([
          Animated.timing(ripple3Scale, {
            toValue: 2,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(ripple3Opacity, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }, 300);

    }, 2000);

    // 5. 跳转
    const jumpTimer = setTimeout(() => {
      console.log('SplashScreenPage: Navigating to /home');
      router.replace('/home');
    }, 4000);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(jumpTimer);
      wave1Loop.stop();
      wave2Loop.stop();
    };
  }, []);

  const waveOffset1 = waterWave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  const waveOffset2 = waterWave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  return (
    <View
      style={[
        styles.container,
        { 
          opacity: fadeAnim,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: backgroundColor,
        }
      ]}
    >
      {/* 水面波动线1 */}
      <Animated.View
        style={[
          styles.waterWave,
          {
            top: WATER_SURFACE_Y,
            opacity: 0.15,
            transform: [{ translateX: waveOffset1 }],
          }
        ]}
      />

      {/* 水面波动线2 */}
      <Animated.View
        style={[
          styles.waterWave,
          {
            top: WATER_SURFACE_Y + 8,
            opacity: 0.1,
            transform: [{ translateX: waveOffset2 }],
          }
        ]}
      />

      {/* 涟漪3（外圈） */}
      <Animated.View
        style={[
          styles.ripple3,
          {
            top: WATER_SURFACE_Y - 100,
            opacity: ripple3Opacity,
            transform: [{ scale: ripple3Scale }],
            borderColor: rippleColorOuter,
          }
        ]}
      />

      {/* 涟漪2（中圈） */}
      <Animated.View
        style={[
          styles.ripple2,
          {
            top: WATER_SURFACE_Y - 60,
            opacity: ripple2Opacity,
            transform: [{ scale: ripple2Scale }],
            borderColor: rippleColorLight,
          }
        ]}
      />

      {/* 涟漪1（内圈） */}
      <Animated.View
        style={[
          styles.ripple1,
          {
            top: WATER_SURFACE_Y - 30,
            opacity: ripple1Opacity,
            transform: [{ scale: ripple1Scale }],
            borderColor: rippleColor,
          }
        ]}
      />

      {/* 水滴 */}
      <Animated.View
        style={[
          styles.drop,
          {
            transform: [
              { translateY: dropY },
              { scale: dropScale },
            ],
            opacity: dropOpacity,
            backgroundColor: textColor,
          },
        ]}
      />

      {/* 标题区域 */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 60 }]}>
        <View style={[styles.decorLine, { backgroundColor: lineColor }]} />
        <Text style={[styles.title, { color: textColor }]}>
          每日申论
        </Text>
        <Text style={[styles.subtitle, { color: mutedColor }]}>
          博观而约取 · 厚积而薄发
        </Text>
        <Text style={[styles.englishSubtitle, { color: mutedColor }]}>
          Daily Shenlun
        </Text>
        <View style={[styles.decorLine, { backgroundColor: lineColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  waterWave: {
    position: 'absolute',
    left: width * 0.1,
    right: width * 0.1,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 1,
  },
  drop: {
    position: 'absolute',
    width: 16,
    height: 20,
    borderRadius: 8,
    left: width / 2 - 8,
    top: 0,
  },
  ripple1: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    left: width / 2 - 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  ripple2: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    left: width / 2 - 45,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  ripple3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    left: width / 2 - 60,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 40,
  },
  decorLine: {
    width: 40,
    height: 1,
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 2,
    marginBottom: 8,
  },
  englishSubtitle: {
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 4,
    marginTop: 4,
  },
});
