import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In | Redeemer Church Directory",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left brand panel */}
      <div className="bg-primary-900 lg:w-[45%] flex flex-col items-center justify-center px-8 py-12 lg:py-0 lg:min-h-screen relative">
        {/* Mobile: compact strip. Desktop: full panel */}
        <div className="flex flex-col items-center text-center lg:max-w-xs">
          <Image
            src="/logo.png"
            alt="Redeemer Church"
            width={120}
            height={108}
            className="mb-6 hidden lg:block"
            priority
          />
          <Image
            src="/logo.png"
            alt="Redeemer Church"
            width={72}
            height={65}
            className="mb-4 lg:hidden"
            priority
          />
          <h1 className="text-2xl lg:text-3xl font-bold font-heading text-white">
            Redeemer Church
          </h1>
          {/* Gold decorative rule */}
          <div className="w-12 h-0.5 bg-accent-400 mt-4 mb-4" />
          <p className="text-white/70 text-sm lg:text-base">
            Member Directory & Community
          </p>
        </div>

        {/* Website link — desktop only, anchored to bottom */}
        <div className="hidden lg:block absolute bottom-8 left-0 right-0 text-center">
          <a
            href="https://redeemerriverview.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-400 hover:text-accent-300 text-sm font-medium hover:underline transition-colors"
          >
            Visit redeemerriverview.org
          </a>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-6 py-12 lg:py-0 lg:min-h-screen">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold font-heading text-primary-900 mb-8">
            Sign In
          </h2>

          <LoginForm />

          {/* Footer */}
          <p className="text-xs text-neutral-700 mt-8">
            Not a member yet? Contact the church office to be added to the directory.
          </p>

          {/* Mobile-only website link */}
          <p className="text-xs mt-3 lg:hidden">
            <a
              href="https://redeemerriverview.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 font-medium hover:underline"
            >
              Visit redeemerriverview.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
