import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width, height } = Dimensions.get('window');

// 水滴最终停留位置（屏幕上方1/3处）
const DROP_TARGET_Y = height * 0.28;

export default function IndexScreen() {
  const insets = useSafeAreaInsets();
  const router = useSafeRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropY = useRef(new Animated.Value(-60)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const waterLineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. 页面淡入
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落
    Animated.timing(dropY, {
      toValue: DROP_TARGET_Y,
      duration: 2500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();

    // 3. 水面线淡入
    Animated.timing(waterLineOpacity, {
      toValue: 0.15,
      duration: 800,
      delay: 2400,
      useNativeDriver: true,
    }).start();

    // 4. 涟漪动画
    const rippleTimer = setTimeout(() => {
      // 先显示涟漪
      rippleOpacity.setValue(1);
      rippleScale.setValue(0);
      
      // 涟漪扩散
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 2500);

    // 5. 3.5秒后跳转
    const jumpTimer = setTimeout(() => {
      router.replace('/home');
    }, 3500);

    return () => {
      clearTimeout(rippleTimer);
      clearTimeout(jumpTimer);
    };
  }, []);

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
      {/* 水面线1 */}
      <Animated.View
        style={[
          styles.waterLine,
          {
            top: DROP_TARGET_Y + 30,
            opacity: waterLineOpacity,
            backgroundColor: isDark ? '#4B5563' : '#9CA3AF',
          }
        ]}
      />

      {/* 水面线2 */}
      <Animated.View
        style={[
          styles.waterLine,
          {
            top: DROP_TARGET_Y + 38,
            opacity: waterLineOpacity,
            backgroundColor: isDark ? '#4B5563' : '#9CA3AF',
          }
        ]}
      />

      {/* 水滴 */}
      <Animated.View
        style={[
          styles.drop,
          {
            transform: [{ translateY: dropY }],
            backgroundColor: isDark ? '#9CA3AF' : '#6B7280',
          },
        ]}
      />

      {/* 涟漪 */}
      <Animated.View
        style={[
          styles.ripple,
          {
            opacity: rippleOpacity,
            transform: [{ scale: rippleScale }],
            top: DROP_TARGET_Y - 5,
            borderColor: isDark ? '#6B7280' : '#D1D5DB',
          },
        ]}
      />

      {/* 标题区域 - 放在屏幕下方 */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 80 }]}>
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
          博观而约取
        </Text>
        <Text 
          style={[
            styles.subtitle,
            { color: isDark ? '#6B7280' : '#9CA3AF' }
          ]}
        >
          厚积而薄发
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
  drop: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    left: width / 2 - 7,
    top: 0,
  },
  ripple: {
    position: 'absolute',
    width: 80,
    height: 20,
    left: width / 2 - 40,
    borderWidth: 1.5,
    borderRadius: 40,
    backgroundColor: 'transparent',
  },
  waterLine: {
    position: 'absolute',
    left: width * 0.2,
    right: width * 0.2,
    height: 1.5,
    borderRadius: 1,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 4,
    marginTop: 4,
  },
  englishSubtitle: {
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 16,
  },
});
