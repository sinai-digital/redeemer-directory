"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithMagicLink, loginWithPassword } from "@/lib/actions/auth";
import { Mail, Lock, ArrowRight } from "lucide-react";

export function LoginForm() {
  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  async function handleMagicLink(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginWithMagicLink(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setMagicLinkSent(true);
      setSentEmail(result.email || "");
    }
  }

  async function handlePassword(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginWithPassword(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    }
  }

  if (magicLinkSent) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary-800" />
        </div>
        <h2 className="text-xl font-semibold font-heading">Check your email</h2>
        <p className="text-neutral-700">
          We sent a magic link to <strong>{sentEmail}</strong>. Click the link in
          the email to sign in.
        </p>
        <button
          onClick={() => {
            setMagicLinkSent(false);
            setError(null);
          }}
          className="text-sm text-primary-800 hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {mode === "magic" ? (
        <form action={handleMagicLink} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="matt.pike@example.com"
            required
            autoComplete="email"
            autoFocus
          />
          <Button type="submit" variant="gold" loading={loading} className="w-full">
            <Mail className="h-4 w-4" />
            Send magic link
          </Button>
        </form>
      ) : (
        <form action={handlePassword} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="matt.pike@example.com"
            required
            autoComplete="email"
            autoFocus
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          <Button type="submit" variant="gold" loading={loading} className="w-full">
            <Lock className="h-4 w-4" />
            Sign in
          </Button>
        </form>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-700">or</span>
        </div>
      </div>

      <button
        onClick={() => {
          setMode(mode === "magic" ? "password" : "magic");
          setError(null);
        }}
        className="w-full flex items-center justify-center gap-2 text-sm text-neutral-700 hover:text-primary-800 transition-colors"
      >
        {mode === "magic" ? (
          <>
            <Lock className="h-3.5 w-3.5" />
            Sign in with password instead
          </>
        ) : (
          <>
            <ArrowRight className="h-3.5 w-3.5" />
            Sign in with magic link instead
          </>
        )}
      </button>
    </div>
  );
}
