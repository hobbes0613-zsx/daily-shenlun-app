import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width, height } = Dimensions.get('window');

export default function IndexScreen() {
  const insets = useSafeAreaInsets();
  const router = useSafeRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // 使用useRef确保动画值在渲染之间保持稳定
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropY = useRef(new Animated.Value(-100)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落动画
    Animated.timing(dropY, {
      toValue: height * 0.55,
      duration: 2000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();

    // 3. 涟漪动画序列
    const rippleAnim = Animated.sequence([
      Animated.delay(2000),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]);
    rippleAnim.start();

    // 4. 3.5秒后跳转到首页
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 涟漪样式
  const rippleStyle = {
    transform: [
      {
        scaleY: rippleScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.3],
        }),
      },
      {
        scaleX: rippleScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: rippleOpacity,
  };

  return (
    <View
      style={[
        styles.container,
        { 
          opacity: fadeAnim,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: isDark ? '#111827' : '#F9FAFB',
        }
      ]}
    >
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
          rippleStyle,
          {
            borderColor: isDark ? 'rgba(156, 163, 175, 0.4)' : 'rgba(107, 114, 128, 0.4)',
            backgroundColor: isDark ? 'rgba(156, 163, 175, 0.05)' : 'rgba(107, 114, 128, 0.05)',
          },
        ]}
      />

      {/* 内容 */}
      <View style={styles.content}>
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
            { color: isDark ? '#9CA3AF' : '#6B7280' }
          ]}
        >
          博观而约取
        </Text>
        <Text 
          style={[
            styles.subtitle,
            { color: isDark ? '#9CA3AF' : '#6B7280', marginTop: 4 }
          ]}
        >
          厚积而薄发
        </Text>

        {/* 英文副标题 */}
        <Text 
          style={[
            styles.englishSubtitle,
            { color: isDark ? '#6B7280' : '#9CA3AF', marginTop: 48 }
          ]}
        >
          Daily Shenlun
        </Text>
      </View>

      {/* 底部装饰线 */}
      <View style={styles.footer}>
        <View 
          style={[
            styles.footerLine,
            { backgroundColor: isDark ? '#F9FAFB' : '#111827' }
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  drop: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    left: width / 2 - 8,
    top: -100,
  },
  ripple: {
    position: 'absolute',
    width: 100,
    height: 50,
    left: width / 2 - 50,
    top: height * 0.55 - 25,
    borderWidth: 2,
    borderRadius: 100,
  },
  content: {
    alignItems: 'center',
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
  },
  englishSubtitle: {
    fontSize: 11,
    letterSpacing: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  footerLine: {
    width: 80,
    height: 2,
    opacity: 0.2,
  },
});
