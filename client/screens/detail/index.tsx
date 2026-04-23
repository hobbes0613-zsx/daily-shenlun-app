import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Modal, TouchableWithoutFeedback, PanResponder } from 'react-native';
import { useSafeRouter, useSafeSearchParams } from '@/hooks/useSafeRouter';
import { Screen } from '@/components/Screen';
import { FontAwesome6 } from '@expo/vector-icons';
import { quoteService } from '@/services/quoteService';

interface News {
  id: number;
  date: string;
  title: string;
  summary: string;
  importance: number;
  question?: string;
  answer?: string;
}

interface CharInfo {
  char: string;
  index: number;
}

export default function DetailScreen() {
  const { id } = useSafeSearchParams<{ id: string }>();
  const router = useSafeRouter();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [allChars, setAllChars] = useState<CharInfo[]>([]);

  useEffect(() => {
    if (id) {
      fetchNewsDetail(parseInt(id));
    }
  }, [id]);

  const fetchNewsDetail = async (newsId: number) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/news/${newsId}`);
      const data = await response.json();
      setNews(data.data || null);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!news) return;

    setGenerating(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/news/${news.id}/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newsId: news.id }),
        }
      );
      const data = await response.json();
      setNews({
        ...news,
        question: data.data.question,
        answer: data.data.answer,
      });
    } catch (error) {
      console.error('Error generating shenlun:', error);
    } finally {
      setGenerating(false);
    }
  };

  // 分割答案成句子
  const splitIntoSentences = (text: string): string[] => {
    if (!text) return [];
    return text
      .split(/([。！？；\n])/)
      .filter(s => s.trim())
      .reduce((acc: string[], curr, index, arr) => {
        if (index % 2 === 0) {
          acc.push(curr + (arr[index + 1] || ''));
        }
        return acc;
      }, [])
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  // 准备所有字符
  const prepareChars = useCallback(() => {
    if (!news?.answer) return;
    const answer = news.answer;
    const chars: CharInfo[] = [];
    for (let i = 0; i < answer.length; i++) {
      chars.push({
        char: answer[i],
        index: i,
      });
    }
    setAllChars(chars);
  }, [news?.answer]);

  useEffect(() => {
    if (isSelectionMode) {
      prepareChars();
    }
  }, [isSelectionMode, prepareChars]);

  const handleSentencePress = async (sentence: string) => {
    setSelectedSentence(sentence);

    Alert.alert(
      '保存金句',
      sentence,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '保存',
          onPress: async () => {
            try {
              const exists = await quoteService.isQuoteExist(sentence);
              if (exists) {
                Alert.alert('提示', '该金句已保存');
                return;
              }

              await quoteService.addQuote({
                content: sentence,
                newsId: news?.id || 0,
                newsTitle: news?.title || '',
              });
              Alert.alert('成功', '金句已保存');
            } catch (error) {
              Alert.alert('错误', '保存失败');
            }
            setSelectedSentence(null);
          },
        },
      ]
    );
  };

  const handleSaveSelection = async () => {
    if (news && selectionStart !== null && selectionEnd !== null) {
      const answer = news.answer || '';
      const start = Math.min(selectionStart, selectionEnd);
      const end = Math.max(selectionStart, selectionEnd) + 1;
      const selectedText = answer.substring(start, end);

      if (selectedText.trim()) {
        try {
          const exists = await quoteService.isQuoteExist(selectedText);
          if (exists) {
            Alert.alert('提示', '该金句已保存');
            setShowSaveModal(false);
            return;
          }

          await quoteService.addQuote({
            content: selectedText,
            newsId: news.id,
            newsTitle: news.title,
          });
          Alert.alert('成功', '金句已保存');
          setShowSaveModal(false);
          handleCancelSelection();
        } catch (error) {
          Alert.alert('错误', '保存失败');
        }
      }
    }
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
    setShowSaveModal(false);
  };

  const getSelectedText = (): string => {
    if (news && selectionStart !== null && selectionEnd !== null) {
      const answer = news.answer || '';
      const start = Math.min(selectionStart, selectionEnd);
      const end = Math.max(selectionStart, selectionEnd) + 1;
      return answer.substring(start, end);
    }
    return '';
  };

  // 处理字符点击
  const handleCharPress = (index: number) => {
    if (!isSelecting) {
      // 第一次点击，设置起始位置
      setSelectionStart(index);
      setSelectionEnd(index);
      setIsSelecting(true);
    } else {
      // 第二次点击，设置结束位置
      setSelectionEnd(index);
      setIsSelecting(false);
      setShowSaveModal(true);
    }
  };

  // 判断字符是否被选中
  const isCharSelected = (index: number): boolean => {
    if (selectionStart === null || selectionEnd === null) return false;
    const start = Math.min(selectionStart, selectionEnd);
    const end = Math.max(selectionStart, selectionEnd);
    return index >= start && index <= end;
  };

  // 判断是否是起始或结束位置
  const isStartOrEnd = (index: number): boolean => {
    if (selectionStart === null || selectionEnd === null) return false;
    return index === selectionStart || index === selectionEnd;
  };

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#111111" />
        </View>
      </Screen>
    );
  }

  if (!news) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-center text-gray-500 dark:text-gray-400">新闻未找到</Text>
        </View>
      </Screen>
    );
  }

  return (
    <>
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
            <View className="flex-row items-start mb-3">
              <View className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white items-center justify-center mr-3">
                <Text className="text-sm font-bold text-white dark:text-gray-900">{news.importance}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                  {new Date(news.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
              </View>
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {news.title}
            </Text>
          </View>

          {/* Summary */}
          <View className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <View className="mb-3">
              <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                新闻摘要
              </Text>
              <Text className="text-base text-gray-900 dark:text-white leading-relaxed">
                {news.summary}
              </Text>
            </View>
          </View>

          {/* Shenlun Section */}
          <View className="px-4 py-6">
            <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
              申论练习
            </Text>

            {!news.question && !news.answer ? (
              <TouchableOpacity
                onPress={handleGenerate}
                disabled={generating}
                className="bg-gray-900 dark:bg-white rounded-lg p-4 items-center justify-center"
              >
                {generating ? (
                  <ActivityIndicator color={news.answer ? '#111111' : '#FFFFFF'} />
                ) : (
                  <Text className="text-white dark:text-gray-900 font-semibold">
                    生成申论题目和答案
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <>
                {/* Question */}
                {news.question && (
                  <View className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border-l-4 border-gray-400 dark:border-gray-500 shadow-sm">
                    <View className="mb-2">
                      <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        题目
                      </Text>
                      <Text className="text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                        {news.question}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Answer */}
                {news.answer && (
                  <View className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border-l-4 border-gray-400 dark:border-gray-500 shadow-sm">
                    <View className="flex flex-row justify-between items-center mb-3">
                      <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        参考答案
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                          onPress={() => setIsSelectionMode(!isSelectionMode)}
                          className={`px-3 py-1.5 rounded-full ${isSelectionMode ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                          <Text className={`text-xs font-semibold ${isSelectionMode ? 'text-white dark:text-gray-900' : 'text-gray-700 dark:text-gray-300'}`}>
                            精确选词
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {isSelectionMode ? (
                      // 选择模式：字符级别
                      <View className="flex flex-row flex-wrap">
                        {allChars.map((charInfo, idx) => {
                          const isSelected = isCharSelected(charInfo.index);
                          const isBoundary = isStartOrEnd(charInfo.index);

                          return (
                            <TouchableOpacity
                              key={charInfo.index}
                              onPress={() => handleCharPress(charInfo.index)}
                              className={`
                                px-0.5 py-0.5
                                ${isSelected ? 'bg-blue-400 dark:bg-blue-600' : ''}
                                ${isBoundary ? 'border-l-2 border-r-2 border-blue-600 dark:border-blue-400' : ''}
                                ${isSelecting && charInfo.index === selectionStart ? 'animate-pulse' : ''}
                              `}
                            >
                              <Text
                                className={`
                                  text-base leading-relaxed
                                  ${isSelected ? 'text-white font-medium' : 'text-gray-800 dark:text-gray-200'}
                                `}
                              >
                                {charInfo.char === ' ' ? '\u00A0' : charInfo.char}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ) : (
                      // 普通模式：句子级别
                      <View className="space-y-4">
                        {splitIntoSentences(news.answer).map((sentence, idx) => (
                          <TouchableOpacity
                            key={idx}
                            onPress={() => handleSentencePress(sentence)}
                            className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <Text className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                              {sentence}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                {/* Selection Mode Info */}
                {isSelectionMode && (
                  <View className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Text className="text-sm text-blue-800 dark:text-blue-300">
                      {isSelecting
                        ? '请点击选择结束位置'
                        : selectionStart !== null
                        ? '选择中... 点击其他字符完成'
                        : '点击第一个字符开始选择'}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </Screen>

      {/* Save Confirmation Modal */}
      <Modal
        visible={showSaveModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSaveModal(false)}>
          <View className="flex-1 bg-black/50 items-center justify-center p-4">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
                <View className="p-5 border-b border-gray-200 dark:border-gray-700">
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    保存金句
                  </Text>
                </View>

                <View className="p-4">
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    选中的内容：
                  </Text>
                  <View className="max-h-40 overflow-y-auto">
                    <Text className="text-base text-gray-900 dark:text-white leading-relaxed">
                      {getSelectedText()}
                    </Text>
                  </View>
                </View>

                <View className="flex border-t border-gray-200 dark:border-gray-700">
                  <TouchableOpacity
                    onPress={() => setShowSaveModal(false)}
                    className="flex-1 p-4 border-r border-gray-200 dark:border-gray-700"
                  >
                    <Text className="text-center font-semibold text-gray-600 dark:text-gray-400">
                      取消
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveSelection}
                    className="flex-1 p-4"
                  >
                    <Text className="text-center font-semibold text-blue-600 dark:text-blue-400">
                      保存
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
