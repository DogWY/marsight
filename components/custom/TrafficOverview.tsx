import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { DataBox } from '@/components/ui/databox'
import { PersonIcon, Share2Icon, HeartIcon, BellIcon, ClockIcon, ReaderIcon, EyeOpenIcon, BarChartIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { ChartColumn } from "lucide-react";

interface TrafficOverviewProps {
  MonthlyVisits: number;
  UniqueVisitors: number;
  VisitDuration: number;
  PagesPerVisit: number;
  BounceRate: number;
  PageViews: number;
  DesktopData: {
    Key: string;
    Value: number;
  }[];
  MobileWebData: {
    Key: string;
    Value: number;
  }[];
}

// 工具函数
const formatNumber = (num: number) => {
  if (num < 1_000_000) {
    return (num / 1_000).toFixed(2) + 'K'; // 小于一百万，转化为千
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'; // 小于一亿，转化为百万
  } else {
    return (num / 1_000_000_000).toFixed(2) + 'B'; // 大于一亿，转化为十亿
  }
};
const formatBounceRate = (rate: number) => (rate * 100).toFixed(2) + '%';
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TrafficOverview: React.FC<TrafficOverviewProps> = ({
  MonthlyVisits,
  UniqueVisitors,
  VisitDuration,
  PagesPerVisit,
  BounceRate,
  PageViews,
  DesktopData,
  MobileWebData
}) => {

  // 合并 DesktopData 和 MobileWebData
  const mergeData = (desktopData: { Key: string; Value: number; }[], MobileData: { Key: string; Value: number; }[]) => {
    return desktopData.map(desktopItem => {
      const mobileItem = MobileData.find(item => item.Key === desktopItem.Key);
      return {
        name: desktopItem.Key,     // 将 Key 作为 name
        desktop: desktopItem.Value, // DesktopData 的 Value
        mobile: mobileItem ? mobileItem.Value : 0 // MobileData 的 Value，如果找不到则默认值为 0
      };
    });
  }

  const trafficLineChartData = mergeData(DesktopData, MobileWebData)

  return (
    <>
      <div className="text-2xl font-extrabold text-[#5F5E5B] flex">
        <ChartColumn className="mt-1" />
        <div className="ml-2">Traffic Analysis</div>
      </div>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className='text-xl font-extrabold text-[#4281DB]'>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-start flex-wrap mb-10 mt-2 space-x-6'>
            <DataBox
              spanText="Monthly Visits"
              paragraphText={formatNumber(MonthlyVisits)}
              icon={<EyeOpenIcon />}
            />
            <DataBox
              spanText="Unique Visitors"
              paragraphText={formatNumber(UniqueVisitors)}
              icon={<PersonIcon />}
            />
            <DataBox
              spanText="Visit Duration"
              paragraphText={formatDuration(VisitDuration)}
              icon={<ClockIcon />}
            />
            <DataBox
              spanText="Pages Per Visit"
              paragraphText={PagesPerVisit.toFixed(2)}
              icon={<ReaderIcon />}
            />
            <DataBox
              spanText="Bounce Rate"
              paragraphText={formatBounceRate(BounceRate)}
              icon={<ExternalLinkIcon />}
            />
            <DataBox
              spanText="Page Views"
              paragraphText={formatNumber(PageViews)}
              icon={<BarChartIcon />}
            />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficLineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="desktop" stroke="#4281DB" strokeWidth={3} />
              <Line type="monotone" dataKey="mobile" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export { TrafficOverview };