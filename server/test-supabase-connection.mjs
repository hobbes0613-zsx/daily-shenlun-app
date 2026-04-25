import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://doiwleesqwxojwlmxjch.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvaXdsZWVzcXd4b2p3bG14amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwOTAyODksImV4cCI6MjA5MjY2NjI4OX0.T1Ra79600Du3K8YNPDWMuJe142FeoTIcgjT_OhHhM3s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('🔗 测试Supabase连接...');
  console.log('📍 URL:', SUPABASE_URL);
  console.log('🔑 Key:', SUPABASE_ANON_KEY.substring(0, 20) + '...\n');

  try {
    // 测试查询
    console.log('📊 正在查询数据库...');
    const { data, error } = await supabase
      .from('daily_news')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ 连接失败:', error.message);
      console.error('   错误详情:', error);
      process.exit(1);
    }

    console.log('✅ 连接成功！');
    console.log('📋 查询结果:');
    console.log(JSON.stringify(data, null, 2));

    // 测试插入
    console.log('\n📝 测试插入数据...');
    const { data: insertData, error: insertError } = await supabase
      .from('daily_news')
      .insert({
        date: '2025-01-20',
        data: [
          {
            id: 1,
            rank: 1,
            summary: '连接测试新闻',
            content: '这是通过API插入的测试新闻',
            date: '2025-01-20',
            question: '测试题目',
            answer: '测试答案'
          }
        ]
      })
      .select();

    if (insertError) {
      // 如果是重复数据，忽略
      if (insertError.code === '23505') {
        console.log('ℹ️  数据已存在，跳过插入测试');
      } else {
        console.error('❌ 插入失败:', insertError.message);
      }
    } else {
      console.log('✅ 插入成功！');
      console.log('📋 插入数据:', insertData);
    }

    console.log('\n🎉 所有测试通过！数据库配置完成。');
  } catch (err) {
    console.error('❌ 错误:', err.message);
    console.error('   堆栈:', err.stack);
    process.exit(1);
  }
}

testConnection();
