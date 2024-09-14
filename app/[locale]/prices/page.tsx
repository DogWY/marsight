"use client"
import { Check, Key } from "lucide-react"
import { useTranslations } from "next-intl"
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import OrderPage from "@/components/OrderPgae"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image";
import logoIcon from "@/public/logo.png";

interface dataStruct {
  id: string;
  name: string;
  price: number;
  description: string | null;
  priceId: string;
}

export default function Component() {
  const t = useTranslations("PricesPage")
  const currentAmountRef = useRef<number>(1)
  const { getToken, isSignedIn } = useAuth();
  const template = 'marsight'
  // 价格数据
  const [priceData, setPriceData] = useState<dataStruct[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      console.log(isSignedIn)
      try {
        if (isSignedIn) {
          const jwtToken = await getToken({ template });
          console.log(jwtToken);
          const response = await axios.get('https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/purchase', {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },

          });
          const data = response.data;
          console.log('data:', data);
          setPriceData(data)
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };
    fetchPrices();
  }, [isSignedIn, getToken]);


  const handlePucrhase = async (priceId: string) => {
    try {
      if (isSignedIn) {
        const jwtToken = await getToken({ template });
        console.log(jwtToken)
        const response = await axios.post(
          'https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/purchase/checkout',
          {
            priceId: priceId,
          },
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        const data = response.data;
        console.log('Purchase successful:', data);

        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('No URL found in the response');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
      } else {
        console.error('Unexpected Error:', error);
      }
      console.log('sadsadasd')
    }
  };


  return (
    <div className="bg-white min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-16 font-bold flex justify-center">
          <Image src={logoIcon} alt="logo" className="w-1/5 mr-4" />
          <span className="text-lg text-[#17439B] align-middle" style={{ fontWeight: 900 }}> Pro</span>
        </h1>
        <Dialog>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">

            {/* No.1 */}
            <div
              key={t('liteTitle')}
              className={`bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('liteTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('liteDescription')}</p>
                <div className="relative text-3xl font-bold mb-3">
                  <div className="relative text-3xl font-bold mb-3">
                    <div className="relative text-3xl font-bold mb-3">
                      {'$29.90'}
                      {/* 添加原价 */}
                      <div className="absolute top-0 right-20 text-xs" style={{ textDecoration: 'line-through', textDecorationThickness: '2px' }}>
                        $149
                      </div>
                    </div>
                  </div>
                </div>

                <DialogTrigger asChild>
                  <Button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-[#F7F7F5] text-black hover:bg-slate-300`}
                    onClick={() => handlePucrhase(priceData[3].priceId)}
                  >
                    {t('start')}
                  </Button>
                </DialogTrigger>

                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('threeWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.2 */}
            <div
              key={t('popularTitle')}
              className={`bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col lg:-mt-4 lg:mb-4 w-64`}
            >
              <div className="bg-[#4281DB] text-white text-center py-1 text-sm font-semibold">
                Most Popular
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('popularTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('popularDescription')}</p>
                <div className="relative text-3xl font-bold mb-3">
                  {'$49.90'}
                  {/* 添加原价 */}
                  <div className="absolute top-0 right-20 text-xs" style={{ textDecoration: 'line-through', textDecorationThickness: '2px' }}>
                    $199
                  </div>
                </div>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full py-2 rounded-lg text-sm font-semibold text-white`}
                    onClick={() => handlePucrhase(priceData[2].priceId)}
                  >
                    {t('start')}
                  </Button>
                </DialogTrigger>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('sixWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.3 */}
            <div
              key={t('agencyTitle')}
              className={`bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('agencyTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('agencyDescription')}</p>
                <div className="relative text-3xl font-bold mb-3">
                  {'$99.90'}
                  {/* 添加原价 */}
                  <div className="absolute top-0 right-20 text-xs" style={{ textDecoration: 'line-through', textDecorationThickness: '2px' }}>
                    $299
                  </div>
                </div>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full py-2 rounded-lg text-sm font-semibold bg-[#F7F7F5] text-black hover:bg-slate-300`}
                    onClick={() => handlePucrhase(priceData[1].priceId)}
                  >
                    {t('start')}
                  </Button>
                </DialogTrigger>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('fifteenWebsite')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneUser')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('oneHistory')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('unlimited')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* No.4 */}
            <div
              key={t('enterpriseTitle')}
              className={`bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col w-64`}
            >
              <div className="p-4 flex-grow">
                <h2 className="text-xl font-bold mb-1">{t('enterpriseTitle')}</h2>
                <p className="text-gray-600 text-sm mb-3">{t('enterpriseDescription')}</p>
                <div className="text-3xl font-bold mb-3">{t('letsTalk')}</div>
                <Button
                  onClick={() => handlePucrhase(priceData[0].priceId)}
                  className={`w-full py-2 rounded-lg text-sm font-semibold bg-[#F7F7F5] text-black hover:bg-slate-300`}
                >
                  {t('start')}
                </Button>
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-2">{t('includes')}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('customerManager')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('Insights')}</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="text-green-500 mr-1 flex-shrink-0" size={14} />
                      <span>{t('DataSupport')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogContent>
            <OrderPage amount={currentAmountRef.current} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

