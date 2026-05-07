import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PrimaryButton from "@/core/components/primaryButton";
import { authRepository } from "../../../data/repositories/SupabaseAuthRepository";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await authRepository.resetPassword(email);
      if (error) {
        toast.error("Error", {
          description: error.message,
        });
        return;
      }
      setIsSubmitted(true);
      toast.success("Reset link sent", {
        description: "Check your email for the password reset link.",
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold dark:text-white">Check your email</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400 mb-8">
          We've sent a password reset link to <span className="font-medium">{email}</span>
        </p>
        <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Forgot password?</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <PrimaryButton type="submit" loading={isLoading}>
          {isLoading ? "Sending..." : "Reset Password"}
        </PrimaryButton>

        <div className="text-center">
          <Link to="/auth/login" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 font-medium flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}
