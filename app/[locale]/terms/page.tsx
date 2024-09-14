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
              <span className="text-black text-3xl font-bold">Terms of Service-Marsight.AI</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-2xl font-bold">MarSight AI Terms of Service</div>
              <div className="text-sm font-bold my-2">Effective Date: September 9, 2024</div>
              <div className="text-sm">
                Thank you for choosing MarSight.AI These Terms of Service (&quot;Terms&quot;) are a legal agreement between you and MarSight.AI and govern your use of the MarSight.AI services including our website, mobile apps, and other features or services (collectively, the &quot;Service&quot;). By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.
              </div>

              <div className="text-xl font-bold my-2">1.Acceptance of Terms</div>
              <div className="text-sm">
                By accessing or using the Service, you confirm your acceptance of these Terms and agree to be bound by them. If you are using the Service on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these Terms.
              </div>

              <div className="text-xl font-bold my-2">2.Changes to Terms</div>
              <div className="text-sm">
                MarSight.AI reserves the right, at its sole discretion, to modify or replace the Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </div>

              <div className="text-xl font-bold my-2">3.Use of the Service</div>

              <div className="text-sm font-bold my-2">
                · Account Registration
              </div>
              <div className="text-sm">
                You may be required to register for an account to access certain features of the Service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </div>

              <div className="text-sm font-bold my-2">
                · User Conduct
              </div>
              <div className="text-sm">
                You are responsible for all your activity in connection with the Service. Any fraudulent, abusive, or otherwise illegal activity may be grounds for termination of your right to access or use the Service.
              </div>

              <div className="text-sm font-bold my-2">
                · Intellectual Property
              </div>
              <div className="text-sm">
                All content within the service is protected by copyright and is the property of MarSight.AI or its licensors.
              </div>

              <div className="text-xl font-bold my-2">4.Data Processing</div>

              <div className="text-sm font-bold my-2">
                · Data Collection
              </div>
              <div className="text-sm">
                The links you submit through MarSight.AI will be used for data analysis. We respect the intellectual property rights of all third parties and commit to using such data only within the legal limits.
              </div>

              <div className="text-sm font-bold my-2">
                · Data Protection
              </div>
              <div className="text-sm">
                MarSight.AI commits to implementing appropriate technical and organizational security measures to protect the data you provide from unauthorized access, disclosure, alteration, or destruction. We are dedicated to preserving the integrity and confidentiality of your data.
              </div>

              <div className="text-sm font-bold my-2">
                · Data Storage and Processing
              </div>
              <div className="text-sm">
                We store and process user data only on servers that meet high security standards. All data processing activities comply with applicable laws and industry best practices.
              </div>

              <div className="text-sm font-bold my-2">
                · Usage Restrictions
              </div>
              <div className="text-sm">
                The website links you submit through MarSight.AI and any resulting analysis reports are considered private information of the user. MarSight.AI uses this information solely to perform necessary data analysis and service provision and may not be used for any unauthorized commercial purposes.
              </div>

              <div className="text-sm font-bold my-2">
                · Disclosure of Information
              </div>
              <div className="text-sm">
                Unless required by law, MarSight.AI will not disclose your data or the results of our analysis to any third parties. Furthermore, we will not sell, rent, share, or otherwise make public your information.
              </div>

              <div className="text-xl font-bold my-2">5.Disclaimers</div>
              <div className="text-sm">
                MarSight.AI provides the Service on an &quot;as is&quot; and &quot;as available&quot; basis. You therefore use the Service at your own risk. MarSight.AI expressly disclaims any and all warranties of any kind, whether express or implied.
              </div>

              <div className="text-xl font-bold my-2">6.Limitation of Liability</div>
              <div className="text-sm">
                To the fullest extent permitted by law, MarSight.AI and its officers, shareholders, employees, agents, directors, subsidiaries, affiliates, successors, assignees, suppliers, or licensors are not liable for:
              </div>

              <div className="text-sm font-bold my-2">
                · Indirect Damages
              </div>
              <div className="text-sm">
                Any indirect, special, incidental, punitive, exemplary, or consequential damages that arise from or are related to the use or inability to use the MarSight.AI services (including but not limited to the website), regardless of whether such damages were foreseeable or if MarSight.AI had been advised of the possibility of such damages.
              </div>

              <div className="text-sm font-bold my-2">
                · Data and Profit Loss
              </div>
              <div className="text-sm">
                MarSight.AI shall not be liable for any loss of use, data, business interruption, or lost profits (whether direct or indirect) that may result from reliance on the analysis results provided by MarSight.AI, regardless of whether such damages were foreseeable or if MarSight.AI had been advised of the possibility of such losses, irrespective of the legal theory on which damages are claimed.
              </div>

              <div className="text-sm font-bold my-2">
                · Accuracy of Information
              </div>
              <div className="text-sm">
                MarSight.AI does not guarantee the completeness, accuracy, or timeliness of information provided through its services. Users should understand that all information accessed or obtained by using the MarSight.AI services is considered merely advisory and should not be relied upon as the sole basis for making decisions.
              </div>

              <div className="text-sm font-bold my-2">
                · Technical Failures
              </div>
              <div className="text-sm">
                MarSight.AI is not responsible for any interruption or delay in services due to technical failures, internet access issues, or site maintenance.
              </div>

              <div className="text-xl font-bold my-2">7.General</div>
              <div className="text-sm">
                These Terms are governed by the laws of the jurisdiction in which MarSight.AI is located, without regard to its conflict of laws rules. The courts in some countries will not apply these jurisdiction&apos;s laws to some types of disputes. If you reside in one of those countries, then where these jurisdiction&apos;s laws are required to apply, the laws of your resident country will apply to such disputes related to these Terms.
              </div>

              <div className="text-xl font-bold my-2">Contact Us</div>
              <div className="text-sm">If you have any questions about these Terms of Service or need further information, please feel free to contact us at:</div>
              <div>
                <span className="font-bold text-sm">Email:</span>
                <span className="text-sm">charliechen@marsight.ai</span>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

    </>
  )

}