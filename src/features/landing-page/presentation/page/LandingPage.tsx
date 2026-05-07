import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from '@gsap/react';
import React, { useRef, Suspense } from "react";
import RootLayout from '@/core/components/layouts/RootLayout';

const Hero = React.lazy(() => import("../components/Hero"));
const AboutUs = React.lazy(() => import("../components/AboutUs"));
const LatestProject = React.lazy(() => import("../components/LatestProject"));
const LogoPartners = React.lazy(() => import("../components/LogoPartners"));
const Services = React.lazy(() => import("../components/Services"));
const Pricing = React.lazy(() => import("../components/PricingSection"));
const Faq = React.lazy(() => import("../components/Faq"));
const Testimonials = React.lazy(() => import("../components/Testimonials"));

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

import { SmoothScroll } from '@/core/components/SmoothScroll';
import { useLenis } from '@/core/context/LenisContext';

export default function Home() {
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  const scrollToTestimonials = () => {
    if (lenis && testimonialRef.current) {
      lenis.scrollTo(testimonialRef.current, { offset: -50, duration: 1.2 });
    } else if (testimonialRef.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: testimonialRef.current, offsetY: 50 },
        ease: "power2.inOut",
      });
    }
  };

  return (
    <SmoothScroll>
      <RootLayout>
        <div className="">
        <Suspense>
          <Hero onScrollToTestimonials={scrollToTestimonials} />
          <AboutUs />
          <LatestProject />
          <LogoPartners />
          <Services />
          <Pricing />
          <Faq />
          <div ref={testimonialRef}>
            <Testimonials />
          </div>
        </Suspense>
      </div>
      </RootLayout>
    </SmoothScroll>
  )
}