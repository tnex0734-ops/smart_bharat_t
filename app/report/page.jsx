"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Camera,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Trash2,
  Droplets,
  Lightbulb,
  Car,
  Volume2,
  TreePine,
  Construction,
  Lamp,
  Bug,
} from "lucide-react";

const ISSUE_TYPES = [
  { id: "pothole", label: "Pothole / Road Damage", icon: "🕳️", dept: "PWD" },
  { id: "garbage", label: "Garbage / Waste", icon: "🗑️", dept: "Municipal Corp" },
  { id: "water", label: "Water Supply Issue", icon: "💧", dept: "Water Board" },
  { id: "streetlight", label: "Street Light Issue", icon: "💡", dept: "Electricity Dept" },
  { id: "drainage", label: "Drainage / Sewage", icon: "🚰", dept: "Drainage Dept" },
  { id: "parking", label: "Illegal Parking", icon: "🚗", dept: "Traffic Police" },
  { id: "sanitation", label: "Public Sanitation", icon: "🚻", dept: "Health Dept" },
  { id: "noise", label: "Noise Pollution", icon: "📢", dept: "Police / PCB" },
  { id: "tree", label: "Tree Fall / Green Issues", icon: "🌳", dept: "Forest Dept" },
  { id: "encroachment", label: "Encroachment", icon: "🏗️", dept: "Municipal Corp" },
  { id: "electricity", label: "Power Outage", icon: "⚡", dept: "Electricity Dept" },
  { id: "other", label: "Other Issue", icon: "📋", dept: "General" },
];

