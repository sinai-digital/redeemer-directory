import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In | Redeemer Church Directory",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Redeemer Church" width={80} height={72} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-heading text-white">
            Redeemer Church
          </h1>
          <p className="text-primary-200 mt-1">
            Member Directory & Community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border-t-4 border-accent-400 p-6">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-primary-200 mt-6">
          Not a member yet? Contact the church office to be added to the directory.
        </p>
        <p className="text-center text-xs mt-2">
          <a
            href="https://redeemerriverview.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-300 hover:text-accent-400 underline"
          >
            Visit redeemerriverview.org
          </a>
        </p>
      </div>
    </div>
  );
}
