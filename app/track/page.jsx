"use client";

import { useState } from "react";
import {
  FileText,
  Search as SearchIcon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  Building2,
  MapPin,
  AlertCircle,
  Eye,
  ChevronRight,
} from "lucide-react";

const APPLICATIONS = [
  {
    id: "APP-2026-4821", title: "Passport Renewal", department: "Ministry of External Affairs", type: "Identity Service",
    appliedDate: "Jun 15, 2026", lastUpdate: "Jul 5, 2026", estimatedCompletion: "Jul 25, 2026",
    status: "Document Verification",
    timeline: [
      { step: "Application Submitted", date: "Jun 15, 2026", done: true, detail: "Application ID generated" },
      { step: "Payment Received", date: "Jun 15, 2026", done: true, detail: "₹1,500 payment confirmed" },
      { step: "Document Verification", date: "Jul 5, 2026", done: true, detail: "Documents under review" },
      { step: "Police Verification", date: "", done: false, detail: "Local police verification pending" },
      { step: "Passport Printing", date: "", done: false, detail: "Printing at Nashik press" },
      { step: "Dispatched", date: "", done: false, detail: "Speed post delivery" },
    ],
  },
  {
    id: "APP-2026-3917", title: "Driving Licence Renewal", department: "Regional Transport Office, Gurugram", type: "License",
    appliedDate: "Jun 20, 2026", lastUpdate: "Jul 3, 2026", estimatedCompletion: "Aug 5, 2026",
    status: "Slot Booking Pending",
    timeline: [
      { step: "Application Submitted", date: "Jun 20, 2026", done: true, detail: "Form submitted online" },
      { step: "Payment Received", date: "Jun 20, 2026", done: true, detail: "₹400 payment confirmed" },
      { step: "Slot Booking", date: "", done: false, detail: "Book RTO visit slot" },
      { step: "Biometric Verification", date: "", done: false, detail: "Visit RTO for biometrics" },
      { step: "Licence Issued", date: "", done: false, detail: "Digital DL on Parivahan" },
    ],
  },
  {
    id: "APP-2026-5102", title: "Income Certificate", department: "Revenue Department, Delhi", type: "Certificate",
    appliedDate: "Jul 1, 2026", lastUpdate: "Jul 6, 2026", estimatedCompletion: "Jul 12, 2026",
    status: "Approved",
    timeline: [
      { step: "Application Submitted", date: "Jul 1, 2026", done: true, detail: "Online application filed" },
      { step: "Document Verification", date: "Jul 3, 2026", done: true, detail: "All documents verified" },
      { step: "Field Inquiry", date: "Jul 5, 2026", done: true, detail: "Tehsildar inquiry completed" },
      { step: "Approved", date: "Jul 6, 2026", done: true, detail: "Certificate approved by SDM" },
      { step: "Certificate Issued", date: "", done: false, detail: "Download from e-District portal" },
    ],
  },
  {
    id: "APP-2026-2845", title: "PM Kisan Registration", department: "Ministry of Agriculture", type: "Scheme",
    appliedDate: "May 10, 2026", lastUpdate: "Jun 28, 2026", estimatedCompletion: "Jul 15, 2026",
    status: "Under Verification",
    timeline: [
      { step: "Application Submitted", date: "May 10, 2026", done: true, detail: "Submitted via CSC" },
      { step: "State Review", date: "Jun 1, 2026", done: true, detail: "State nodal agency review" },
      { step: "Land Record Verification", date: "Jun 15, 2026", done: true, detail: "Revenue records matched" },
      { step: "Aadhaar Verification", date: "", done: false, detail: "NPCI Aadhaar seeding check" },
      { step: "Approved for Payment", date: "", done: false, detail: "Funds released to bank" },
    ],
  },
  {
    id: "APP-2026-6090", title: "Voter ID Correction", department: "Election Commission", type: "Identity Service",
    appliedDate: "Jun 10, 2026", lastUpdate: "Jul 1, 2026", estimatedCompletion: "Jul 20, 2026",
    status: "Processing",
    timeline: [
      { step: "Request Submitted", date: "Jun 10, 2026", done: true, detail: "Form 8 submitted on NVSP" },
      { step: "Verification", date: "Jul 1, 2026", done: true, detail: "BLO verification completed" },
      { step: "Correction Processing", date: "", done: false, detail: "Database update pending" },
      { step: "Updated EPIC Issued", date: "", done: false, detail: "New card dispatched" },
    ],
  },
];

const COMPLAINTS = [
  { id: "CMP-8842", title: "Pothole on MG Road", location: "Sector 14, Gurugram", status: "In Progress", date: "Jul 3, 2026", department: "PWD", priority: "High" },
  { id: "CMP-8790", title: "Garbage Not Collected", location: "Block C, Dwarka", status: "Assigned", date: "Jul 1, 2026", department: "Municipal Corporation", priority: "Medium" },
  { id: "CMP-8756", title: "Street Light Not Working", location: "Rajiv Chowk", status: "Resolved", date: "Jun 28, 2026", department: "Electricity Dept", priority: "Low" },
  { id: "CMP-8701", title: "Water Pipe Burst", location: "Nehru Nagar, Bhopal", status: "Verified", date: "Jun 25, 2026", department: "Water Board", priority: "High" },
];

