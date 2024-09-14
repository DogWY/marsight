"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { MentionBox } from '@/components/ui/mention-box';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';


interface Mentions {
  Mentions_from_the_most_popular_public_profiles: {
    id: number,
    title: string,
    created_date: string,
    url: string,
    likes_count: number,
    shares_count: number,
    comments_count: number,
    author: string,
    author_avatar_url: string,
    author_url: string,
    content: string,
  }[];
  The_most_popular_mentions: {
    id: number,
    title: string,
    created_date: string,
    url: string,
    likes_count: number,
    shares_count: number,
    comments_count: number,
    author: string,
    author_avatar_url: string,
    author_url: string,
    content: string,
  }[];
}

const handleBack = () => {
  window.history.back();
};
const Mentions = () => {
  const { historyId } = useParams()
  const [frontMentions, setFrontMentions] = useState<Mentions | null>();


  const [selectedOption, setSelectedOption] = useState('popular');
  const dataToShow = selectedOption === 'popular' ? frontMentions?.The_most_popular_mentions : frontMentions?.Mentions_from_the_most_popular_public_profiles;

  // 登录认证内容
  const template = 'marsight';
  const { getToken, isSignedIn } = useAuth();

  const getData = async () => {
    try {
      console.log('isSignedIn', isSignedIn)
      console.log('chatId', historyId)
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        const response = await axios.get(
          `https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat?chatId=${historyId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("返回的数据:", response);
        const backMentions = (response.data as any).report.Mentions;
        setFrontMentions(backMentions as Mentions);

      }
    } catch (error) {
      console.error('Failed to get chat:', error);
    }
  };

  // 页面初始化的时候调用 getData 获得数据
  useEffect(() => {
    console.log('isSignedIn', isSignedIn)
    console.log('chatId', historyId)
    if (isSignedIn && historyId) {
      getData();
    }
  }, [isSignedIn, historyId]);

  return (
    <div className="bg-[#ffffff] w-full h-full p-4 space-y-4 overflow-auto">
      <Card className="rounded-[24px]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Button
              variant="link"
              onClick={handleBack}
              className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none"
            >
              <ArrowLeftIcon className="w-5 h-9" />
            </Button>
            <Select defaultValue="popular" onValueChange={(value) => setSelectedOption(value)}>
              <SelectTrigger className="text-base flex h-9 items-center bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">
                  The most popular mentions
                </SelectItem>
                <SelectItem value="profiles">
                  Mentions from the most popular public profiles
                </SelectItem>
              </SelectContent>
            </Select>

          </CardTitle>

        </CardHeader>
        <CardContent>
          <div className='grid divide-y'>
            {dataToShow?.map((data, index) => (
              <MentionBox
                key={index}
                avatarSrc={data.author_avatar_url}
                fallbackText="Fail"
                title={data.title}
                date={data.created_date}
                link={data.url}
                tags={data.content} picture={undefined} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Mentions;