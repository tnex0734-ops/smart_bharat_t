"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Share2,
  Eye,
  Trash2,
  Search,
  FolderOpen,
  CreditCard,
  Shield,
  GraduationCap,
  Home,
  Car,
  Heart,
  Landmark,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Camera,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Documents", icon: FolderOpen },
  { id: "identity", label: "Identity", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "property", label: "Property", icon: Home },
  { id: "vehicle", label: "Vehicle", icon: Car },
  { id: "health", label: "Health", icon: Heart },
  { id: "finance", label: "Finance", icon: Landmark },
];

const MY_DOCUMENTS = [
  { id: 1, name: "Aadhaar Card", category: "identity", type: "PDF", size: "245 KB", uploaded: "Jan 15, 2026", status: "Verified", expiry: "N/A", icon: "🪪", shared: false },
  { id: 2, name: "PAN Card", category: "identity", type: "PDF", size: "180 KB", uploaded: "Jan 15, 2026", status: "Verified", expiry: "N/A", icon: "🏦", shared: false },
  { id: 3, name: "Passport", category: "identity", type: "PDF", size: "1.2 MB", uploaded: "Feb 10, 2026", status: "Verified", expiry: "Aug 2031", icon: "🛂", shared: true },
  { id: 4, name: "Voter ID Card", category: "identity", type: "PDF", size: "320 KB", uploaded: "Mar 5, 2026", status: "Verified", expiry: "N/A", icon: "🗳️", shared: false },
  { id: 5, name: "Driving Licence", category: "identity", type: "PDF", size: "290 KB", uploaded: "Mar 10, 2026", status: "Expiring Soon", expiry: "Aug 7, 2026", icon: "🚗", shared: false },
  { id: 6, name: "Birth Certificate", category: "certificates", type: "PDF", size: "150 KB", uploaded: "Jan 20, 2026", status: "Verified", expiry: "N/A", icon: "📜", shared: false },
  { id: 7, name: "Income Certificate (2025-26)", category: "certificates", type: "PDF", size: "95 KB", uploaded: "Apr 15, 2026", status: "Verified", expiry: "Mar 2027", icon: "💰", shared: true },
  { id: 8, name: "Caste Certificate", category: "certificates", type: "PDF", size: "110 KB", uploaded: "Feb 28, 2026", status: "Verified", expiry: "N/A", icon: "📄", shared: false },
  { id: 9, name: "Domicile Certificate", category: "certificates", type: "PDF", size: "105 KB", uploaded: "Mar 1, 2026", status: "Verified", expiry: "N/A", icon: "🏠", shared: false },
  { id: 10, name: "10th Marksheet", category: "education", type: "PDF", size: "380 KB", uploaded: "Jan 25, 2026", status: "Verified", expiry: "N/A", icon: "🎓", shared: false },
  { id: 11, name: "12th Marksheet", category: "education", type: "PDF", size: "420 KB", uploaded: "Jan 25, 2026", status: "Verified", expiry: "N/A", icon: "🎓", shared: false },
  { id: 12, name: "Degree Certificate", category: "education", type: "PDF", size: "550 KB", uploaded: "Feb 15, 2026", status: "Verified", expiry: "N/A", icon: "🎓", shared: true },
  { id: 13, name: "Property Registration Deed", category: "property", type: "PDF", size: "2.1 MB", uploaded: "Mar 20, 2026", status: "Uploaded", expiry: "N/A", icon: "🏢", shared: false },
  { id: 14, name: "Vehicle RC Book", category: "vehicle", type: "PDF", size: "310 KB", uploaded: "Apr 5, 2026", status: "Verified", expiry: "Apr 2031", icon: "🚙", shared: false },
  { id: 15, name: "Vehicle Insurance", category: "vehicle", type: "PDF", size: "450 KB", uploaded: "Apr 5, 2026", status: "Expiring Soon", expiry: "Sep 2026", icon: "🛡️", shared: false },
  { id: 16, name: "Ayushman Bharat Card", category: "health", type: "PDF", size: "200 KB", uploaded: "May 1, 2026", status: "Verified", expiry: "N/A", icon: "🏥", shared: false },
  { id: 17, name: "Form 16 (2025-26)", category: "finance", type: "PDF", size: "380 KB", uploaded: "Jun 10, 2026", status: "Uploaded", expiry: "N/A", icon: "📊", shared: false },
  { id: 18, name: "ITR Acknowledgment 2025-26", category: "finance", type: "PDF", size: "120 KB", uploaded: "Jul 1, 2026", status: "Verified", expiry: "N/A", icon: "🧾", shared: false },
];

