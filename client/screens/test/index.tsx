import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from '@/components/Screen';

export default function TestScreen() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[DEBUG] ${message}`);
  };

  useEffect(() => {
    addLog('=== 环境变量诊断 ===');
    addLog(`项目根目录: process.env.COZE_PROJECT_NAME = ${process.env.COZE_PROJECT_NAME}`);
    addLog(`项目ID: process.env.COZE_PROJECT_ID = ${process.env.COZE_PROJECT_ID}`);
    addLog(`后端URL: EXPO_PUBLIC_BACKEND_BASE_URL = ${process.env.EXPO_PUBLIC_BACKEND_BASE_URL || '未定义'}`);

    addLog('');
    addLog('=== 测试网络请求 ===');

    const testNetwork = async () => {
      try {
        const baseUrl = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;

        if (!baseUrl) {
          addLog('❌ 错误：环境变量 EXPO_PUBLIC_BACKEND_BASE_URL 未定义！');
          addLog('💡 提示：需要在 app.config.ts 中配置或通过 eas.json 传递');
          return;
        }

        addLog(`✅ 环境变量已配置: ${baseUrl}`);

        // 测试1：使用环境变量
        addLog('');
        addLog('测试1：使用环境变量...');
        const url1 = `${baseUrl}/api/v1/news`;
        addLog(`请求URL: ${url1}`);

        const response1 = await fetch(url1, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        addLog(`响应状态: ${response1.status} ${response1.statusText}`);

        if (response1.ok) {
          const data = await response1.json();
          addLog(`✅ 测试1成功！返回 ${data.data?.length || 0} 条新闻`);
        } else {
          addLog(`❌ 测试1失败: ${response1.status}`);
        }

        // 测试2：使用硬编码URL
        addLog('');
        addLog('测试2：使用硬编码URL（绕过环境变量）...');
        const hardcodedUrl = 'https://daily-shenlun-app-production.up.railway.app/api/v1/news';
        addLog(`请求URL: ${hardcodedUrl}`);

        const response2 = await fetch(hardcodedUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        addLog(`响应状态: ${response2.status} ${response2.statusText}`);

        if (response2.ok) {
          const data = await response2.json();
          addLog(`✅ 测试2成功！返回 ${data.data?.length || 0} 条新闻`);
          addLog('💡 结论：网络连接正常，问题出在环境变量配置');
        } else {
          addLog(`❌ 测试2失败: ${response2.status}`);
          addLog('💡 结论：网络连接有问题');
        }

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : '未知错误';
        addLog(`❌ 网络请求异常: ${errorMsg}`);
      }
    };

    testNetwork();
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Screen>
      <View className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="bg-gray-900 dark:bg-white px-4 py-4">
          <Text className="text-xl font-bold text-white dark:text-gray-900">
            🔧 环境变量诊断工具
          </Text>
          <Text className="text-xs text-gray-300 dark:text-gray-700 mt-1">
            用于诊断APK网络连接问题
          </Text>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            {logs.map((log, index) => (
              <Text
                key={index}
                className={`text-sm font-mono mb-2 ${
                  log.includes('❌') ? 'text-red-500' :
                  log.includes('✅') ? 'text-green-500' :
                  log.includes('💡') ? 'text-blue-500' :
                  'text-gray-700 dark:text-gray-300'
                }`}
              >
                {log}
              </Text>
            ))}
          </View>

          <TouchableOpacity
            onPress={clearLogs}
            className="mt-4 bg-gray-200 dark:bg-gray-700 py-3 rounded-lg"
          >
            <Text className="text-center text-gray-700 dark:text-gray-300 font-medium">
              清除日志
            </Text>
          </TouchableOpacity>

          <View className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
            <Text className="text-sm text-yellow-800 dark:text-yellow-200 font-bold mb-2">
              📋 如何使用此工具
            </Text>
            <Text className="text-xs text-yellow-700 dark:text-yellow-300 leading-relaxed">
              1. 查看上面的日志输出{'\n'}
              2. 如果显示"未定义"，说明环境变量未配置{'\n'}
              3. 如果测试1失败但测试2成功，说明问题在环境变量{'\n'}
              4. 如果两个都失败，说明网络连接有问题{'\n'}
              5. 截图发送给开发者以便进一步诊断
            </Text>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
