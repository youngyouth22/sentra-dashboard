import { NavLink } from 'react-router-dom';
import { RoutePaths } from '@/core/routes/route-paths';

const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Portfolio", path: "/portofolio" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
];

export default function Navigation() {
    return (
        <nav className="space-x-[40px] hidden lg:flex items-center">
            {navItems.map((item, index) => (
                <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                        `cursor-pointer text-[16px] ${isActive ? 'font-bold' : 'font-regular'} ${isActive ? 'text-white' : 'text-[#8D8D8D]'} hover:text-white hover:font-bold`
                    }
                >
                    {item.name}
                </NavLink>
            ))}
            {/* API Docs — premium badge link */}
            <NavLink
                to={RoutePaths.DOCS}
                className={({ isActive }) =>
                    `cursor-pointer text-[13px] font-medium px-2.5 py-1 rounded-md transition-all duration-200 ${
                        isActive
                            ? 'text-white'
                            : 'text-[#c084fc] hover:text-white'
                    }`
                }
                style={{ background: 'linear-gradient(135deg, rgba(135,58,227,0.15) 0%, rgba(17,70,242,0.15) 100%)', border: '1px solid rgba(135,58,227,0.3)' }}
            >
                API Docs
            </NavLink>
        </nav>
    );
}
