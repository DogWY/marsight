"use client";
import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { PanelLeftClose, Search, History, Bot, PanelRightClose } from "lucide-react";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/public/logo.png";
import { useTranslations } from "next-intl";
import axios from "axios";


interface Chat {
  chatId: string;
  topic: string;
}

export default function LeftSidebar() {

  const { getToken, isSignedIn } = useAuth();
  const template = 'marsight'

  // 当前用户所有对话
  const [allChats, setAllChats] = useState<Chat[]>([]);

  const DotIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
      </svg>
    )
  }

  useEffect(() => {

    const fetchChats = async () => {
      console.log(isSignedIn)
      try {
        if (isSignedIn) {
          const jwtToken = await getToken({ template });
          const response = await axios.get('https://zyzc73u8a0.execute-api.us-east-1.amazonaws.com/Alpha/chat/list', {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          });
          const data = response.data;
          setAllChats(data);
          console.log('当前用户所有的chat:', data);
        }
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };
    fetchChats();

  }, [isSignedIn, getToken]);

  const [isOpen, setIsOpen] = useState(true);
  const { user, isLoaded } = useUser();
  const t = useTranslations('LeftSidebar')
  return (
    <div
      className={cn(
        "h-screen flex flex-col justify-between gap-4 bg-[#F7F7F5] relative",
        isOpen ? "w-[200px]" : "w-16"
      )}
    >
      {/* LOGO */}
      <div className="w-full h-16 flex flex-row justify-center items-center text-xl font-bold">
        {isOpen ? (
          <Image src={logoIcon} alt="logo" className="w-8/12 object-cover" />
        ) : (
          <Button variant="ghost">
            <Bot width={32} height={32} className="w-8 h-8" />
          </Button>
        )}
      </div>
      {/* CONTENT */}
      <div className="flex-1 h-screen overflow-scroll scrollbar-hide">
        <Button variant={"link"} className="w-full text-[#5F5E5B] font-bold hover:text-[#1D1B17]">
          <Link
            href={`/search`}
            className="h-6 w-full flex flex-row px-2 items-center cursor-pointer gap-2"
          >
            <Search width={16} height={16} className="w-4 h-4" />
            {isOpen && t('search')}
          </Link>
        </Button>
        {isOpen && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="px-6">
              <AccordionTrigger disabled={!isOpen}>
                <div className="w-full h-6 flex flex-row items-center gap-2 font-bold text-[#5F5E5B] hover:text-[#1D1B17]">
                  <History width={16} height={16} className="w-4 h-4" />
                  {isOpen && t('library')}
                </div>
              </AccordionTrigger>
              <AccordionContent asChild>

                <Button variant={"link"} className="w-full text-[#5F5E5B] hover:text-[#1D1B17]">
                  <Link
                    href={'/example'}
                    className="h-6 w-full flex flex-row px-2 items-center cursor-pointer gap-2"
                  >
                    example
                  </Link>
                </Button>

                {allChats.map((chat, index) => (
                  <Button variant={"link"} className="w-full text-[#5F5E5B] hover:text-[#1D1B17]" key={index}>
                    <Link
                      href={`/search/history/${chat.chatId}`}
                      className="h-6 w-full flex flex-row px-2 items-center cursor-pointer gap-2"
                    >
                      {chat.topic}
                    </Link>
                  </Button>
                ))}

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div className="w-5/6 ml-2">
        <Card className="p-4 pr-2 bg-white rounded-[24px]">
          <div className="font-semibold text-base leading-relaxed">
            {isOpen && t('title')}
          </div>
          <div className="text-sm leading-relaxed mt-2 mb-2">
            {isOpen && t('content')}
          </div>
          <Button className="mb-2 rounded-[24px]" variant="default">
            <Link href="/en/prices" >
              {isOpen && t('button')}
            </Link>
          </Button>
        </Card>
      </div>

      <div className="w-full flex justify-center">
        {isOpen && (
          <SignedOut>
            <SignInButton>
              <Button className="w-10/12">{t('signin')}</Button>
            </SignInButton>
          </SignedOut>
        )}

        <SignedIn>
          <div className="w-full flex flex-row items-center gap-2 px-4">
            <UserButton />
            {isOpen && (
              <div>{user?.username || user?.firstName || user?.lastName}</div>
            )}
          </div>
        </SignedIn>
      </div>

      {/* BOTTOM */}
      <div
        className={cn(
          "h-14 w-full  flex flex-row px-4 items-center border-t-[1px] border-t-gray-200",
          isOpen ? "justify-between" : "justify-center"
        )}
      >
        {isOpen ? (
          <>
            <LanguageSwitcher />
          </>
        ) : null}
        {
          isOpen ? <PanelLeftClose onClick={() => setIsOpen((prev) => !prev)} /> : <PanelRightClose onClick={() => setIsOpen((prev) => !prev)} />
        }
      </div>
    </div>
  );
}
