import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface MarketingChannelsProps {
  Social: number;
  Direct: number;
  DisplayAds: number;
  Referrals: number;
  Email: number;
  OrganicSearch: number;
  PaidSearch: number;
}

const MarketingChannels: React.FC<MarketingChannelsProps> = ({
  Social,
  Direct,
  DisplayAds,
  Referrals,
  Email,
  OrganicSearch,
  PaidSearch
}) => {

  // 控制提示框是否显示
  const [isHovered, setIsHovered] = useState(false);
  // 计算所有渠道的总和
  const total = Social + Direct + DisplayAds + Referrals + Email + OrganicSearch + PaidSearch;

  const MarketingChannelsBarChartData = [
    { name: 'Direct', value: (Direct / total * 100).toFixed(2) },
    { name: 'Email', value: (Email / total * 100).toFixed(2) },
    { name: 'Referrals', value: (Referrals / total * 100).toFixed(2) },
    { name: 'Social', value: (Social / total * 100).toFixed(2) },
    { name: 'OrganicSearch', value: (OrganicSearch / total * 100).toFixed(2) },
    { name: 'PaidSearch', value: (PaidSearch / total * 100).toFixed(2) },
    { name: 'DisplayAds', value: (DisplayAds / total * 100).toFixed(2) },
  ]

  return (
    <>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold text-[#4281DB] flex">
            Marketing Channels

            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <InfoCircledIcon className="text-gray-500 hover:text-blue-500" />
              {/* {isHovered && (
                <div className="absolute top-0 right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-md">
                  <p className="text-sm text-gray-700">Direct: Traffic from users entering the URL directly or via bookmarks. Email: Traffic from email marketing efforts. Referrals: Traffic from links on other websites. Social: Traffic from social media platforms. Organic: Traffic from natural search engine results. Paid Search: Traffic from paid search ads. Display Ads: Traffic from display advertising like banners.</p>
                </div>
              )} */}
            </div>

            <div className="relative">
              {isHovered && (
                <div className="absolute top-0 right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-md">
                  <p className="text-sm text-gray-700">Direct: Traffic from users entering the URL directly or via bookmarks. Email: Traffic from email marketing efforts. Referrals: Traffic from links on other websites. Social: Traffic from social media platforms. Organic: Traffic from natural search engine results. Paid Search: Traffic from paid search ads. Display Ads: Traffic from display advertising like banners.</p>
                </div>
              )}
            </div>


          </CardTitle>

        </CardHeader>
        <CardContent className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MarketingChannelsBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip
                formatter={(value) => `${value}%`}
                labelFormatter={(label) => `Channel: ${label}`}
              />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#3E74FE" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export { MarketingChannels };