import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width, height } = Dimensions.get('window');

// 水滴最终停留位置（屏幕上方30%处，距离水面）
const DROP_TARGET_Y = height * 0.30;
// 水面位置
const WATER_SURFACE_Y = height * 0.33;

export default function IndexScreen() {
  const insets = useSafeAreaInsets();
  const router = useSafeRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // 页面淡入
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // 水滴属性
  const dropY = useRef(new Animated.Value(-80)).current;
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
  
  // 水面波纹
  const waterWave1 = useRef(new Animated.Value(0)).current;
  const waterWave2 = useRef(new Animated.Value(0)).current;
  
  // 水花溅起效果
  const splashOpacity = useRef(new Animated.Value(0)).current;
  const splashScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. 页面淡入
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落（自然重力感）
    Animated.timing(dropY, {
      toValue: WATER_SURFACE_Y - 10,
      duration: 2000,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1), // 加速下落
      useNativeDriver: true,
    }).start();

    // 3. 水面波动效果（持续）
    Animated.loop(
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
    ).start();

    Animated.loop(
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
    ).start();

    // 4. 水滴入水效果（2秒后触发）
    const dropTimer = setTimeout(() => {
      // 水滴消失并溅起
      Animated.parallel([
        Animated.timing(dropOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(dropScale, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // 水花溅起
      Animated.sequence([
        Animated.timing(splashOpacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(splashScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 300,
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

      // 涟漪2（中圈，稍慢）
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

      // 涟漪3（外圈，最慢）
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

    // 5. 3.5秒后跳转
    const jumpTimer = setTimeout(() => {
      router.replace('/home');
    }, 3500);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(jumpTimer);
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
          backgroundColor: isDark ? '#0D1117' : '#F7F8FA',
        }
      ]}
    >
      {/* 水面区域背景 */}
      <View 
        style={[
          styles.waterArea,
          {
            top: WATER_SURFACE_Y - 20,
            backgroundColor: isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)',
          }
        ]}
      />

      {/* 水面波动线1 */}
      <Animated.View
        style={[
          styles.waterWave,
          {
            top: WATER_SURFACE_Y,
            opacity: isDark ? 0.3 : 0.15,
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
            opacity: isDark ? 0.2 : 0.1,
            transform: [{ translateX: waveOffset2 }],
          }
        ]}
      />

      {/* 涟漪3（外圈，最大） */}
      <Animated.View
        style={[
          styles.ripple3,
          {
            top: WATER_SURFACE_Y - 100,
            opacity: ripple3Opacity,
            transform: [{ scale: ripple3Scale }],
            borderColor: isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.2)',
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
            borderColor: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.3)',
          }
        ]}
      />

      {/* 涟漪1（内圈，最亮） */}
      <Animated.View
        style={[
          styles.ripple1,
          {
            top: WATER_SURFACE_Y - 30,
            opacity: ripple1Opacity,
            transform: [{ scale: ripple1Scale }],
            borderColor: isDark ? 'rgba(147, 197, 253, 0.6)' : 'rgba(59, 130, 246, 0.5)',
          }
        ]}
      />

      {/* 水花溅起 */}
      <Animated.View
        style={[
          styles.splash,
          {
            top: WATER_SURFACE_Y - 15,
            opacity: splashOpacity,
            transform: [{ scale: splashScale }],
            backgroundColor: isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(59, 130, 246, 0.2)',
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
            backgroundColor: isDark ? '#93C5FD' : '#3B82F6',
            shadowColor: isDark ? '#60A5FA' : '#2563EB',
          },
        ]}
      />

      {/* 高光效果 */}
      <Animated.View
        style={[
          styles.dropHighlight,
          {
            transform: [
              { translateY: dropY },
            ],
            opacity: dropOpacity,
          }
        ]}
      />

      {/* 标题区域 - 放在屏幕下方 */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 60 }]}>
        {/* 上装饰线 */}
        <View 
          style={[
            styles.decorLine,
            { backgroundColor: isDark ? '#374151' : '#E5E7EB' }
          ]}
        />

        {/* 标题 */}
        <Text 
          style={[
            styles.title,
            { color: isDark ? '#F9FAFB' : '#111827' }
          ]}
        >
          每日申论
        </Text>

        {/* 禅意诗句 */}
        <Text 
          style={[
            styles.subtitle,
            { color: isDark ? '#6B7280' : '#9CA3AF' }
          ]}
        >
          博观而约取 · 厚积而薄发
        </Text>

        {/* 英文副标题 */}
        <Text 
          style={[
            styles.englishSubtitle,
            { color: isDark ? '#4B5563' : '#D1D5DB' }
          ]}
        >
          Daily Shenlun
        </Text>

        {/* 下装饰线 */}
        <View 
          style={[
            styles.decorLine,
            { backgroundColor: isDark ? '#374151' : '#E5E7EB' }
          ]}
        />
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
  waterArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  waterWave: {
    position: 'absolute',
    left: width * 0.1,
    right: width * 0.1,
    height: 2,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 1,
  },
  drop: {
    position: 'absolute',
    width: 16,
    height: 20,
    borderRadius: 8,
    left: width / 2 - 8,
    top: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dropHighlight: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    left: width / 2 - 4,
    top: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    width: 100,
    height: 100,
    borderRadius: 50,
    left: width / 2 - 50,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  ripple3: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    left: width / 2 - 80,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  splash: {
    position: 'absolute',
    width: 30,
    height: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    left: width / 2 - 15,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 20,
  },
  decorLine: {
    width: 40,
    height: 1,
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 10,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    letterSpacing: 3,
    marginTop: 4,
  },
  englishSubtitle: {
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 12,
  },
});
