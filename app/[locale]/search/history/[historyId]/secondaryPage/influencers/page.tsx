"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

interface Influencer {
    authors_id: string; // 作者ID
    author_avatar_url: string; // 作者头像
    author: string; // 作者名字
    service: string; // 要跳转的网站图标URL
    author_url: string; // 要跳转的网站URL
    count: string; // 提及次数
    followers_count: string; // 粉丝数
}

const Influencers: React.FC = () => {
    const { historyId } = useParams()
    const [frontInfluencers, setFrontInfluencers] = useState<Influencer[] | null>(null);

    // 博主表格表头数据
    const tableHeader = ['', 'Profile name', '', 'Site', 'Mentions', 'Followers'];
    const handleBack = () => {
        window.history.back();
    };

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
                const backInfluencers = (response.data as any).report.Influncers;
                setFrontInfluencers(backInfluencers as Influencer[]);
                console.log("返回的influencers:", frontInfluencers);
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
        <>
            <div className='bg-[#ffffff] w-full h-full p-4 space-y-4 overflow-auto'>
                <Card className="rounded-[24px] p-2">
                    <CardHeader>
                        <div className='flex justify-between'>
                            <Button
                                variant="link"
                                onClick={handleBack}
                                className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
                            >
                                <ArrowLeftIcon className="w-5 h-5" />
                            </Button>
                            <CardTitle className='text-xl font-extrabold text-[#4281DB]'>Influencers</CardTitle>
                            <Button
                                variant="link"
                                asChild
                                className="p-2 hover:bg-muted/50"
                            >
                                <Link href="mailto:your-email@example.com">
                                    <Image
                                        src={AIInsightsIcon}
                                        alt="Mail"
                                        width={200}
                                        height={200}
                                        className="w-28 h-14"
                                    />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <div className='px-6 -mt-6'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {tableHeader.map((header, index) => (
                                        <TableHead key={index}>{header}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {frontInfluencers ? (
                                    frontInfluencers.map(influencer => (
                                        <TableRow key={influencer.authors_id}>
                                            <TableCell className="flex items-center space-x-2">
                                                <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                                    {influencer.author_avatar_url ? (
                                                        <Avatar.Image
                                                            className="h-full w-full rounded-[inherit] object-cover"
                                                            src={influencer.author_avatar_url}
                                                            alt={influencer.author}
                                                        />
                                                    ) : (
                                                        <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-black text-[15px] font-medium">
                                                            Fail
                                                        </Avatar.Fallback>
                                                    )}
                                                </Avatar.Root>
                                                <span className="text-[15px] font-medium">{influencer.author}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={influencer.author_url}>
                                                    <Avatar.Root className="bg-blackA1 inline-flex h-[30px] w-[30px] select-none items-center justify-center overflow-hidden">
                                                        {influencer.service ? (
                                                            <Avatar.Image
                                                                className="h-full w-full rounded-[inherit] object-cover"
                                                                src={influencer.service}
                                                                alt={influencer.author_url}
                                                            />
                                                        ) : (
                                                            <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-black text-[15px] font-medium">
                                                                Fail
                                                            </Avatar.Fallback>
                                                        )}
                                                    </Avatar.Root>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{influencer.count}</TableCell>
                                            <TableCell>{influencer.followers_count}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">No influencers found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>

        </>
    );
}

export default Influencers;
