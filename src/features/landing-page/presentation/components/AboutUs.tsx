import { useRef, useEffect } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/core/context/ThemeProvider";

import Tag from "@/core/components/Tag";
import Typography from "@/core/typography";

import Group from '@/assets/images/group.png';
import Cash from '@/assets/images/cash.png';
import Target from '@/assets/images/target.png';

export default function AboutUs() {
    const { theme } = useTheme();
    const descAboutUs = "Sentra is the backbone of modern fintech security. By leveraging collective intelligence and real-time network signals, we eliminate the tradeoff between security and user experience. Our infrastructure connects directly to global carrier networks to provide silent authentication and AI-driven trust scoring.";

    const descAboutUsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!descAboutUsRef.current) return

        const chars = descAboutUsRef.current.querySelectorAll("span")

        ScrollTrigger.getAll().forEach(t => t.kill())

        gsap.set(chars, { opacity: 1, color: "#8D8D8D" })

        gsap.to(chars, {
            opacity: 1,
            color: theme === "light" ? "#070707" : "#fff",
            stagger: 0.05,
            scrollTrigger: {
                trigger: descAboutUsRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
            },
        })

        ScrollTrigger.refresh()

    }, [theme])



    return (
        <div className="bg-white dark:bg-[#070707] w-full px-[20px] md:px-[72px] py-[48px] md:py-[80px] flex flex-col md:flex-row justify-between items-start gap-[24px]">
            <Tag>
                <Typography size={14} sizeMobile={12} weight={500}>Our Mission</Typography>
            </Tag>
            <div className="w-full md:w-[65%] flex flex-col gap-[48px] md:gap-[80px]">
                <div ref={descAboutUsRef} className="text-[28px] md:text-[40px] font-semibold leading-[36.8px] md:leading-[48px]" style={{ whiteSpace: "pre-wrap" }}>
                    {descAboutUs.split("").map((char, index) => (
                        <span key={index} className="inline-block">
                            {char}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-[32px]">
                    <div className="flex flex-col items-start gap-[24px] md:gap-[32px]">
                        <img src={Group} alt="group" className="w-12" />
                        <div>
                            <Typography size={20} weight={700} lineHeight={32}>
                                Carrier-Level Data
                            </Typography>
                            <Typography sizeMobile={14} className="mt-[4px]">
                                Real-time signals from global mobile networks.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[24px] md:gap-[32px]">
                        <img src={Cash} alt="Cash" className="w-12" />
                        <div>
                            <Typography size={20} weight={700} lineHeight={32}>
                                AI Trust Engine
                            </Typography>
                            <Typography className="mt-[4px]">
                                Advanced scoring for every transaction.
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[24px] md:gap-[32px]">
                        <img src={Target} alt="Target" className="w-12" />
                        <div>
                            <Typography size={20} weight={700} lineHeight={32}>
                                Zero-Friction UX
                            </Typography>
                            <Typography className="mt-[4px]">
                                Silent authentication without OTPs.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
