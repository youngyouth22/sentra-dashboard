import { Outlet, Link } from 'react-router-dom';
import startupTeams from '@/assets/images/startup-teams.png';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Side: Auth Forms */}
        <div className="flex flex-col w-full lg:w-1/2 px-6 lg:px-20 py-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 lg:mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold dark:text-white">Sentra</span>
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
              &copy; {new Date().getFullYear()} Sentra Dashboard. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side: Hero Section */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative bg-neutral-950"
          // style={{
          //   backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80)`,
          // }}
        >
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-[2px]" />
          <div className="relative z-10 flex flex-col justify-end px-20 h-full">
            <div className="max-w-xl">
              <h2 className="text-4xl font-onest font-medium text-white dark:text-neutral-950 leading-tight mb-4">
                Enterprise-grade security for your data platform.
              </h2>
              <p className="text-lg text-neutral-400 dark:text-neutral-600">
                Sentra provides the most advanced dashboard for managing your network-level security and fraud detection with ease.
              </p>
              
              <div className="mt-12 flex gap-8 justify-end">
                {/* <div>
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-sm text-neutral-300">Uptime SLA</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">256-bit</p>
                  <p className="text-sm text-neutral-300">Encryption</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-sm text-neutral-300">Expert Support</p>
                </div> */}
                <img src={startupTeams} alt="startupTeams" className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
