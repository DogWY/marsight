import React from 'react';
import Link from "next/link";
import * as Avatar from '@radix-ui/react-avatar';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";

interface Influencer {
    authors_id: string; // 作者ID
    author_avatar_url: string; //作者头像
    author: string; // 作者名字
    service: string; // 要跳转的网站图标URL
    author_url: string; // 要跳转的网站URL
    count: string; // 提及次数
    followers_count: string; // 粉丝数
}

interface InfluencersProps {
    influencers: Influencer[];
    chatId: string;
}

const Influencers: React.FC<InfluencersProps> = ({ influencers, chatId }) => {
    const tableHeader = ['', 'Profile Name', 'Site', 'Mentions', 'Followers'];

    return (
        <>
            <Card className="rounded-[24px] p-2">
                <CardHeader>
                    <div className='flex justify-between'>
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
                            {influencers.map(influencer => (
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
                                            {/* <Image src={influencer.siteIcon} alt={influencer.siteUrl} width={100} height={100} /> */}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{influencer.count}</TableCell>
                                    <TableCell>{influencer.followers_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='flex justify-end'>
                        <Button variant="link">
                            <Link href={`./${chatId}/secondaryPage/influencers`}>
                                Show more influencers
                            </Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </>

    );
};

export { Influencers };
