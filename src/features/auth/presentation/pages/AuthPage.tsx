import { Outlet, Link } from 'react-router-dom';
import startupTeams from '@/assets/images/startup-teams.png';
import LogoBlack from "@/assets/images/logo-black.svg";
import Image from '@/core/components/image';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Side: Auth Forms */}
        <div className="flex flex-col w-full lg:w-1/2 px-6 lg:px-20 py-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 lg:mb-12">
            <Link to="/" className="flex items-center gap-2">
             <Image src={LogoBlack} alt="Sentra Logo" />
            </Link>
            <a 
              href="#" 
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors"
            >
              Need help?
            </a>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <Outlet />
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 flex justify-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center lg:text-left font-light">
              &copy; {new Date().getFullYear()} Sentra Nexus. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side: Hero Section */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative bg-neutral-950"
        >
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />
          <div className="relative z-10 flex flex-col justify-end px-20 h-full pb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl font-onest font-medium text-white leading-tight mb-4">
                Secure Your Platform at the Network Level.
              </h2>
              <p className="text-lg text-neutral-400">
                Access real-time trust signals and silent authentication powered by the Nokia Network-as-Code Nexus.
              </p>
              
              <div className="mt-12 flex gap-8">
                <img src={startupTeams} alt="Sentra Global Security" className="w-full max-w-md rounded-xl shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