const SERVICE_REQUESTS = [
  { id: "SR-4410", title: "Aadhaar Address Update", status: "Completed", date: "Jun 20, 2026" },
  { id: "SR-4388", title: "PAN-Aadhaar Linking", status: "Completed", date: "Jun 15, 2026" },
  { id: "SR-4320", title: "Birth Certificate Request", status: "Processing", date: "Jun 10, 2026" },
];

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState("applications");
  const [expandedApp, setExpandedApp] = useState("APP-2026-4821");

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Track Status</h1>
        <p className="page-subtitle">
          Monitor all your government applications, complaints, and service requests in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{APPLICATIONS.length}</div>
          <div className="stat-label">Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{COMPLAINTS.filter(c => c.status !== "Resolved").length}</div>
          <div className="stat-label">Open Complaints</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{SERVICE_REQUESTS.length}</div>
          <div className="stat-label">Service Requests</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--color-secondary)" }}>1</div>
          <div className="stat-label">Resolved This Week</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-container" style={{ marginBottom: "var(--space-4)", maxWidth: "100%" }}>
        <SearchIcon className="search-icon" size={20} />
        <input className="search-input" type="search" placeholder="Search by application ID, complaint ID, or title..."
          aria-label="Search tracking" />
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "applications" ? "active" : ""}`} onClick={() => setActiveTab("applications")}>
          <FileText size={18} style={{ marginRight: "6px" }} /> Applications ({APPLICATIONS.length})
        </button>
        <button className={`tab ${activeTab === "complaints" ? "active" : ""}`} onClick={() => setActiveTab("complaints")}>
          <AlertTriangle size={18} style={{ marginRight: "6px" }} /> Complaints ({COMPLAINTS.length})
        </button>
        <button className={`tab ${activeTab === "services" ? "active" : ""}`} onClick={() => setActiveTab("services")}>
          <Building2 size={18} style={{ marginRight: "6px" }} /> Service Requests ({SERVICE_REQUESTS.length})
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {APPLICATIONS.map((app) => {
            const completedSteps = app.timeline.filter(s => s.done).length;
            const totalSteps = app.timeline.length;
            const progress = Math.round((completedSteps / totalSteps) * 100);
            const isExpanded = expandedApp === app.id;

            return (
              <div key={app.id} className="card" style={{ cursor: "pointer" }} onClick={() => setExpandedApp(isExpanded ? null : app.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "250px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 600 }}>{app.title}</h3>
                      <span className="badge badge-submitted">{app.type}</span>
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--color-text-muted)", display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
                      <span>{app.department}</span>
                      <span>ID: {app.id}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className={`badge ${progress === 100 ? "badge-resolved" : progress >= 60 ? "badge-progress" : "badge-assigned"}`}>
                      {app.status}
                    </span>
                    <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "4px" }}>{progress}% complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: "var(--space-3)" }}>
                  <div style={{ height: "8px", background: "var(--color-surface)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: progress >= 80 ? "var(--color-secondary)" : "var(--color-primary)", borderRadius: "4px", transition: "width 0.5s ease" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "var(--space-4)", fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: isExpanded ? "var(--space-4)" : 0, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={14} /> Applied: {app.appliedDate}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> Updated: {app.lastUpdate}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><CheckCircle2 size={14} /> Est. Completion: {app.estimatedCompletion}</span>
                </div>

                {/* Expanded Timeline */}
                {isExpanded && (
                  <div style={{ borderTop: "1px solid var(--color-border-light)", paddingTop: "var(--space-4)", marginTop: "var(--space-3)" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "var(--space-3)" }}>📋 Status Timeline</h4>
                    <div className="timeline">
                      {app.timeline.map((step, i) => {
                        const lastDoneIdx = app.timeline.reduce((acc, s, idx) => s.done ? idx : acc, -1);
                        return (
                          <div key={i} className="timeline-item">
                            <div className={`timeline-marker ${i === lastDoneIdx ? "current" : step.done ? "completed" : "pending"}`}>
                              {step.done ? <CheckCircle2 size={16} /> : (i + 1)}
                            </div>
                            <div className="timeline-content">
                              <div className="timeline-title">{step.step}</div>
                              <div className="timeline-date">{step.date || "Pending"}</div>
                              <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px" }}>{step.detail}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === "complaints" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {COMPLAINTS.map((c) => (
            <div key={c.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flex: 1, minWidth: "200px" }}>
                <div className={`card-icon ${c.status === "Resolved" ? "card-icon-secondary" : c.status === "In Progress" ? "card-icon-warning" : "card-icon-primary"}`}>
                  {c.status === "Resolved" ? <CheckCircle2 size={22} /> : c.status === "In Progress" ? <Clock size={22} /> : <AlertCircle size={22} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "16px" }}>{c.title}</div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={13} /> {c.location} • {c.department}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{c.date}</span>
                <span className={`badge ${c.priority === "High" ? "badge-rejected" : c.priority === "Medium" ? "badge-progress" : "badge-submitted"}`}>{c.priority}</span>
                <span className={`badge ${c.status === "Resolved" ? "badge-resolved" : c.status === "In Progress" ? "badge-progress" : "badge-assigned"}`}>{c.status}</span>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{c.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Requests Tab */}
      {activeTab === "services" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          {SERVICE_REQUESTS.map((sr) => (
            <div key={sr.id} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-3) var(--space-4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <div className={`card-icon ${sr.status === "Completed" ? "card-icon-secondary" : "card-icon-primary"}`}>
                  {sr.status === "Completed" ? <CheckCircle2 size={22} /> : <Clock size={22} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "16px" }}>{sr.title}</div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>ID: {sr.id} • {sr.date}</div>
                </div>
              </div>
              <span className={`badge ${sr.status === "Completed" ? "badge-resolved" : "badge-progress"}`}>{sr.status}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
