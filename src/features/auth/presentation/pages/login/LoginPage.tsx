import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { RoutePaths } from "@/core/routes/route-paths";
import PrimaryButton from "@/core/components/primaryButton";
import { authRepository } from "../../../data/repositories/SupabaseAuthRepository";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(1, "Please enter your password").trim(),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { user, error } = await authRepository.signIn(values.email, values.password);

      if (error) {
        // Facebook Senior Dev Pattern: Redirect unconfirmed users to OTP
        if (error.message.toLowerCase().includes("email not confirmed")) {
          toast.info("Email not verified", {
            description: "Redirecting you to the verification page...",
          });
          // Attempt to resend OTP automatically
          await authRepository.resendOtp(values.email);
          navigate("/auth/otp", { state: { email: values.email } });
          return;
        }

        toast.error("Authentication failed", {
          description: error.message,
        });
        return;
      }

      if (user) {
        toast.success("Welcome back!", {
          description: "Successfully signed in.",
        });
        navigate(RoutePaths.DASHBOARD);
      }
    } catch (error: unknown) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="text-center">
        

        <p className="mt-3 text-3xl font-serif text-neutral-950 dark:text-neutral-50 mb-2">
          Welcome back
        </p>

         <p className=" text-sm text-neutral-500 dark:text-neutral-400">
          Don&#x27;t have an account yet ?{" "}
          <Link
            to={RoutePaths.SIGNUP}
            className="font-medium text-neutral-950 dark:text-neutral-50 underline underline-offset-4 hover:no-underline"
          >
            Sign up
          </Link>
          .
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-email">Email Address</FieldLabel>
                  <Input
                    {...field}
                    id="form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
                    <Link
                      to={RoutePaths.FORGOT_PASSWORD}
                      className="text-xs text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="form-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your Password"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="mt-2">
              <PrimaryButton type="submit" loading={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </PrimaryButton>
            </div>
          </FieldGroup>
        </form>

        {/* <div className="mt-8 flex justify-center w-full items-center">
          <Separator />
          <span className="px-4 text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            or continue with
          </span>
          <Separator />
        </div> */}

       
      </div>
    </div>
  );
}
