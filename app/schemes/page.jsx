"use client";

import { useState } from "react";
import {
  Search,
  Heart,
  GraduationCap,
  Tractor,
  Building2,
  Users,
  Home,
  Briefcase,
  Baby,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Star,
  Filter,
  ChevronDown,
  IndianRupee,
  MapPin,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Schemes", icon: Star },
  { id: "agriculture", label: "Agriculture", icon: Tractor },
  { id: "health", label: "Health", icon: Heart },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "housing", label: "Housing", icon: Home },
  { id: "business", label: "Business", icon: Building2 },
  { id: "women", label: "Women & Child", icon: Baby },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "social", label: "Social Welfare", icon: Users },
];

const ALL_SCHEMES = [
  {
    id: 1, title: "PM Kisan Samman Nidhi", description: "Direct income support of ₹6,000 per year to farmer families, transferred in 3 equal installments of ₹2,000 each.",
    category: "agriculture", benefit: "₹6,000/year", benefitType: "Direct Cash Transfer", eligibility: ["Landholding farmer families", "Valid Aadhaar", "Active bank account linked to Aadhaar"],
    documents: ["Aadhaar Card", "Land Ownership Records", "Bank Account Details"], deadline: "Always Open", status: "Active",
    beneficiaries: "12 Cr+ farmers", scope: "Central", tag: "Recommended", website: "pmkisan.gov.in",
  },
  {
    id: 2, title: "Ayushman Bharat (PMJAY)", description: "World's largest health assurance scheme providing health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    category: "health", benefit: "₹5 Lakh Health Cover", benefitType: "Health Insurance", eligibility: ["Families identified in SECC 2011", "Deprived rural households", "Urban worker families"],
    documents: ["Aadhaar Card", "Ration Card", "SECC Verification Letter"], deadline: "Always Open", status: "Active",
    beneficiaries: "55 Cr+ citizens", scope: "Central", tag: "Popular", website: "pmjay.gov.in",
  },
  {
    id: 3, title: "PM Awas Yojana (Urban)", description: "Affordable housing scheme providing subsidy up to ₹2.67 lakh for purchase, construction, or enhancement of houses for urban poor.",
    category: "housing", benefit: "Up to ₹2.67 Lakh Subsidy", benefitType: "Housing Subsidy", eligibility: ["Annual income ≤ ₹18 Lakh", "No pucca house in any family member's name", "First-time home buyer"],
    documents: ["Aadhaar", "Income Certificate", "Land Documents", "Bank Account"], deadline: "Dec 31, 2026", status: "Active",
    beneficiaries: "1.2 Cr+ houses", scope: "Central", tag: "Deadline Soon", website: "pmaymis.gov.in",
  },
  {
    id: 4, title: "PM Mudra Yojana", description: "Micro loans up to ₹10 lakh for non-farm small business activities. Three categories: Shishu (up to ₹50K), Kishore (₹50K-5L), Tarun (₹5L-10L).",
    category: "business", benefit: "Loans up to ₹10 Lakh", benefitType: "Business Loan", eligibility: ["Non-farm income generating enterprise", "Small/micro enterprise owner", "No collateral needed for Shishu"],
    documents: ["Aadhaar", "PAN Card", "Business Plan", "Address Proof"], deadline: "Always Open", status: "Active",
    beneficiaries: "40 Cr+ loans", scope: "Central", tag: "Trending", website: "mudra.org.in",
  },
  {
    id: 5, title: "Sukanya Samriddhi Yojana", description: "Small savings scheme for the girl child with attractive interest rate of 8.2%. Tax benefits under 80C. Matures when girl turns 21.",
    category: "women", benefit: "8.2% Interest Rate", benefitType: "Savings Scheme", eligibility: ["Girl child below 10 years", "Maximum 2 accounts per family", "Min deposit ₹250/year"],
    documents: ["Girl's Birth Certificate", "Parent Aadhaar", "Address Proof"], deadline: "Always Open", status: "Active",
    beneficiaries: "3 Cr+ accounts", scope: "Central", tag: "Popular", website: "indiapost.gov.in",
  },
  {
    id: 6, title: "National Scholarship Portal", description: "Centralized portal for various scholarship schemes for SC/ST/OBC/Minority/Economically weaker students from pre-matric to post-doctoral level.",
    category: "education", benefit: "Up to ₹50,000/year", benefitType: "Scholarship", eligibility: ["Students of SC/ST/OBC/Minority category", "Family income below threshold", "Minimum attendance & marks"],
    documents: ["Marksheet", "Income Certificate", "Caste Certificate", "Bank Account", "Institution Verification"], deadline: "Aug 31, 2026", status: "Active",
    beneficiaries: "1 Cr+ students", scope: "Central", tag: "Deadline Soon", website: "scholarships.gov.in",
  },
  {
    id: 7, title: "Atal Pension Yojana", description: "Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60. Government co-contributes 50% for eligible subscribers.",
    category: "social", benefit: "₹1,000-5,000/month Pension", benefitType: "Pension", eligibility: ["Age 18-40 years", "Bank account with Aadhaar linkage", "Not an income tax payer"],
    documents: ["Aadhaar", "Bank Account", "Mobile Number"], deadline: "Always Open", status: "Active",
    beneficiaries: "5 Cr+ subscribers", scope: "Central", tag: "Recommended", website: "npscra.nsdl.co.in",
  },
  {
    id: 8, title: "PM Ujjwala Yojana", description: "Free LPG gas connection to women from Below Poverty Line (BPL) households to reduce health hazards from cooking with fossil fuels.",
    category: "women", benefit: "Free LPG Connection", benefitType: "Subsidy", eligibility: ["BPL household woman", "No existing LPG connection", "Age 18+ years"],
    documents: ["Aadhaar", "BPL Card / Ration Card", "Bank Account", "Passport Photo"], deadline: "Always Open", status: "Active",
    beneficiaries: "10 Cr+ connections", scope: "Central", tag: "Popular", website: "pmuy.gov.in",
  },
  {
    id: 9, title: "PM Vishwakarma Yojana", description: "Support for traditional artisans and craftspeople. Includes skill training, toolkit incentive, credit support up to ₹3 lakh, and digital marketing.",
    category: "employment", benefit: "Up to ₹3 Lakh + Training", benefitType: "Skill + Credit", eligibility: ["Traditional artisan/craftsperson", "Working with hands and tools", "18 identified trades"],
    documents: ["Aadhaar", "Bank Account", "Trade Verification", "Caste Certificate (if applicable)"], deadline: "Always Open", status: "Active",
    beneficiaries: "30 Lakh+ artisans", scope: "Central", tag: "New", website: "pmvishwakarma.gov.in",
  },
  {
    id: 10, title: "PM Garib Kalyan Anna Yojana", description: "Free food grains (5 kg per person per month) to over 80 crore beneficiaries to ensure food security for the poorest families.",
    category: "social", benefit: "5 kg Free Grains/month", benefitType: "Food Security", eligibility: ["Antyodaya Anna Yojana families", "Priority Household card holders", "NFSA beneficiaries"],
    documents: ["Ration Card", "Aadhaar"], deadline: "Dec 2028", status: "Active",
    beneficiaries: "80 Cr+ citizens", scope: "Central", tag: "Popular", website: "nfsa.gov.in",
  },
  {
    id: 11, title: "Startup India", description: "Tax exemptions, easier compliance, funding support, and mentorship for recognized startups. DPIIT recognition unlocks benefits.",
    category: "business", benefit: "Tax Benefits + Funding", benefitType: "Startup Support", eligibility: ["Entity registered as Pvt Ltd / LLP / Partnership", "Turnover < ₹100 Cr in any year", "Working on innovation"],
    documents: ["Incorporation Certificate", "PAN", "Business Description", "Director Aadhaar"], deadline: "Always Open", status: "Active",
    beneficiaries: "1 Lakh+ startups", scope: "Central", tag: "Trending", website: "startupindia.gov.in",
  },
  {
    id: 12, title: "Ladli Behna Yojana", description: "Monthly financial assistance of ₹1,250 to women for economic empowerment. Direct benefit transfer to bank account.",
    category: "women", benefit: "₹1,250/month", benefitType: "Direct Cash Transfer", eligibility: ["Women aged 21-60", "Madhya Pradesh resident", "Family income < ₹2.5 Lakh/year"],
    documents: ["Aadhaar", "Samagra ID", "Bank Account", "Passport Photo"], deadline: "Always Open", status: "Active",
    beneficiaries: "1.3 Cr+ women", scope: "State (MP)", tag: "State Scheme", website: "ladlibahna.mp.gov.in",
  },
];

