import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

// 保持启动屏幕直到准备就绪
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

// 视频URL（4秒水滴涟漪动画）
const VIDEO_URL = 'https://coze-coding-project.tos.coze.site/coze_storage_7631192723420282934/video/video_generate_cgt-20260511232545-2hgsw.mp4';

export default function SplashScreenPage() {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // 视频播放结束后跳转
    const timer = setTimeout(() => {
      if (!hasNavigated) {
        setHasNavigated(true);
        router.replace('/home');
      }
    }, 4500); // 视频4秒 + 缓冲500ms

    return () => clearTimeout(timer);
  }, [hasNavigated]);

  const handleVideoLoad = () => {
    setIsVideoReady(true);
    SplashScreen.hideAsync();
  };

  const handleVideoError = () => {
    // 如果视频加载失败，直接跳转
    console.log('Video load failed, navigating directly');
    if (!hasNavigated) {
      setHasNavigated(true);
      router.replace('/home');
    }
  };

  return (
    <View style={styles.container}>
      {/* 视频背景 */}
      <Video
        ref={videoRef}
        source={{ uri: VIDEO_URL }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onLoad={handleVideoLoad}
        onError={handleVideoError}
      />
      
      {/* 渐变遮罩层 */}
      <View style={styles.overlay} />
      
      {/* 底部文字 */}
      <View style={styles.textContainer}>
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
    backgroundColor: '#FFFFFF',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  line: {
    width: 60,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    letterSpacing: 2,
    marginBottom: 5,
  },
  english: {
    fontSize: 12,
    color: '#999999',
    letterSpacing: 1,
  },
});
