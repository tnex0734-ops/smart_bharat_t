"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CreditCard,
  FileText,
  Car,
  Heart,
  GraduationCap,
  Briefcase,
  Landmark,
  Building2,
  ArrowRight,
  Clock,
  IndianRupee,
  ChevronRight,
  Star,
  Users,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Services", icon: Building2 },
  { id: "identity", label: "Identity", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "licenses", label: "Licenses", icon: Car },
  { id: "health", label: "Health", icon: Heart },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "tax", label: "Tax & Finance", icon: Landmark },
  { id: "business", label: "Business", icon: Building2 },
];

const getApplyLink = (svc) => {
  if (svc.id === 1) return "/services/apply?service=aadhaar";
  if (svc.id === 3) return "/services/apply?service=passport";
  return "/services/apply?service=income-certificate";
};

const ALL_SERVICES = [
  // Identity
  { id: 1, title: "Aadhaar Card", description: "Apply for new Aadhaar, update details, or download e-Aadhaar. Biometric-based identity for every Indian citizen.", category: "identity", fee: "Free", timeline: "15-30 days", popularity: 98, documents: ["Proof of Identity", "Proof of Address", "Date of Birth Proof"], portal: "UIDAI", icon: "🪪" },
  { id: 2, title: "PAN Card Application", description: "Apply for new Permanent Account Number or request corrections. Required for tax filing and financial transactions.", category: "identity", fee: "₹107", timeline: "15-20 days", popularity: 95, documents: ["Aadhaar Card", "Proof of Address", "Passport Photo"], portal: "NSDL / UTIITSL", icon: "🏦" },
  { id: 3, title: "Passport Application", description: "Apply for fresh passport, renewal, or Tatkal service. International travel identity document.", category: "identity", fee: "₹1,500 - ₹3,500", timeline: "30-45 days", popularity: 90, documents: ["Aadhaar", "PAN Card", "Birth Certificate", "Address Proof"], portal: "Passport Seva", icon: "🛂" },
  { id: 4, title: "Voter ID Card (EPIC)", description: "Apply for new voter ID, corrections, or address change through National Voter Service Portal.", category: "identity", fee: "Free", timeline: "15-30 days", popularity: 88, documents: ["Aadhaar Card", "Address Proof", "Passport Photo"], portal: "NVSP", icon: "🗳️" },

  // Certificates
  { id: 5, title: "Birth Certificate", description: "Register birth and obtain certificate from municipal corporation. Essential for school admission and identity.", category: "certificates", fee: "₹10-50", timeline: "7-15 days", popularity: 85, documents: ["Hospital Birth Record", "Parent Aadhaar", "Parent Marriage Certificate"], portal: "Municipal Corporation", icon: "📜" },
  { id: 6, title: "Death Certificate", description: "Register death and obtain official certificate. Required for legal proceedings and insurance claims.", category: "certificates", fee: "₹10-50", timeline: "7-15 days", popularity: 60, documents: ["Medical Certificate", "Deceased Aadhaar", "Applicant ID Proof"], portal: "Municipal Corporation", icon: "📋" },
  { id: 7, title: "Income Certificate", description: "Certificate of annual income from state revenue department. Required for scheme applications and admissions.", category: "certificates", fee: "₹20-100", timeline: "7-15 days", popularity: 92, documents: ["Aadhaar", "Ration Card", "Salary Slip / Self-Declaration"], portal: "e-District Portal", icon: "💰" },
  { id: 8, title: "Caste Certificate", description: "Official certificate for SC/ST/OBC category. Required for reservations, scholarships, and government schemes.", category: "certificates", fee: "₹20-50", timeline: "15-30 days", popularity: 87, documents: ["Parent Caste Certificate", "School Records", "Aadhaar"], portal: "Revenue Department", icon: "📄" },
  { id: 9, title: "Domicile Certificate", description: "Proof of residence in a state/UT. Required for admissions, jobs, and state-specific schemes.", category: "certificates", fee: "₹20-50", timeline: "15-30 days", popularity: 82, documents: ["Address Proof", "School Certificate", "Aadhaar", "Ration Card"], portal: "District Magistrate", icon: "🏠" },
  { id: 10, title: "Marriage Certificate", description: "Register marriage and obtain legal certificate. Required for passport, visa, and joint property.", category: "certificates", fee: "₹100-500", timeline: "7-30 days", popularity: 78, documents: ["Marriage Invitation", "Wedding Photos", "Witness IDs", "Age Proof"], portal: "Local Registrar", icon: "💍" },

  // Licenses
  { id: 11, title: "Driving Licence", description: "Apply for learner's permit or permanent driving licence. Test at nearest RTO.", category: "licenses", fee: "₹200-1,000", timeline: "30-60 days", popularity: 93, documents: ["Age Proof", "Address Proof", "Medical Certificate", "Passport Photo"], portal: "Parivahan", icon: "🚗" },
  { id: 12, title: "Vehicle Registration", description: "Register new vehicle with Regional Transport Office. Mandatory for all motor vehicles.", category: "licenses", fee: "₹600-5,000", timeline: "7-15 days", popularity: 80, documents: ["Purchase Invoice", "Insurance", "PUC Certificate", "Address Proof"], portal: "Parivahan / RTO", icon: "🚙" },
  { id: 13, title: "Arms Licence", description: "Apply for licence to own firearms. Through district magistrate office.", category: "licenses", fee: "₹1,000-5,000", timeline: "60-90 days", popularity: 30, documents: ["Aadhaar", "Address Proof", "Police Verification", "Character Certificate"], portal: "District Magistrate", icon: "🔫" },

  // Health
  { id: 14, title: "Ayushman Bharat Card", description: "Enroll for PMJAY health coverage of ₹5 lakh per family. Free treatment at empanelled hospitals.", category: "health", fee: "Free", timeline: "7-15 days", popularity: 91, documents: ["Aadhaar", "Ration Card", "SECC Verification"], portal: "PMJAY Portal", icon: "🏥" },
  { id: 15, title: "Health Insurance Enrollment", description: "Compare and enroll in government health insurance schemes based on your profile.", category: "health", fee: "Varies", timeline: "7-30 days", popularity: 75, documents: ["Aadhaar", "Income Certificate", "Age Proof"], portal: "State Health Portal", icon: "❤️" },

  // Education
  { id: 16, title: "Scholarship Application", description: "Apply for central and state scholarships. Categories: SC/ST/OBC, Minority, Merit-based, Economic need.", category: "education", fee: "Free", timeline: "30-60 days", popularity: 89, documents: ["Marksheet", "Income Certificate", "Caste Certificate", "Bank Account"], portal: "National Scholarship Portal", icon: "🎓" },
  { id: 17, title: "School Admission (RTE)", description: "Apply for admission under Right to Education Act. Free admission for economically weaker sections.", category: "education", fee: "Free", timeline: "As per schedule", popularity: 76, documents: ["Birth Certificate", "Income Certificate", "Address Proof", "Aadhaar"], portal: "State Education Portal", icon: "🏫" },

  // Employment
  { id: 18, title: "EPF/PF Services", description: "Check PF balance, transfer, or withdraw Employee Provident Fund. UAN-based services.", category: "employment", fee: "Free", timeline: "15-30 days", popularity: 86, documents: ["UAN Number", "Aadhaar", "Bank Account", "Employment Details"], portal: "EPFO Portal", icon: "💼" },
  { id: 19, title: "Employment Exchange", description: "Register at employment exchange for job opportunities. Required renewal every few years.", category: "employment", fee: "Free", timeline: "7-15 days", popularity: 65, documents: ["Aadhaar", "Education Certificates", "Address Proof"], portal: "State Employment Portal", icon: "👔" },

  // Tax & Finance
  { id: 20, title: "Income Tax Filing", description: "File annual income tax returns online. Choose correct ITR form based on income source.", category: "tax", fee: "Free (self)", timeline: "Before Jul 31", popularity: 94, documents: ["Form 16", "PAN Card", "Bank Statements", "Investment Proofs"], portal: "e-Filing Portal", icon: "📊" },
  { id: 21, title: "GST Registration", description: "Register for Goods and Services Tax. Mandatory for businesses above threshold turnover.", category: "tax", fee: "Free", timeline: "7-15 days", popularity: 72, documents: ["PAN", "Aadhaar", "Business Address Proof", "Bank Account"], portal: "GST Portal", icon: "🧾" },
  { id: 22, title: "Property Tax Payment", description: "Pay property tax to municipal corporation online. Avoid penalties with timely payment.", category: "tax", fee: "As assessed", timeline: "Instant", popularity: 70, documents: ["Property ID", "Owner Aadhaar", "Previous Tax Receipt"], portal: "Municipal Corporation", icon: "🏢" },

  // Business
  { id: 23, title: "MSME / Udyam Registration", description: "Free registration for micro, small and medium enterprises. Unlock subsidies, priority lending, and benefits.", category: "business", fee: "Free", timeline: "Instant", popularity: 83, documents: ["Aadhaar", "PAN", "Bank Account", "Business Details"], portal: "Udyam Portal", icon: "🏭" },
  { id: 24, title: "FSSAI Licence", description: "Food safety licence for food businesses. Basic, State, or Central categories based on turnover.", category: "business", fee: "₹100-7,500", timeline: "30-60 days", popularity: 68, documents: ["PAN", "Identity Proof", "Business Address", "Food Safety Plan"], portal: "FSSAI Portal", icon: "🍽️" },
  { id: 25, title: "Shop & Establishment Licence", description: "Mandatory licence for all shops and commercial establishments from state labor department.", category: "business", fee: "₹500-2,000", timeline: "15-30 days", popularity: 66, documents: ["PAN", "Aadhaar", "Rent Agreement", "Partnership Deed"], portal: "State Labor Portal", icon: "🏪" },
];

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const filtered = ALL_SERVICES.filter((svc) => {
    const matchesCategory = activeCategory === "all" || svc.category === activeCategory;
    const matchesSearch = svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => b.popularity - a.popularity);

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Government Services</h1>
        <p className="page-subtitle">
          Discover and apply for government services across categories. Find what you need in seconds.
        </p>
      </div>

      {/* Search */}
      <div className="search-container" style={{ marginBottom: "var(--space-4)", maxWidth: "100%" }}>
        <Search className="search-icon" size={20} />
        <input
          className="search-input"
          type="search"
          placeholder="Search services — e.g. Passport, Aadhaar, Driving Licence..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search services"
        />
      </div>

      {/* Categories */}
      <div className="category-chips">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon size={16} /> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Popular Banner */}
      {activeCategory === "all" && !searchQuery && (
        <div className="section" style={{ marginBottom: "var(--space-5)" }}>
          <div className="section-header">
            <h2 className="section-title">🔥 Most Popular Services</h2>
          </div>
          <div className="grid-4">
            {ALL_SERVICES.filter(s => s.popularity >= 90).slice(0, 4).map((svc) => (
              <div key={svc.id} className="card card-interactive" style={{ borderLeft: "4px solid var(--color-primary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                  <span style={{ fontSize: "28px" }}>{svc.icon}</span>
                  <div>
                    <h3 className="card-title">{svc.title}</h3>
                    <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{svc.portal}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "var(--space-3)", fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><IndianRupee size={13} />{svc.fee}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={13} />{svc.timeline}</span>
                </div>
                <Link href={getApplyLink(svc)} className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                  Apply Now <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="section-header">
        <h2 className="section-title">
          {activeCategory === "all" ? "All Services" : CATEGORIES.find(c => c.id === activeCategory)?.label}
          <span style={{ fontWeight: 400, fontSize: "16px", color: "var(--color-text-muted)", marginLeft: "var(--space-2)" }}>
            ({filtered.length} services)
          </span>
        </h2>
      </div>

      {/* Service Cards */}
      <div className="grid-3">
        {filtered.map((svc) => (
          <div key={svc.id} className="card card-interactive">
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
              <div style={{ fontSize: "32px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-surface)", borderRadius: "var(--radius-md)", flexShrink: 0 }}>
                {svc.icon}
              </div>
              <div>
                <h3 className="card-title">{svc.title}</h3>
                <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{svc.portal}</span>
              </div>
            </div>
            <p className="card-description" style={{ marginBottom: "var(--space-3)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {svc.description}
            </p>
            <div style={{ display: "flex", gap: "var(--space-3)", fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><IndianRupee size={14} /> {svc.fee}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={14} /> {svc.timeline}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FileText size={14} /> {svc.documents.length} docs</span>
            </div>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "var(--space-1)" }}>
                📋 Documents Required:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {svc.documents.slice(0, 3).map((doc, i) => (
                  <span key={i} style={{ fontSize: "12px", padding: "2px 8px", background: "var(--color-surface)", borderRadius: "var(--radius-full)", color: "var(--color-text-secondary)" }}>
                    {doc}
                  </span>
                ))}
                {svc.documents.length > 3 && (
                  <span style={{ fontSize: "12px", padding: "2px 8px", color: "var(--color-primary)", fontWeight: 600 }}>
                    +{svc.documents.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <Link href={getApplyLink(svc)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                Apply <ArrowRight size={14} />
              </Link>
              <Link href={getApplyLink(svc)} className="btn btn-secondary btn-sm">Details</Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No services found</h3>
          <p>Try a different search term or category.</p>
        </div>
      )}
    </>
  );
}
