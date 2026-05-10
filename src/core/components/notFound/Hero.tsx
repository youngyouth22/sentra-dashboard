import HeroBackground from "../HeroBackground";
import Typography from "@/core/typography";
import Button from "@/core/components/button";

interface HeroProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    showButton?: boolean;
}

export default function Hero({ 
    title = <>404: <br className="md:hidden" /> Signal Lost.</>, 
    description = "The page you are looking for is out of reach of our network. Let's get you back to secure ground.",
    icon = "404",
    showButton = true
}: HeroProps) {
    return (
        <HeroBackground>
            <div className="min-h-[75dvh] md:min-h-[70dvh] lg:min-h-[67dvh] w-full flex flex-col items-center">
                <div className="flex flex-col items-center gap-[24px]">
                    <Typography as="div" color="#fff" className="text-center" size={48} weight={600} letterSpacing={-1.44} noDarkMode>
                        {title}
                    </Typography>
                    <Typography size={18} color="#BABABA" className="text-center w-full md:w-[90%] lg:w-[55%] text-[#ADADAD]" noDarkMode>
                        {description}
                    </Typography>
                </div>
                <div className="text-[202px] md:text-[403px] lg:text-[499.474px] text-white font-semibold absolute top-[75%] md:top-[70%] translate-y-[-50%] opacity-20">
                    {icon}
                </div>
                {showButton && (
                    <Button variant="back" className="z-10 absolute bottom-[40px]">
                        Back to Home
                    </Button>
                )}
            </div>
        </HeroBackground>
    )
}
