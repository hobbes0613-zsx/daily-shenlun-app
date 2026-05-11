import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

// 保持启动屏幕直到准备就绪
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');
const VIDEO_HEIGHT = height * 0.65; // 视频占65%高度，底部35%显示文字

// 视频URL（4秒水滴涟漪动画 - 新版本）
const VIDEO_URL = 'https://coze-coding-project.tos.coze.site/coze_storage_7631192723420282934/video/video_generate_cgt-20260511233156-vw7g4.mp4?sign=1810049598-b7d78e02cc-0-4944a237f1745f77d1cb9a9a7af86370f5d3d0cb4ed338f2c0ded50b8f9867d8';

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
      {/* 视频区域 - 只占屏幕上半部分 */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: VIDEO_URL }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping={false}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
        />
      </View>
      
      {/* 底部文字区域 */}
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
  videoContainer: {
    width: '100%',
    height: VIDEO_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
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