const MY_COMPLAINTS = [
  {
    id: "CMP-8842", title: "Large pothole on MG Road near Metro Station", type: "pothole", location: "MG Road, Sector 14, Gurugram",
    status: "In Progress", date: "Jul 3, 2026", department: "PWD", priority: "High",
    timeline: [
      { step: "Reported", date: "Jul 3, 2026", done: true },
      { step: "Verified", date: "Jul 4, 2026", done: true },
      { step: "Assigned to PWD", date: "Jul 4, 2026", done: true },
      { step: "In Progress", date: "Jul 5, 2026", done: true },
      { step: "Resolved", date: "", done: false },
    ],
  },
  {
    id: "CMP-8790", title: "Garbage not collected for 3 days in Block C", type: "garbage", location: "Block C, Sector 22, Dwarka, Delhi",
    status: "Assigned", date: "Jul 1, 2026", department: "Municipal Corporation", priority: "Medium",
    timeline: [
      { step: "Reported", date: "Jul 1, 2026", done: true },
      { step: "Verified", date: "Jul 2, 2026", done: true },
      { step: "Assigned to MCD", date: "Jul 3, 2026", done: true },
      { step: "In Progress", date: "", done: false },
      { step: "Resolved", date: "", done: false },
    ],
  },
  {
    id: "CMP-8756", title: "Street light not working at Rajiv Chowk crossing", type: "streetlight", location: "Rajiv Chowk, Connaught Place, Delhi",
    status: "Resolved", date: "Jun 28, 2026", department: "Electricity Department", priority: "Low",
    timeline: [
      { step: "Reported", date: "Jun 28, 2026", done: true },
      { step: "Verified", date: "Jun 29, 2026", done: true },
      { step: "Assigned", date: "Jun 29, 2026", done: true },
      { step: "In Progress", date: "Jun 30, 2026", done: true },
      { step: "Resolved", date: "Jul 2, 2026", done: true },
    ],
  },
  {
    id: "CMP-8701", title: "Broken water pipe causing road flooding", type: "water", location: "Nehru Nagar, Bhopal, MP",
    status: "Verified", date: "Jun 25, 2026", department: "Water Board", priority: "High",
    timeline: [
      { step: "Reported", date: "Jun 25, 2026", done: true },
      { step: "Verified", date: "Jun 26, 2026", done: true },
      { step: "Assigned", date: "", done: false },
      { step: "In Progress", date: "", done: false },
      { step: "Resolved", date: "", done: false },
    ],
  },
];

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("report");
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Report Civic Issues</h1>
        <p className="page-subtitle">
          Report public infrastructure problems and track their resolution. Your reports help improve civic services.
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "report" ? "active" : ""}`} onClick={() => setActiveTab("report")}>
          <AlertTriangle size={18} style={{ marginRight: "6px" }} /> Report New Issue
        </button>
        <button className={`tab ${activeTab === "complaints" ? "active" : ""}`} onClick={() => setActiveTab("complaints")}>
          <Clock size={18} style={{ marginRight: "6px" }} /> My Complaints ({MY_COMPLAINTS.length})
        </button>
      </div>

      {activeTab === "report" && (
        <>
          {submitted && (
            <div style={{ padding: "var(--space-4)", background: "var(--color-secondary-light)", border: "1px solid var(--color-secondary)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <CheckCircle2 size={24} color="var(--color-secondary)" />
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-secondary)" }}>Complaint Submitted Successfully!</div>
                <div style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
                  Your complaint ID is CMP-8901. You can track it in the "My Complaints" tab.
                </div>
              </div>
            </div>
          )}

          {/* Issue Type Selection */}
          <section className="section">
            <h2 className="section-title" style={{ marginBottom: "var(--space-3)" }}>
              1. Select Issue Type <span className="required">(required)</span>
            </h2>
            <div className="issue-type-grid">
              {ISSUE_TYPES.map((type) => (
                <button key={type.id} className={`issue-type-card ${selectedType === type.id ? "selected" : ""}`} onClick={() => setSelectedType(type.id)}>
                  <span className="issue-type-icon">{type.icon}</span>
                  <span className="issue-type-label">{type.label}</span>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{type.dept}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Details Form */}
          <section className="section">
            <h2 className="section-title" style={{ marginBottom: "var(--space-3)" }}>2. Issue Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Issue Title <span className="required">(required)</span></label>
                <input className="form-input" type="text" placeholder="Brief title — e.g. Large pothole on MG Road"
                  value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Description <span className="required">(required)</span></label>
                <textarea className="form-textarea" placeholder="Describe the issue in detail. Include any safety concerns, how long it has existed, and impact on daily life."
                  value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Location <span className="required">(required)</span></label>
                <div style={{ position: "relative" }}>
                  <MapPin size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input className="form-input" type="text" placeholder="Enter address or use GPS location" style={{ paddingLeft: "44px" }}
                    value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: "var(--space-2)" }}>
                  <MapPin size={16} /> Use Current Location
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Photos</label>
                <div className="upload-zone">
                  <div className="upload-zone-icon"><Camera size={48} /></div>
                  <p style={{ fontWeight: 600, marginBottom: "var(--space-1)" }}>Click to upload photos</p>
                  <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>PNG, JPG up to 10MB. Max 5 photos.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                <button type="submit" className="btn btn-primary btn-lg">
                  <Send size={18} /> Submit Report
                </button>
                <button type="button" className="btn btn-secondary btn-lg">Save as Draft</button>
              </div>
            </form>
          </section>

          {/* Map */}
          <section className="section">
            <h2 className="section-title" style={{ marginBottom: "var(--space-3)" }}>Issue Map</h2>
            <div className="map-placeholder">
              <div style={{ textAlign: "center" }}>
                <MapPin size={32} style={{ marginBottom: "var(--space-2)" }} />
                <p>Interactive map showing reported issues in your area</p>
                <p style={{ fontSize: "14px", marginTop: "var(--space-1)" }}>12 active reports nearby</p>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "complaints" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {MY_COMPLAINTS.map((complaint) => (
            <div key={complaint.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-1)", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "24px" }}>{ISSUE_TYPES.find(t => t.id === complaint.type)?.icon}</span>
                    <h3 style={{ fontSize: "18px", fontWeight: 600 }}>{complaint.title}</h3>
                  </div>
                  <div style={{ display: "flex", gap: "var(--space-3)", fontSize: "14px", color: "var(--color-text-muted)", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {complaint.location}</span>
                    <span>ID: {complaint.id}</span>
                    <span>{complaint.department}</span>
                    <span>{complaint.date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <span className={`badge ${complaint.priority === "High" ? "badge-rejected" : complaint.priority === "Medium" ? "badge-progress" : "badge-submitted"}`}>
                    {complaint.priority} Priority
                  </span>
                  <span className={`badge ${complaint.status === "Resolved" ? "badge-resolved" : complaint.status === "In Progress" ? "badge-progress" : complaint.status === "Assigned" ? "badge-assigned" : "badge-verified"}`}>
                    {complaint.status}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="timeline" style={{ marginLeft: "var(--space-2)" }}>
                {complaint.timeline.map((step, i) => (
                  <div key={i} className="timeline-item">
                    <div className={`timeline-marker ${step.done && i === complaint.timeline.filter(s => s.done).length - 1 ? "current" : step.done ? "completed" : "pending"}`}>
                      {step.done ? <CheckCircle2 size={16} /> : (i + 1)}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{step.step}</div>
                      <div className="timeline-date">{step.date || "Pending"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
