import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "@/core/context/ThemeProvider";
import { NavLink } from "react-router-dom";
import { RoutePaths } from "@/core/routes/route-paths";

import Icons from "@/core/components/icon";
import Tag from "@/core/components/Tag";
import Typography from "@/core/typography";

import SilentVerify from '@/assets/images/sentra/silent-verify.png';
import TrustScoring from '@/assets/images/sentra/trust-scoring.png';
import GlobalSecurity from '@/assets/images/sentra/global-security.png';


export default function Services() {
    const { theme } = useTheme();
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const services = [
        {
            title: "Silent Authentication",
            image: SilentVerify,
            desc: "Verify users instantly without OTPs or passwords. We use encrypted network signals to authenticate identities silently, eliminating friction and increasing conversion.",
        },
        {
            title: "Real-Time Trust Scoring",
            image: TrustScoring,
            desc: "Our AI engine analyzes network behavior, location, and device integrity to provide a high-precision risk score for every transaction and user interaction.",
        },
        {
            title: "Network-Level Integrity",
            image: GlobalSecurity,
            desc: "Protect your platform against SIM swapping, identity spoofing, and synthetic fraud with direct carrier-level signals and collective intelligence.",
        },
    ];

    useEffect(() => {
        cardsRef.current.forEach((card) => {
            if (!card) return;

            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    backgroundColor: theme === "light" ? "#1D1D1D" : "#393939",
                    padding: "24px 32px",
                    borderRadius: "12px",
                    duration: 0.5,
                    ease: "power2.out",
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    backgroundColor: "transparent",
                    padding: "0px",
                    borderRadius: "12px",
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        });
    }, [theme]);
    return (
        <div className="bg-white dark:bg-[#070707] py-[48px] md:py-[80px] px-[8px] md:px-[12px] w-full">
            <div className="bg-[#070707] dark:bg-[#1D1D1D] rounded-[20px] py-[64px] px-[16px] md:p-[60px]">
                <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end self-stretch gap-[16px]">
                    <div className="flex flex-col items-start gap-[24px]">
                        <Tag color="#fff">Our Capabilities</Tag>
                        <Typography as="div" color="#fff" noDarkMode size={48} sizeMobile={32} weight={700} lineHeight={56} lineHeightMobile={41.6}>
                            Infrastructure for <br />
                            Silent Trust
                        </Typography>
                    </div>
                    <div className="flex flex-col items-start gap-[48px] lg:gap-[14px] w-full lg:w-[35%]">
                        <Typography size={14} noDarkMode color="#fff">
                            From silent verification to real-time fraud scoring, we provide the network-level tools you need to secure your fintech platform without compromising user experience.
                        </Typography>
                        <div className="flex gap-[8px] cursor-pointer">
                            <NavLink to={RoutePaths.DOCS}>
                                <Typography size={16} weight={500} noDarkMode color="#fff">API DOCUMENTATION</Typography>
                            </NavLink>
                            <Icons name="arrowRight" className="w-5" color="#fff" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-[51px] mt-[48px] md:mt-[64px]">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            ref={(el) => {
                                if (el) cardsRef.current[idx] = el;
                            }}
                            className="flex flex-col lg:flex-row items-center justify-between w-full gap-[24px]"
                            style={{ padding: 0, backgroundColor: "transparent", borderRadius: "12px" }}
                        >
                            <Typography
                                as="div"
                                size={32}
                                sizeMobile={28}
                                weight={600}
                                lineHeight={40}
                                noDarkMode
                                color="#fff"
                                className="w-full lg:w-[25%]"
                            >
                                {service.title}
                            </Typography>
                            <img src={service.image} alt={service.title} className="w-full lg:w-[20rem] rounded-[20px] order-3 lg:order-2" />
                            <Typography
                                as="div"
                                size={14}
                                lineHeight={20}
                                noDarkMode
                                color="#fff"
                                className="w-full order-2 lg:w-[30%] lg:order-3"
                            >
                                {service.desc}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
