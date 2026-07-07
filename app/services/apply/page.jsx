"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormContext } from "../../context/FormContext";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageCircle,
  Send,
  Bot,
  Sparkles,
  FileText,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ── Service Templates ── */
const SERVICE_TEMPLATES = {
  "income-certificate": {
    title: "Income Certificate Application",
    service: "Income Certificate",
    department: "Revenue Department",
    description: "Certificate of annual income from state revenue department. Required for scheme applications and admissions.",
    fee: "₹20-100",
    timeline: "7-15 days",
    fields: [
      { name: "fullName", label: "Full Name (as per Aadhaar)", type: "text", required: true, placeholder: "e.g. Rahul Kumar" },
      { name: "fatherName", label: "Father's / Husband's Name", type: "text", required: true, placeholder: "e.g. Suresh Kumar" },
      { name: "dob", label: "Date of Birth", type: "date", required: true, placeholder: "" },
      { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { name: "aadhaar", label: "Aadhaar Number", type: "text", required: true, placeholder: "e.g. 1234 5678 9012" },
      { name: "phone", label: "Mobile Number", type: "tel", required: true, placeholder: "e.g. 9876543210" },
      { name: "email", label: "Email Address", type: "email", required: false, placeholder: "e.g. rahul@email.com" },
      { name: "address", label: "Full Address", type: "textarea", required: true, placeholder: "House No, Street, Area, City" },
      { name: "state", label: "State", type: "text", required: true, placeholder: "e.g. Haryana" },
      { name: "district", label: "District", type: "text", required: true, placeholder: "e.g. Gurugram" },
      { name: "pincode", label: "PIN Code", type: "text", required: true, placeholder: "e.g. 122001" },
      { name: "occupation", label: "Occupation", type: "text", required: true, placeholder: "e.g. Software Engineer" },
      { name: "annualIncome", label: "Annual Income (₹)", type: "text", required: true, placeholder: "e.g. 5,00,000" },
      { name: "incomeSource", label: "Source of Income", type: "select", required: true, options: ["Salary", "Business", "Agriculture", "Pension", "Self-Employed", "Other"] },
      { name: "purpose", label: "Purpose of Certificate", type: "text", required: false, placeholder: "e.g. Scholarship Application" },
    ],
  },
  "passport": {
    title: "Passport Application",
    service: "Passport",
    department: "Ministry of External Affairs",
    description: "Apply for fresh passport or renewal. International travel identity document.",
    fee: "₹1,500 - ₹3,500",
    timeline: "30-45 days",
    fields: [
      { name: "fullName", label: "Full Name (as per documents)", type: "text", required: true, placeholder: "e.g. Rahul Kumar" },
      { name: "surname", label: "Surname", type: "text", required: true, placeholder: "e.g. Kumar" },
      { name: "dob", label: "Date of Birth", type: "date", required: true, placeholder: "" },
      { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { name: "placeOfBirth", label: "Place of Birth", type: "text", required: true, placeholder: "e.g. Delhi" },
      { name: "aadhaar", label: "Aadhaar Number", type: "text", required: true, placeholder: "e.g. 1234 5678 9012" },
      { name: "pan", label: "PAN Number", type: "text", required: false, placeholder: "e.g. ABCPK1234Q" },
      { name: "phone", label: "Mobile Number", type: "tel", required: true, placeholder: "e.g. 9876543210" },
      { name: "email", label: "Email Address", type: "email", required: true, placeholder: "e.g. rahul@email.com" },
      { name: "address", label: "Present Address", type: "textarea", required: true, placeholder: "House No, Street, Area, City" },
      { name: "state", label: "State", type: "text", required: true, placeholder: "e.g. Haryana" },
      { name: "district", label: "District", type: "text", required: true, placeholder: "e.g. Gurugram" },
      { name: "pincode", label: "PIN Code", type: "text", required: true, placeholder: "e.g. 122001" },
      { name: "fatherName", label: "Father's Name", type: "text", required: true, placeholder: "e.g. Suresh Kumar" },
      { name: "motherName", label: "Mother's Name", type: "text", required: true, placeholder: "e.g. Sunita Devi" },
      { name: "emergencyContact", label: "Emergency Contact Name", type: "text", required: false, placeholder: "e.g. Suresh Kumar" },
      { name: "emergencyPhone", label: "Emergency Contact Phone", type: "tel", required: false, placeholder: "e.g. 9876543211" },
    ],
  },
  "aadhaar": {
    title: "Aadhaar Card Application",
    service: "Aadhaar Card",
    department: "UIDAI",
    description: "Apply for new Aadhaar card — biometric identity for every Indian citizen.",
    fee: "Free",
    timeline: "15-30 days",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "e.g. Rahul Kumar" },
      { name: "dob", label: "Date of Birth", type: "date", required: true, placeholder: "" },
      { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { name: "phone", label: "Mobile Number", type: "tel", required: true, placeholder: "e.g. 9876543210" },
      { name: "email", label: "Email Address", type: "email", required: false, placeholder: "e.g. rahul@email.com" },
      { name: "address", label: "Full Address", type: "textarea", required: true, placeholder: "House No, Street, Area, City" },
      { name: "state", label: "State", type: "text", required: true, placeholder: "e.g. Haryana" },
      { name: "district", label: "District", type: "text", required: true, placeholder: "e.g. Gurugram" },
      { name: "pincode", label: "PIN Code", type: "text", required: true, placeholder: "e.g. 122001" },
      { name: "fatherName", label: "Father's Name", type: "text", required: true, placeholder: "e.g. Suresh Kumar" },
    ],
  },
};

const DEFAULT_SERVICE = "income-certificate";

/* ── Status Color/Icon Helper ── */
function FieldStatus({ status }) {
  if (status === "filled")
    return <span title="Auto-filled by AI" style={{ color: "var(--color-secondary)", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}><Sparkles size={14} /> AI Filled</span>;
  if (status === "manual")
    return <span title="Filled by you" style={{ color: "var(--color-primary)", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}><CheckCircle2 size={14} /> Filled</span>;
  return <span title="Required" style={{ color: "var(--color-danger)", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600 }}><AlertCircle size={14} /> Missing</span>;
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const serviceKey = searchParams.get("service") || DEFAULT_SERVICE;
  const template = SERVICE_TEMPLATES[serviceKey] || SERVICE_TEMPLATES[DEFAULT_SERVICE];

  const {
    formFields,
    isFormActive,
    completionScore,
    registerForm,
    unregisterForm,
    updateFieldManually,
    getFormSummary,
  } = useFormContext();

  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    registerForm({
      title: template.title,
      service: template.service,
      fields: template.fields,
    });
    return () => unregisterForm();
  }, [serviceKey, template, registerForm, unregisterForm]);

  const summary = getFormSummary();
  const requiredFields = template.fields.filter(f => f.required);
  const filledRequired = requiredFields.filter(f => formFields[f.name]?.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", padding: "var(--space-7) 0" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-secondary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-4)" }}>
          <CheckCircle2 size={40} color="var(--color-secondary)" />
        </div>
        <h1 style={{ fontSize: "28px", marginBottom: "var(--space-2)" }}>Application Submitted!</h1>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
          Your {template.service} application has been submitted successfully.<br />
          Application ID: <strong>APP-2026-{Math.floor(Math.random() * 9000 + 1000)}</strong>
        </p>
        <div className="card" style={{ textAlign: "left", marginBottom: "var(--space-4)" }}>
          <h3 style={{ marginBottom: "var(--space-3)" }}>📋 Submission Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
            <span>Fields Completed</span>
            <strong>{filledRequired.length}/{requiredFields.length}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
            <span>Submission Readiness</span>
            <strong style={{ color: "var(--color-secondary)" }}>{completionScore}%</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Estimated Processing</span>
            <strong>{template.timeline}</strong>
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center" }}>
          <Link href="/track" className="btn btn-primary">Track Application</Link>
          <Link href="/services" className="btn btn-secondary">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: "var(--space-4)" }}>
        <Link href="/services" style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", fontSize: "14px", color: "var(--color-text-muted)", marginBottom: "var(--space-3)" }}>
          <ArrowLeft size={16} /> Back to Services
        </Link>
        <h1 className="page-title">{template.title}</h1>
        <p className="page-subtitle">{template.description}</p>
        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-2)", fontSize: "14px", color: "var(--color-text-secondary)" }}>
          <span>🏢 {template.department}</span>
          <span>💰 Fee: {template.fee}</span>
          <span>⏱️ Timeline: {template.timeline}</span>
        </div>
      </div>

      {/* AI Agent Banner */}
      <div style={{
        padding: "var(--space-4)",
        background: "linear-gradient(135deg, var(--color-primary-light), #E6F5EC)",
        border: "2px solid var(--color-primary)",
        borderRadius: "var(--radius-xl)",
        marginBottom: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        flexWrap: "wrap",
      }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Bot size={28} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-primary)", marginBottom: "4px" }}>
            🤖 AI Agent is ready to help!
          </h3>
          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)" }}>
            Click the <strong>chat icon</strong> (bottom-right) and tell me your details — I'll auto-fill this form for you. Try saying:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
            {[
              "My name is Rahul Kumar, father Suresh Kumar",
              "I live in Sector 14, Gurugram, Haryana 122001",
              "Aadhaar 1234 5678 9012, phone 9876543210",
              "I'm a software engineer, annual income 5 lakh",
            ].map((hint, i) => (
              <span key={i} style={{ fontSize: "12px", padding: "4px 10px", background: "white", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border-light)", color: "var(--color-text-secondary)" }}>
                "{hint}"
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "var(--space-4)", alignItems: "flex-start" }}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="card">
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "var(--space-4)" }}>Application Details</h2>

            {template.fields.map((field) => {
              const fieldData = formFields[field.name] || {};
              const value = fieldData.value || "";
              const status = fieldData.status || "missing";

              return (
                <div key={field.name} className="form-group" style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  border: status === "filled" ? "2px solid var(--color-secondary)" : status === "manual" ? "2px solid var(--color-primary)" : field.required ? "2px solid transparent" : "1px solid transparent",
                  background: status === "filled" ? "var(--color-secondary-light)" : "transparent",
                  transition: "all 0.3s ease",
                  marginBottom: "var(--space-2)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-1)" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      {field.label} {field.required && <span className="required">(required)</span>}
                    </label>
                    {field.required && <FieldStatus status={status} />}
                  </div>

                  {field.type === "select" ? (
                    <select
                      className="form-select"
                      value={value}
                      onChange={(e) => updateFieldManually(field.name, e.target.value)}
                    >
                      <option value="">Select {field.label}...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      className="form-textarea"
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => updateFieldManually(field.name, e.target.value)}
                      style={{ minHeight: "80px" }}
                    />
                  ) : (
                    <input
                      className="form-input"
                      type={field.type}
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => updateFieldManually(field.name, e.target.value)}
                    />
                  )}

                  {status === "filled" && fieldData.source && (
                    <div style={{ fontSize: "12px", color: "var(--color-secondary)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={12} /> Source: {fieldData.source} • Verified
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={completionScore < 70}
              >
                <Send size={18} /> Submit Application
              </button>
              <button type="button" className="btn btn-secondary btn-lg">Save Draft</button>
            </div>

            {completionScore < 70 && (
              <p style={{ fontSize: "14px", color: "var(--color-warning)", marginTop: "var(--space-2)", display: "flex", alignItems: "center", gap: "4px" }}>
                <AlertCircle size={14} /> Complete at least 70% of required fields to submit.
              </p>
            )}
          </div>
        </form>

        {/* Sidebar: Completion Status */}
        <div style={{ position: "sticky", top: "calc(var(--nav-height) + var(--space-4))" }}>
          {/* Completion Card */}
          <div className="card" style={{ marginBottom: "var(--space-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)", cursor: "pointer" }} onClick={() => setShowSummary(!showSummary)}>
              <h3 style={{ fontSize: "16px" }}>Application Progress</h3>
              {showSummary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {/* Circular Progress */}
            <div style={{ textAlign: "center", marginBottom: "var(--space-3)" }}>
              <div style={{ position: "relative", width: "100px", height: "100px", margin: "0 auto" }}>
                <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-surface)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none"
                    stroke={completionScore >= 70 ? "var(--color-secondary)" : completionScore >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${completionScore * 2.64} 264`}
                    style={{ transition: "stroke-dasharray 0.5s ease" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 700, color: completionScore >= 70 ? "var(--color-secondary)" : "var(--color-text-primary)" }}>
                  {completionScore}%
                </div>
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-muted)", marginTop: "var(--space-1)" }}>
                {filledRequired.length}/{requiredFields.length} required fields
              </div>
            </div>

            {showSummary && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {template.fields.filter(f => f.required).map((field) => {
                  const data = formFields[field.name] || {};
                  const isFilled = !!data.value;
                  return (
                    <div key={field.name} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "13px" }}>
                      {isFilled ? (
                        data.status === "filled" ?
                          <Sparkles size={14} color="var(--color-secondary)" /> :
                          <CheckCircle2 size={14} color="var(--color-primary)" />
                      ) : (
                        <AlertCircle size={14} color="var(--color-danger)" />
                      )}
                      <span style={{ color: isFilled ? "var(--color-text-primary)" : "var(--color-danger)", textDecoration: isFilled ? "none" : "none" }}>
                        {field.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Agent Status */}
          <div className="card" style={{ background: "var(--color-primary-light)", borderColor: "var(--color-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
              <Bot size={20} color="var(--color-primary)" />
              <h4 style={{ fontSize: "14px", color: "var(--color-primary)" }}>AI Agent Status</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-secondary)" }} /> Ready to assist
              </div>
              <div style={{ color: "var(--color-text-secondary)" }}>
                Tell me your details in the chat and I'll fill this form automatically.
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="card" style={{ marginTop: "var(--space-3)" }}>
            <h4 style={{ fontSize: "14px", marginBottom: "var(--space-2)" }}>Visual Indicators</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-secondary)" }} />
                🟢 AI Auto-Filled
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-primary)" }} />
                🔵 Manually Filled
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-danger)" }} />
                🔴 Missing Required
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
