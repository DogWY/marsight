"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

interface Referral {
    TotalVisits: number;
    Records: {
        Domain: string;
        Category: string;
        Share: number;
        TotalVisits: number;
        Change: number;
        Reference: {
            link: string;
        }[];
    }[];
}

const Referrals = () => {
    const { historyId } = useParams();
    const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);
    const [frontReferrals, setFrontReferrals] = useState<Referral | null>(null);

    const handleBack = () => {
        window.history.back();
    };

    const handleExpand = (rowIndex: number) => {
        setExpandedRowIndex(expandedRowIndex === rowIndex ? null : rowIndex);
    };

    // 登录认证
    const template = 'marsight';
    const { getToken, isSignedIn } = useAuth();

    const getData = async () => {
        try {
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
                const backReferral = (response.data as any).report.Referral;
                setFrontReferrals(backReferral as Referral);
            }
        } catch (error) {
            console.error('Failed to get chat:', error);
        }
    };

    useEffect(() => {
        if (isSignedIn && historyId) {
            getData();
        }
    }, [isSignedIn, historyId]);

    return (
        <div className="bg-[#ffffff] w-full h-full p-4 space-y-4">
            <Card className="rounded-[24px] p-2 max-h-[80vh] overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Button
                            variant="link"
                            onClick={handleBack}
                            className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Button>
                        <span className="text-xl font-extrabold text-[#4281DB]">Referrals</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {frontReferrals ? (
                        <div className="overflow-y-auto max-h-[60vh]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Link</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Traffic Share</TableHead>
                                        <TableHead>Traffic</TableHead>
                                        <TableHead>Change</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {frontReferrals.Records.map((row, rowIndex) => (
                                        <React.Fragment key={rowIndex}>
                                            <TableRow>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            onClick={() => handleExpand(rowIndex)}
                                                            variant="link"
                                                            className="p-1 rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                                                        >
                                                            {expandedRowIndex === rowIndex ? (
                                                                <ChevronUpIcon className="w-5 h-5 text-black" />
                                                            ) : (
                                                                <ChevronDownIcon className="w-5 h-5 text-black" />
                                                            )}
                                                        </Button>
                                                        <a
                                                            href={`https://${row.Domain}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 no-underline"
                                                        >
                                                            {row.Domain}
                                                        </a>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{row.Category}</TableCell>
                                                <TableCell>{row.Share}</TableCell>
                                                <TableCell>{row.TotalVisits}</TableCell>
                                                <TableCell>{row.Change}</TableCell>
                                            </TableRow>
                                            {expandedRowIndex === rowIndex && (
                                                <TableRow>
                                                    <TableCell colSpan={5}>
                                                        <div className="ml-8">
                                                            {row.Reference.map((linkObj, linkIndex) => (
                                                                <div
                                                                    key={linkIndex}
                                                                    className="border-b border-gray-200 py-2"
                                                                >
                                                                    <a
                                                                        href={linkObj.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-500 no-underline"
                                                                    >
                                                                        {linkObj.link}
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div>No Data Available</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Referrals;
