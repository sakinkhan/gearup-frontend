"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary)_0%,transparent_55%)] opacity-10" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Gear Illustration */}
        <div className="relative mb-10 h-40 w-40 sm:h-48 sm:w-48">
          {/* Broken gear */}
          <svg
            viewBox="0 0 120 120"
            className="fallen-gear absolute -bottom-2 -right-3 h-16 w-16 text-muted-foreground"
            fill="currentColor"
            aria-hidden="true"
          >
            <g>
              {[0, 51, 102, 153, 205, 256].map((deg) => (
                <rect
                  key={deg}
                  x="56"
                  y="6"
                  width="8"
                  height="16"
                  rx="2"
                  transform={`rotate(${deg} 60 60)`}
                />
              ))}
            </g>

            <circle cx="60" cy="60" r="34" />
            <circle cx="60" cy="60" r="12" className="fill-background" />
          </svg>

          {/* Main gear */}
          <svg
            viewBox="0 0 120 120"
            className="jammed-gear h-full w-full drop-shadow-xl"
            aria-hidden="true"
          >
            <g className="fill-muted-foreground">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <rect
                  key={deg}
                  x="53"
                  y="2"
                  width="14"
                  height="22"
                  rx="2"
                  className={i === 0 ? "fill-chart-3" : "fill-muted-foreground"}
                  transform={`rotate(${deg} 60 60)`}
                />
              ))}
            </g>

            <circle cx="60" cy="60" r="40" className="fill-muted" />

            <circle cx="60" cy="60" r="15" className="fill-background" />
          </svg>

          {/* Spark */}
          <svg
            viewBox="0 0 24 24"
            className="spark absolute right-0 top-6 h-7 w-7 text-chart-3"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
          </svg>
        </div>

        <span className="mb-3 text-xs font-semibold tracking-[0.3em] text-chart-3">
          Error 500 • GearUp
        </span>

        <h1 className="text-4xl font-black uppercase tracking-tight text-foreground">
          Gear's Jammed
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
          Something went wrong while loading this page. Give it another shot or
          head back to continue exploring GearUp.
        </p>

        {/* Divider */}
        <div
          className="my-8 h-2 w-56 rounded-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg,var(--color-chart-3) 0 10px,var(--color-background) 10px 20px)",
          }}
        />

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            onClick={reset}
            className="min-w-40 rounded-4xl font-semibold"
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className="min-w-40 rounded-4xl"
          >
            Go Back
          </Button>
        </div>

        {error.digest && (
          <p className="mt-8 rounded-md border border-border bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .jammed-gear {
            animation: jam 3.2s cubic-bezier(0.36, 0, 0.66, 1) infinite;
            transform-origin: 60px 60px;
          }

          .fallen-gear {
            animation: settle 3.2s ease-in-out infinite;
          }

          .spark {
            animation: flicker 3.2s ease-in-out infinite;
          }
        }

        @keyframes jam {
          0% {
            transform: rotate(0deg);
          }
          32% {
            transform: rotate(78deg);
          }
          36% {
            transform: rotate(68deg);
          }
          40% {
            transform: rotate(80deg);
          }
          44% {
            transform: rotate(66deg);
          }
          48% {
            transform: rotate(74deg);
          }
          65% {
            transform: rotate(74deg);
          }
          100% {
            transform: rotate(154deg);
          }
        }

        @keyframes settle {
          0%,
          38% {
            transform: rotate(-12deg) translateY(0);
          }
          42% {
            transform: rotate(-16deg) translateY(2px);
          }
          46% {
            transform: rotate(-10deg) translateY(0);
          }
          100% {
            transform: rotate(-12deg) translateY(0);
          }
        }

        @keyframes flicker {
          0%,
          30%,
          100% {
            opacity: 0;
          }
          33%,
          46% {
            opacity: 1;
          }
          49% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
