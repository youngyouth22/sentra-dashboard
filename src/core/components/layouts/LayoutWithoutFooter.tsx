import React, { type PropsWithChildren, useState } from 'react';

// CUSTOM COMPONENTS
import Header from './Header';
import ScrollToTop from '@/core/util/ScrollToTop';
const MobileNavigation = React.lazy(() => import('./MobileNavigation'));

export default function LayoutWithoutFooter({ children }: PropsWithChildren) {
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const handleOpenMobileNav = () => {
        setOpenMobileNav(!openMobileNav);
    }
    return (
        <div className='overflow-hidden'>
            {/* HEADER SECTION */}
            <Header mobileOpen={openMobileNav} onOpenMobileNav={handleOpenMobileNav} />

            <MobileNavigation open={openMobileNav}  handleOpen={handleOpenMobileNav}/>

            <ScrollToTop />

            {/* MAIN CONTENT RENDER SECTION */}
            {children}
        </div>
    )
}
