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

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
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
      if (!inMenu && !inToggle) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const linkClass =
    "transition-colors text-slate-700 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const NavLinks = (
    <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm">
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
      <div className="container mx-auto flex items-center justify-between px-4 py-6 sm:px-6">
        {/* SR-only live region to announce menu state */}
        <div aria-live="polite" role="status" aria-atomic="true" className="sr-only">
          {announcement}
        </div>

        {/* Logo (BIG) */}
        <Link
          href="/"
          className="flex items-center rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Image
            src="/logo.png"
            alt="Yoload"
            width={160}
            height={160}
            className="h-24 w-auto sm:h-28"
            priority
          />
          <span className="sr-only">Yoload</span>
        </Link>

        {/* Desktop nav + CTA */}
        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Main">{NavLinks}</nav>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-orange-600 text-white shadow-sm hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Let’s talk
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close main menu" : "Open main menu"}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          ref={toggleRef}
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" ref={menuRef} className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-3 sm:px-6 space-y-4">
            {NavLinks}
            <Link
              href="#contact"
              onClick={closeMenu}
              className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-orange-600 text-white shadow-sm hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20"
            >
              Let’s talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
