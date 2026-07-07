"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Globe,
  Eye,
  Type,
  Volume2,
  Bell,
  Lock,
  LogOut,
  Edit,
  Save,
  CreditCard,
  FileText,
  Link2,
  Settings,
  ChevronRight,
  CheckCircle2,
  Star,
} from "lucide-react";

const USER_PROFILE = {
  name: "Rahul Kumar",
  email: "rahul.kumar@email.com",
  phone: "+91 98765 43210",
  dob: "15 Mar 1992",
  gender: "Male",
  address: "B-42, Sector 14, Gurugram, Haryana - 122001",
  occupation: "Working Professional",
  category: "General",
  state: "Haryana",
  district: "Gurugram",
  pincode: "122001",
  language: "English",
  memberSince: "January 2026",
};

const LINKED_IDS = [
  { name: "Aadhaar Card", number: "XXXX XXXX 4321", status: "Verified", icon: "🪪" },
  { name: "PAN Card", number: "ABCPK1234Q", status: "Verified", icon: "🏦" },
  { name: "Voter ID", number: "DL/02/XXX/XXXXXX", status: "Verified", icon: "🗳️" },
  { name: "Driving Licence", number: "HR-0620200012345", status: "Expiring Soon", icon: "🚗" },
  { name: "Passport", number: "P1234567", status: "Verified", icon: "🛂" },
  { name: "UAN (EPFO)", number: "1001XXXXXXXX", status: "Linked", icon: "💼" },
];

