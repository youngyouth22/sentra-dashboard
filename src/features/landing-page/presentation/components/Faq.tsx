import Tag from "@/core/components/Tag";
import Typography from "@/core/typography";
import Accordion, { type AccordionData } from "@/core/components/accordion";

import Builder from '@/assets/images/builder.png';

export default function Faq() {
    const accordionData: AccordionData[] = [
        {
            title: "What is Silent Verification?",
            content: "Silent Verification allows you to authenticate users without requiring OTP codes or passwords. Sentra communicates directly with the user's mobile carrier to verify their identity via encrypted network signals, providing a seamless experience."
        },
        {
            title: "How does Sentra leverage the Nokia Network-as-Code Nexus?",
            content: "We use the Nokia Nexus to access real-time network-level signals from global carriers. This allows us to detect anomalies like SIM swapping, location spoofing, and device tampering at the source, rather than relying on app-level data."
        },
        {
            title: "Is Sentra compliant with data protection regulations?",
            content: "Yes. Sentra is designed with privacy-first principles. We use encrypted signals and do not store sensitive user data. We are fully compliant with GDPR and other local fintech security standards."
        },
        {
            title: "Can I integrate Sentra with my existing authentication system?",
            content: "Absolutely. Sentra is designed to be developer-friendly. You can integrate our API or SDK into your existing Auth0, Firebase, or custom authentication flows with just a few lines of code."
        },
        {
            title: "What is a Trust Score?",
            content: "A Trust Score is an AI-generated value from 0 to 100 that represents the risk level of a transaction. It factors in network signals, device integrity, and historical behavior to help you automate blocking or additional verification steps."
        }
    ];
    return (
        <div className="bg-white dark:bg-[#070707] w-full px-[16px] md:px-[72px] py-[48px] md:py-[80px]">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end w-full gap-[16px]">
                <div className="flex flex-col items-start gap-[24px]">
                    <Tag>
                        <Typography size={14} sizeMobile={12} weight={500}>Frequently Asked Question</Typography>
                    </Tag>
                    <div className="text-[32px] md:text-[48px] font-bold leading-[41.6px] md:leading-[56px] text-[#070707] dark:text-white">
                        Frequently Asked <br />
                        Question
                    </div>
                </div>
                <div className="flex gap-[10px]">
                    <Typography size={16} sizeMobile={14} weight={500} lineHeight={24}>
                        Clear Answers, Quick Solutions, <br />
                        Helping You Move Forward
                    </Typography>
                </div>
            </div>
            <hr className="hidden lg:block border border-[#B2B2B2] w-full my-[64px]" />
            <div className="flex justify-between items-end mt-[48px] lg:mt-0">
                <div className="hidden lg:flex flex-col">
                    <div className="flex justify-between items-end self-stretch">
                        <div>
                            <Typography color="#8D8D8D" noDarkMode>Sentra Nexus</Typography>
                            <Typography color="#070707" weight={600} className="mt-[4px]">INTEGRATION GUIDE</Typography>
                        </div>
                        <Typography color="#070707">v1.2.0</Typography>
                    </div>
                    <img src={Builder} alt="Builder" className="w-[400px] rounded-[16px] mt-[12px]" />
                </div>
                <div className="w-full lg:w-[50%]">
                    <Accordion items={accordionData} />
                </div>
            </div>
        </div>
    )
}
