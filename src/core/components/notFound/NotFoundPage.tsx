import Hero from "./Hero";
import RootLayout from "@/core/components/layouts/RootLayout";
import { SmoothScroll } from "@/core/components/SmoothScroll";

export default function NotFoundPage() {
    return (
        <SmoothScroll>
            <RootLayout>
                <Hero />
            </RootLayout>
        </SmoothScroll>
    );
}
