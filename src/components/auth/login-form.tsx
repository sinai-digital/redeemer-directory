"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithMagicLink, loginWithPassword } from "@/lib/actions/auth";
import { Mail, Lock, KeyRound } from "lucide-react";

interface LoginFormProps {
  inviteMode?: boolean;
  defaultEmail?: string;
}

export function LoginForm({ inviteMode, defaultEmail }: LoginFormProps) {
  const [showForgot, setShowForgot] = useState(false);
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
          We sent a sign-in link to <strong>{sentEmail}</strong>.
        </p>
        <div className="bg-neutral-50 border border-neutral-200 rounded-md px-4 py-3 text-sm text-neutral-600 text-left space-y-1.5">
          <p>
            Look for an email from <strong>Redeemer Church Directory</strong> with a sign-in link.
          </p>
          <p>
            Check your spam or junk folder if you don&apos;t see it within 1–2 minutes.
          </p>
        </div>
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

  // Invite mode: just a magic link form with email pre-filled
  if (inviteMode) {
    return (
      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <form action={handleMagicLink} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            defaultValue={defaultEmail}
            required
            autoComplete="email"
            autoFocus
          />
          <Button type="submit" variant="gold" loading={loading} className="w-full">
            <Mail className="h-4 w-4" />
            Send me a sign-in link
          </Button>
        </form>
      </div>
    );
  }

  // Forgot password view: magic link form with info banner
  if (showForgot) {
    return (
      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <div className="bg-primary-50 border border-primary-200 rounded-md px-4 py-3 text-sm text-primary-800">
          Enter your email to receive a sign-in link. You&apos;ll be prompted to set a new password.
        </div>
        <form action={handleMagicLink} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            defaultValue={defaultEmail}
            required
            autoComplete="email"
            autoFocus
          />
          <Button type="submit" variant="gold" loading={loading} className="w-full">
            <Mail className="h-4 w-4" />
            Send me a sign-in link
          </Button>
        </form>
        <button
          onClick={() => {
            setShowForgot(false);
            setError(null);
          }}
          className="w-full text-center text-sm text-neutral-700 hover:text-primary-800 transition-colors"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  // Default: password login
  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
          {error}
        </div>
      )}
      <form action={handlePassword} className="space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          defaultValue={defaultEmail}
          required
          autoComplete="email"
          autoFocus
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          autoComplete="current-password"
        />
        <Button type="submit" variant="gold" loading={loading} className="w-full">
          <Lock className="h-4 w-4" />
          Sign in
        </Button>
        <button
          type="button"
          onClick={() => {
            setShowForgot(true);
            setError(null);
          }}
          className="block w-full text-center text-xs text-neutral-500 hover:text-primary-800 mt-2 transition-colors"
        >
          <KeyRound className="h-3 w-3 inline mr-1" />
          Forgot your password?
        </button>
      </form>
    </div>
  );
}
