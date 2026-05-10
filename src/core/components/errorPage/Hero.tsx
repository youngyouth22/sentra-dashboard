import HeroBackground from "../HeroBackground";
import Typography from "@/core/typography";
import Button from "@/core/components/button";
import Tag from "@/core/components/Tag";

interface HeroProps {
    tag?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    showButton?: boolean;
    action?: React.ReactNode;
}

export default function Hero({
    tag = "System Snag",
    title = <>Connection <br className="md:hidden"/> Snag.</>,
    description = "Our trust nodes encountered an unexpected signal. We are recalibrating the system. Please try again in a moment.",
    showButton = true,
    action
}: HeroProps) {
    return (
        <HeroBackground>
            <div className="min-h-[75dvh] md:min-h-[70dvh] lg:min-h-[68dvh] w-full flex flex-col items-center">
                <Tag color="#fff" noDarkMode noIcon>{tag}</Tag>
                <div className="flex flex-col items-center gap-[32px] md:gap-[12px] mt-[48px]">
                    <Typography as="div" color="#fff" className="text-center" size={88} sizeMobile={100} weight={600} lineHeightMobile={100} letterSpacing={-1.44} noDarkMode>
                        {title}
                    </Typography>
                    <Typography size={18} color="#BABABA" className="text-center w-full md:w-[80%]" noDarkMode>
                        {description}
                    </Typography>
                </div>
                {action ? (
                    <div className="z-10 absolute bottom-[40px]">
                        {action}
                    </div>
                ) : showButton && (
                    <Button variant="back" className="z-10 absolute bottom-[40px]">
                        Back to Home
                    </Button>
                )}
            </div>
        </HeroBackground>
    )
}
