import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SPLASH_IMAGE_URL = 'https://coze-coding-project.tos.coze.site/coze_storage_7631192723420282934/image/generate_image_1a0aa5e5-8658-4406-b1e8-b3c91819cc78.jpeg?sign=1810082140-1438ca49e8-0-fae33bd32ec0bfe37387691872283404917f19f1dfa7766a6038742d29df81a2';

export default function SplashScreenPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isReady, setIsReady] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // 防止原生启动屏自动隐藏
    SplashScreen.preventAutoHideAsync()
      .then(() => setIsReady(true))
      .catch(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // 延迟2秒后隐藏原生启动屏并跳转
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // 忽略错误
      }
      
      // 再延迟0.5秒显示自定义启动页，然后跳转
      setTimeout(() => {
        router.replace('/home');
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isReady, router]);

  // 如果还没准备好，显示加载指示器
  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333333" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* 背景图片 */}
      {!imageError ? (
        <Image
          source={{ uri: SPLASH_IMAGE_URL }}
          style={styles.backgroundImage}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        /* 如果图片加载失败，显示纯色背景 */
        <View style={styles.fallbackBackground} />
      )}

      {/* 底部渐变遮罩 */}
      <View style={styles.gradientOverlay} />

      {/* 底部文字区域 */}
      <View style={[styles.textContainer, { paddingBottom: 40 }]}>
        <View style={styles.line} />
        <Text style={styles.title}>每日申论</Text>
        <Text style={styles.subtitle}>博观而约取 · 厚积而薄发</Text>
        <Text style={styles.english}>Daily Shenlun</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
  },
  fallbackBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    top: 0,
    left: 0,
    backgroundColor: '#f5f5f5',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  line: {
    width: 60,
    height: 2,
    backgroundColor: '#333333',
    marginVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
    letterSpacing: 1,
  },
  english: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 2,
  },
});
