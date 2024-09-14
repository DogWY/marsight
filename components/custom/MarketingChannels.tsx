import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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

  const MarketingChannelsBarChartData = [
    { name: 'Direct', value: Direct },
    { name: 'Email', value: Email },
    { name: 'Referrals', value: Referrals },
    { name: 'Social', value: Social },
    { name: 'OrganicSearch', value: OrganicSearch },
    { name: 'PaidSearch', value: PaidSearch },
    { name: 'DisplayAds', value: DisplayAds },
  ]
  
  return (
    <>
      <Card className="rounded-[24px] p-2">
        <CardHeader>
          <CardTitle className="text-xl font-extrabold text-[#4281DB]">Marketing Channels</CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MarketingChannelsBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[0, 50]} // Adjusted for better visualization
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