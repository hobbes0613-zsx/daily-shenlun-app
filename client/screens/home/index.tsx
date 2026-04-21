import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useColorScheme } from 'react-native';
import { Screen } from '@/components/Screen';
import { FontAwesome6 } from '@expo/vector-icons';

interface News {
  id: number;
  date: string;
  title: string;
  summary: string;
  importance: number;
}

export default function HomeScreen() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useSafeRouter();
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/news`);
      const data = await response.json();
      setNewsList(data.data || []);
    } catch (error) {
      console.error('Error fetching news list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsPress = (news: News) => {
    router.push('/detail', { id: news.id });
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    // 这里实际上需要通过全局状态来切换主题
    // 为了简化，我们使用useColorScheme的自动切换
    // 如果需要手动切换，需要创建一个ThemeContext
  };

  const renderItem = ({ item, index }: { item: News; index: number }) => (
    <TouchableOpacity
      onPress={() => handleNewsPress(item)}
      className="mb-4 mx-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
    >
      <View className="flex-row items-start mb-2">
        <View className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white items-center justify-center mr-3">
          <Text className="text-xs font-bold text-white dark:text-gray-900">{index + 1}</Text>
        </View>
        <Text className="text-base font-semibold text-gray-900 dark:text-white flex-1" numberOfLines={2}>
          {item.title}
        </Text>
      </View>
      <Text className="text-sm text-gray-600 dark:text-gray-400 ml-9" numberOfLines={2}>
        {item.summary}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View className="px-4 pt-4 pb-6">
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
            {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </Text>
          <Text className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            每日申论
          </Text>
        </View>
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.push('/quotes')}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center"
          >
            <FontAwesome6 name="bookmark" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center"
          >
            <FontAwesome6 name="gear" size={18} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Screen>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#111111" />
        </View>
      ) : (
        <FlatList
          data={newsList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
