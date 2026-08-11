"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, PauseCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/api/payment";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const gearId = searchParams.get("gearId") ?? "";
  const shouldReduceMotion = useReducedMotion();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleTryAgain = async () => {
    if (!orderId) {
      toast.error("Missing order reference. Please rebook from the gear page.");
      return;
    }

    setIsRetrying(true);
    try {
      const result = await createCheckoutSession(orderId);
      const paymentUrl = result.data.paymentUrl;

      if (!paymentUrl) {
        throw new Error("Payment URL not found.");
      }

      window.location.assign(paymentUrl);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Couldn't restart checkout. Please try again.",
      );
      setIsRetrying(false);
    }
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Stamp */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.8, rotate: 10 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, rotate: 4 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { type: "spring", stiffness: 260, damping: 14, delay: 0.05 }
          }
          className="relative z-10 mx-auto -mb-6 flex size-24 items-center justify-center rounded-full border-4 border-muted-foreground/40 bg-background"
        >
          <PauseCircle
            className="size-10 text-muted-foreground"
            strokeWidth={2.25}
          />
        </motion.div>

        {/* Ticket body */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl border border-dashed bg-card pt-12 shadow-lg"
        >
          {/* torn edge */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-3 bg-background"
            style={{
              maskImage:
                "radial-gradient(circle at 8px 0, transparent 8px, black 8.5px)",
              maskSize: "16px 16px",
              maskRepeat: "repeat-x",
              WebkitMaskImage:
                "radial-gradient(circle at 8px 0, transparent 8px, black 8.5px)",
              WebkitMaskSize: "16px 16px",
              WebkitMaskRepeat: "repeat-x",
            }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-1 px-8 pb-2 text-center"
          >
            <motion.p
              variants={rise}
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Checkout paused
            </motion.p>
            <motion.h1
              variants={rise}
              className="text-2xl font-bold tracking-tight"
            >
              Payment cancelled
            </motion.h1>
            <motion.p variants={rise} className="text-sm text-muted-foreground">
              Nothing was charged. Your rental was not confirmed.
            </motion.p>
          </motion.div>

          {/* Perforation divider */}
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            className="relative my-6 flex items-center px-8"
          >
            <div className="absolute -left-3 size-6 rounded-full bg-background" />
            <div className="h-px w-full border-t border-dashed border-border" />
            <div className="absolute -right-3 size-6 rounded-full bg-background" />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 px-8 pb-8"
          >
            {orderId && (
              <motion.div variants={rise} className="space-y-1.5">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Order ID
                </p>
                <div className="rounded-lg border bg-muted/50 px-3 py-2.5">
                  <span className="truncate font-mono text-sm">{orderId}</span>
                </div>
              </motion.div>
            )}

            <motion.div variants={rise} className="flex flex-col gap-2 pt-2">
              <Button
                type="button"
                className="w-full"
                disabled={isRetrying}
                onClick={handleTryAgain}
              >
                <RotateCcw className="mr-2 size-4" />
                {isRetrying ? "Redirecting..." : "Try again"}
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={gearId ? `/gears/${gearId}` : "/gears"}>
                  <ArrowLeft className="mr-2 size-4" />
                  Go back
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
