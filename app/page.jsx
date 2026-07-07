"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormContext } from "./context/FormContext";
import {
  Building2,
  Gift,
  AlertTriangle,
  Search,
  FileText,
  Upload,
  ArrowRight,
  Clock,
  Bell,
  Bookmark,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

/* ───── DUMMY DATA ───── */

const QUICK_ACTIONS = [
  { label: "Apply for Service", href: "/services", icon: Building2, color: "var(--color-primary)", bg: "var(--color-primary-light)" },
  { label: "Explore Schemes", href: "/schemes", icon: Gift, color: "var(--color-secondary)", bg: "var(--color-secondary-light)" },
  { label: "Report Issue", href: "/report", icon: AlertTriangle, color: "var(--color-accent)", bg: "var(--color-accent-light)" },
  { label: "Track Status", href: "/track", icon: Search, color: "var(--color-warning)", bg: "var(--color-warning-light)" },
  { label: "Upload Documents", href: "/documents", icon: Upload, color: "var(--color-danger)", bg: "var(--color-danger-light)" },
];

const CONTINUE_APPLICATIONS = [
  { id: "APP-2026-4821", title: "Passport Renewal", progress: 75, status: "Documents Pending", dueDate: "Jul 15, 2026", department: "Ministry of External Affairs" },
  { id: "APP-2026-3917", title: "Driving Licence Renewal", progress: 40, status: "Form Incomplete", dueDate: "Jul 22, 2026", department: "Regional Transport Office" },
  { id: "APP-2026-5102", title: "Income Certificate", progress: 90, status: "Under Review", dueDate: "Jul 10, 2026", department: "Revenue Department" },
];

const RECOMMENDED_SCHEMES = [
  { title: "PM Kisan Samman Nidhi", benefit: "₹6,000/year", category: "Agriculture", deadline: "Open", eligibility: "Landholding Farmers", tag: "Recommended" },
  { title: "Ayushman Bharat (PMJAY)", benefit: "₹5 Lakh Health Cover", category: "Health", deadline: "Open", eligibility: "BPL Families", tag: "Popular" },
  { title: "National Scholarship Portal", benefit: "Up to ₹50,000/year", category: "Education", deadline: "Aug 31, 2026", eligibility: "Students (SC/ST/OBC/Minority)", tag: "Deadline Soon" },
  { title: "PM Mudra Yojana", benefit: "Loans up to ₹10 Lakh", category: "Business", deadline: "Open", eligibility: "Small Business Owners", tag: "Trending" },
];

const ACTIVE_COMPLAINTS = [
  { id: "CMP-8842", title: "Pothole on MG Road", location: "Sector 14, Gurugram", status: "In Progress", date: "Jul 3, 2026", department: "PWD" },
  { id: "CMP-8790", title: "Garbage Not Collected", location: "Block C, Dwarka", status: "Assigned", date: "Jul 1, 2026", department: "Municipal Corporation" },
  { id: "CMP-8756", title: "Street Light Not Working", location: "Rajiv Chowk", status: "Resolved", date: "Jun 28, 2026", department: "Electricity Dept" },
];

const RECENT_NOTIFICATIONS = [
  { title: "Application Approved", text: "Your Income Certificate application has been approved.", time: "2 hours ago", type: "success" },
  { title: "Document Expiring", text: "Your Driving Licence expires in 30 days. Renew now.", time: "5 hours ago", type: "warning" },
  { title: "New Scheme Available", text: "You may be eligible for PM Vishwakarma Yojana.", time: "1 day ago", type: "info" },
  { title: "Complaint Update", text: "Your complaint CMP-8842 status changed to In Progress.", time: "2 days ago", type: "info" },
];

const SAVED_SERVICES = [
  { title: "PAN Card Application", category: "Identity Services", icon: "🪪" },
  { title: "Birth Certificate", category: "Certificates", icon: "📜" },
  { title: "MSME Registration", category: "Business", icon: "🏭" },
];

const STATS = [
  { value: "3", label: "Active Applications" },
  { value: "2", label: "Open Complaints" },
  { value: "7", label: "Documents Stored" },
  { value: "12", label: "Eligible Schemes" },
];

/* ───── PAGE ───── */

export default function Dashboard() {
  const router = useRouter();
  const { setPreFilledFields } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();

      if (response.ok && data.service) {
        if (data.extractedDetails && Object.keys(data.extractedDetails).length > 0) {
          setPreFilledFields(data.extractedDetails);
        }
        router.push(`/services/apply?service=${data.service}`);
      } else {
        router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
      }
    } catch (err) {
      console.error("Search redirection failed:", err);
      router.push(`/services?q=${encodeURIComponent(searchQuery)}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, Rahul 👋</h1>
          <p className="hero-subtitle">
            Your civic dashboard — discover services, track applications, and
            manage everything in one place.
          </p>
          <form onSubmit={handleSearchSubmit} className="search-container">
            <Search className="search-icon" size={20} />
            <input
              className="search-input"
              type="search"
              placeholder={isSearching ? "Analyzing query & redirecting..." : "Search services, schemes, documents..."}
              aria-label="Search Smart Bharat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
              style={{
                color: "var(--color-text-primary)",
                background: "rgba(255,255,255,0.95)",
                opacity: isSearching ? 0.7 : 1,
              }}
            />
          </form>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href} className="quick-action-card">
                <div className="quick-action-icon" style={{ background: action.bg, color: action.color }}>
                  <Icon size={26} />
                </div>
                <span className="quick-action-label">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Continue Applications */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Continue Applications</h2>
          <Link href="/track" className="btn btn-ghost btn-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid-3">
          {CONTINUE_APPLICATIONS.map((app) => (
            <div key={app.id} className="card card-interactive">
              <div className="card-header">
                <div>
                  <div className="card-title">{app.title}</div>
                  <div className="card-description">{app.department}</div>
                </div>
                <span className={`badge ${app.progress >= 80 ? "badge-progress" : "badge-assigned"}`}>
                  {app.progress}%
                </span>
              </div>
              <div style={{ marginBottom: "var(--space-3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--color-text-muted)", marginBottom: "6px" }}>
                  <span>{app.status}</span>
                  <span>{app.id}</span>
                </div>
                <div style={{ height: "6px", background: "var(--color-surface)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${app.progress}%`, background: app.progress >= 80 ? "var(--color-secondary)" : "var(--color-primary)", borderRadius: "3px", transition: "width 0.5s ease" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={14} /> Due: {app.dueDate}
                </span>
                <button className="btn btn-primary btn-sm">Resume</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Schemes */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Recommended Schemes</h2>
          <Link href="/schemes" className="btn btn-ghost btn-sm">
            Browse All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid-4">
          {RECOMMENDED_SCHEMES.map((scheme, i) => (
            <div key={i} className="card card-interactive">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-3)" }}>
                <span className={`badge ${scheme.tag === "Deadline Soon" ? "badge-progress" : scheme.tag === "Popular" ? "badge-verified" : scheme.tag === "Trending" ? "badge-assigned" : "badge-recommended"}`}>
                  {scheme.tag === "Trending" && <TrendingUp size={12} />}
                  {scheme.tag === "Deadline Soon" && <Clock size={12} />}
                  {scheme.tag === "Popular" && <Star size={12} />}
                  {scheme.tag}
                </span>
              </div>
              <h3 className="card-title" style={{ marginBottom: "var(--space-2)" }}>{scheme.title}</h3>
              <div style={{ fontSize: "22px", fontWeight: "700", color: "var(--color-secondary)", marginBottom: "var(--space-2)" }}>
                {scheme.benefit}
              </div>
              <div className="card-description" style={{ marginBottom: "var(--space-3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                  <Gift size={14} /> {scheme.category}
                </div>
                <div>Eligibility: {scheme.eligibility}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                  <Calendar size={14} /> Deadline: {scheme.deadline}
                </div>
              </div>
              <button className="btn btn-success btn-sm" style={{ width: "100%" }}>
                Check Eligibility <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Active Complaints */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Active Complaints</h2>
          <Link href="/report" className="btn btn-ghost btn-sm">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {ACTIVE_COMPLAINTS.map((complaint) => (
            <div key={complaint.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flex: 1, minWidth: "200px" }}>
                <div className={`card-icon ${complaint.status === "Resolved" ? "card-icon-secondary" : complaint.status === "In Progress" ? "card-icon-warning" : "card-icon-primary"}`}>
                  {complaint.status === "Resolved" ? <CheckCircle2 size={22} /> : complaint.status === "In Progress" ? <Clock size={22} /> : <AlertCircle size={22} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "16px" }}>{complaint.title}</div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={13} /> {complaint.location}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{complaint.department}</span>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{complaint.date}</span>
                <span className={`badge ${complaint.status === "Resolved" ? "badge-resolved" : complaint.status === "In Progress" ? "badge-progress" : "badge-assigned"}`}>
                  {complaint.status}
                </span>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{complaint.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Notifications + Saved Services */}
      <div className="grid-2">
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recent Notifications</h2>
            <Link href="/notifications" className="btn btn-ghost btn-sm">
              All <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {RECENT_NOTIFICATIONS.map((notif, i) => (
              <div key={i} className="notification-item">
                <div className="notification-dot" style={{
                  background: notif.type === "success" ? "var(--color-secondary)" : notif.type === "warning" ? "var(--color-warning)" : "var(--color-primary)"
                }} />
                <div className="notification-content">
                  <div className="notification-title">{notif.title}</div>
                  <div className="notification-text">{notif.text}</div>
                  <div className="notification-time">{notif.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Saved Services</h2>
            <Link href="/services" className="btn btn-ghost btn-sm">
              Browse <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {SAVED_SERVICES.map((svc, i) => (
              <div key={i} className="card card-interactive" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "var(--space-3)" }}>
                <div style={{ fontSize: "28px", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-surface)", borderRadius: "var(--radius-md)" }}>
                  {svc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "16px" }}>{svc.title}</div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>{svc.category}</div>
                </div>
                <Bookmark size={18} style={{ color: "var(--color-accent)" }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-3)", padding: "var(--space-4)", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>
              Need help? Ask our AI Assistant about any government service or scheme.
            </p>
            <span style={{ fontSize: "14px", color: "var(--color-primary)", fontWeight: 600 }}>
              Click the chat icon →
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
