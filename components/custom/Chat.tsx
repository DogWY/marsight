import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs"
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, PaperclipIcon, ArrowRightIcon, Search } from 'lucide-react'

interface Message {
  role: string;
  content: string;
}

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages: initialMessages }) => {
  // 聊天信息
  const [messages, setMessages] = useState(initialMessages)
  // 当前用户的提问内容
  const [input, setInput] = useState('')
  // 标记消息列表底部
  const messagesEndRef = useRef<any>(null)
  // 登录认证内容
  const template = 'markSightTest'
  const { getToken, isSignedIn } = useAuth();

  // 当 messages 发生变化时，自动滚动消息列表到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  // 监听 messages 的状态变化，一旦改变就调用 scrollToBottom 函数
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `这是对"${input}"的模拟回复。这是一个较长的回复，用于测试文本换行功能。它应该在宽度变小时自动换行，以保持良好的可读性。` }])
      }, 1000)
      setInput('')
    }
  }

  const followUp = async () => {
    try {
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        const response = await axios.post(
          'https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat/conversation',
          {
            message: 'fafafafaff',
            chatId: '75f58af9-6c03-11ef-a80e-93948447c487',
          },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        const data = response.data;
        console.log('data:', data);
      }
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[24px]">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 固定的 logo 部分 */}
          <div className="sticky top-0 z-10 bg-white mt-[-20px] border-b w-full">
            <Image src={AIInsightsIcon} alt="AIInsights logo" width={150} height={150} className='ml-28' />
          </div>

          <div className='rounded-[24px] bg-[#f7f7f5] p-4 text-sm'>
            <div>
              Welcome aboard, Superstar! 🚀✨ Your Writing Journey Starts Here! Are you ready to tackle those papers with ease and leave your mark?
            </div>
          </div>
          <div className='rounded-[24px] bg-white px-4 py-2 border text-sm'>question1</div>
          <div className='rounded-[24px] bg-white px-4 py-2 border text-sm'>question2</div>
          <div className='rounded-[24px] bg-white px-4 py-2 border text-sm'>question3</div>

          {/* 显示消息 */}
          {/* {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              <p className="break-words">{message.content}</p>
            </div>
          </div>
        ))} */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* 输入框部分 */}
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <Textarea
            placeholder="输入您的问题..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            className="pr-24 min-h-[100px] resize-none rounded-[24px]"
            rows={4}
          />
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className='rounded-[24px]'>
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button onClick={followUp} className="bg-black text-white hover:bg-gray-800 rounded-[24px]">
              追问
            </Button>
            <Button onClick={handleSend} className="bg-black text-white hover:bg-gray-800 rounded-[24px]">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export { Chat };