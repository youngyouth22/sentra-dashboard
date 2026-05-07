import React, { type PropsWithChildren, useState } from 'react';

// CUSTOM COMPONENTS
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/core/util/ScrollToTop';
const MobileNavigation = React.lazy(() => import('./MobileNavigation'));

export default function RootLayout({ children }: PropsWithChildren) {
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const handleOpenMobileNav = () => {
        setOpenMobileNav(!openMobileNav);
    }
    return (
        <div>
            {/* HEADER SECTION */}
            <Header mobileOpen={openMobileNav} onOpenMobileNav={handleOpenMobileNav} />

            <MobileNavigation open={openMobileNav} handleOpen={handleOpenMobileNav} />

            <ScrollToTop />

            {/* MAIN CONTENT RENDER SECTION */}
            {children}

            {/* FOOTER SECTION */}
            <Footer />
        </div>
    )
}
