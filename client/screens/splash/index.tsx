import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useSafeRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropY = useRef(new Animated.Value(-100)).current;
  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 水滴下落动画
    Animated.timing(dropY, {
      toValue: height * 0.55,
      duration: 1500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();

    // 涟漪动画
    const rippleAnim = Animated.sequence([
      Animated.delay(1500),
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

    // 2.5秒后跳转到首页
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => {
      clearTimeout(timer);
      rippleAnim.stop();
    };
  }, []);

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
    <Screen>
      <Animated.View
        style={[styles.container, { opacity: fadeAnim }]}
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* 水滴 */}
        <Animated.View
          style={[
            styles.drop,
            {
              transform: [{ translateY: dropY }],
            },
          ]}
        />

        {/* 涟漪 */}
        <Animated.View
          style={[
            styles.ripple,
            rippleStyle,
          ]}
        />

        {/* 内容 */}
        <View style={styles.content}>
          {/* 标题 */}
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-widest">
            每日申论
          </Text>

          {/* 禅意诗句 */}
          <Text className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            博观而约取
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 tracking-wide mt-1">
            厚积而薄发
          </Text>

          {/* 副标题 */}
          <Text className="text-xs text-gray-400 dark:text-gray-500 mt-12">
            Daily Shenlun
          </Text>
        </View>

        {/* 底部装饰 */}
        <View style={styles.footer}>
          <View className="w-20 h-0.5 bg-gray-900 dark:bg-white opacity-20" />
        </View>
      </Animated.View>
    </Screen>
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
    backgroundColor: '#6B7280',
    left: width / 2 - 8,
  },
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#6B7280',
    top: height * 0.55,
    left: width / 2 - 100,
  },
  content: {
    alignItems: 'center',
    marginTop: -80,
  },
  footer: {
    position: 'absolute',
    bottom: 64,
  },
});