const DOCUMENT_TYPES_FOR_UPLOAD = [
  "Aadhaar Card", "PAN Card", "Passport", "Voter ID", "Driving Licence",
  "Birth Certificate", "Death Certificate", "Income Certificate", "Caste Certificate",
  "Domicile Certificate", "Marriage Certificate", "Marksheet", "Degree Certificate",
  "Property Documents", "Vehicle RC", "Insurance Policy", "Tax Documents", "Other",
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("my-docs");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filtered = MY_DOCUMENTS.filter((doc) => {
    const matchCat = activeCategory === "all" || doc.category === activeCategory;
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const sharedDocs = MY_DOCUMENTS.filter(d => d.shared);
  const expiringDocs = MY_DOCUMENTS.filter(d => d.status === "Expiring Soon");

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Document Management</h1>
        <p className="page-subtitle">
          Your Citizen Digital Locker — securely store, organize, and share government documents.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{MY_DOCUMENTS.length}</div>
          <div className="stat-label">Total Documents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--color-secondary)" }}>{MY_DOCUMENTS.filter(d => d.status === "Verified").length}</div>
          <div className="stat-label">Verified</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--color-warning)" }}>{expiringDocs.length}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{sharedDocs.length}</div>
          <div className="stat-label">Shared</div>
        </div>
      </div>

      {/* Expiry Alert */}
      {expiringDocs.length > 0 && (
        <div style={{ padding: "var(--space-3) var(--space-4)", background: "var(--color-warning-light)", border: "1px solid var(--color-warning)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <AlertCircle size={22} color="var(--color-warning)" />
          <div>
            <div style={{ fontWeight: 600, color: "var(--color-warning)" }}>Documents Expiring Soon</div>
            <div style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
              {expiringDocs.map(d => d.name).join(", ")} — Renew before expiry to avoid service interruptions.
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "my-docs" ? "active" : ""}`} onClick={() => setActiveTab("my-docs")}>
          <FolderOpen size={18} style={{ marginRight: "6px" }} /> My Documents ({MY_DOCUMENTS.length})
        </button>
        <button className={`tab ${activeTab === "upload" ? "active" : ""}`} onClick={() => setActiveTab("upload")}>
          <Upload size={18} style={{ marginRight: "6px" }} /> Upload Document
        </button>
        <button className={`tab ${activeTab === "shared" ? "active" : ""}`} onClick={() => setActiveTab("shared")}>
          <Share2 size={18} style={{ marginRight: "6px" }} /> Shared ({sharedDocs.length})
        </button>
      </div>

      {/* My Documents */}
      {activeTab === "my-docs" && (
        <>
          <div className="search-container" style={{ marginBottom: "var(--space-4)", maxWidth: "100%" }}>
            <Search className="search-icon" size={20} />
            <input className="search-input" type="search" placeholder="Search documents..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search documents" />
          </div>

          <div className="category-chips">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}>
                  <Icon size={16} /> {cat.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {filtered.map((doc) => (
              <div key={doc.id} className="doc-card">
                <div className="doc-icon" style={{
                  background: doc.status === "Expiring Soon" ? "var(--color-warning-light)" : doc.status === "Verified" ? "var(--color-secondary-light)" : "var(--color-primary-light)",
                  color: doc.status === "Expiring Soon" ? "var(--color-warning)" : doc.status === "Verified" ? "var(--color-secondary)" : "var(--color-primary)",
                  fontSize: "24px",
                }}>
                  {doc.icon}
                </div>
                <div className="doc-info" style={{ flex: 1 }}>
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-meta">
                    {doc.type} • {doc.size} • Uploaded: {doc.uploaded}
                    {doc.expiry !== "N/A" && ` • Expires: ${doc.expiry}`}
                  </div>
                </div>
                <span className={`badge ${doc.status === "Verified" ? "badge-resolved" : doc.status === "Expiring Soon" ? "badge-progress" : "badge-assigned"}`}>
                  {doc.status === "Verified" && <CheckCircle2 size={12} />}
                  {doc.status === "Expiring Soon" && <Clock size={12} />}
                  {doc.status}
                </span>
                <div style={{ display: "flex", gap: "var(--space-1)" }}>
                  <button className="btn btn-ghost btn-sm btn-icon" title="View" aria-label="View document"><Eye size={16} /></button>
                  <button className="btn btn-ghost btn-sm btn-icon" title="Download" aria-label="Download document"><Download size={16} /></button>
                  <button className="btn btn-ghost btn-sm btn-icon" title="Share" aria-label="Share document"><Share2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <h3>No documents found</h3>
              <p>Try a different search or category.</p>
            </div>
          )}
        </>
      )}

      {/* Upload */}
      {activeTab === "upload" && (
        <div>
          {uploadSuccess && (
            <div style={{ padding: "var(--space-4)", background: "var(--color-secondary-light)", border: "1px solid var(--color-secondary)", borderRadius: "var(--radius-lg)", marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <CheckCircle2 size={24} color="var(--color-secondary)" />
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-secondary)" }}>Document Uploaded Successfully!</div>
                <div style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>Your document is being verified. This usually takes 1-2 business days.</div>
              </div>
            </div>
          )}

          <div className="card" style={{ maxWidth: "640px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "var(--space-4)" }}>Upload New Document</h2>

            <div className="form-group">
              <label className="form-label">Document Type <span className="required">(required)</span></label>
              <select className="form-select">
                <option value="">Select document type...</option>
                {DOCUMENT_TYPES_FOR_UPLOAD.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Document Name</label>
              <input className="form-input" type="text" placeholder="e.g. Aadhaar Card - Rahul Kumar" />
            </div>

            <div className="form-group">
              <label className="form-label">Upload File <span className="required">(required)</span></label>
              <div className="upload-zone">
                <div className="upload-zone-icon"><Upload size={48} /></div>
                <p style={{ fontWeight: 600, marginBottom: "var(--space-1)" }}>Click to upload or drag & drop</p>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Expiry Date (if applicable)</label>
              <input className="form-input" type="date" />
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => { setUploadSuccess(true); setTimeout(() => setUploadSuccess(false), 4000); }}>
              <Upload size={18} /> Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Shared */}
      {activeTab === "shared" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>
            Documents shared with government departments for your applications.
          </p>
          {sharedDocs.map((doc) => (
            <div key={doc.id} className="doc-card">
              <div className="doc-icon" style={{ fontSize: "24px" }}>{doc.icon}</div>
              <div className="doc-info" style={{ flex: 1 }}>
                <div className="doc-name">{doc.name}</div>
                <div className="doc-meta">{doc.type} • {doc.size} • Shared with government portals</div>
              </div>
              <span className="badge badge-assigned"><Share2 size={12} /> Shared</span>
              <button className="btn btn-ghost btn-sm">Revoke Access</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
