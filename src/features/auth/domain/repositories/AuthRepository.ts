import { type User } from "@supabase/supabase-js";

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<{ user: any | null; error: Error | null }>;
  abstract signIn(email: string, password: string): Promise<{ user: any | null; error: Error | null }>;
  abstract signUp(email: string, password: string, metadata?: Record<string, unknown>): Promise<{ user: User | null; error: Error | null }>;
  abstract signOut(): Promise<{ error: Error | null }>;
  abstract verifyOtp(email: string, token: string): Promise<{ user: User | null; error: Error | null }>;
  abstract resetPassword(email: string): Promise<{ error: Error | null }>;
  abstract updatePassword(password: string): Promise<{ error: Error | null }>;
  abstract resendOtp(email: string): Promise<{ error: Error | null }>;
}
