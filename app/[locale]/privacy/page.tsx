"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Component() {

  // router钩子，用于页面跳转
  const router = useRouter();
  return (
    <>
      <div className="bg-[#ffffff] w-full h-full p-4 space-y-4 overflow-auto">
        <Card className="rounded-[24px]">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Button
                variant="link"
                onClick={() => { router.push('/search') }}
                className="bg-white text-black p-2 rounded-full flex items-center justify-center hover:bg-white hover:border-transparent focus:border-transparent"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Button>
              <span className="text-black text-3xl font-bold">Privacy Policy-Marsight.AI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">MarSight AI Privacy Policy</div>
              <div className="text-sm font-bold my-2">Effective Date: September 9, 2024</div>
              <div className="text-sm">
                At MarSight.AI, We are committed to protecting your privacy and security. This Privacy Policy details the types of information we may collect from you or that you may provide when using our AI data analysis services (&quot;Services&quot;), and how we collect, use, maintain, protect, and disclose that information.
              </div>
              <div className="text-xl font-bold my-2">Information We Collect</div>
              <div className="text-lg font-bold my-2">Information You Provide to Us:</div>
              <div>
                <span className="text-sm font-bold">· Account Information:</span>
                <span className="text-sm">If you create an account, we may collect your name, email address, and password.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· Search Queries:</span>
                <span className="text-sm">We collect the search queries you enter into our services to provide relevant analysis results and improve our services.</span>
              </div>

              <div className="text-lg font-bold my-2">Information We Automatically Collect:</div>
              <div>
                <span className="text-sm font-bold">· Usage Details:</span>
                <span className="text-sm">When you access and use our services, we automatically collect detailed information about your usage, including but not limited to traffic data, location data, logs, and other communication data, as well as the resources that you access and use through our services.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· Device Information:</span>
                <span className="text-sm">We collect information about your device, including IP address, operating system, browser type, and device identifiers.</span>
              </div>

              <div className="text-lg font-bold my-2">Cookies and Tracking Technologies:</div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To improve our services and personalize your user experience, we use cookies and similar tracking technologies to track activity on our services and store certain information.</span>
              </div>

              <div className="text-lg font-bold my-2">Payment Information:</div>
              <div>
                <span className="text-sm font-bold">· Payment and Billing Information:</span>
                <span className="text-sm">If you purchase a subscription or services from us, we may collect payment and billing information. This includes your credit card number, billing address, and other information necessary for processing payments. We use secure payment processing services to handle transactions and do not store your credit card information on our servers.</span>
              </div>

              <div className="text-xl font-bold my-2">Information We Do Not Collect</div>
              <div>
                <span className="text-sm font-bold">· Sensitive Personal Information:</span>
                <span className="text-sm">We do not collect sensitive personal information, such as social security numbers, genetic data, health information, or religious beliefs.</span>
              </div>

              <div className="text-xl font-bold my-2">How We Use Your Informtion</div>
              <div className="text-sm">We use the information you provide and that we automatically collect, including any personal information, for the following purposes:</div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To provide you with our services and their content, as well as any other information, products, or services that you request.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To fulfill the purposes for which you provided the information or as described when the information was collected.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To send you notifications related to your account and subscriptions, including expiration and renewal notices, and to maintain the security and operability of your account.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To fulfill any contractual obligations between us and to exercise our rights, including billing and collection.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To notify you about changes to our services or any products or services we offer or provide through them.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To use the information collected to evaluate and improve the efficiency of our services and to develop new features and services based on user needs and feedback.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">To measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising.</span>
              </div>
              <div>
                <span className="text-sm font-bold">· </span>
                <span className="text-sm">For any other purpose with your consent.</span>
              </div>

              <div className="text-xl font-bold my-2">Data Security</div>
              <div className="text-sm">We take measures to protect your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your personal information transmitted to our services.</div>

              <div className="text-xl font-bold my-2">Changes to Our Privacy Policy</div>
              <div className="text-sm">We may update our Privacy Policy from time to time to reflect changes in our practices, legal and technological developments. The updated policy will be posted on this page, and the effective date will be updated accordingly. We recommend that you review this Privacy Policy periodically to be informed of any changes.</div>

              <div className="text-xl font-bold my-2">Contact Information</div>
              <div className="text-sm">If you have any questions or comments about this Privacy Policy or our privacy practices, please contact us at: </div>
              <div>
                <span className="font-bold text-sm">Email:</span>
                <span className="text-sm">charliechen@marsight.ai </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </>
  )

}