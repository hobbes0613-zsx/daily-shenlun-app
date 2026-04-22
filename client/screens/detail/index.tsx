import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useSafeRouter, useSafeSearchParams } from '@/hooks/useSafeRouter';
import { Screen } from '@/components/Screen';
import { FontAwesome6 } from '@expo/vector-icons';
import { quoteService } from '@/services/quoteService';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface News {
  id: number;
  date: string;
  title: string;
  summary: string;
  importance: number;
  question?: string;
  answer?: string;
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
  const selectionStartRef = useRef<number | null>(null);
  const selectedTextRef = useRef<string>('');

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

  // 精确选择：将文本分割成字符
  const splitIntoChars = (text: string): string[] => {
    if (!text) return [];
    return text.split('');
  };

  // 计算全局字符索引
  const getGlobalIndex = (fullText: string, sentenceIndex: number, charIndex: number): number => {
    const sentences = splitIntoSentences(fullText);
    let globalIndex = 0;
    for (let i = 0; i < sentenceIndex; i++) {
      globalIndex += sentences[i].length;
    }
    return globalIndex + charIndex;
  };

  // 优化后的长按选择处理
  const startSelection = useCallback((index: number) => {
    setIsSelecting(true);
    setSelectionStart(index);
    setSelectionEnd(index);
    selectionStartRef.current = index;
  }, []);

  const updateSelection = useCallback((index: number) => {
    if (isSelecting && selectionStartRef.current !== null) {
      setSelectionEnd(index);
    }
  }, [isSelecting]);

  const endSelection = useCallback(() => {
    if (isSelecting) {
      setIsSelecting(false);
      selectionStartRef.current = null;
      // 显示保存提示
      if (selectionStart !== null && selectionEnd !== null) {
        setShowSaveModal(true);
      }
    }
  }, [isSelecting, selectionStart, selectionEnd]);

  const handleCharPress = useCallback((index: number) => {
    // 如果正在选择，结束选择
    if (isSelecting) {
      endSelection();
    } else if (selectionStart === null) {
      // 第一次点击，设置起始位置
      setSelectionStart(index);
    } else if (selectionEnd === null) {
      // 第二次点击，设置结束位置并显示确认框
      setSelectionEnd(index);
      setShowSaveModal(true);
    } else {
      // 重新开始选择
      setSelectionStart(index);
      setSelectionEnd(null);
      setShowSaveModal(false);
    }
  }, [isSelecting, selectionStart, selectionEnd, endSelection]);

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

  // 创建优化的手势
  const createCharGesture = (index: number) => {
    const tap = Gesture.Tap()
      .onStart(() => {
        if (!isSelecting) {
          runOnJS(handleCharPress)(index);
        }
      });

    const longPress = Gesture.LongPress()
      .minDuration(200)
      .onStart(() => {
        runOnJS(startSelection)(index);
      });

    const pan = Gesture.Pan()
      .onStart(() => {
        if (!isSelecting) {
          runOnJS(startSelection)(index);
        }
      })
      .onUpdate(() => {
        runOnJS(updateSelection)(index);
      })
      .onEnd(() => {
        runOnJS(endSelection)();
      });

    return Gesture.Race(tap, longPress, pan);
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
              <View>
                {/* Question */}
                <View className="mb-8">
                  <View className="flex-row items-center mb-4">
                    <View className="w-1 h-5 bg-gray-900 dark:bg-white rounded-full mr-3" />
                    <Text className="text-base font-bold text-gray-900 dark:text-white">
                      题目
                    </Text>
                  </View>
                  <View className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Text className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                      {news.question}
                    </Text>
                  </View>
                </View>

                {/* Answer */}
                <View>
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center">
                      <View className="w-1 h-5 bg-gray-900 dark:bg-white rounded-full mr-3" />
                      <Text className="text-base font-bold text-gray-900 dark:text-white">
                        参考答案
                      </Text>
                    </View>
                    {!isSelectionMode ? (
                      <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                          onPress={() => setIsSelectionMode(true)}
                          className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"
                        >
                          <Text className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            精确选词
                          </Text>
                        </TouchableOpacity>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          点击句子可保存
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center gap-2">
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                          {isSelecting ? '松开完成选择' : '长按并滑动可选择'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                    {isSelectionMode ? (
                      <View>
                        {/* 选择模式：字符级别选择，保持原有段落格式 */}
                        {splitIntoSentences(news.answer || '').map((sentence, sIndex) => {
                          const chars = splitIntoChars(sentence);
                          return (
                            <View key={sIndex} className="mb-2 flex-wrap flex-row">
                              {chars.map((char, cIndex) => {
                                const globalIndex = getGlobalIndex(news.answer || '', sIndex, cIndex);
                                const isSelected =
                                  selectionStart !== null &&
                                  selectionEnd !== null &&
                                  globalIndex >= Math.min(selectionStart, selectionEnd) &&
                                  globalIndex <= Math.max(selectionStart, selectionEnd);
                                const isStart = globalIndex === selectionStart;
                                const isEnd = globalIndex === selectionEnd;

                                const gesture = createCharGesture(globalIndex);

                                return (
                                  <GestureDetector key={`${sIndex}-${cIndex}`} gesture={gesture}>
                                    <View
                                      className={`rounded px-0.5 ${
                                        isSelected ? 'bg-blue-400 dark:bg-blue-600' : ''
                                      } ${isStart || isEnd ? 'relative' : ''}`}
                                      style={{ paddingVertical: 1 }}
                                    >
                                      {/* 游标指示器 */}
                                      {(isStart || isEnd) && (
                                        <View
                                          className="absolute w-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                                          style={{
                                            height: 24,
                                            top: -4,
                                            [isStart ? 'left' : 'right']: isStart ? 0 : 0,
                                            transform: [{ translateX: isStart ? -1 : 1 }],
                                          }}
                                        />
                                      )}
                                      <Text
                                        className={`text-base leading-relaxed ${
                                          isSelected
                                            ? 'text-white dark:text-white'
                                            : 'text-gray-800 dark:text-gray-200'
                                        }`}
                                      >
                                        {char === ' ' ? '\u00A0' : char}
                                      </Text>
                                    </View>
                                  </GestureDetector>
                                );
                              })}
                            </View>
                          );
                        })}

                        {/* 取消按钮 */}
                        {selectionStart !== null && !isSelecting && (
                          <TouchableOpacity
                            onPress={handleCancelSelection}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 py-2"
                          >
                            <Text className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                              取消选择
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <View>
                        {/* 普通模式：句子级别选择 */}
                        <View className="space-y-4">
                          {splitIntoSentences(news.answer || '').map((sentence, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleSentencePress(sentence)}
                              activeOpacity={0.7}
                              className={`p-4 rounded-xl border ${
                                selectedSentence === sentence
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                              }`}
                            >
                              <Text
                                className={`text-base leading-relaxed ${
                                  selectedSentence === sentence
                                    ? 'text-blue-700 dark:text-blue-300 font-medium'
                                    : 'text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                {sentence}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Screen>

      {/* 保存确认提示框 */}
      <Modal
        visible={showSaveModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSaveModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSaveModal(false)}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback>
              <View className="mx-4 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  保存金句
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  已选择以下内容，是否保存？
                </Text>
                <View className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 max-h-40 overflow-y-auto">
                  <Text className="text-base text-gray-900 dark:text-white leading-relaxed">
                    {getSelectedText()}
                  </Text>
                </View>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => setShowSaveModal(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 py-3 rounded-xl"
                  >
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      取消
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveSelection}
                    className="flex-1 bg-blue-600 dark:bg-blue-500 py-3 rounded-xl"
                  >
                    <Text className="text-sm font-medium text-white text-center">
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
