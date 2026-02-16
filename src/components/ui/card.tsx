import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

function Card({ className, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-neutral-100 border border-neutral-200 rounded-lg shadow-sm",
        hover && "transition-all duration-200 ease-in-out hover:shadow-md hover:border-neutral-300 cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 py-3 sm:px-6 sm:py-4", className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-4 sm:px-6 sm:pb-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-4 py-3 sm:px-6 sm:py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-lg",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
