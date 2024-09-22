import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { ResponsiveContainer } from 'recharts'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { useAuth } from "@clerk/nextjs"
import axios from "axios";
import { headers } from "next/headers";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface ReferralsRow {
  Domain: string;
  Category: string;
  Share: number;
  TotalVisits: number;
  Change: number;
}

interface ReferralsProps {
  referralsData: ReferralsRow[];
  chatId: string;
}

// 将小数转成百分数并保留两位小数
const formatPercentage = (decimal: number): string => {
  return `${(decimal * 100).toFixed(2)}%`;
};

// 将数值缩写为k或M格式
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

const Referrals: React.FC<ReferralsProps> = ({ referralsData, chatId }) => {
  // 控制提示框是否显示
  const [isHovered, setIsHovered] = useState(false);

  const { getToken, isSignedIn } = useAuth();
  const template = 'marsight'

  const handleAIInsights = async () => {
    try {
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        console.log(jwtToken);
        const response = axios.post('https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat/insight', {
          chatId: '75f58af9-6c03-11ef-a80e-93948447c487',
          type: '123',
        },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            }
          });
        console.log("返回的AIInsights:", response);
      }
    } catch (error) {
      console.error("Failed to post:", error);
    }
  }


  return (
    <>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <div className='flex justify-between'>
            
            <CardTitle className='text-xl font-extrabold text-[#4281DB] flex flex-1'>
              Referrals
              <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <InfoCircledIcon className="text-gray-500 hover:text-blue-500" />
              </div>
              <div className="relative flex-1">
                {isHovered && (
                  <div className="absolute top-0 right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-md">
                    <p className="text-sm text-gray-700">In SEO (Search Engine Optimization), &quot;Referrals&quot; refer to the traffic directed to your website through links from other websites. </p>
                  </div>
                )}
              </div>
            </CardTitle>

            <Button
              variant="link"
              asChild
              className="p-2 hover:bg-muted/50 flex-1"
              onClick={handleAIInsights}
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
        <div className='-mt-6'>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Link</TableHead>
                  <TableHead>category</TableHead>
                  <TableHead>Traffic Share</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralsData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <a
                        href={`https://${row.Domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 no-underline"
                      >
                        {row.Domain}
                      </a>
                    </TableCell>
                    <TableCell>{row.Category}</TableCell>
                    <TableCell>{formatPercentage(row.Share)}</TableCell>
                    <TableCell>{formatNumber(row.TotalVisits)}</TableCell>
                    <TableCell>{formatPercentage(row.Change)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex justify-end">
            <Button variant="link">
              <Link href={`./${chatId}/secondaryPage/referrals`} >
                Show more details
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export { Referrals };

