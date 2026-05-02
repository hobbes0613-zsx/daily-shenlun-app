import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width, height } = Dimensions.get('window');
// 水面位置（屏幕高度的55%位置）
const WATER_LEVEL = height * 0.55;

export default function SplashScreen() {
  const router = useSafeRouter();
  
  // 淡入动画
  const fadeAnim = new Animated.Value(0);
  
  // 水滴下落动画 - 从顶部下落到水面位置
  const dropY = new Animated.Value(-50);
  
  // 水滴大小动画 - 下落时变小（透视效果）
  const dropScale = new Animated.Value(1);
  
  // 涟漪动画 - 从中心向外扩散
  const rippleScale = new Animated.Value(0);
  const rippleOpacity = new Animated.Value(0);

  useEffect(() => {
    console.log('SplashScreen: 开始动画');

    // 1. 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落动画（更慢，更自然）
    Animated.timing(dropY, {
      toValue: WATER_LEVEL,
      duration: 2500,
      easing: Easing.bezier(0.3, 0, 0.8, 0.7),
      useNativeDriver: true,
    }).start();

    // 3. 水滴逐渐变小（模拟透视）
    Animated.timing(dropScale, {
      toValue: 0.6,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // 4. 涟漪动画序列
    const rippleSequence = Animated.sequence([
      // 延迟到水滴到达水面
      Animated.delay(2500),
      // 涟漪淡入
      Animated.timing(rippleOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      // 涟漪扩散 + 淡出
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);
    rippleSequence.start();

    // 5. 3.5秒后跳转到首页
    const timer = setTimeout(() => {
      console.log('SplashScreen: 跳转到首页');
      router.replace('/home');
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 涟漪样式
  const rippleStyle = {
    transform: [{ scale: rippleScale }],
    opacity: rippleOpacity,
  };

  return (
    <Screen>
      <Animated.View
        style={[styles.container, { opacity: fadeAnim }]}
      >
        {/* 调试信息 - 开发时可见 */}
        <View style={styles.debugBadge}>
          <Text style={styles.debugText}>启动页</Text>
        </View>
        
        {/* 内容 */}
        <View style={styles.content}>
          {/* 标题 */}
          <Text style={styles.title}>每日申论</Text>

          {/* 禅意诗句 */}
          <Text style={styles.subtitle}>博观而约取</Text>
          <Text style={styles.subtitle}>厚积而薄发</Text>

          {/* 副标题 */}
          <Text style={styles.english}>Daily Shenlun</Text>
        </View>

        {/* 水面位置标记 */}
        <View style={[styles.waterLine, { top: WATER_LEVEL }]} />

        {/* 水滴 */}
        <Animated.View
          style={[
            styles.drop,
            {
              transform: [
                { translateY: dropY },
                { scale: dropScale },
              ],
            },
          ]}
        />

        {/* 涟漪 */}
        <Animated.View
          style={[
            styles.ripple,
            rippleStyle,
            { top: WATER_LEVEL - 30 },
          ]}
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // 浅灰背景
    justifyContent: 'center',
    alignItems: 'center',
  },
  debugBadge: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  debugText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    marginTop: -80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    letterSpacing: 2,
  },
  english: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 48,
  },
  waterLine: {
    position: 'absolute',
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
  },
  drop: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4B5563', // 深灰色水滴
    left: width / 2 - 7,
    top: -50,
  },
  ripple: {
    position: 'absolute',
    width: 60,
    height: 30,
    left: width / 2 - 30,
    borderWidth: 2,
    borderColor: 'rgba(75, 85, 99, 0.4)',
    borderRadius: 100,
    backgroundColor: 'rgba(75, 85, 99, 0.05)',
  },
});
