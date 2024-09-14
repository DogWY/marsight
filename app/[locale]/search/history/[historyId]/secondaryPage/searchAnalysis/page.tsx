"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ArrowLeftIcon } from 'lucide-react';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Link from "next/link";
import Image from "next/image";

interface Keywords {
    all_brand: {
        KeywordsCount: number;
        OverallClicks: number;
    };
    organic_nonbrand: {
        KeywordsCount: number;
        Records: {
            Keyword: string;
            Clicks: number;
            Share: number;
            ClicksChange: number;
            KwWindowVolume: number;
            VolumeChange: number;
        }[];
    };
    organic_brand: {
        KeywordsCount: number;
        Records: {
            Keyword: string;
            Clicks: number;
            Share: number;
            ClicksChange: number;
            KwWindowVolume: number;
            VolumeChange: number;
        }[];
    };
    paid_nonbrand: {
        KeywordsCount: number;
        Records: {
            Keyword: string;
            Clicks: number;
            Share: number;
            ClicksChange: number;
            KwWindowVolume: number;
            VolumeChange: number;
        }[];
    };
    paid_brand: {
        KeywordsCount: number;
        Records: {
            Keyword: string;
            Clicks: number;
            Share: number;
            ClicksChange: number;
            KwWindowVolume: number;
            VolumeChange: number;
        }[];
    };
}

const handleBack = () => {
    window.history.back();
};
const SearchAnalysis = () => {
    const formatNumberInMillions = (num: number) => (num / 1_000_000).toFixed(3) + "M";
    const formatBounceRate = (rate: number) => (rate * 100).toFixed(2) + "%";
    const formatAsPercentage = (num: number) => (num * 100).toFixed(2) + "%";

    const [selectedOption, setSelectedOption] = useState('Organic Traffic');
    // 为每个分类创建独立的展开状态
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
    // 切换某一行的展开/折叠状态
    const toggleExpand = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const { historyId } = useParams()
    const [frontSearchAnalysis, setFrontSearchAnalysis] = useState<Keywords | null>();
    const organic = frontSearchAnalysis ? [
        {
            KeywordClass: 'Branded Keywords',
            data: frontSearchAnalysis.organic_brand?.Records || []
        },
        {
            KeywordClass: 'Non-Branded Keywords',
            data: frontSearchAnalysis.organic_nonbrand?.Records || []
        }
    ] : [];

    const paid = frontSearchAnalysis ? [
        {
            KeywordClass: 'Branded Keywords',
            data: frontSearchAnalysis.paid_brand?.Records || []
        },
        {
            KeywordClass: 'Non-Branded Keywords',
            data: frontSearchAnalysis.paid_nonbrand?.Records || []
        }
    ] : [];
    const dataToShow = selectedOption === "organic" ? organic : paid;


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
                const backSearchAnalysis = (response.data as any).report.Keywords;
                setFrontSearchAnalysis(backSearchAnalysis as Keywords);
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
                <Card className="rounded-[24px]">
                    <CardHeader className="!font-normal -mt-6">
                        <Button
                            variant="link"
                            onClick={handleBack}
                            className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                        <div className="flex justify-between">
                            <div>
                                <Select defaultValue="organic" onValueChange={(value) => setSelectedOption(value)}>
                                    <SelectTrigger className="text-xl flex h-9 w-full items-center justify-between bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="organic">
                                            <CardTitle className="font-extrabold text-xl text-[#4281DB]">Organic Traffic</CardTitle>
                                        </SelectItem>
                                        <SelectItem value="paid">
                                            <CardTitle className="font-extrabold text-xl text-[#4281DB]">Paid Traffic</CardTitle>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* <Button variant="link" asChild className="p-2 hover:bg-muted/50">
                                <Link href="mailto:your-email@example.com">
                                    <Image
                                        src={AIInsightsIcon}
                                        alt="Mail"
                                        width={200}
                                        height={200}
                                        className="w-28 h-14"
                                    />
                                </Link>
                            </Button> */}
                        </div>
                    </CardHeader>

                    <div className="-mt-4">
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Keywords</TableHead>
                                        <TableHead>Clicks</TableHead>
                                        <TableHead>Traffic</TableHead>
                                        <TableHead>ClicksChange</TableHead>
                                        <TableHead>ChangeVolume</TableHead>
                                        <TableHead>Change of volume</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {dataToShow.map((datagroup, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <Button
                                                variant="link"
                                                onClick={() => toggleExpand(index)}
                                                className="text-black hover:no-underline px-2"
                                            >
                                                <div className="bg-blue-100 rounded-xl px-2">{datagroup.KeywordClass}</div>
                                                <div className="ml-6">{datagroup.data.length} records</div>
                                                {expandedIndexes.includes(index) ? (
                                                    <TriangleDownIcon />
                                                ) : (
                                                    <TriangleRightIcon />
                                                )}
                                            </Button>
                                        </TableRow>
                                        {expandedIndexes.includes(index) && (
                                            <TableBody>
                                                {datagroup.data.map((trafficrow, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>{trafficrow.Keyword}</TableCell>
                                                        <TableCell>{trafficrow.Clicks}</TableCell>
                                                        <TableCell>{formatAsPercentage(trafficrow.Share)}</TableCell>
                                                        <TableCell>{formatAsPercentage(trafficrow.ClicksChange)}</TableCell>
                                                        <TableCell>{trafficrow.KwWindowVolume}</TableCell>
                                                        <TableCell>{formatAsPercentage(trafficrow.VolumeChange)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Table>
                        </CardContent>
                        {/* <div className="flex justify-end">
                            <Button variant="link">
                                <Link href={`./${chatId}/secondaryPage/searchAnalysis`}>Show more search terms</Link>
                            </Button>
                        </div> */}
                    </div>
                </Card>
            </div>

        </>

    );
};

export default SearchAnalysis;