import Icons from "@/core/components/icon";
import Tag from "@/core/components/Tag";
import Typography from "@/core/typography";

import Eclipse from '@/assets/images/lates-project-eclipse.png';
import GlobalSecurity from '@/assets/images/sentra/global-security.png';
import Portofolio2 from '@/assets/images/Portfolio-2.png';
import Portofolio3 from '@/assets/images/Portfolio-3.png';

export default function LatestProject() {
    return (
        <div className="bg-white dark:bg-[#070707] w-full px-[20px] md:px-[72px] py-[48px] md:py-[80px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-[24px]">
                <div className="flex flex-col items-start gap-[24px]">
                    <Tag>
                        <Typography size={14} sizeMobile={12} weight={500}>Case Studies</Typography>
                    </Tag>
                    <div className="text-[32px] md:text-[48px] font-bold leading-[41.6px] md:leading-[56px] text-[#070707] dark:text-white">
                        Securing the Future <br />
                        of <img src={Eclipse} alt="Eclipse" className="inline w-10 md:w-20" /> Global Fintech
                    </div>
                </div>
                <div className="flex gap-[10px] border-b border-[#070707] dark:border-white cursor-pointer">
                    <Typography size={16} weight={500}>EXPLORE CASE STUDIES</Typography>
                    <Icons name="arrowRight" className="w-5" />
                </div>
            </div>
            <div className="mt-[64px] grid grid-rows-[auto_1fr] gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="aspect-video w-full md:aspect-auto">
                        <img src={GlobalSecurity} alt="GlobalSecurity" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-video w-full md:aspect-auto">
                        <img src={Portofolio2} alt="Portofolio2" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="aspect-video w-full md:aspect-auto">
                    <img src={Portofolio3} alt="Portofolio3" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    )
}
