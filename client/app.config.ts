import 'expo-router/entry';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: { config: ExpoConfig }) => {
  // 获取项目ID（如果存在）
  const projectId = process.env.EAS_PROJECT_ID || config.extra?.eas?.projectId;
  const packageName = projectId 
    ? `com.anonymous.x${projectId.replace(/-/g, '').slice(0, 8)}`
    : 'com.anonymous.x0';

  return {
    ...config,
    android: {
      ...config.android,
      package: packageName,
      permissions: [
        'INTERNET',
        'ACCESS_NETWORK_STATE'
      ],
    },
    plugins: [
      'expo-router',
      'expo-splash-screen',
    ],
    splash: {
      image: './assets/images/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    extra: {
      eas: {
        projectId: 'b33c8d6d-db8c-43d8-87be-17e489e3c259',
      },
      backendUrl: 'https://daily-shenlun-app-production.up.railway.app',
    },
  };
};
