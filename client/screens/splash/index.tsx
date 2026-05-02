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
  
  // 水滴透明度 - 接近水面时变淡
  const dropOpacity = new Animated.Value(1);
  
  // 涟漪动画 - 从中心向外扩散
  const rippleScale = new Animated.Value(0);
  const rippleOpacity = new Animated.Value(0);
  
  // 水面波动动画
  const waveAnim = new Animated.Value(0);

  useEffect(() => {
    // 1. 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2. 水滴下落动画（更慢，更自然）
    Animated.timing(dropY, {
      toValue: WATER_LEVEL,
      duration: 2500, // 下落时间变慢
      easing: Easing.bezier(0.3, 0, 0.8, 0.7), // 缓动曲线
      useNativeDriver: true,
    }).start();

    // 3. 水滴逐渐变小（模拟透视）
    Animated.timing(dropScale, {
      toValue: 0.6, // 变小
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // 4. 水滴逐渐变淡
    Animated.timing(dropOpacity, {
      toValue: 0.7,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // 5. 涟漪动画序列
    const rippleSequence = Animated.sequence([
      // 延迟到水滴到达水面
      Animated.delay(2500),
      // 涟漪淡入
      Animated.timing(rippleOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      // 涟漪扩散 + 水滴消失
      Animated.parallel([
        // 涟漪扩散
        Animated.timing(rippleScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        // 涟漪淡出
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);
    rippleSequence.start();

    // 6. 水面波动
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // 7. 3.5秒后跳转到首页
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
      { scale: rippleScale },
    ],
    opacity: rippleOpacity,
  };

  // 水面波动样式
  const wave1Style = {
    transform: [
      {
        scaleX: waveAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.02, 1],
        }),
      },
    ],
  };

  return (
    <Screen>
      <Animated.View
        style={[styles.container, { opacity: fadeAnim }]}
        className="flex-1 bg-gray-50 dark:bg-gray-900"
      >
        {/* 背景装饰 - 顶部渐变 */}
        <View style={styles.topGradient} />
        
        {/* 顶部装饰线 */}
        <View style={styles.topLine} />
        
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

        {/* 水面区域 */}
        <View style={[styles.waterArea, { top: WATER_LEVEL - 20 }]}>
          {/* 水面波动线1 */}
          <Animated.View style={[styles.waveLine, wave1Style]} />
          
          {/* 水面波动线2 */}
          <Animated.View 
            style={[
              styles.waveLine, 
              styles.waveLine2,
              {
                transform: [{
                  scaleX: waveAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.015, 1],
                  }),
                }],
              }
            ]} 
          />
        </View>

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
        >
          <View style={styles.rippleInner} />
        </Animated.View>

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
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(107, 114, 128, 0.03)',
  },
  topLine: {
    position: 'absolute',
    top: 40,
    width: 60,
    height: 2,
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    borderRadius: 1,
  },
  content: {
    alignItems: 'center',
    marginTop: -80,
  },
  waterArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    overflow: 'hidden',
  },
  waveLine: {
    position: 'absolute',
    left: -10,
    right: -10,
    height: 2,
    backgroundColor: 'rgba(107, 114, 128, 0.15)',
    top: 30,
  },
  waveLine2: {
    top: 34,
    backgroundColor: 'rgba(107, 114, 128, 0.08)',
  },
  drop: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6B7280',
    left: width / 2 - 6,
    top: -50,
  },
  ripple: {
    position: 'absolute',
    width: 60,
    height: 30,
    left: width / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rippleInner: {
    width: '100%',
    height: '100%',
    borderWidth: 1.5,
    borderColor: 'rgba(107, 114, 128, 0.4)',
    borderRadius: 100,
    backgroundColor: 'rgba(107, 114, 128, 0.05)',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
});
