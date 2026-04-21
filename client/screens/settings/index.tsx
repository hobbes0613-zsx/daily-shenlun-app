import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { Screen } from '@/components/Screen';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';

interface ThemeOptionProps {
  theme: ThemeMode;
  label: string;
  icon: string;
  currentTheme: ThemeMode;
  onPress: (theme: ThemeMode) => void;
}

function ThemeOption({ theme, label, icon, currentTheme, onPress }: ThemeOptionProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(theme)}
      className={`flex-row items-center p-4 rounded-lg mb-3 ${
        currentTheme === theme
          ? 'bg-gray-900 dark:bg-white'
          : 'bg-gray-100 dark:bg-gray-800'
      }`}
    >
      <FontAwesome6
        name={icon as any}
        size={20}
        color={currentTheme === theme ? '#FFFFFF' : '#888888'}
      />
      <Text
        className={`ml-3 font-medium ${
          currentTheme === theme ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'
        }`}
      >
        {label}
      </Text>
      {currentTheme === theme && (
        <View className="ml-auto">
          <FontAwesome6 name="check" size={16} color={currentTheme === 'light' || currentTheme === 'auto' ? '#FFFFFF' : '#111111'} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useSafeRouter();
  const { themeMode, setThemeMode } = useTheme();

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <View className="flex-row items-center">
              <FontAwesome6 name="arrow-left" size={16} color="#888" />
              <Text className="ml-2 text-sm text-gray-600 dark:text-gray-400">返回</Text>
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            设置
          </Text>
        </View>

        {/* Theme Section */}
        <View className="px-4 py-6">
          <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            主题设置
          </Text>
          <ThemeOption theme="light" label="浅色模式" icon="sun" currentTheme={themeMode} onPress={setThemeMode} />
          <ThemeOption theme="dark" label="深色模式" icon="moon" currentTheme={themeMode} onPress={setThemeMode} />
          <ThemeOption theme="auto" label="跟随系统" icon="circle-half-stroke" currentTheme={themeMode} onPress={setThemeMode} />
        </View>

        {/* Info Section */}
        <View className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            关于应用
          </Text>
          <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <Text className="text-sm text-gray-900 dark:text-white mb-2">
              每日申论
            </Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400">
              版本 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
