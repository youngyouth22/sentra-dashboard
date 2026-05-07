import React from "react";
import clsx from "clsx";
import { Spinner } from "@/components/ui/spinner"

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    size?: string;
}

export default function PrimaryButton({ children, className, loading, ...props }: PrimaryButtonProps) {
    return (
        <button 
            className={clsx(
                "w-full px-4 py-2.5 flex items-center justify-center gap-2 tracking-wide text-white transition-colors duration-300 transform bg-[#070707] rounded-lg hover:bg-[#262626] focus:outline-none focus:bg-[#070707] focus:ring focus:ring-[#070707] focus:ring-opacity-50 hover:cursor-pointer",
                loading ? "opacity-50 hover:cursor-not-allowed!" : "",
                className
            )}
            disabled={loading}
            {...props}
        >
            {loading && <Spinner data-icon="inline-start" />}
            {children}
        </button>
    );
}