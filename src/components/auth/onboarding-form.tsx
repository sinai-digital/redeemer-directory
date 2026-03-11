"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "@/lib/actions/auth";

interface MemberData {
  id: string;
  show_email: boolean;
  show_phone: boolean;
  show_birthday: boolean;
  show_address: boolean;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  address: string | null;
}

interface OnboardingFormProps {
  suggestedName: string;
  member: MemberData | null;
}

export function OnboardingForm({ suggestedName, member }: OnboardingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Step 1 values (preserved when going back)
  const [displayName, setDisplayName] = useState(suggestedName);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 values
  const [showEmail, setShowEmail] = useState(member?.show_email ?? true);
  const [showPhone, setShowPhone] = useState(member?.show_phone ?? true);
  const [showBirthday, setShowBirthday] = useState(member?.show_birthday ?? true);
  const [showAddress, setShowAddress] = useState(member?.show_address ?? true);

  const hasPrivacyStep = member && (member.email || member.phone || member.birthday || member.address);
  const totalSteps = hasPrivacyStep ? 2 : 1;

  function handleNext() {
    setError(null);

    if (!displayName.trim()) {
      setError("Display name is required");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (hasPrivacyStep) {
      setStep(2);
    } else {
      submitForm();
    }
  }

  async function submitForm() {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set("displayName", displayName.trim());
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    if (member) {
      formData.set("memberId", member.id);
      formData.set("showEmail", showEmail ? "on" : "off");
      formData.set("showPhone", showPhone ? "on" : "off");
      formData.set("showBirthday", showBirthday ? "on" : "off");
      formData.set("showAddress", showAddress ? "on" : "off");
    }

    const result = await completeOnboarding(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
      // If it's a password/name error, go back to step 1
      if (step === 2) setStep(1);
    }
  }

  const privacyFields = member
    ? [
        { key: "email", label: "Email address", value: showEmail, setValue: setShowEmail, hasData: !!member.email },
        { key: "phone", label: "Phone number", value: showPhone, setValue: setShowPhone, hasData: !!member.phone },
        { key: "birthday", label: "Birthday", value: showBirthday, setValue: setShowBirthday, hasData: !!member.birthday },
        { key: "address", label: "Home address", value: showAddress, setValue: setShowAddress, hasData: !!member.address },
      ].filter((f) => f.hasData)
    : [];

  return (
    <div>
      {/* Step indicator */}
      {totalSteps > 1 && (
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 w-2 rounded-full transition-colors ${
                s === step ? "bg-primary-800" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Input
              id="displayName"
              name="displayName"
              label="Your Name"
              placeholder="e.g. John Smith"
              value={displayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              This is how other members will see you in the directory.
            </p>
          </div>

          <div>
            <Input
              id="password"
              name="password"
              type="password"
              label="Choose a Password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <Button
            type="button"
            variant="gold"
            loading={!hasPrivacyStep && loading}
            className="w-full"
            onClick={handleNext}
          >
            {hasPrivacyStep ? "Next" : "Complete Setup"}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              Privacy Settings
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Choose what information other members can see in the directory.
              Your name is always visible.
            </p>

            <div className="space-y-2">
              {privacyFields.map((field) => (
                <label
                  key={field.key}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.setValue(e.target.checked)}
                    className="rounded border-neutral-300 text-primary-800 focus:ring-primary-300"
                  />
                  <span className="text-sm text-neutral-900">
                    Show {field.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => { setStep(1); setError(null); }}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="gold"
              loading={loading}
              className="flex-1"
              onClick={submitForm}
            >
              Complete Setup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
