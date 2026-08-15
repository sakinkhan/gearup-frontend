import type { SVGProps } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import GearUpLogo from "./gearup-logo";
type FooterLink = {
  label: string;
  href?: string;
};

type FooterLinkColumn = {
  title: string;
  links: FooterLink[];
};

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-4.849 0-3.204-.012-3.584-.069-4.849-.149-3.227-1.664-4.771-4.919-4.919-1.266-.057-1.645-.069-4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.507 17.523 2 12 2S2 6.507 2 12.06c0 5.019 3.657 9.176 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.196 2.238.196v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.89h2.773l-.443 2.91h-2.33V22c4.78-.764 8.437-4.921 8.437-9.94z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: XIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
];

const footerLinks: FooterLinkColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Browse Gears", href: "/gears" },
      { label: "Categories", href: "/gears" },
      { label: "Become a Provider", href: "/auth/register?role=PROVIDER" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers" },
      { label: "Blog" },
      { label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Safety & Trust", href: "/support" },
      { label: "Terms of Service", href: "/support" },
      { label: "Privacy Policy", href: "/support" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <GearUpLogo />
            </Link>

            <p className="max-w-xs text-sm text-muted-foreground">
              Rent sports and outdoor gear from trusted local providers.
              Adventure ready, without the price tag of owning it all.
            </p>

            <ul className="mt-1 flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                Canberra, Australia
              </li>

              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a
                  href="mailto:support@gearup.com"
                  className="hover:text-foreground"
                >
                  support@gearup.com
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href="tel:+611234567890" className="hover:text-foreground">
                  +61 1234 567 890
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-2 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>

              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="cursor-default text-sm text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} GearUp. All rights reserved.
          </p>

          <ul className="flex items-center gap-6">
            <li>
              <span className="cursor-default text-xs text-muted-foreground">
                Terms
              </span>
            </li>

            <li>
              <span className="cursor-default text-xs text-muted-foreground">
                Privacy
              </span>
            </li>

            <li>
              <span className="cursor-default text-xs text-muted-foreground">
                Cookies
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
