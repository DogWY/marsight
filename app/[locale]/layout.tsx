import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { cn } from "@/lib/utils";
import LeftSidebar from "@/components/LeftSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { local: "zh" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);
  const messages  = await getMessages()
  return (
    <html lang={locale}>
      <ClerkProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <div className="w-screen h-screen flex flex-row">
              <LeftSidebar />
              <div className="flex-1">{children}</div>
            </div>
          </NextIntlClientProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}