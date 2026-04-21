import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { Screen } from '@/components/Screen';
import { FontAwesome6 } from '@expo/vector-icons';
import { quoteService, Quote } from '@/services/quoteService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuotesScreen() {
  const router = useSafeRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const loadedQuotes = await quoteService.getAllQuotes();
      setQuotes(loadedQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    Alert.alert(
      '删除金句',
      '确定要删除这条金句吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              await quoteService.deleteQuote(id);
              loadQuotes();
            } catch (error) {
              Alert.alert('错误', '删除失败');
            }
          },
        },
      ]
    );
  };

  const renderQuote = ({ item }: { item: Quote }) => (
    <View className="mx-4 mb-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {item.newsTitle}
      </Text>
      <Text className="text-base text-gray-900 dark:text-white leading-relaxed mb-4">
        {item.content}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(item.createdAt).toLocaleDateString('zh-CN')}
        </Text>
        <TouchableOpacity
          onPress={() => handleDeleteQuote(item.id)}
          className="w-8 h-8 bg-red-50 dark:bg-red-900/20 rounded-full items-center justify-center"
        >
          <FontAwesome6 name="trash" size={14} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View className="px-4 pt-4 pb-6">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <View className="flex-row items-center">
          <FontAwesome6 name="arrow-left" size={16} color="#888" />
          <Text className="ml-2 text-sm text-gray-600 dark:text-gray-400">返回</Text>
        </View>
      </TouchableOpacity>
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          金句记录
        </Text>
        {quotes.length > 0 && (
          <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            <Text className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {quotes.length}条
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
        <FontAwesome6 name="bookmark" size={32} color="#CCCCCC" />
      </View>
      <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-2">
        暂无金句记录
      </Text>
      <Text className="text-sm text-gray-400 dark:text-gray-500 text-center">
        在阅读申论答案时，点击句子即可收藏为金句
      </Text>
    </View>
  );

  return (
    <Screen>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">加载中...</Text>
        </View>
      ) : quotes.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={quotes}
          renderItem={renderQuote}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
