"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithMagicLink, loginWithPassword, verifyOtpCode } from "@/lib/actions/auth";
import { Mail, Lock, KeyRound, ShieldCheck } from "lucide-react";

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
  const [resent, setResent] = useState(false);

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
      <div className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
            {error}
          </div>
        )}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary-800" />
          </div>
          <h2 className="text-xl font-semibold font-heading">Enter your verification code</h2>
          <p className="text-sm text-neutral-700">
            We sent a verification code to <strong>{sentEmail}</strong>.
          </p>
        </div>
        <form
          action={async (formData: FormData) => {
            setLoading(true);
            setError(null);
            const token = formData.get("otp") as string;
            const result = await verifyOtpCode(sentEmail, token);
            setLoading(false);
            if (result?.error) {
              setError(result.error);
            }
          }}
          className="space-y-4"
        >
          <Input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            maxLength={8}
            label="Verification code"
            required
            autoFocus
            autoComplete="one-time-code"
            className="text-center text-2xl tracking-[0.3em] font-mono"
          />
          <Button type="submit" variant="gold" loading={loading} className="w-full">
            <ShieldCheck className="h-4 w-4" />
            Verify code
          </Button>
        </form>
        <div className="space-y-2 text-center">
          <div className="bg-neutral-50 border border-neutral-200 rounded-md px-4 py-3 text-xs text-neutral-500 text-left">
            Check your spam or junk folder if you don&apos;t see the email within a minute or two.
          </div>
          <button
            onClick={async () => {
              setLoading(true);
              setError(null);
              setResent(false);
              const fd = new FormData();
              fd.set("email", sentEmail);
              const result = await loginWithMagicLink(fd);
              setLoading(false);
              if (result.error) {
                setError(result.error);
              } else {
                setResent(true);
              }
            }}
            disabled={loading}
            className="text-sm text-primary-800 hover:underline disabled:opacity-50"
          >
            {resent ? "Code resent!" : "Resend code"}
          </button>
          <span className="text-neutral-300 mx-1">·</span>
          <button
            onClick={() => {
              setMagicLinkSent(false);
              setError(null);
            }}
            className="text-sm text-neutral-600 hover:underline"
          >
            Use a different email
          </button>
        </div>
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
            Send verification code
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
          Enter your email to receive a verification code. You&apos;ll be prompted to set a new password.
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
            Send verification code
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
