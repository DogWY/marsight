"use client"
import React, { useEffect, useState } from 'react'
import { Resizable } from 're-resizable'
import { Influencers } from '@/components/custom/Influencers'
import { Mentions } from '@/components/custom/Mentions'
import { SocialMediaAnalysis } from '@/components/custom/SocialMediaAnalysis'
import { ProductAnalysis } from '@/components/custom/ProductAnalysis'
import { TrafficOverview } from '@/components/custom/TrafficOverview'
import { MarketingChannels } from '@/components/custom/MarketingChannels'
import { Referrals } from '@/components/custom/Referrals'
import { SearchAnalysis } from '@/components/custom/SearchAnalysis'
import { Chat, Message } from '@/components/custom/Chat';
import { useParams } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"
import NoDataCard from "@/components/custom/NoDataCard"
import axios from 'axios';

export default function Component() {

  interface ProductAnalysis {
    description: string;
    target_users: string;
    core_function: string;
    application_scenario: string;
  }
  const [frontProductAnalysis, setFrontProductAnalysis] = useState<ProductAnalysis | null>()

  interface Introduction {
    icon: string;
    mainDomainName: string;
  }
  const [frontIntroduction, setFrontIntroduction] = useState<Introduction | null>()

  interface TrafficAndEngagement {
    daily: {
      Desktop: {
        Key: string;
        Value: number;
      }[];
      MobileWeb: {
        Key: string;
        Value: number;
      }[];
    };
    total: {
      AvgMonthVisits: number;
      UniqueUsers: number;
      AvgVisitDuration: number;
      PagesPerVisit: number;
      BounceRate: number;
      TotalPagesViews: number;
    };
  }
  const [frontTraffic, setFrontTraffic] = useState<TrafficAndEngagement | null>();


  interface MarketingChannels {
    Social: number;
    Direct: number;
    'Display Ads': number;
    Referrals: number;
    Email: number;
    'Organic Search': number;
    'Paid Search': number;
  }
  const [frontMarketingChannels, setFrontMarketingChannels] = useState<MarketingChannels | null>();

  interface Referral {
    TotalVisits: number;
    Records: {
      Domain: string;
      Category: string;
      Share: number;
      TotalVisits: number;
      Change: number;
    }[];
  }
  const [frontReferrals, setFrontReferrals] = useState<Referral | null>();
  const referralsToDisplay = frontReferrals?.Records.slice(0, 10) || [];

  interface Influncers {
    authors_id: string;
    author_avatar_url: string;
    author: string;
    service: string;
    author_url: string;
    count: string;
    followers_count: string;
  }
  const [frontInfluencers, setFrontInfluencers] = useState<Influncers[] | null>();
  const influencersToDisplay = frontInfluencers?.slice(0, 10) || [];

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
  const [frontSearchAnalysis, setFrontSearchAnalysis] = useState<Keywords | null>();

  interface SocialOverview {
    Records: {
      Page: string;
      Visits: number;
    }[];
    TopSources: {
      Name: string;
      Value: number;
    }[];
  }
  const [frontSocialOverview, setFrontSocialOverview] = useState<SocialOverview | null>();

  interface MentionOverview {
    results_count: string;
    total_number_of_likes: string;
    total_number_of_shares: string;
  }
  const [frontMentionOverview, setFrontMentionOverview] = useState<MentionOverview | null>();

  interface MentionChart {
    total_results: {
      graph_data: {
        date_from: string;
        date_to: string;
        results_nb: number;
      }[];
    }
  }
  const [frontMentionChart, setFrontMentionChart] = useState<MentionChart | null>();

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
  const [frontMentions, setFrontMentions] = useState<Mentions | null>();
  const array1ToDisplay = frontMentions?.The_most_popular_mentions.slice(0, 10) || [];
  const array2ToDisplay = frontMentions?.Mentions_from_the_most_popular_public_profiles.slice(0, 10) || [];

  // 当前页面的chatId
  const { historyId } = useParams()
  const chatIdString = Array.isArray(historyId) ? historyId[0] : historyId;
  // 登录认证内容
  const template = 'marsight'
  const { getToken, isSignedIn } = useAuth();

  const [insights, setInsights] = useState<string[]>();
  const [messages, setMessages] = useState<Message[]>();
  const [chatId, setChatId] = useState<string>();

  // 获得当前页面需要渲染的信息
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
        console.log("返回的数据:", response.data);
        // 得到后端的 shit

        const chatMessage = (response.data as any).chat
        setInsights(chatMessage.insight)
        setMessages(chatMessage.messages)

        const chatId = (response.data as any).chatId
        setChatId(chatId as string)

        const backTraffic = (response.data as any).report.TrafficAndEngagement
        setFrontTraffic(backTraffic as TrafficAndEngagement)
        const backMarketingChannels = (response.data as any).report.MarketingChannels
        setFrontMarketingChannels(backMarketingChannels as MarketingChannels)
        const backReferral = (response.data as any).report.Referral
        setFrontReferrals(backReferral as Referral)

        const backProductAnalysis = (response.data as any).report.ProductAnalysis
        setFrontProductAnalysis(backProductAnalysis as ProductAnalysis)
        const backIntroduction = (response.data as any).report.Introduction
        setFrontIntroduction(backIntroduction as Introduction)

        const backInfluncers = (response.data as any).report.Influncers
        setFrontInfluencers(backInfluncers as Influncers[])

        const backKeywords = (response.data as any).report.Keywords
        setFrontSearchAnalysis(backKeywords as Keywords)

        const backSocialOverview = (response.data as any).report.SocialOverview
        console.log("返回的数据fdsfsdfsd:", backSocialOverview);
        setFrontSocialOverview(backSocialOverview as SocialOverview)
        console.log("返d:", frontSocialOverview);

        const backMentionOverview = (response.data as any).report.MentionOverview
        setFrontMentionOverview(backMentionOverview as MentionOverview)

        const backMentionChart = (response.data as any).report.MentionChart
        setFrontMentionChart(backMentionChart as MentionChart)

        const backMentions = (response.data as any).report.Mentions
        setFrontMentions(backMentions as Mentions)
      }
    } catch (error) {
      console.error('Failed to get chat:', error);
    }
  };

  useEffect(() => {
    getData(); // 页面初始化的时候调用 getData 获得数据
  }, []); // 空数组确保只在组件挂载时执行一次

  // 添加监听 frontSocialOverview 状态的 useEffect
  useEffect(() => {
    if (frontSocialOverview) {
      console.log("Updated frontSocialOverview:", frontSocialOverview);
    }
  }, [frontSocialOverview]); // 每次 frontSocialOverview 更新时执行


  return (
    <div className="flex h-screen overflow-hidden bg-[#ffffff] p-4">
      <Resizable
        defaultSize={{
          width: '70%',
          height: '100%',
        }}
        enable={{ right: false }}
        handleComponent={{
          right: <div className="w-1 h-full bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors" />
        }}
      >
        <div className="h-full overflow-auto">
          <div className='sticky top-0 bg-white z-10 text-xl font-extrabold text-[#5F5E5B] border-b w-full pb-3 pl-6 relative'>
            Marketing Strategy
          </div>
          <div className="p-4 space-y-4 min-w-[500px]">

            {frontProductAnalysis &&
              frontIntroduction &&
              frontIntroduction.icon &&
              frontProductAnalysis.description &&
              frontProductAnalysis.target_users &&
              frontProductAnalysis.core_function &&
              frontProductAnalysis.application_scenario ? (
              <ProductAnalysis
                ProductIconUrl={frontIntroduction.icon}
                ProductSummary={frontProductAnalysis.description}
                TargetUsers={frontProductAnalysis.target_users}
                CoreFeatures={frontProductAnalysis.core_function}
                UseCases={frontProductAnalysis.application_scenario}
                DomainName={frontIntroduction.mainDomainName}
              />
            ) : (
              <NoDataCard />
            )}


            {frontTraffic &&
              frontTraffic.daily.Desktop.length > 0 &&
              frontTraffic.daily.MobileWeb.length > 0 &&
              frontTraffic.total.AvgMonthVisits &&
              frontTraffic.total.UniqueUsers &&
              frontTraffic.total.AvgVisitDuration &&
              frontTraffic.total.PagesPerVisit &&
              frontTraffic.total.BounceRate &&
              frontTraffic.total.TotalPagesViews ? (
              <TrafficOverview
                MonthlyVisits={frontTraffic.total.AvgMonthVisits}
                UniqueVisitors={frontTraffic.total.UniqueUsers}
                VisitDuration={frontTraffic.total.AvgVisitDuration}
                PagesPerVisit={frontTraffic.total.PagesPerVisit}
                BounceRate={frontTraffic.total.BounceRate}
                PageViews={frontTraffic.total.TotalPagesViews}
                DesktopData={frontTraffic.daily.Desktop}
                MobileWebData={frontTraffic.daily.MobileWeb}
              />
            ) : (
              <NoDataCard />
            )}


            {frontMarketingChannels &&
              frontMarketingChannels.Social &&
              frontMarketingChannels.Direct &&
              frontMarketingChannels['Display Ads'] &&
              frontMarketingChannels.Referrals &&
              frontMarketingChannels.Email &&
              frontMarketingChannels['Organic Search'] &&
              frontMarketingChannels['Paid Search'] ? (
              <MarketingChannels
                Social={frontMarketingChannels.Social}
                Direct={frontMarketingChannels.Direct}
                DisplayAds={frontMarketingChannels['Display Ads']}
                Referrals={frontMarketingChannels.Referrals}
                Email={frontMarketingChannels.Email}
                OrganicSearch={frontMarketingChannels['Organic Search']}
                PaidSearch={frontMarketingChannels['Paid Search']}
              />
            ) : (
              <NoDataCard />
            )}


            {frontReferrals && frontReferrals.Records.length > 0 ? (
              <Referrals referralsData={referralsToDisplay} chatId={chatIdString} />
            ) : (
              <NoDataCard />
            )}

            {frontSearchAnalysis && frontTraffic && frontSearchAnalysis.organic_brand.Records.length > 0 && frontSearchAnalysis.organic_nonbrand.Records.length > 0 && frontSearchAnalysis.paid_brand.Records.length > 0 && frontSearchAnalysis.paid_nonbrand.Records.length > 0 && frontSearchAnalysis.all_brand.KeywordsCount && frontSearchAnalysis.all_brand.OverallClicks && frontSearchAnalysis.organic_nonbrand.KeywordsCount && frontSearchAnalysis.organic_brand.KeywordsCount && frontSearchAnalysis.paid_brand.KeywordsCount && frontSearchAnalysis.paid_nonbrand.KeywordsCount && frontTraffic.total.AvgMonthVisits ? (<SearchAnalysis
              dataofbox={{
                NoofKeywords: frontSearchAnalysis.all_brand.KeywordsCount,
                NoofClicks: frontSearchAnalysis.all_brand.OverallClicks,
                MonthlyVisits: frontTraffic.total.AvgMonthVisits,
                Organic: frontSearchAnalysis.organic_brand.KeywordsCount + frontSearchAnalysis.organic_nonbrand.KeywordsCount,
                Paid: frontSearchAnalysis.paid_brand.KeywordsCount + frontSearchAnalysis.paid_nonbrand.KeywordsCount,
              }}
              organic={[
                {
                  KeywordClass: 'Branded Keywords',
                  data: frontSearchAnalysis.organic_brand.Records.slice(0, 5)

                },
                {
                  KeywordClass: 'Non-Branded Keywords',
                  data: frontSearchAnalysis.organic_nonbrand.Records.slice(0, 5)
                }
              ]}
              paid={[
                {
                  KeywordClass: 'Branded Keywords',
                  data: frontSearchAnalysis.paid_brand.Records.slice(0, 5)

                },
                {
                  KeywordClass: 'Non-Branded Keywords',
                  data: frontSearchAnalysis.paid_nonbrand.Records.slice(0, 5)
                }
              ]}
              chatId={chatIdString}
            />) : (
              <NoDataCard />
            )}

            {frontSocialOverview &&
              frontMentionOverview &&
              frontMentionChart ? (
              <SocialMediaAnalysis
                TotalSocialVisits={frontSocialOverview.Records.reduce((total, record) => total + record.Visits, 0)}
                Mentions={frontMentionOverview.results_count}
                TotalLikes={frontMentionOverview.total_number_of_likes}
                TotalShares={frontMentionOverview.total_number_of_shares}
                LineChartData={frontMentionChart.total_results.graph_data}
                PieChartData={frontSocialOverview.TopSources}
              />
            ) : (
              <NoDataCard />
            )}


            {frontMentions && frontMentions.Mentions_from_the_most_popular_public_profiles.length > 0 && frontMentions.The_most_popular_mentions.length > 0 ? (
              <Mentions
                mentions={array1ToDisplay}
                mentionsFrom={array2ToDisplay}
                chatId={chatIdString}
              />
            ) : (
              <NoDataCard />
            )}

            {frontInfluencers && frontInfluencers.length > 0 ? (
              <Influencers influencers={influencersToDisplay} chatId={chatIdString} />
            ) : (
              <NoDataCard />
            )}

          </div>
        </div>
      </Resizable>
      <Chat messages={messages || []} insights={insights || []} chatId={chatId || ''} setInsights={setInsights} setMessages={setMessages} />
    </div>

  )
}