const ACTIVITY_LOG = [
  { action: "Applied for Passport Renewal", date: "Jun 15, 2026" },
  { action: "Uploaded Income Certificate", date: "Apr 15, 2026" },
  { action: "Reported Pothole Issue (CMP-8842)", date: "Jul 3, 2026" },
  { action: "Checked PM Kisan Eligibility", date: "Jun 28, 2026" },
  { action: "Updated Profile Address", date: "Mar 10, 2026" },
  { action: "Filed Income Tax Return", date: "Jul 1, 2026" },
  { action: "Downloaded Aadhaar e-KYC", date: "Feb 5, 2026" },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    voiceInput: true,
    textToSpeech: false,
    emailNotif: true,
    smsNotif: true,
    pushNotif: true,
    schemeAlerts: true,
    deadlineReminders: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <>
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          {USER_PROFILE.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="profile-info" style={{ flex: 1 }}>
          <h2>{USER_PROFILE.name}</h2>
          <p style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Mail size={14} /> {USER_PROFILE.email}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={14} /> {USER_PROFILE.phone}</span>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "4px", flexWrap: "wrap" }}>
            <span className="badge badge-verified"><CheckCircle2 size={12} /> Verified Citizen</span>
            <span className="badge badge-submitted">{USER_PROFILE.occupation}</span>
            <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>Member since {USER_PROFILE.memberSince}</span>
          </p>
        </div>
        <button className="btn btn-secondary btn-sm"><Edit size={16} /> Edit Profile</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "personal" ? "active" : ""}`} onClick={() => setActiveTab("personal")}>
          <User size={18} style={{ marginRight: "6px" }} /> Personal Info
        </button>
        <button className={`tab ${activeTab === "linked" ? "active" : ""}`} onClick={() => setActiveTab("linked")}>
          <Link2 size={18} style={{ marginRight: "6px" }} /> Linked IDs
        </button>
        <button className={`tab ${activeTab === "accessibility" ? "active" : ""}`} onClick={() => setActiveTab("accessibility")}>
          <Eye size={18} style={{ marginRight: "6px" }} /> Accessibility
        </button>
        <button className={`tab ${activeTab === "language" ? "active" : ""}`} onClick={() => setActiveTab("language")}>
          <Globe size={18} style={{ marginRight: "6px" }} /> Language
        </button>
        <button className={`tab ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
          <Settings size={18} style={{ marginRight: "6px" }} /> Settings
        </button>
      </div>

      {/* Personal Info */}
      {activeTab === "personal" && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ marginBottom: "var(--space-4)" }}>Personal Details</h3>
            <div className="settings-list">
              {[
                { label: "Full Name", value: USER_PROFILE.name, icon: User },
                { label: "Email", value: USER_PROFILE.email, icon: Mail },
                { label: "Phone", value: USER_PROFILE.phone, icon: Phone },
                { label: "Date of Birth", value: USER_PROFILE.dob, icon: Calendar },
                { label: "Gender", value: USER_PROFILE.gender, icon: User },
                { label: "Occupation", value: USER_PROFILE.occupation, icon: CreditCard },
                { label: "Category", value: USER_PROFILE.category, icon: FileText },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="settings-item">
                    <div className="settings-item-info">
                      <div className="settings-item-icon"><Icon size={18} /></div>
                      <div className="settings-item-text">
                        <h4>{item.label}</h4>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="card" style={{ marginBottom: "var(--space-4)" }}>
              <h3 style={{ marginBottom: "var(--space-4)" }}>Address</h3>
              <div className="settings-list">
                {[
                  { label: "Full Address", value: USER_PROFILE.address, icon: MapPin },
                  { label: "State", value: USER_PROFILE.state, icon: MapPin },
                  { label: "District", value: USER_PROFILE.district, icon: MapPin },
                  { label: "Pincode", value: USER_PROFILE.pincode, icon: MapPin },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="settings-item">
                      <div className="settings-item-info">
                        <div className="settings-item-icon"><Icon size={18} /></div>
                        <div className="settings-item-text">
                          <h4>{item.label}</h4>
                          <p>{item.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "var(--space-4)" }}>Recent Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {ACTIVITY_LOG.slice(0, 5).map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-2) 0", borderBottom: i < 4 ? "1px solid var(--color-border-light)" : "none" }}>
                    <span style={{ fontSize: "14px" }}>{item.action}</span>
                    <span style={{ fontSize: "13px", color: "var(--color-text-muted)", whiteSpace: "nowrap", marginLeft: "var(--space-3)" }}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked IDs */}
      {activeTab === "linked" && (
        <div>
          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Your linked government IDs enable auto-fill for applications and scheme eligibility checks.
          </p>
          <div className="grid-2">
            {LINKED_IDS.map((id, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <div style={{ fontSize: "32px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-surface)", borderRadius: "var(--radius-md)", flexShrink: 0 }}>
                  {id.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "16px" }}>{id.name}</div>
                  <div style={{ fontSize: "14px", color: "var(--color-text-muted)", fontFamily: "monospace" }}>{id.number}</div>
                </div>
                <span className={`badge ${id.status === "Verified" ? "badge-resolved" : id.status === "Expiring Soon" ? "badge-progress" : "badge-assigned"}`}>
                  {id.status === "Verified" && <CheckCircle2 size={12} />}
                  {id.status}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-4)" }}>
            <button className="btn btn-secondary"><Link2 size={18} /> Link Another ID</button>
          </div>
        </div>
      )}

      {/* Accessibility */}
      {activeTab === "accessibility" && (
        <div className="card" style={{ maxWidth: "640px" }}>
          <h3 style={{ marginBottom: "var(--space-4)" }}>Accessibility Settings</h3>
          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Smart Bharat is designed for every citizen. Adjust these settings for a better experience.
          </p>
          <div className="settings-list">
            {[
              { key: "highContrast", label: "High Contrast Mode", desc: "Increases contrast for better visibility", icon: Eye },
              { key: "largeText", label: "Large Text Mode", desc: "Increases text size by 25% across the app", icon: Type },
              { key: "voiceInput", label: "Voice Input", desc: "Use voice commands to interact with the app", icon: Volume2 },
              { key: "textToSpeech", label: "Text-to-Speech", desc: "Read aloud page content and notifications", icon: Volume2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="settings-item">
                  <div className="settings-item-info">
                    <div className="settings-item-icon"><Icon size={18} /></div>
                    <div className="settings-item-text">
                      <h4>{item.label}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                  <button className={`toggle ${settings[item.key] ? "active" : ""}`}
                    onClick={() => toggleSetting(item.key)} aria-label={`Toggle ${item.label}`} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Language */}
      {activeTab === "language" && (
        <div className="card" style={{ maxWidth: "640px" }}>
          <h3 style={{ marginBottom: "var(--space-2)" }}>Language Preference</h3>
          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
            Select your preferred language. The interface and AI assistant will respond in your chosen language.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {LANGUAGES.map((lang) => (
              <button key={lang.code}
                className="settings-item"
                style={{ cursor: "pointer", background: selectedLanguage === lang.code ? "var(--color-primary-light)" : "transparent", border: selectedLanguage === lang.code ? "2px solid var(--color-primary)" : "1px solid var(--color-border-light)" }}
                onClick={() => setSelectedLanguage(lang.code)}>
                <div className="settings-item-info">
                  <div className="settings-item-icon" style={{ background: selectedLanguage === lang.code ? "var(--color-primary)" : "var(--color-primary-light)", color: selectedLanguage === lang.code ? "white" : "var(--color-primary)" }}>
                    <Globe size={18} />
                  </div>
                  <div className="settings-item-text">
                    <h4>{lang.label}</h4>
                    <p>{lang.native}</p>
                  </div>
                </div>
                {selectedLanguage === lang.code && <CheckCircle2 size={22} color="var(--color-primary)" />}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-4)" }}>
            <button className="btn btn-primary"><Save size={18} /> Save Language Preference</button>
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === "settings" && (
        <div style={{ maxWidth: "640px" }}>
          <div className="card" style={{ marginBottom: "var(--space-4)" }}>
            <h3 style={{ marginBottom: "var(--space-4)" }}>Notification Preferences</h3>
            <div className="settings-list">
              {[
                { key: "emailNotif", label: "Email Notifications", desc: "Receive updates via email", icon: Mail },
                { key: "smsNotif", label: "SMS Notifications", desc: "Receive updates via SMS", icon: Phone },
                { key: "pushNotif", label: "Push Notifications", desc: "Browser push notifications", icon: Bell },
                { key: "schemeAlerts", label: "Scheme Alerts", desc: "Get notified about new eligible schemes", icon: Star },
                { key: "deadlineReminders", label: "Deadline Reminders", desc: "Reminders for document expiry & deadlines", icon: Calendar },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="settings-item">
                    <div className="settings-item-info">
                      <div className="settings-item-icon"><Icon size={18} /></div>
                      <div className="settings-item-text">
                        <h4>{item.label}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                    <button className={`toggle ${settings[item.key] ? "active" : ""}`}
                      onClick={() => toggleSetting(item.key)} aria-label={`Toggle ${item.label}`} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ marginBottom: "var(--space-4)" }}>
            <h3 style={{ marginBottom: "var(--space-4)" }}>Security</h3>
            <div className="settings-list">
              <div className="settings-item" style={{ cursor: "pointer" }}>
                <div className="settings-item-info">
                  <div className="settings-item-icon"><Lock size={18} /></div>
                  <div className="settings-item-text">
                    <h4>Change Password</h4>
                    <p>Update your account password</p>
                  </div>
                </div>
                <ChevronRight size={18} color="var(--color-text-muted)" />
              </div>
              <div className="settings-item" style={{ cursor: "pointer" }}>
                <div className="settings-item-info">
                  <div className="settings-item-icon"><Shield size={18} /></div>
                  <div className="settings-item-text">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security</p>
                  </div>
                </div>
                <span className="badge badge-resolved">Enabled</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderColor: "var(--color-danger)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ color: "var(--color-danger)", marginBottom: "var(--space-1)" }}>Sign Out</h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>Sign out from Smart Bharat on this device.</p>
              </div>
              <button className="btn btn-danger"><LogOut size={18} /> Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
