"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Gift,
  AlertTriangle,
  Search,
  FileText,
  Bell,
  User,
  Eye,
  Type,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Building2 },
  { href: "/schemes", label: "Schemes", icon: Gift },
  { href: "/report", label: "Report Issues", icon: AlertTriangle },
  { href: "/track", label: "Track", icon: Search },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

const MOBILE_NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Building2 },
  { href: "/schemes", label: "Schemes", icon: Gift },
  { href: "/track", label: "Track", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "high-contrast" : ""
    );
  };

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    document.documentElement.setAttribute(
      "data-text-size",
      next ? "large" : ""
    );
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand">
            <div className="navbar-brand-icon">SB</div>
            <span>Smart Bharat</span>
          </Link>

          <ul className="navbar-links">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? "active" : ""}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="navbar-actions">
            <button
              className={`navbar-toggle ${highContrast ? "active-toggle" : ""}`}
              onClick={toggleHighContrast}
              aria-label="Toggle high contrast mode"
              title="High Contrast"
            >
              <Eye size={18} />
            </button>
            <button
              className={`navbar-toggle ${largeText ? "active-toggle" : ""}`}
              onClick={toggleLargeText}
              aria-label="Toggle large text mode"
              title="Large Text"
            >
              <Type size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-inner">
          {MOBILE_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
