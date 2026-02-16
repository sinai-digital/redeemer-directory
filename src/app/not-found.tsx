import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 text-center">
      <Image src="/logo.png" alt="Redeemer Church" width={80} height={72} className="mb-6" />
      <h1 className="text-3xl font-bold font-heading text-primary-900 mb-2">
        Page Not Found
      </h1>
      <p className="text-neutral-700 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/forum">
        <Button>Go to Forum</Button>
      </Link>
    </div>
  );
}
