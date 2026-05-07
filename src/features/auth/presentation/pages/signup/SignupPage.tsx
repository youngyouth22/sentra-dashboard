import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";
import PrimaryButton from "@/core/components/primaryButton";
import { authRepository } from "../../../data/repositories/SupabaseAuthRepository";
import { RoutePaths } from "@/core/routes/route-paths";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Please enter your first name"),
    lastName: z.string().min(1, "Please enter your last name"),
    email: z.string().email("Invalid email").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .trim(),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const { user, error } = await authRepository.signUp(
        values.email,
        values.password,
        {
          first_name: values.firstName,
          last_name: values.lastName,
        },
      );

      if (error) {
        toast.error("Signup failed", {
          description: error.message,
        });
        return;
      }

      if (user) {
        toast.success("Account created!", {
          description: "Please verify your email address.",
        });
        // Redirect to OTP page with email as state
        navigate("/auth/otp", { state: { email: values.email } });
      }
    } catch (error: unknown) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
              
      
              <p className="mt-3 text-3xl font-serif text-neutral-950 dark:text-neutral-50 mb-2">
                Create an account
              </p>
      
               <p className=" text-sm text-neutral-500 dark:text-neutral-400">
               Already have an account ?{" "}
                <Link
                  to={RoutePaths.LOGIN}
                  className="font-medium text-neutral-950 dark:text-neutral-50 underline underline-offset-4 hover:no-underline"
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-firstName">
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-firstName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-lastName">Last Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
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
                <FieldLabel htmlFor="form-rhf-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  Use 8+ characters with a mix of letters & numbers
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-confirmPassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <PrimaryButton type="submit" loading={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </PrimaryButton>
        </FieldGroup>
      </form>
    </div>
  );
}
