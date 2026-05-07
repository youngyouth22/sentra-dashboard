import { supabase } from "@/lib/supabase";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { type User } from "@supabase/supabase-js";

export class SupabaseAuthRepository extends AuthRepository {
  async login(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    return this.signIn(email, password);
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data.user, error: error ? new Error(error.message) : null };
  }

  async signUp(email: string, password: string, metadata?: Record<string, unknown>): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { user: data.user, error: error ? new Error(error.message) : null };
  }

  async signOut(): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signOut();
    return { error: error ? new Error(error.message) : null };
  }

  async verifyOtp(email: string, token: string): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup' // or 'email' depending on flow
    });
    return { user: data.user, error: error ? new Error(error.message) : null };
  }

  async resetPassword(email: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { error: error ? new Error(error.message) : null };
  }

  async updatePassword(password: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error: error ? new Error(error.message) : null };
  }

  async resendOtp(email: string): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    return { error: error ? new Error(error.message) : null };
  }
}

export const authRepository = new SupabaseAuthRepository();