export default function SchemesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [eligibilityOpen, setEligibilityOpen] = useState(null);

  const filtered = ALL_SCHEMES.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Government Schemes</h1>
        <p className="page-subtitle">
          Discover government schemes you may be eligible for. We recommend schemes based on your profile.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: "var(--space-5)" }}>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Eligible Schemes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Applied</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">New This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2</div>
          <div className="stat-label">Deadlines Soon</div>
        </div>
      </div>

      {/* Search */}
      <div className="search-container" style={{ marginBottom: "var(--space-4)", maxWidth: "100%" }}>
        <Search className="search-icon" size={20} />
        <input className="search-input" type="search" placeholder="Search schemes — e.g. PM Kisan, Scholarship, Housing..."
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search schemes" />
      </div>

      {/* Categories */}
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

      {/* Scheme Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {filtered.map((scheme) => (
          <div key={scheme.id} className="card" style={{ border: scheme.tag === "Recommended" ? "2px solid var(--color-primary)" : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-3)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
              <div style={{ flex: 1, minWidth: "250px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 700 }}>{scheme.title}</h3>
                  <span className={`badge ${scheme.tag === "Recommended" ? "badge-recommended" : scheme.tag === "Popular" ? "badge-verified" : scheme.tag === "Deadline Soon" ? "badge-progress" : scheme.tag === "Trending" ? "badge-assigned" : scheme.tag === "New" ? "badge-resolved" : "badge-submitted"}`}>
                    {scheme.tag === "Trending" && <TrendingUp size={12} />}
                    {scheme.tag === "Deadline Soon" && <Clock size={12} />}
                    {scheme.tag === "Popular" && <Star size={12} />}
                    {scheme.tag}
                  </span>
                  <span className="badge badge-submitted">{scheme.scope}</span>
                </div>
                <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)" }}>{scheme.description}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-secondary)" }}>{scheme.benefit}</div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{scheme.benefitType}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-5)", flexWrap: "wrap", marginBottom: "var(--space-3)", fontSize: "14px", color: "var(--color-text-secondary)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={15} /> {scheme.beneficiaries} beneficiaries</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={15} /> Deadline: {scheme.deadline}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><CheckCircle2 size={15} color="var(--color-secondary)" /> {scheme.status}</span>
            </div>

            {/* Expandable Eligibility */}
            <div style={{ marginBottom: "var(--space-3)" }}>
              <button onClick={() => setEligibilityOpen(eligibilityOpen === scheme.id ? null : scheme.id)}
                style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: 600, color: "var(--color-primary)", padding: 0, minHeight: "44px" }}>
                <ChevronDown size={16} style={{ transform: eligibilityOpen === scheme.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                Eligibility & Documents
              </button>
              {eligibilityOpen === scheme.id && (
                <div style={{ marginTop: "var(--space-2)", padding: "var(--space-3)", background: "var(--color-surface)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ marginBottom: "var(--space-3)" }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "var(--space-1)" }}>✅ Eligibility Criteria:</div>
                    <ul style={{ paddingLeft: "var(--space-4)", fontSize: "14px", color: "var(--color-text-secondary)" }}>
                      {scheme.eligibility.map((e, i) => <li key={i} style={{ marginBottom: "4px" }}>{e}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "var(--space-1)" }}>📋 Documents Required:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {scheme.documents.map((d, i) => (
                        <span key={i} style={{ fontSize: "13px", padding: "4px 10px", background: "var(--color-bg)", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-light)" }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "var(--space-2)" }}>
              <button className="btn btn-success btn-sm">
                Check Eligibility <ArrowRight size={14} />
              </button>
              <button className="btn btn-secondary btn-sm">Learn More</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No schemes found</h3>
          <p>Try a different search term or category.</p>
        </div>
      )}
    </>
  );
}
