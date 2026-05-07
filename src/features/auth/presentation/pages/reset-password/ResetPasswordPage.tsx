import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PrimaryButton from "@/core/components/primaryButton";
import { authRepository } from "../../../data/repositories/SupabaseAuthRepository";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authRepository.updatePassword(password);
      if (error) {
        toast.error("Error", {
          description: error.message,
        });
        return;
      }
      toast.success("Password updated", {
        description: "Your password has been successfully reset.",
      });
      navigate("/auth/login");
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Set new password</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Field>

        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Reset Password"}
        </PrimaryButton>
      </form>
    </div>
  );
}
