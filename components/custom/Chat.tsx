import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "@clerk/nextjs";
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon } from 'lucide-react';

interface Message {
  sender: string;
  message: string;
}

interface ChatProps {
  messages: Message[];
  insights: string[];
  chatId: string;
  setMessages: (messages: Message[]) => void;
  setInsights: (insights: string[]) => void;
}

interface AppendAskResponse {
  chatId: string;
  messages: Array<{
    sender: string;
    message: string;
  }>;
  insight: Array<string>;
}

const Chat: React.FC<ChatProps> = ({ messages, insights, chatId, setInsights, setMessages }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const template = 'marsight';
  const { getToken, isSignedIn } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const appendAsk = async (askStr: string) => {
    if (!askStr.trim()) return; // 防止发送空消息
    setIsSending(true);
    try {
      const jwtToken = await getToken({ template });
      const response = await axios.post(
        'https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat/conversation',
        {
          message: askStr,
          chatId: chatId,
        },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
          },
        }
      );
      const data = response.data as AppendAskResponse;
      setMessages([...messages, ...data.messages]);
      setInsights(data.insight);
      setInput(''); // 清空输入框
      setIsSending(false);
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[24px]">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="sticky top-0 z-10 bg-white mt-[-20px] border-b w-full">
            <Image src={AIInsightsIcon} alt="AIInsights logo" width={150} height={150} className='ml-28' />
          </div>

          {/* <div className='rounded-[24px] bg-[#f7f7f5] p-4 text-sm'>
            <div>
              Welcome aboard, Superstar! 🚀✨ Your Writing Journey Starts Here! Are you ready to tackle those papers with ease and leave your mark?
            </div>
          </div> */}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <p className="break-words">{message.message}</p>
              </div>
            </div>
          ))}

          {insights.length > 0 && insights.slice(0, 3).map((insight, index) => (
            <div
              key={index}
              className='rounded-[24px] bg-white px-4 py-2 border text-sm hover:cursor-pointer'
              onClick={() => appendAsk(insight)}
            >
              {insight}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <Textarea
            placeholder="输入您的问题..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                appendAsk(input);
              }
            }}
            className="pr-24 min-h-[100px] resize-none rounded-[24px]"
            rows={4}
            disabled={isSending}
          />
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className='rounded-[24px]'>
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => appendAsk(input)}
              className="bg-black text-white hover:bg-gray-800 rounded-[24px]"
              disabled={!input.trim() || isSending} // 禁用发送按钮
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Chat};
export type { Message };