import IcMoon from '@/assets/icons/moon.svg?react';
import IcSun from '@/assets/icons/sun.svg?react';
import IcList from '@/assets/icons/list.svg?react';
import IcArrowRight from '@/assets/icons/arrowRight.svg?react';
import IcArrowLeft from '@/assets/icons/arrowLeft.svg?react';
import IcArrowDown from '@/assets/icons/arrowDown.svg?react';
import IcArrowUpRight from '@/assets/icons/arrowUpRight.svg?react';
import IcStarsSparkle from '@/assets/icons/starsSparkle.svg?react';
import IcGroup from '@/assets/icons/group.svg?react';
import IcCash from '@/assets/icons/cash.svg?react';
import IcTarget from '@/assets/icons/target.svg?react';
import IcCaretUp from '@/assets/icons/caretUp.svg?react';
import IcCaretDown from '@/assets/icons/caretDown.svg?react';
import IcCopyRight from '@/assets/icons/copyRight.svg?react';
import IcTrendsBlue from '@/assets/icons/trendsBlue.svg?react';
import IcRocketBlue from '@/assets/icons/rocketBlue.svg?react';
import IcTargetBlue from '@/assets/icons/targetBlue.svg?react';
import IcChats from '@/assets/icons/chats.svg?react';
import IcMap from '@/assets/icons/map.svg?react';
import IcPhone from '@/assets/icons/phone.svg?react';
import IcMenu from '@/assets/icons/menu.svg?react';

import clsx from "clsx";
import { useTheme } from '@/core/context/ThemeProvider';

const iconMap = {
    moon: IcMoon,
    sun: IcSun,
    list: IcList,
    arrowRight: IcArrowRight,
    arrowLeft: IcArrowLeft,
    arrowDown: IcArrowDown,
    arrowUpRight: IcArrowUpRight,
    starsSparkle: IcStarsSparkle,
    group: IcGroup,
    cash: IcCash,
    target: IcTarget,
    caretUp: IcCaretUp,
    caretDown: IcCaretDown,
    copyRight: IcCopyRight,
    trendsBlue: IcTrendsBlue,
    rocketBlue: IcRocketBlue,
    targetBlue: IcTargetBlue,
    chats: IcChats,
    map: IcMap,
    phone: IcPhone,
    menu: IcMenu,
};

interface IconProps {
    name: keyof typeof iconMap;
    className?: string;
    color?: string;
    noDarkMode?: boolean;
}

const Icons: React.FC<IconProps> = ({ name, className = " ", color = "currentColor", noDarkMode = false }) => {
    const IconComponent = iconMap[name];
    const { theme } = useTheme();


    if (!IconComponent) {
        return null;
    }

    return (
        <div className={clsx(className)}>
            <IconComponent fill={theme === 'dark' && !noDarkMode ? '#fff' : color} width="100%" height="100%" />
        </div>
    );
};

export default Icons;
