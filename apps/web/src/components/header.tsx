"use client";

import { useState } from "react";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@Synap/ui/components/button";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
  ] as const;

  return (
    <header className="relative z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              href={to}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side — always visible */}
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="hidden sm:inline-flex">Sign Up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile dropdown — absolutely positioned so it overlays page content */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute left-0 right-0 top-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                href={to}
                className="text-sm font-medium px-3 py-2.5 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Show when="signed-out">
            <div className="flex flex-col gap-2 px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="w-full justify-center">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="w-full justify-center">Sign Up</Button>
              </SignUpButton>
            </div>
          </Show>
        </div>
      )}
    </header>
  );
}

