import { useRef, useState } from "react";
import gsap from "gsap";

import Icons from "@/core/components/icon";
import Tag from "@/core/components/Tag";
import Typography from "@/core/typography";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Idriss Monthe",
    role: "CEO @Moneco",
    message:
      "Sentra allowed us to eliminate OTP friction while increasing our fraud detection by 95% in emerging markets. It's the infrastructure we've been waiting for.",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Head of Risk @SecurePay",
    message:
      "The real-time network signals provided by the Sentra Nexus are a game changer. We can now detect SIM swapping attempts before the transaction even hits our gateway.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "David Miller",
    role: "CTO @NeoBank",
    message:
      "Silent verification is exactly what the modern fintech industry needed. No more intrusive codes—just seamless, encrypted trust between the user and the network.",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateContent = () => {
    const tl = gsap.timeline();

    tl.to(contentRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      ease: "power1.out",
      onComplete: () => {
        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      },
    });
  };

  const prev = () => {
    animateContent();
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }, 300);
  };

  const next = () => {
    animateContent();
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 300);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="bg-white dark:bg-[#070707] w-full px-[16px] md:px-[72px] py-[48px] md:py-[80px] flex flex-col items-center justify-center gap-[64px]">
      <Tag>
        <Typography size={14} sizeMobile={12} weight={500}>Client Testimonials</Typography>
      </Tag>

      <div className="relative w-full md:px-[32px] text-center">
        <button
          onClick={prev}
          className="hidden md:inline absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-[#1146F2] rounded-full w-[48px] h-[48px] p-[10px] items-center justify-center dark:bg-[#070707] dark:text-white"
        >
          <Icons name="arrowLeft" />
        </button>

        <button
          onClick={next}
          className="hidden md:inline absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-[#1146F2] rounded-full w-[48px] h-[48px] p-[10px] items-center justify-center dark:bg-[#070707] dark:text-white"
        >
          <Icons name="arrowRight" />
        </button>

        <div className="w-full md:w-[75%] md:mx-auto" ref={contentRef}>
          <p className="text-[24px] md:text-[40px] font-semibold text-[#070707] dark:text-white leading-[31.6px] md:leading-[48px]">
            {current.message}
          </p>

          <div className="mt-[48px] md:mt-[64px] flex flex-col md:flex-row items-center justify-center gap-[12px] md:gap-[20px]">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-11 md:w-13 h-11 md:h-13 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="font-bold text-[#070707] dark:text-white text-[16px] md:text-[20px]">
                {current.name}
              </p>
              <p className="text-[14px] md:text-[16px] text-[#070707] dark:text-white">{current.role}</p>
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-[24px] mt-[48px] md:hidden">
            <button
              onClick={prev}
              className="bg-white border border-[#1146F2] rounded-full w-[32px] h-[32px] p-[8px] flex items-center justify-center dark:bg-[#070707] dark:text-white"
            >
              <Icons name="arrowLeft" />
            </button>

            <button
              onClick={next}
              className="bg-white border border-[#1146F2] rounded-full w-[32px] h-[32px] p-[8px] flex items-center justify-center dark:bg-[#070707] dark:text-white"
            >
              <Icons name="arrowRight" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
