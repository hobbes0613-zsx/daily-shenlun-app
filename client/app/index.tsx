import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SPLASH_IMAGE_URL = 'https://coze-coding-project.tos.coze.site/coze_storage_7631192723420282934/image/generate_image_c18cdf80-3d11-4284-915f-da3d90e770c3.jpeg';

export default function SplashScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // 3秒后跳转到首页
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* 背景图片 */}
      <Image
        source={{ uri: SPLASH_IMAGE_URL }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

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
