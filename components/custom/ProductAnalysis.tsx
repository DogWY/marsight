import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import heygenIcon from "@/public/heygen.svg";
import Image from "next/image";
import { Target } from "lucide-react";

interface ProductAnalysisProps {
  ProductIconUrl: string;
  ProductSummary: string;
  TargetUsers: string;
  CoreFeatures: string;
  UseCases: string;
  DomainName: string;
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({
  ProductIconUrl,
  ProductSummary,
  TargetUsers,
  CoreFeatures,
  UseCases,
  DomainName,
}) => {
  return (
    <>
      <div className="text-2xl font-extrabold text-[#5F5E5B] flex">
        <Target className="mt-1" />
        <div className="ml-2">Product Analysis</div>
      </div>
      <Card className="rounded-[24px] p-2">
        <CardContent>
          <div className="text-base font-bold mb-2 mt-2 flex items-center">
            <Image
              src={ProductIconUrl}
              alt="Mail"
              width={24}
              height={24}
              className="w-5 mb-2 mt-2"
            />
            <span className="ml-2">{DomainName}</span>
          </div>
          <div className="text-sm leading-relaxed mt-2 mb-2">{ProductSummary}</div>
          <div className='flex flex-row space-x-4'>

            {/* Target Users Card */}
            <div className='flex-1 flex flex-col bg-white shadow-md rounded-[24px]'>
              <div className='bg-[#f7f7f5] flex-1/3 rounded-t-[24px] p-4'>
                <div className='flex justify-center items-center mb-2 mt-1 font-bold h-full'>
                  Target Users
                </div>
              </div>
              <div className="flex-1 p-4 rounded-b-[24px]">
                <ul className="text-sm text-left mb-10 ml-3">
                  {TargetUsers.split('\n').map((user, index) => (
                    <li key={index}>{user}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Features Card */}
            <div className='flex-1 flex flex-col bg-white shadow-md rounded-[24px]'>
              <div className='bg-[#f7f7f5] flex-1/3 rounded-t-[24px] p-4'>
                <div className='flex justify-center items-center mb-2 mt-1 font-bold h-full'>
                  Core Features
                </div>
              </div>
              <div className="flex-1 p-4 rounded-b-[24px]">
                <ul className='text-sm text-left ml-2'>
                  {CoreFeatures.split('\n').map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use Cases Card */}
            <div className='flex-1 flex flex-col bg-white shadow-md rounded-[24px]'>
              <div className='bg-[#f7f7f5] flex-1/3 rounded-t-[24px] p-4'>
                <div className='flex justify-center items-center mb-2 mt-1 font-bold h-full'>
                  Use Cases
                </div>
              </div>
              <div className="flex-1 p-4 rounded-b-[24px]">
                <ul className='text-sm text-left'>
                  {UseCases.split('\n').map((usecase, index) => (
                    <li key={index}>{usecase}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
          
          {/* </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export { ProductAnalysis };