import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

export default function SplashScreen() {
  const router = useSafeRouter();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2.5秒后跳转到首页
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>
      <Animated.View
        style={{ opacity: fadeAnim }}
        className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900"
      >
        <View className="items-center">
          {/* 墨点装饰 */}
          <View className="w-16 h-16 rounded-full bg-gray-900 dark:bg-white mb-8" style={{
            opacity: 0.85,
          }} />

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
        <View className="absolute bottom-16">
          <View className="w-20 h-0.5 bg-gray-900 dark:bg-white opacity-20" />
        </View>
      </Animated.View>
    </Screen>
  );
}
