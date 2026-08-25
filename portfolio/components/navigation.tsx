"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavigationLink = {
  href: string;
  label: string;
  external?: boolean;
};

const navigationLinks: NavigationLink[] = [
  { href: "#work", label: "work" },
  { href: "#about", label: "about" },
  { href: "/resume.pdf", label: "resume", external: true },
  { href: "#contact", label: "contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <nav className="page-container site-nav" aria-label="Primary navigation">
        <Link className="site-logo" href="#top" aria-label="Nayan, home">
          nayan.
        </Link>

        <div className="desktop-nav" aria-label="Desktop navigation">
          {navigationLinks.map(({ href, label, external }) => (
            <Link
              className="nav-link"
              href={href}
              key={label}
              aria-label={external ? `${label}, opens in a new tab` : undefined}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className="mobile-menu-trigger"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? "close" : "menu"}
        </button>

        {isMenuOpen ? (
          <div className="mobile-nav" id="mobile-navigation">
            {navigationLinks.map(({ href, label, external }) => (
              <Link
                className="mobile-nav-link"
                href={href}
                key={label}
                aria-label={external ? `${label}, opens in a new tab` : undefined}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
