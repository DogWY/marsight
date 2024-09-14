import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataBox } from "@/components/ui/databox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AIInsightsIcon from "@/public/aiinsights.svg";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { CursorArrowIcon, MagnifyingGlassIcon, ReaderIcon, HandIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";

// 最上面的四个盒子的数据
interface SearchAnalysisProps {
  NoofKeywords: number;
  NoofClicks: number;
  MonthlyVisits: number;
  Organic: number;
  Paid: number;
}

const formatNumberInMillions = (num: number) => (num / 1_000_000).toFixed(3) + "M";
const formatBounceRate = (rate: number) => (rate * 100).toFixed(2) + "%";
const formatAsPercentage = (num: number) => (num * 100).toFixed(2) + "%";


// 自然流量数据
type OrganicTrafficData = {
  KeywordClass: string;
  data: {
    Keyword: string;
    Clicks: number;
    Share: number;
    ClicksChange: number;
    KwWindowVolume: number;
    VolumeChange: number;
  }[];
}[];

// 付费流量数据
type PaidTrafficData = {
  KeywordClass: string;
  data: {
    Keyword: string;
    Clicks: number;
    Share: number;
    ClicksChange: number;
    KwWindowVolume: number;
    VolumeChange: number;
  }[];
}[];

// 组件接收的数据
interface SearchAnalysisComponentProps {
  dataofbox: SearchAnalysisProps;
  organic: OrganicTrafficData;
  paid: PaidTrafficData;
  chatId: string;
}

const SearchAnalysis: React.FC<SearchAnalysisComponentProps> = ({ dataofbox, organic, paid, chatId }) => {
  const [selectedOption, setSelectedOption] = useState("organic");
  const dataToShow = selectedOption === "organic" ? organic : paid;

  // 为每个分类创建独立的展开状态
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  // 切换某一行的展开/折叠状态
  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <div className="text-2xl font-extrabold text-[#5F5E5B] flex">
        <Search className="mt-1" />
        <div className="ml-2">Search Analysis</div>
      </div>
      <Card className="rounded-[24px]">
        <CardContent>
          <div className="text-xl mb-4 mt-6 font-extrabold text-[#4281DB]">Search Overview</div>
          <div className="flex justify-start flex-wrap mb-4 mt-6 border-b pb-10 space-x-8">
            <DataBox
              spanText="No.of Keywords"
              paragraphText={dataofbox.NoofKeywords.toString()}
              icon={<MagnifyingGlassIcon />}
            />
            <DataBox
              spanText="No.of Clicks"
              paragraphText={formatNumberInMillions(dataofbox.NoofClicks)}
              icon={<CursorArrowIcon />}
            />
            <DataBox
              spanText="Of All Total Traffic"
              paragraphText={formatBounceRate(dataofbox.NoofClicks / dataofbox.MonthlyVisits)}
              icon={<ReaderIcon />}
            />
            <DataBox
              spanText="Organic vs. Paid"
              paragraphText={`${Math.round(dataofbox.Organic)}:${Math.round(dataofbox.Paid)}`}
              icon={<HandIcon />}
            />
          </div>
        </CardContent>

        <CardHeader className="!font-normal -mt-6">
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
            <Button variant="link" asChild className="p-2 hover:bg-muted/50">
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
          <div className="flex justify-end">
            <Button variant="link">
              <Link href={`./${chatId}/secondaryPage/searchAnalysis`}>Show more search terms</Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export { SearchAnalysis };
