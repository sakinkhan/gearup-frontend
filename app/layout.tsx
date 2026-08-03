import "./globals.css";
import { Roboto_Slab, Oxanium } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./providers";

const oxaniumHeading = Oxanium({
  subsets: ["latin"],
  variable: "--font-heading",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-serif",
        robotoSlab.variable,
        oxaniumHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors position="bottom-center" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
