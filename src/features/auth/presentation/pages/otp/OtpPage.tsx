import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PrimaryButton from "@/core/components/primaryButton";
import { authRepository } from "../../../data/repositories/SupabaseAuthRepository";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldLabel } from "@/components/ui/field";
import { RoutePaths } from "@/core/routes/route-paths";

const RESEND_COOLDOWN = 60; // seconds

export default function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(RESEND_COOLDOWN);
  const [isResending, setIsResending] = React.useState(false);
  
  const email = location.state?.email;
  const canResend = resendTimer === 0;

  React.useEffect(() => {
    if (!email) {
      navigate("/auth/login");
    }
  }, [email, navigate]);

  React.useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    try {
      const { error } = await authRepository.resendOtp(email);
      if (error) {
        if (error.message.includes("429") || error.message.toLowerCase().includes("too many requests")) {
          toast.error("Too many requests", {
            description: "Please wait a moment before trying again.",
          });
        } else {
          toast.error("Failed to resend code", {
            description: error.message,
          });
        }
        return;
      }
      
      toast.success("Code resent!", {
        description: `A new verification code has been sent to ${email}`,
      });
      setResendTimer(RESEND_COOLDOWN);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.log(error);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Invalid code", {
        description: "Please enter the 6-digit code sent to your email.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { user, error } = await authRepository.verifyOtp(email, otp);
      if (error) {
        toast.error("Verification failed", {
          description: error.message,
        });
        return;
      }
      if (user) {
        toast.success("Email verified!", {
          description: "Your account is now ready.",
        });
        navigate(RoutePaths.DASHBOARD);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Verify your email</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          We've sent a 6-digit verification code to <br />
          <span className="font-medium text-neutral-900 dark:text-neutral-100">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="otp-input" className="text-center block mb-4">Verification Code</FieldLabel>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-xs text-center mt-6 text-neutral-500 dark:text-neutral-400">
            Enter the 6-digit code sent to your email.
          </p>
        </Field>

        <PrimaryButton type="submit" loading={isLoading} disabled={otp.length !== 6}>
          {isLoading ? "Verifying..." : "Verify & Continue"}
        </PrimaryButton>

        <div className="text-center pt-2">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Didn't receive the code?{" "}
            <button
              type="button"
              disabled={!canResend || isResending}
              className={`font-semibold transition-colors ${
                canResend 
                ? "text-blue-600 hover:text-blue-700 hover:underline" 
                : "text-neutral-400 cursor-not-allowed"
              }`}
              onClick={handleResend}
            >
              {isResending ? "Sending..." : canResend ? "Resend now" : `Resend in ${resendTimer}s`}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
