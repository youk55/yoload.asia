"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Close on Escape and trap focus inside mobile menu when open
  useEffect(() => {
    if (!open) return;

    const focusFirst = () => {
      // focus first link after panel is rendered
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    };

    focusFirst();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Announce open/close for screen readers
  useEffect(() => {
    setAnnouncement(open ? "Main menu opened" : "Main menu closed");
  }, [open]);

  // Close on outside click when menu is open
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      const inMenu = !!menuRef.current && !!t && menuRef.current.contains(t);
      const inToggle = !!toggleRef.current && !!t && toggleRef.current.contains(t);
      if (!inMenu && !inToggle) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const linkClass =
    "transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const NavLinks = (
    <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm text-gray-700">
      <li>
        <Link href="/" className={linkClass} onClick={closeMenu} ref={firstLinkRef}>
          Home
        </Link>
      </li>
      <li>
        <Link href="#services" className={linkClass} onClick={closeMenu}>
          Services
        </Link>
      </li>
      <li>
        <Link href="#about" className={linkClass} onClick={closeMenu}>
          About
        </Link>
      </li>
      <li>
        <Link href="#contact" className={linkClass} onClick={closeMenu}>
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        {/* SR-only live region to announce menu state */}
        <div aria-live="polite" role="status" aria-atomic="true" className="sr-only">
          {announcement}
        </div>
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
          <Image
            src="/logo.png"
            alt="Yoload logo"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="sr-only">Yoload</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:block">
          {NavLinks}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close main menu" : "Open main menu"}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          ref={toggleRef}
        >
          <span className="sr-only">Toggle navigation</span>
          {/* Icon: hamburger / close */}
          {open ? (
            // Close (X)
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" ref={menuRef} className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3 sm:px-6">
            {NavLinks}
          </div>
        </div>
      )}
    </header>
  );
}
