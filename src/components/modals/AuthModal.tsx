"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "./Modal";
import { supabase } from "@/lib/supabase";
import { AuthError } from "@supabase/supabase-js";
import { Button } from "../ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

type AuthMode = "signin" | "signup";
type AuthMethod = "magic-link" | "password";

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [method, setMethod] = useState<AuthMethod>("magic-link");

  // Sync mode with initialMode when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const getRedirectUrl = () => {
    // Priority: VITE_APP_URL > window.location.origin
    const url = import.meta.env.VITE_APP_URL || window.location.origin;
    return url.endsWith('/') ? url : `${url}/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (method === "password" && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const redirectTo = getRedirectUrl();
      if (method === "magic-link") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectTo,
          },
        });
        if (error) throw error;
        toast.success("Magic link sent to your email!");
        onClose();
      } else {
        if (mode === "signup") {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: redirectTo,
            },
          });
          if (error) throw error;
          toast.success("Check your email to confirm your account!");
          onClose();
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          toast.success("Signed in successfully!");
          onClose();
        }
      }
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'twitter') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      const authError = error as AuthError;
      toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication failed.`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true}>
        <div className="p-8">
              <div className="mb-6 flex justify-between items-center">
                <div className="p-2 bg-ui-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-text" fill="currentColor" />
                </div>
                <div className="flex bg-ui-2 p-1 rounded-xl border border-border-1">
                  <button
                    onClick={() => setMode("signin")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-all ${
                      mode === "signin"
                        ? "bg-ui-1 shadow-sm text-text"
                        : "text-grey hover:text-text"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className={`px-4 py-1.5 text-sm font-medium rounded-xl transition-all ${
                      mode === "signup"
                        ? "bg-ui-1 shadow-sm text-text"
                        : "text-grey hover:text-text"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

          <div>
            <h2 className="text-3xl font-medium text-text mb-2">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-grey mb-8 leading-relaxed">
              {mode === "signin" 
                ? "Sign in to access your saved apps and preferences." 
                : "Join our community to discover and share the best tools."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-grey ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-1 bg-ui-3 focus:ring-2 focus:ring-text/20 focus:border-text focus:outline-none transition-all text-text placeholder:text-grey"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {method === "password" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-medium text-grey ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-1 bg-ui-3 focus:ring-2 focus:ring-text/20 focus:border-text focus:outline-none transition-all text-text placeholder:text-grey"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base font-bold rounded-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === "signin" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                      {mode === "signin" 
                        ? (method === "magic-link" ? "Send Magic Link" : "Sign In") 
                        : (method === "magic-link" ? "Sign Up with Email" : "Create Account")}
                    </>
                  )}
                </Button>
              </form>

              <div className="flex justify-center mb-8">
                <button
                  type="button"
                  onClick={() => setMethod(method === "magic-link" ? "password" : "magic-link")}
                  className="text-sm font-medium text-text hover:underline transition-all"
                >
                  {method === "magic-link" ? "Use password instead" : "Use magic link instead"}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-1"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-ui-1 px-4 text-grey font-medium tracking-wider">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleOAuth('twitter')}
                  className="flex items-center justify-center py-3.5 rounded-xl bg-ui-1 border border-border-1 hover:bg-ui-2 transition-all group"
                >
                  <svg className="w-5 h-5 text-text group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleOAuth('google')}
                  className="flex items-center justify-center py-3.5 rounded-xl bg-ui-1 border border-border-1 hover:bg-ui-2 transition-all group"
                >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
