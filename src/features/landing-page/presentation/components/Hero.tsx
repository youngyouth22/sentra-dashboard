import { NavLink } from "react-router-dom";
import HeroBackground from "@/core/components/HeroBackground";
import Typography from "@/core/typography";
import Button from "@/core/components/button";
import Icons from "@/core/components/icon";
import { RoutePaths } from "@/core/routes/route-paths";

import Avatar1 from '@/assets/images/avatar-1.png';
import Avatar2 from '@/assets/images/avatar-2.png';
import Avatar3 from '@/assets/images/avatar-3.png';
import Avatar4 from '@/assets/images/avatar-4.png';
import HeroNexus from '@/assets/images/sentra/hero-nexus.png';

interface HeroProps {
    onScrollToTestimonials?: () => void;
}

export default function Hero({ onScrollToTestimonials }: HeroProps) {
    return (
        <HeroBackground>
            <div className="flex flex-col lg:flex-row justify-between items-start self-stretch gap-[8px]">
                <div className="w-full order-2 lg:w-[70%] lg:order-1">
                    <Typography as="div" color="#fff" size={72} sizeTablet={52} sizeMobile={40} weight={600} lineHeight={85} lineHeightTablet={64} lineHeightMobile={52} letterSpacing={-2.16} letterSpacingMobile={-1.2} noDarkMode>
                        Silent Trust.
                        Total Security.
                        Network Intelligence.
                    </Typography>
                    <Typography color="#fff" noDarkMode size={18} className="mt-[24px] lg:w-[60%]">
                        SENTRA Nexus leverages Nokia Network-as-Code and AI-driven trust scoring to prevent fintech fraud before it happens.
                    </Typography>
                    <NavLink to={RoutePaths.AUTH}>
                        <Button variant="primary" className="mt-[32px]">START SECURING NOW</Button>
                    </NavLink>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-[12px] pt-[24px] order-1 lg:order-2">
                    <div className="flex items-center">
                        <img src={Avatar1} alt="Avatar1" className="w-[32px]" />
                        <img src={Avatar2} alt="Avatar2" className="w-[32px] ml-[-8px]" />
                        <img src={Avatar3} alt="Avatar3" className="w-[32px] ml-[-8px]" />
                        <img src={Avatar4} alt="Avatar4" className="w-[32px] ml-[-8px]" />
                    </div>
                    <Typography color="#fff" noDarkMode>Trusted by Top Fintechs</Typography>
                </div>
            </div>
            <div className="flex items-center gap-[40px] mt-[48px] lg:hidden">
                <div className="w-[180px]">
                    <Typography color="#070707" size={40} weight={600} lineHeight={48}>99.9%</Typography>
                    <Typography color="#070707" className="mt-[8px]">Fraud Detection</Typography>
                </div>
                <div className="w-[180px]">
                    <Typography color="#070707" size={40} weight={600} lineHeight={48}>0ms</Typography>
                    <Typography color="#070707" className="mt-[8px]">User Latency</Typography>
                </div>
            </div>
            <div className="flex justify-between items-stretch lg:items-end self-stretch mt-[48px] lg:mt-[22px]">
                <div className="hidden lg:flex justify-between items-center gap-[8px] text-[#070707] dark:text-white cursor-pointer" onClick={onScrollToTestimonials}>SCROLL DOWN <Icons name="arrowDown" className="w-5" /></div>
                <div className="relative flex flex-col justify-between items-end pt-[56px] lg:pt-0">
                    <div className="hidden absolute left-0 top-[-650%] lg:flex items-center gap-[80px]">
                        <div className="w-[180px]">
                            <Typography color="#070707" size={40} weight={600} lineHeight={48}>99.9%</Typography>
                            <Typography color="#070707" className="mt-[8px]">Fraud Detection</Typography>
                        </div>
                        <div className="w-[180px]">
                            <Typography color="#070707" size={40} weight={600} lineHeight={48}>0ms</Typography>
                            <Typography color="#070707" className="mt-[8px]">User Latency</Typography>
                        </div>
                    </div>
                    <NavLink to={RoutePaths.DOCS}>
                        <div className="flex justify-between items-center gap-[8px] text-[#070707] text-[14px] dark:text-white cursor-pointer">READ DOCUMENTATION <Icons name="arrowUpRight" className="w-5" /></div>
                    </NavLink>
                    <Typography as="div" className="lg:hidden" color="#070707" size={28} weight={500} lineHeight={24}><Typography as="span" color="#8D8D8D" size={28} weight={500} lineHeight={24} noDarkMode >5</Typography>/5</Typography>
                </div>
                <div className="flex items-end gap-[24px] w-[50%] md:w-auto">
                    <Typography as="div" className="hidden lg:inline-block" color="#070707" size={28} weight={500} lineHeight={24}><Typography as="span" color="#8D8D8D" size={28} weight={500} lineHeight={24} noDarkMode >5</Typography>/5</Typography>
                    <div>
                        <div className="flex justify-between items-start self-stretch">
                            <div>
                                <Typography color="#8D8D8D" noDarkMode>Sentra Nexus</Typography>
                                <Typography color="#070707" weight={600} className="mt-[4px]">INFRASTRUCTURE</Typography>
                            </div>
                            <Typography color="#070707">v1.2.0</Typography>
                        </div>
                        <img src={HeroNexus} alt="HeroNexus" className="w-full md:w-[270px] rounded mt-[12px]" />
                    </div>
                </div>
            </div>
        </HeroBackground>
    )
}
