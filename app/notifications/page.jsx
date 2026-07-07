"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Info,
  Gift,
  FileText,
  AlertTriangle,
  Calendar,
  Settings,
  Trash2,
  Check,
  Filter,
} from "lucide-react";

const ALL_NOTIFICATIONS = [
  {
    id: 1, title: "Income Certificate Approved", text: "Your income certificate application (APP-2026-5102) has been approved. Download it from the e-District portal.",
    time: "2 hours ago", date: "Jul 7, 2026", type: "success", category: "application", read: false,
  },
  {
    id: 2, title: "Driving Licence Expiring", text: "Your Driving Licence (DL-0420200012345) expires on Aug 7, 2026. Apply for renewal now to avoid penalties.",
    time: "5 hours ago", date: "Jul 7, 2026", type: "warning", category: "document", read: false,
  },
  {
    id: 3, title: "New Scheme: PM Vishwakarma", text: "Based on your profile, you may be eligible for PM Vishwakarma Yojana. Explore training and credit support up to ₹3 Lakh.",
    time: "1 day ago", date: "Jul 6, 2026", type: "info", category: "scheme", read: false,
  },
  {
    id: 4, title: "Complaint CMP-8842 Update", text: "Your complaint about pothole on MG Road has been updated. Status changed from 'Assigned' to 'In Progress'. PWD team has started repair work.",
    time: "2 days ago", date: "Jul 5, 2026", type: "info", category: "complaint", read: true,
  },
  {
    id: 5, title: "Passport Application Update", text: "Your passport renewal (APP-2026-4821) is now in Document Verification stage. Estimated completion: Jul 25, 2026.",
    time: "2 days ago", date: "Jul 5, 2026", type: "info", category: "application", read: true,
  },
  {
    id: 6, title: "Vehicle Insurance Expiring", text: "Your vehicle insurance policy expires in September 2026. Renew it before the expiry date to stay covered.",
    time: "3 days ago", date: "Jul 4, 2026", type: "warning", category: "document", read: true,
  },
  {
    id: 7, title: "PM Kisan Installment Released", text: "If you're a PM Kisan beneficiary, the latest installment of ₹2,000 has been released. Check your bank account.",
    time: "4 days ago", date: "Jul 3, 2026", type: "success", category: "scheme", read: true,
  },
  {
    id: 8, title: "Scholarship Deadline Reminder", text: "National Scholarship Portal applications close on Aug 31, 2026. Don't miss the deadline — apply now.",
    time: "5 days ago", date: "Jul 2, 2026", type: "warning", category: "scheme", read: true,
  },
  {
    id: 9, title: "Complaint CMP-8756 Resolved", text: "Your complaint about street light at Rajiv Chowk has been resolved. The faulty light has been replaced. Please rate the service.",
    time: "5 days ago", date: "Jul 2, 2026", type: "success", category: "complaint", read: true,
  },
  {
    id: 10, title: "PAN-Aadhaar Linking Completed", text: "Your PAN Card has been successfully linked with Aadhaar. No further action needed.",
    time: "1 week ago", date: "Jun 30, 2026", type: "success", category: "application", read: true,
  },
  {
    id: 11, title: "ITR Filing Reminder", text: "The last date to file Income Tax Returns for AY 2026-27 is July 31, 2026. File now to avoid penalties.",
    time: "1 week ago", date: "Jun 30, 2026", type: "warning", category: "document", read: true,
  },
  {
    id: 12, title: "Government Holiday Notice", text: "Government offices will be closed on Jul 15 for the occasion of Eid-ul-Adha. Plan your visits accordingly.",
    time: "1 week ago", date: "Jun 29, 2026", type: "info", category: "general", read: true,
  },
];

const FILTER_CATS = [
  { id: "all", label: "All" },
  { id: "application", label: "Applications" },
  { id: "complaint", label: "Complaints" },
  { id: "scheme", label: "Schemes" },
  { id: "document", label: "Documents" },
  { id: "general", label: "General" },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);

  const filtered = notifications.filter(n => filter === "all" || n.category === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle2 size={20} color="var(--color-secondary)" />;
      case "warning": return <AlertCircle size={20} color="var(--color-warning)" />;
      case "error": return <AlertTriangle size={20} color="var(--color-danger)" />;
      default: return <Info size={20} color="var(--color-primary)" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "application": return <FileText size={14} />;
      case "complaint": return <AlertTriangle size={14} />;
      case "scheme": return <Gift size={14} />;
      case "document": return <FileText size={14} />;
      default: return <Bell size={14} />;
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-subtitle">
          Stay updated with application status, complaints, scheme alerts, and important reminders.
        </p>
      </div>

      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)", flexWrap: "wrap", gap: "var(--space-3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Bell size={20} />
          <span style={{ fontWeight: 600 }}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </span>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
            <Check size={16} /> Mark all as read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="category-chips">
        {FILTER_CATS.map((cat) => (
          <button key={cat.id} className={`category-chip ${filter === cat.id ? "active" : ""}`}
            onClick={() => setFilter(cat.id)}>
            {cat.label}
            {cat.id !== "all" && (
              <span style={{ fontSize: "12px", background: filter === cat.id ? "rgba(255,255,255,0.3)" : "var(--color-surface)", padding: "0 6px", borderRadius: "10px", marginLeft: "4px" }}>
                {notifications.filter(n => n.category === cat.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        {filtered.map((notif) => (
          <div key={notif.id}
            className={`notification-item ${!notif.read ? "unread" : ""}`}
            onClick={() => markRead(notif.id)}
          >
            <div style={{ flexShrink: 0, marginTop: "2px" }}>
              {getTypeIcon(notif.type)}
            </div>
            <div className="notification-content" style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "2px", flexWrap: "wrap" }}>
                <div className="notification-title">{notif.title}</div>
                {!notif.read && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block" }} />}
              </div>
              <div className="notification-text">{notif.text}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-1)" }}>
                <span className="notification-time">
                  <Clock size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                  {notif.time}
                </span>
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "4px", padding: "2px 8px", background: "var(--color-surface)", borderRadius: "var(--radius-full)" }}>
                  {getCategoryIcon(notif.category)}
                  {notif.category.charAt(0).toUpperCase() + notif.category.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <h3>No notifications</h3>
          <p>No notifications in this category yet.</p>
        </div>
      )}
    </>
  );
}
