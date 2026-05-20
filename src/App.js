import { useState, useEffect, useRef } from "react";
import {
  GraduationCap, BookOpen, ClipboardList, Megaphone, MessageSquare,
  Home, AlertTriangle, Bell, BookMarked, FileText, ChevronRight,
  ChevronDown, ChevronUp, User, Lock, Eye, EyeOff, LogOut, Mail, MapPin,
  Download, Trophy, ThumbsUp, Repeat, Plus, Trash2, Send, Calendar,
  Clock, Link2, Video, CheckCircle, XCircle, Wrench, Package, Microscope,
  Globe, BarChart2, Brain, Rocket, Paperclip, Building2, Pin,
  ArrowLeft, ArrowRight, Pencil, Users, Zap, ShieldCheck,
  CalendarCheck, BookmarkCheck, FolderPlus, Phone, Info,
  LayoutDashboard, Edit3, BookCopy,
} from "lucide-react";

const theme = {
  orange: "#FF6B00", orangeLight: "#FF8C3A", orangeDark: "#D45500",
  white: "#FFFFFF", offWhite: "#FFF8F3", surfaceAlt: "#FFF4EC",
  border: "#FFE0C8", textPrimary: "#1A0A00", textSecondary: "#7A4A2A",
  textMuted: "#B07A5A", shadow: "rgba(255,107,0,0.12)",
  green: "#00B86B", red: "#E53E3E", blue: "#2B6CB0",
  purple: "#6264A7", darkRed: "#7B0000",
};

// ─── MOCK DATA ───────────────────────────────────────────────
const MOCK_USERS = [
  { username: "lerato.dlamini", password: "student123", role: "student" },
  { username: "prof.mokoena", password: "lecturer123", role: "lecturer" },
];

const LECTURER_DATA = {
  name: "Prof. A. Mokoena", id: "LEC2019-0031", avatar: "AM",
  department: "School of Computing",
  email: "a.mokoena@university.ac.za",
  phone: "+27 12 420 3611",
  officeHours: "Mon & Wed 13:00–15:00, Fri 10:00–12:00",
  officeLocation: "IT Building, Room 6-14",
  schoolEmail: "computing@university.ac.za",
  schoolPhone: "+27 12 420 3000",
  modules: [
    {
      id: 1, code: "COS301", name: "Software Engineering", students: 187,
      color: "#FF6B00", quizEnabled: true,
      description: "An in-depth study of software development methodologies, design patterns, UML modelling, and large-scale project management. Students work in teams to design and implement a full software system using agile practices.",
    },
    {
      id: 2, code: "COS201", name: "Data Structures", students: 234,
      color: "#2B6CB0", quizEnabled: true,
      description: "Foundational data structures including arrays, linked lists, trees, graphs, and hash tables. Emphasis on algorithm analysis, time and space complexity, and practical implementation in Java.",
    },
  ],
};

const BASE_STUDENT_MODULES = [
  {
    id: 1, code: "COS301", name: "Software Engineering", lecturer: "Prof. A. Mokoena",
    lecturerEmail: "a.mokoena@university.ac.za", lecturerOffice: "IT Building, Room 6-14",
    credits: 16, color: "#FF6B00", progress: 72, nextClass: "Mon 08:00", quizEnabled: true,
    description: "An in-depth study of software development methodologies, design patterns, UML modelling, and large-scale project management.",
    resources: [
      { title: "Software Engineering (10th Ed.)", author: "Sommerville", type: "Textbook" },
      { title: "Study Guide 2026", author: "Dept. of CS", type: "Study Guide" },
      { title: "UML Distilled (3rd Ed.)", author: "Fowler", type: "Reference" },
      { title: "Lecture Slides — Week 1–6", author: "Prof. Mokoena", type: "Slides" },
    ],
  },
  {
    id: 2, code: "COS341", name: "Compiler Construction", lecturer: "Dr. S. Van Zyl",
    lecturerEmail: "s.vanzyl@university.ac.za", lecturerOffice: "IT Building, Room 2-08",
    credits: 16, color: "#E53E3E", progress: 58, nextClass: "Tue 10:15", quizEnabled: false,
    description: "Covers the theory and practice of building compilers including lexical analysis, parsing, semantic analysis, and code generation.",
    resources: [
      { title: "Compilers: Principles, Techniques & Tools", author: "Aho et al.", type: "Textbook" },
      { title: "COS341 Study Guide", author: "Dr. Van Zyl", type: "Study Guide" },
      { title: "Past Test Papers (2022–2025)", author: "Dept. of CS", type: "Past Papers" },
    ],
  },
  {
    id: 3, code: "COS332", name: "Computer Networks", lecturer: "Prof. B. Nkosi",
    lecturerEmail: "b.nkosi@university.ac.za", lecturerOffice: "IT Building, Room 3-22",
    credits: 16, color: "#2B6CB0", progress: 85, nextClass: "Wed 12:30", quizEnabled: true,
    description: "Explores the architecture and protocols of modern computer networks, covering the OSI and TCP/IP models, routing, transport protocols, and network security.",
    resources: [
      { title: "Computer Networking: A Top-Down Approach", author: "Kurose & Ross", type: "Textbook" },
      { title: "COS332 Module Guide", author: "Prof. Nkosi", type: "Study Guide" },
      { title: "Wireshark Lab Exercises", author: "Dept. of CS", type: "Practicals" },
    ],
  },
  {
    id: 4, code: "IMY320", name: "Multimedia", lecturer: "Dr. C. Pretorius",
    lecturerEmail: "c.pretorius@university.ac.za", lecturerOffice: "IT Building, Room 1-05",
    credits: 16, color: "#00B86B", progress: 64, nextClass: "Thu 14:00", quizEnabled: false,
    description: "Introduces multimedia systems design including digital audio, video, animation, and interactive media. Students explore UX design principles.",
    resources: [
      { title: "Multimedia: Making It Work (9th Ed.)", author: "Vaughan", type: "Textbook" },
      { title: "IMY320 Study Guide", author: "Dr. Pretorius", type: "Study Guide" },
      { title: "Adobe XD Fundamentals", author: "Adobe", type: "Online Resource" },
    ],
  },
  {
    id: 5, code: "COS201", name: "Data Structures", lecturer: "Prof. A. Mokoena",
    lecturerEmail: "a.mokoena@university.ac.za", lecturerOffice: "IT Building, Room 6-14",
    credits: 16, color: "#2B6CB0", progress: 70, nextClass: "Tue 14:00", quizEnabled: true,
    description: "Foundational data structures including arrays, linked lists, trees, graphs, and hash tables. Emphasis on algorithm analysis and practical implementation.",
    resources: [
      { title: "Data Structures & Algorithms in Java", author: "Goodrich et al.", type: "Textbook" },
      { title: "COS201 Study Guide", author: "Prof. Mokoena", type: "Study Guide" },
      { title: "Practice Problem Sets", author: "Dept. of CS", type: "Past Papers" },
    ],
  },
];

const BASE_ASSESSMENTS = [
  { id: 1, module: "COS301", title: "Project Phase 2", type: "Project", due: "2026-04-28", weight: "30%", description: "Design and implement the second phase of your team software project.", venue: "Online Submission", instructions: "Submit as a single ZIP file. Include README.", attachments: [{ name: "Phase2_Requirements.pdf", size: "1.2 MB", type: "pdf" }], quizId: null, locked: false, releaseDate: null },
  { id: 2, module: "COS341", title: "Test 2", type: "Test", due: "2026-04-25", weight: "20%", description: "Written test covering chapters 6–9: LR parsing, semantic analysis, and symbol tables.", venue: "IT Building Lecture Hall 1-3", instructions: "Bring your student card. Arrive 15 minutes early.", attachments: [{ name: "Test2_ScopeDocument.pdf", size: "210 KB", type: "pdf" }], quizId: null, locked: false, releaseDate: null },
  { id: 3, module: "COS332", title: "Assignment 3", type: "Assignment", due: "2026-05-05", weight: "15%", description: "TCP/IP socket programming — implement a client-server chat application.", venue: "Online Submission", instructions: "Submit source code and a 2-page report.", attachments: [{ name: "Assignment3_Spec.pdf", size: "560 KB", type: "pdf" }], quizId: null, locked: false, releaseDate: null },
  { id: 4, module: "IMY320", title: "Practical Exam", type: "Exam", due: "2026-05-15", weight: "40%", description: "3-hour practical exam. Design and prototype a multimedia interface.", venue: "Computer Lab 2, Engineering Building", instructions: "Bring your own software license. Templates provided.", attachments: [{ name: "PracticalExam_Brief.pdf", size: "730 KB", type: "pdf" }], quizId: null, locked: true, releaseDate: "2026-05-10" },
  { id: 5, module: "COS301", title: "Test 1", type: "Test", due: "2026-04-10", weight: "20%", description: "Covered UML, requirements engineering, and agile methodologies (chapters 1–5).", venue: "IT Building Lecture Hall 1-3", instructions: "Closed-book test.", attachments: [{ name: "Test1_Memo.pdf", size: "180 KB", type: "pdf" }], quizId: "quiz_cos301_1", locked: false, releaseDate: null },
];

const BASE_ANNOUNCEMENTS = [
  { id: 1, module: "COS301", from: "Prof. A. Mokoena", message: "Project Phase 2 submission portal is now open on ClickUP. Please submit your UML diagrams along with your source code.", time: "2 hours ago", read: false },
  { id: 2, module: "COS341", from: "Dr. S. Van Zyl", message: "Test 2 will cover chapters 6–9. Extra consultation slots available Friday 14:00–16:00 in IT Building Room 6-83.", time: "5 hours ago", read: false },
  { id: 3, module: "ALL", from: "Faculty of IT", message: "Semester exam timetable has been published. Please check the student portal for your allocated venues.", time: "1 day ago", read: true },
  { id: 4, module: "COS332", from: "Prof. B. Nkosi", message: "Lab session on Thursday is cancelled. A replacement session will be scheduled next week.", time: "2 days ago", read: true },
];

const BASE_FORUMS = [
  { id: 1, module: "COS301", topic: "Phase 2 Architecture Discussion", posts: 23, lastPost: "1 hr ago", pinned: true },
  { id: 2, module: "COS341", topic: "Struggling with LR parsing?", posts: 14, lastPost: "3 hrs ago", pinned: false },
  { id: 3, module: "COS332", topic: "TCP vs UDP — Practical differences", posts: 8, lastPost: "1 day ago", pinned: false },
];

const INITIAL_QUIZZES = {
  quiz_cos301_1: {
    id: "quiz_cos301_1", title: "COS301 — Chapter 1–5 Practice Quiz", module: "COS301", createdBy: "Prof. A. Mokoena", locked: false, releaseDate: null,
    questions: [
      { id: 1, text: "Which UML diagram best represents the runtime interaction between objects?", options: ["Class Diagram", "Sequence Diagram", "Use Case Diagram", "Component Diagram"], correct: 1 },
      { id: 2, text: "In Agile, a 'Sprint' typically lasts:", options: ["1 day", "1–4 weeks", "3 months", "6 months"], correct: 1 },
      { id: 3, text: "Which of the following is NOT a software requirement type?", options: ["Functional", "Non-functional", "Domain", "Binary"], correct: 3 },
    ],
  },
};

const INITIAL_CLASSES = [
  { id: 1, module: "COS301", title: "Lecture — Design Patterns", date: "2026-04-28", time: "08:00", duration: "90", teamsLink: "https://teams.microsoft.com/l/meetup-join/placeholder1", recurring: "weekly" },
  { id: 2, module: "COS201", title: "Tutorial — Sorting Algorithms", date: "2026-04-29", time: "10:15", duration: "60", teamsLink: "", recurring: "no" },
];

// ─── LIVE DATE HOOK ───────────────────────────────────────────
const computeStatus = (dueStr, today, locked, releaseDateStr) => {
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (locked && releaseDateStr) {
    const rel = new Date(releaseDateStr);
    const relMid = new Date(rel.getFullYear(), rel.getMonth(), rel.getDate());
    if (todayMid < relMid) return { daysLeft: 0, status: "locked" };
  }
  const due = new Date(dueStr);
  const dueMid = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const diff = Math.round((dueMid - todayMid) / 86400000);
  const status = diff < 0 ? "overdue" : diff === 0 || diff <= 5 ? "urgent" : "upcoming";
  return { daysLeft: diff, status };
};

const useLiveAssessments = (raw) => {
  const [today, setToday] = useState(() => new Date());
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const t = setTimeout(() => { setToday(new Date()); tick(); }, next - now);
      return t;
    };
    const t = tick();
    return () => clearTimeout(t);
  }, []);
  return raw.map(a => ({ ...a, ...computeStatus(a.due, today, a.locked, a.releaseDate) }));
};

// ─── ICON / STYLE HELPERS ─────────────────────────────────────
const Ic = ({ icon: Icon, size = 18, color, style = {} }) => (
  <Icon size={size} color={color} style={{ flexShrink: 0, ...style }} strokeWidth={2} />
);
const resourceIcon = t => ({ Textbook: BookOpen, "Study Guide": FileText, Reference: BookMarked, Slides: BarChart2, Practicals: Microscope, "Online Resource": Globe, "Past Papers": ClipboardList }[t] || FileText);
const fileIcon = t => ({ pdf: FileText, doc: FileText, zip: Package }[t] || Paperclip);
const typeIcon = t => ({ Test: ClipboardList, Assignment: FileText, Project: Wrench, Exam: GraduationCap }[t] || ClipboardList);
const STATUS_COLORS = { upcoming: theme.orange, urgent: theme.red, overdue: theme.darkRed, completed: theme.green, locked: theme.purple };
const STATUS_LABELS = { upcoming: "Upcoming", urgent: "Urgent", overdue: "Overdue", completed: "Completed", locked: "Locked" };

// ─── SHARED COMPONENTS ───────────────────────────────────────
const Badge = ({ children, color = theme.orange }) => (
  <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 4 }}>{children}</span>
);
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: theme.white, borderRadius: 18, border: `1.5px solid ${theme.border}`, padding: "16px 18px", boxShadow: `0 2px 14px ${theme.shadow}`, cursor: onClick ? "pointer" : "default", transition: "transform 0.15s", ...style }}
    onMouseDown={e => onClick && (e.currentTarget.style.transform = "scale(0.98)")}
    onMouseUp={e => onClick && (e.currentTarget.style.transform = "scale(1)")}
    onTouchStart={e => onClick && (e.currentTarget.style.transform = "scale(0.97)")}
    onTouchEnd={e => onClick && (e.currentTarget.style.transform = "scale(1)")}
  >{children}</div>
);
const Avatar = ({ initials, size = 40, bg = theme.orange }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: `linear-gradient(135deg, ${bg}, ${theme.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: size * 0.33, flexShrink: 0 }}>{initials}</div>
);
const ProgressBar = ({ value, color = theme.orange }) => (
  <div style={{ background: theme.border, borderRadius: 8, height: 6, overflow: "hidden" }}>
    <div style={{ width: `${value}%`, height: "100%", borderRadius: 8, background: color, transition: "width 0.8s ease" }} />
  </div>
);
const SectionHeader = ({ title, icon: Icon, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      {Icon && <Ic icon={Icon} size={16} color={theme.orange} />}
      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: theme.textPrimary }}>{title}</span>
    </div>
    {action && <span onClick={onAction} style={{ fontSize: 12, color: theme.orange, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>{action}<Ic icon={ArrowRight} size={12} color={theme.orange} /></span>}
  </div>
);
const BackButton = ({ onClick, label = "Back" }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", color: theme.orange, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 14, padding: 0, display: "flex", alignItems: "center", gap: 5 }}>
    <Ic icon={ArrowLeft} size={15} color={theme.orange} />{label}
  </button>
);
const FieldInput = ({ value, onChange, placeholder, type = "text", icon: Icon, rightEl }) => (
  <div style={{ position: "relative" }}>
    {Icon && <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ic icon={Icon} size={15} color={theme.textMuted} /></div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: Icon ? "12px 38px 12px 36px" : "12px 14px", fontSize: 14, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
      onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
    {rightEl && <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>{rightEl}</div>}
  </div>
);

// Lock toggle reusable component
const LockToggle = ({ locked, onToggle, releaseDate, onReleaseChange }) => (
  <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${locked ? theme.darkRed + "44" : theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 14 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: locked ? 12 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Ic icon={locked ? Lock : Lock} size={15} color={locked ? theme.darkRed : theme.textMuted} />
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>Lock until release date</p>
          <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>Hidden from students until unlocked</p>
        </div>
      </div>
      <div onClick={onToggle} style={{ width: 42, height: 23, borderRadius: 12, background: locked ? theme.darkRed : theme.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ width: 17, height: 17, borderRadius: 9, background: "#fff", position: "absolute", top: 3, left: locked ? 22 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
      </div>
    </div>
    {locked && (
      <>
        <label style={{ fontSize: 11, fontWeight: 700, color: theme.darkRed, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Release Date</label>
        <input type="date" value={releaseDate} onChange={e => onReleaseChange(e.target.value)}
          style={{ width: "100%", border: `1.5px solid ${theme.darkRed}44`, borderRadius: 10, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          onFocus={e => e.target.style.borderColor = theme.darkRed} onBlur={e => e.target.style.borderColor = theme.darkRed + "44"} />
        <p style={{ fontSize: 11, color: theme.textMuted, margin: "5px 0 0" }}>Students see a locked card until this date.</p>
      </>
    )}
  </div>
);

// ─── LOGIN ───────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hints = role === "student" ? { u: "lerato.dlamini", p: "student123" } : { u: "prof.mokoena", p: "lecturer123" };
  const handleLogin = () => {
    if (!username || !password) { setError("Please enter your credentials."); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.username === username && u.password === password && u.role === role);
      if (user) onLogin(role); else setError("Invalid username or password.");
      setLoading(false);
    }, 900);
  };
  return (
    <div style={{ minHeight: "100vh", background: theme.offWhite, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, padding: "52px 32px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic icon={GraduationCap} size={30} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", margin: 0 }}>Unisa myModules</h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0 }}>University Learning Portal</p>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 20px 32px", marginTop: -28 }}>
        <div style={{ background: theme.white, borderRadius: 24, padding: "28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: theme.textPrimary, margin: "0 0 4px" }}>Welcome back</h2>
          <p style={{ color: theme.textMuted, fontSize: 13, margin: "0 0 20px" }}>Sign in to access your portal</p>
          <div style={{ display: "flex", background: theme.offWhite, borderRadius: 12, padding: 4, marginBottom: 20, border: `1.5px solid ${theme.border}` }}>
            {[{ val: "student", label: "Student", icon: BookOpen }, { val: "lecturer", label: "Lecturer", icon: Users }].map(r => (
              <button key={r.val} onClick={() => { setRole(r.val); setError(""); setUsername(""); setPassword(""); }}
                style={{ flex: 1, padding: "10px", border: "none", borderRadius: 9, cursor: "pointer", background: role === r.val ? theme.orange : "transparent", color: role === r.val ? "#fff" : theme.textMuted, fontWeight: 700, fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Ic icon={r.icon} size={14} color={role === r.val ? "#fff" : theme.textMuted} />{r.label}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: theme.textSecondary, marginBottom: 5 }}>Username</label>
            <FieldInput value={username} onChange={setUsername} placeholder={hints.u} icon={User} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: theme.textSecondary, marginBottom: 5 }}>Password</label>
            <FieldInput value={password} onChange={setPassword} placeholder="Enter your password" type={showPass ? "text" : "password"} icon={Lock}
              rightEl={<div onClick={() => setShowPass(p => !p)}><Ic icon={showPass ? EyeOff : Eye} size={16} color={theme.textMuted} /></div>} />
          </div>
          <div style={{ textAlign: "right", marginBottom: 18 }}>
            <span style={{ fontSize: 12, color: theme.orange, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
          </div>
          {error && <div style={{ background: theme.red + "15", border: `1.5px solid ${theme.red}33`, borderRadius: 10, padding: "10px 12px", marginBottom: 14, display: "flex", alignItems: "center", gap: 7 }}><Ic icon={AlertTriangle} size={15} color={theme.red} /><span style={{ fontSize: 12, color: theme.red, fontWeight: 600 }}>{error}</span></div>}
          <button onClick={handleLogin} disabled={loading}
            style={{ width: "100%", background: loading ? theme.textMuted : `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: "#fff", border: "none", borderRadius: 14, padding: "15px", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            {loading ? "Signing in..." : <><span>Sign In</span><Ic icon={ArrowRight} size={15} color="#fff" /></>}
          </button>
          <div style={{ marginTop: 18, padding: "12px", background: theme.surfaceAlt, borderRadius: 10, border: `1px solid ${theme.border}` }}>
            <p style={{ margin: "0 0 3px", fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>Demo Credentials</p>
            <p style={{ margin: "0 0 1px", fontSize: 12, color: theme.textSecondary }}>Username: <strong>{hints.u}</strong></p>
            <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary }}>Password: <strong>{hints.p}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── QUIZ PLAYER ─────────────────────────────────────────────
const QuizPlayer = ({ quiz, onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? quiz.questions.filter(q => answers[q.id] === q.correct).length : 0;
  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined);
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <BackButton onClick={onClose} />
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, borderRadius: 18, padding: "18px", marginBottom: 16 }}>
        <Badge color="#fff">Quiz</Badge>
        <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#fff", fontSize: 16, fontWeight: 800, margin: "6px 0 3px" }}>{quiz.title}</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, margin: 0 }}>{quiz.questions.length} questions · {quiz.module}</p>
      </div>
      {submitted && (
        <div style={{ background: score === quiz.questions.length ? theme.green + "18" : theme.orange + "18", border: `1.5px solid ${score === quiz.questions.length ? theme.green : theme.orange}44`, borderRadius: 14, padding: "16px", marginBottom: 14, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            <Ic icon={score === quiz.questions.length ? Trophy : score >= quiz.questions.length / 2 ? ThumbsUp : BookOpen} size={32} color={score === quiz.questions.length ? theme.green : theme.orange} />
          </div>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: theme.textPrimary, margin: "0 0 3px" }}>{score}/{quiz.questions.length}</p>
          <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{score === quiz.questions.length ? "Perfect score!" : score >= quiz.questions.length / 2 ? "Good effort!" : "Keep studying!"}</p>
        </div>
      )}
      {quiz.questions.map((q, qi) => (
        <Card key={q.id} style={{ marginBottom: 12 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: "0 0 12px" }}><span style={{ color: theme.orange, marginRight: 5 }}>Q{qi + 1}.</span>{q.text}</p>
          {q.options.map((opt, oi) => {
            let bg = theme.offWhite, border = theme.border, col = theme.textPrimary;
            if (submitted) {
              if (oi === q.correct) { bg = theme.green + "20"; border = theme.green; col = theme.green; }
              else if (answers[q.id] === oi) { bg = theme.red + "15"; border = theme.red; col = theme.red; }
            } else if (answers[q.id] === oi) { bg = theme.orange + "18"; border = theme.orange; col = theme.orange; }
            return (
              <div key={oi} onClick={() => !submitted && setAnswers(a => ({ ...a, [q.id]: oi }))}
                style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 7, cursor: submitted ? "default" : "pointer", display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {submitted && oi === q.correct && <Ic icon={CheckCircle} size={12} color={theme.green} />}
                  {submitted && answers[q.id] === oi && oi !== q.correct && <Ic icon={XCircle} size={12} color={theme.red} />}
                  {!submitted && answers[q.id] === oi && <div style={{ width: 9, height: 9, borderRadius: 5, background: theme.orange }} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: col }}>{opt}</span>
              </div>
            );
          })}
        </Card>
      ))}
      {!submitted && (
        <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
          style={{ width: "100%", background: allAnswered ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, color: allAnswered ? "#fff" : theme.textMuted, border: "none", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Ic icon={Send} size={15} color={allAnswered ? "#fff" : theme.textMuted} />
          {allAnswered ? "Submit Quiz" : `Answer all (${Object.keys(answers).length}/${quiz.questions.length})`}
        </button>
      )}
    </div>
  );
};

// ─── QUIZ BUILDER ─────────────────────────────────────────────
const QuizBuilder = ({ moduleCode, onClose, onPublish, editQuiz = null }) => {
  const [title, setTitle] = useState(editQuiz?.title || "");
  const [locked, setLocked] = useState(editQuiz?.locked || false);
  const [releaseDate, setReleaseDate] = useState(editQuiz?.releaseDate || "");
  const [questions, setQuestions] = useState(editQuiz?.questions || [{ id: 1, text: "", options: ["", "", "", ""], correct: 0 }]);
  const addQ = () => setQuestions(q => [...q, { id: Date.now(), text: "", options: ["", "", "", ""], correct: 0 }]);
  const removeQ = id => setQuestions(q => q.filter(x => x.id !== id));
  const updateQ = (id, f, v) => setQuestions(q => q.map(x => x.id === id ? { ...x, [f]: v } : x));
  const updateOpt = (id, oi, v) => setQuestions(q => q.map(x => x.id === id ? { ...x, options: x.options.map((o, i) => i === oi ? v : o) } : x));
  const canPublish = title.trim() && questions.every(q => q.text.trim() && q.options.every(o => o.trim())) && (!locked || releaseDate);
  return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={onClose} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Ic icon={Brain} size={18} color={theme.orange} />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>{editQuiz ? "Edit Quiz" : "New Quiz"}</h2>
      </div>
      <p style={{ color: theme.textMuted, fontSize: 13, margin: "0 0 18px" }}>Module: {moduleCode}</p>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: theme.textSecondary, marginBottom: 5, textTransform: "uppercase" }}>Quiz Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chapter 3 Practice Quiz"
          style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "11px 14px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
          onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
      </div>
      <LockToggle locked={locked} onToggle={() => setLocked(l => !l)} releaseDate={releaseDate} onReleaseChange={setReleaseDate} />
      {questions.map((q, qi) => (
        <Card key={q.id} style={{ marginBottom: 12, borderLeft: `4px solid ${theme.orange}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: theme.orange }}>Question {qi + 1}</span>
            {questions.length > 1 && <span onClick={() => removeQ(q.id)} style={{ color: theme.red, cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 12 }}><Ic icon={Trash2} size={13} color={theme.red} />Remove</span>}
          </div>
          <textarea value={q.text} onChange={e => updateQ(q.id, "text", e.target.value)} placeholder="Enter question..." rows={2}
            style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 10 }} />
          <p style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, margin: "0 0 7px", textTransform: "uppercase" }}>Options — tap circle to mark correct</p>
          {q.options.map((opt, oi) => (
            <div key={oi} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 7 }}>
              <div onClick={() => updateQ(q.id, "correct", oi)}
                style={{ width: 26, height: 26, borderRadius: 13, border: `2px solid ${q.correct === oi ? theme.green : theme.border}`, background: q.correct === oi ? theme.green + "20" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                {q.correct === oi && <Ic icon={CheckCircle} size={14} color={theme.green} />}
              </div>
              <input value={opt} onChange={e => updateOpt(q.id, oi, e.target.value)} placeholder={`Option ${oi + 1}`}
                style={{ flex: 1, border: `1.5px solid ${q.correct === oi ? theme.green : theme.border}`, borderRadius: 9, padding: "8px 11px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", fontFamily: "inherit" }} />
            </div>
          ))}
        </Card>
      ))}
      <button onClick={addQ} style={{ width: "100%", background: "transparent", border: `2px dashed ${theme.orange}`, borderRadius: 14, padding: "12px", fontSize: 13, fontWeight: 700, color: theme.orange, cursor: "pointer", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Ic icon={Plus} size={15} color={theme.orange} />Add Question
      </button>
      <button onClick={() => canPublish && onPublish({ title, moduleCode, questions, locked, releaseDate })} disabled={!canPublish}
        style={{ width: "100%", background: canPublish ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, color: canPublish ? "#fff" : theme.textMuted, border: "none", borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 800, cursor: canPublish ? "pointer" : "not-allowed", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={Rocket} size={15} color={canPublish ? "#fff" : theme.textMuted} />{editQuiz ? "Save Changes" : "Publish Quiz to Students"}
      </button>
    </div>
  );
};

// ─── ASSESSMENT FORM ──────────────────────────────────────────
const AssessmentForm = ({ moduleOptions, onBack, onSave, editItem = null }) => {
  const isExam = editItem?.type === "Exam";
  const [form, setForm] = useState({
    module: editItem?.module || "", title: editItem?.title || "",
    type: editItem?.type || "Assignment", due: editItem?.due || "",
    weight: editItem?.weight || "", description: editItem?.description || "",
    venue: editItem?.venue || "", instructions: editItem?.instructions || "",
    locked: editItem?.locked || false, releaseDate: editItem?.releaseDate || "",
    examMode: isExam,
  });
  const valid = form.module && form.title && form.due && form.weight && (!form.locked || form.releaseDate);
  return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={onBack} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Ic icon={form.examMode ? ShieldCheck : FolderPlus} size={18} color={form.examMode ? theme.darkRed : theme.orange} />
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>{editItem ? "Edit Assessment" : form.examMode ? "Schedule Exam" : "New Assessment"}</h3>
      </div>
      <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 16px" }}>{form.examMode ? "Set a release date to keep exam details hidden" : "Students will see this in their Assessments tab"}</p>

      {!editItem && (
        <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
          {[{ label: "Assignment", icon: FileText, color: theme.blue }, { label: "Project", icon: Wrench, color: theme.orange }, { label: "Exam", icon: GraduationCap, color: theme.darkRed }].map(t => (
            <button key={t.label} onClick={() => setForm(f => ({ ...f, type: t.label, examMode: t.label === "Exam" }))}
              style={{ flex: 1, background: form.type === t.label ? t.color : theme.offWhite, color: form.type === t.label ? "#fff" : theme.textMuted, border: `1.5px solid ${form.type === t.label ? t.color : theme.border}`, borderRadius: 10, padding: "9px 6px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
              <Ic icon={t.icon} size={16} color={form.type === t.label ? "#fff" : theme.textMuted} />{t.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>Module</label>
        <select value={form.module} onChange={e => setForm(f => ({ ...f, module: e.target.value }))}
          style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 13, background: theme.offWhite, color: form.module ? theme.textPrimary : theme.textMuted, outline: "none", fontFamily: "inherit" }}>
          <option value="">Select module...</option>
          {moduleOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {[{ label: "Title", field: "title", placeholder: `e.g. ${form.type} — Topic Name` }, { label: "Venue / Submission Platform", field: "venue", placeholder: "e.g. Online Submission via ClickUP" }].map(({ label, field, placeholder }) => (
        <div key={field} style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
          <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
            style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "11px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
      ))}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {[{ label: form.examMode ? "Exam Date" : "Due Date", field: "due", type: "date" }, { label: "Weight", field: "weight", type: "text", placeholder: "e.g. 30%" }].map(({ label, field, type, placeholder }) => (
          <div key={field}>
            <label style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
            <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
              style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "11px 10px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
          </div>
        ))}
      </div>

      {[{ label: "Description", field: "description", placeholder: "Describe what students need to do..." }, { label: "Instructions", field: "instructions", placeholder: "Submission rules, materials allowed..." }].map(({ label, field, placeholder }) => (
        <div key={field} style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
          <textarea value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} rows={3}
            style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
      ))}

      <LockToggle locked={form.locked} onToggle={() => setForm(f => ({ ...f, locked: !f.locked, releaseDate: "" }))} releaseDate={form.releaseDate} onReleaseChange={v => setForm(f => ({ ...f, releaseDate: v }))} />

      <div style={{ background: theme.surfaceAlt, border: `1.5px dashed ${theme.border}`, borderRadius: 10, padding: "14px", marginBottom: 14, textAlign: "center" }}>
        <Ic icon={Paperclip} size={20} color={theme.textMuted} />
        <p style={{ margin: "5px 0 0", fontSize: 12, color: theme.textMuted }}>File attachments available in the full version</p>
      </div>

      <button onClick={() => valid && onSave({ ...form, id: editItem?.id || Date.now(), attachments: editItem?.attachments || [], quizId: editItem?.quizId || null })} disabled={!valid}
        style={{ width: "100%", background: valid ? `linear-gradient(135deg, ${form.examMode ? theme.darkRed : theme.orange}, ${form.examMode ? "#500000" : theme.orangeDark})` : theme.border, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: valid ? "pointer" : "not-allowed", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={editItem ? Edit3 : BookmarkCheck} size={15} color="#fff" />
        {editItem ? "Save Changes" : form.examMode ? "Schedule Exam" : "Post Assessment"}
      </button>
    </div>
  );
};

// ─── STUDENT: HOME SCREEN ─────────────────────────────────────
const HomeScreen = ({ data, onNavigate, scheduledClasses }) => {
  const liveAssessments = useLiveAssessments(data.assessments);
  const urgent = liveAssessments.filter(a => a.status === "urgent" || a.status === "overdue");
  const unread = data.announcements.filter(a => !a.read);
  const overdue = liveAssessments.filter(a => a.status === "overdue");
  const now = new Date();
  const upcomingClasses = scheduledClasses
    .filter(c => new Date(`${c.date}T${c.time}`) >= now)
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 3);
  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, borderRadius: 20, padding: "20px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -25, right: -25, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
          <Ic icon={GraduationCap} size={14} color="rgba(255,255,255,0.8)" />
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0, fontWeight: 500 }}>Good morning</p>
        </div>
        <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, margin: "0 0 10px", fontFamily: "'Sora', sans-serif" }}>{data.name.split(" ")[0]}</h2>
        <div style={{ display: "flex", gap: 9 }}>
          {[{ label: "Course", val: data.course }, { label: "Year", val: data.year }].map(i => (
            <div key={i.label} style={{ background: "rgba(255,255,255,0.18)", borderRadius: 10, padding: "7px 12px" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, margin: "0 0 1px" }}>{i.label}</p>
              <p style={{ color: "#fff", fontSize: 11, fontWeight: 700, margin: 0 }}>{i.val}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 18 }}>
        {[
          { label: "Modules", value: data.modules.length, icon: BookOpen, color: theme.orange, nav: "modules" },
          { label: "Due Soon", value: urgent.length, icon: AlertTriangle, color: theme.red, nav: "assessments" },
          { label: "Unread", value: unread.length, icon: Bell, color: theme.blue, nav: "announcements" },
        ].map(s => (
          <div key={s.label} onClick={() => onNavigate(s.nav)}
            style={{ background: s.color + "12", border: `1.5px solid ${s.color}30`, borderRadius: 14, padding: "13px 10px", textAlign: "center", cursor: "pointer" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.94)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            onTouchStart={e => e.currentTarget.style.transform = "scale(0.94)"} onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}><Ic icon={s.icon} size={20} color={s.color} /></div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {overdue.length > 0 && (
        <div style={{ background: theme.darkRed + "12", border: `1.5px solid ${theme.darkRed}33`, borderRadius: 14, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 9 }}>
          <Ic icon={AlertTriangle} size={18} color={theme.darkRed} />
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 12, color: theme.darkRed }}>{overdue.length} overdue assessment{overdue.length !== 1 ? "s" : ""}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#B04040" }}>{overdue.map(a => a.title).join(", ")}</p>
          </div>
        </div>
      )}

      {urgent.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SectionHeader title="Urgent" icon={Zap} action="See all" onAction={() => onNavigate("assessments")} />
          {urgent.map(a => (
            <Card key={a.id} onClick={() => onNavigate("assessments")} style={{ marginBottom: 9, borderLeft: `4px solid ${a.status === "overdue" ? theme.darkRed : theme.red}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{a.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{a.module} · {a.type} · {a.weight}</p>
                </div>
                {a.status === "overdue" ? <Badge color={theme.darkRed}>{Math.abs(a.daysLeft)}d overdue</Badge>
                  : a.daysLeft === 0 ? <Badge color={theme.red}>Due today</Badge>
                  : <Badge color={theme.red}>{a.daysLeft}d left</Badge>}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
        <SectionHeader title="Announcements" icon={Megaphone} action="See all" onAction={() => onNavigate("announcements")} />
        {data.announcements.slice(0, 2).map(a => (
          <Card key={a.id} onClick={() => onNavigate("announcements")} style={{ marginBottom: 9, opacity: a.read ? 0.75 : 1 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Avatar initials={a.from.split(" ").map(w => w[0]).slice(-2).join("")} size={34} bg={a.read ? theme.textMuted : theme.orange} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{a.from}</span>
                  <span style={{ fontSize: 10, color: theme.textMuted }}>{a.time}</span>
                </div>
                <p style={{ margin: "0 0 3px", fontSize: 12, color: theme.textSecondary, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{a.message}</p>
                {!a.read && <Badge color={theme.orange}>New</Badge>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <SectionHeader title="Upcoming Classes" icon={Calendar} action="See all" onAction={() => onNavigate("modules")} />
        {upcomingClasses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "18px 0", color: theme.textMuted }}>
            <Ic icon={Calendar} size={26} color={theme.border} />
            <p style={{ margin: "6px 0 0", fontSize: 12 }}>No upcoming classes scheduled</p>
          </div>
        ) : upcomingClasses.map(cls => {
          const mod = data.modules.find(m => m.code === cls.module);
          const modColor = mod?.color || theme.orange;
          const clsDate = new Date(`${cls.date}T${cls.time}`);
          const isToday = clsDate.toDateString() === new Date().toDateString();
          return (
            <Card key={cls.id} onClick={() => mod && onNavigate("modules", mod)} style={{ marginBottom: 9, borderLeft: `4px solid ${cls.teamsLink ? theme.purple : modColor}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: modColor + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic icon={BookOpen} size={18} color={modColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cls.title}</p>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <Badge color={modColor}>{cls.module}</Badge>
                    {cls.teamsLink && <Badge color={theme.purple}><Ic icon={Video} size={9} color={theme.purple} />Online</Badge>}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ margin: "0 0 1px", fontWeight: 700, fontSize: 11, color: isToday ? theme.orange : theme.textPrimary }}>{isToday ? "Today" : clsDate.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}</p>
                  <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{cls.time} · {cls.duration}min</p>
                </div>
              </div>
              {cls.teamsLink && (
                <a href={cls.teamsLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: theme.purple + "15", border: `1.5px solid ${theme.purple}33`, borderRadius: 9, padding: "7px 10px", textDecoration: "none", marginTop: 9 }}>
                  <Ic icon={Video} size={12} color={theme.purple} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: theme.purple }}>Join on Microsoft Teams</span>
                  <Ic icon={ArrowRight} size={11} color={theme.purple} style={{ marginLeft: "auto" }} />
                </a>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── STUDENT: MODULES SCREEN ──────────────────────────────────
const ModulesScreen = ({ data, quizzesDb, initialModule, scheduledClasses = [], assessmentsDb = [] }) => {
  const [selected, setSelected] = useState(initialModule || null);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Hook must be called unconditionally at the top — filter after
  const allLiveAssessments = useLiveAssessments(assessmentsDb);

  if (activeQuiz) return <QuizPlayer quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />;

  if (selected) {
    const typeColors = { Textbook: theme.blue, "Study Guide": theme.orange, Reference: theme.green, Slides: "#7B2FBE", Practicals: "#00A3A3", "Online Resource": "#D4A017", "Past Papers": theme.red };
    const availableQuizzes = Object.values(quizzesDb).filter(q => q.module === selected.code && !q.locked);
    const moduleClasses = scheduledClasses.filter(c => c.module === selected.code).sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    const moduleAssessments = allLiveAssessments.filter(a => a.module === selected.code && a.status !== "locked");

    return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => { setSelected(null); setResourcesOpen(false); }} label="Back to Modules" />
        <div style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}BB)`, borderRadius: 20, padding: "20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -18, right: -18, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <Badge color="#fff">{selected.credits} Credits</Badge>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "7px 0 2px", fontFamily: "'Sora', sans-serif" }}>{selected.code}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 10px", fontWeight: 600 }}>{selected.name}</p>
          <div style={{ display: "flex", gap: 7 }}>
            {[{ label: "Next Class", val: selected.nextClass }, { label: "Progress", val: selected.progress + "%" }].map(item => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 9, padding: "5px 10px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, margin: "0 0 1px" }}>{item.label}</p>
                <p style={{ color: "#fff", fontSize: 11, fontWeight: 700, margin: 0 }}>{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: theme.textPrimary }}>Module Progress</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: selected.color }}>{selected.progress}%</span>
          </div>
          <ProgressBar value={selected.progress} color={selected.color} />
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
            <Ic icon={BookOpen} size={14} color={theme.orange} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>About</p>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary, lineHeight: 1.7 }}>{selected.description}</p>
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <Ic icon={User} size={14} color={theme.orange} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Lecturer</p>
          </div>
          <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
            <Avatar initials={selected.lecturer.split(" ").map(w => w[0]).slice(-2).join("")} size={44} bg={selected.color} />
            <div>
              <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: 13, color: theme.textPrimary }}>{selected.lecturer}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}><Ic icon={Mail} size={11} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{selected.lecturerEmail}</p></div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Ic icon={MapPin} size={11} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{selected.lecturerOffice}</p></div>
            </div>
          </div>
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <div onClick={() => setResourcesOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}><Ic icon={Package} size={14} color={theme.orange} /><p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Resources</p></div>
            <Ic icon={resourcesOpen ? ChevronUp : ChevronDown} size={16} color={theme.orange} />
          </div>
          {resourcesOpen && selected.resources.map((r, i) => {
            const RIcon = resourceIcon(r.type);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: `1px solid ${theme.border}`, marginTop: 10 }}>
                <div style={{ width: 33, height: 33, borderRadius: 9, background: (typeColors[r.type] || theme.orange) + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic icon={RIcon} size={15} color={typeColors[r.type] || theme.orange} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 1px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{r.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{r.author}</p>
                </div>
                <Badge color={typeColors[r.type] || theme.orange}>{r.type}</Badge>
              </div>
            );
          })}
        </Card>

        {moduleClasses.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <SectionHeader title="Scheduled Classes" icon={CalendarCheck} />
            {moduleClasses.map(cls => {
              const clsDate = new Date(`${cls.date}T${cls.time}`);
              const isPast = clsDate < new Date();
              const isToday = clsDate.toDateString() === new Date().toDateString();
              return (
                <Card key={cls.id} style={{ marginBottom: 9, borderLeft: `4px solid ${cls.teamsLink ? theme.purple : selected.color}`, opacity: isPast ? 0.65 : 1 }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                    {isPast && <Badge color={theme.textMuted}>Past</Badge>}
                    {isToday && !isPast && <Badge color={theme.orange}>Today</Badge>}
                    {cls.recurring !== "no" && <Badge color={theme.textMuted}><Ic icon={Repeat} size={9} color={theme.textMuted} />{cls.recurring}</Badge>}
                    {cls.teamsLink && <Badge color={theme.purple}><Ic icon={Video} size={9} color={theme.purple} />Online</Badge>}
                  </div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{cls.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Ic icon={Clock} size={11} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{clsDate.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })} · {cls.time} · {cls.duration} min</p></div>
                  {cls.teamsLink && (
                    <a href={cls.teamsLink} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 7, background: theme.purple + "15", border: `1.5px solid ${theme.purple}33`, borderRadius: 9, padding: "7px 10px", textDecoration: "none", marginTop: 9 }}>
                      <Ic icon={Video} size={13} color={theme.purple} /><span style={{ fontSize: 11, fontWeight: 700, color: theme.purple, flex: 1 }}>Join on Microsoft Teams</span><Ic icon={ArrowRight} size={11} color={theme.purple} />
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {moduleAssessments.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <SectionHeader title="Assessments & Exams" icon={ClipboardList} />
            {moduleAssessments.map(a => {
              const TIcon = typeIcon(a.type);
              const sc = STATUS_COLORS[a.status] || theme.orange;
              return (
                <Card key={a.id} style={{ marginBottom: 9, borderLeft: `4px solid ${sc}` }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: sc + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ic icon={TIcon} size={16} color={sc} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{a.title}</p>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        <Badge color={sc}>{STATUS_LABELS[a.status]}</Badge>
                        <Badge color={theme.textMuted}>{a.weight}</Badge>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: theme.textMuted, flexShrink: 0 }}>{new Date(a.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {selected.quizEnabled && availableQuizzes.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <SectionHeader title="Available Quizzes" icon={Brain} />
            {availableQuizzes.map(qz => (
              <Card key={qz.id} onClick={() => setActiveQuiz(qz)} style={{ marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{qz.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{qz.questions.length} questions · {qz.createdBy}</p>
                  </div>
                  <div style={{ background: theme.orange, borderRadius: 10, padding: "7px 12px", color: "#fff", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 3 }}>
                    Start<Ic icon={ArrowRight} size={12} color="#fff" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <p style={{ color: theme.textMuted, fontSize: 12, marginBottom: 14 }}>{data.modules.length} enrolled modules · tap to view details</p>
      {data.modules.map(m => (
        <Card key={m.id} onClick={() => setSelected(m)} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>{m.code.slice(0, 3)}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 1px", fontWeight: 800, fontSize: 14, color: theme.textPrimary }}>{m.code}</p>
              <p style={{ margin: "0 0 1px", fontSize: 12, color: theme.textSecondary }}>{m.name}</p>
              <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{m.lecturer}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <Badge color={m.color}>{m.credits} cr</Badge>
              {m.quizEnabled && <Badge color={theme.green}><Ic icon={Brain} size={9} color={theme.green} />Quizzes</Badge>}
            </div>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: theme.textSecondary, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.description}</p>
          <div style={{ marginBottom: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>Progress</span>
              <span style={{ fontSize: 11, color: m.color, fontWeight: 700 }}>{m.progress}%</span>
            </div>
            <ProgressBar value={m.progress} color={m.color} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 9, paddingTop: 9, borderTop: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: 11, color: theme.textMuted }}>Next class</span>
            <Badge color={m.color}>{m.nextClass}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

// ─── STUDENT: ASSESSMENTS SCREEN ─────────────────────────────
const AssessmentsScreen = ({ data, quizzesDb }) => {
  const [filter, setFilter] = useState("all");
  const [collapsed, setCollapsed] = useState({});
  const [selected, setSelected] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const liveAssessments = useLiveAssessments(data.assessments);
  const moduleColors = {};
  data.modules.forEach(m => { moduleColors[m.code] = m.color; });
  const filtered = filter === "all" ? liveAssessments : liveAssessments.filter(a => a.status === filter);
  const grouped = {};
  filtered.forEach(a => { if (!grouped[a.module]) grouped[a.module] = []; grouped[a.module].push(a); });
  if (activeQuiz) return <QuizPlayer quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />;

  if (selected) {
    const quiz = selected.quizId ? quizzesDb[selected.quizId] : null;
    const sc = STATUS_COLORS[selected.status] || theme.orange;
    if (selected.status === "locked") return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => setSelected(null)} label="Back to Assessments" />
        <div style={{ background: `linear-gradient(135deg, ${theme.darkRed}, #500000)`, borderRadius: 20, padding: "22px", marginBottom: 16, position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><Ic icon={Lock} size={40} color="rgba(255,255,255,0.9)" /></div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>{selected.title}</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, margin: "0 0 10px" }}>{selected.module} · {selected.type}</p>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px" }}>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: "0 0 3px" }}>Unlocks on</p>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 800, margin: 0 }}>{new Date(selected.releaseDate).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Ic icon={ShieldCheck} size={16} color={theme.darkRed} />
            <p style={{ margin: 0, fontSize: 13, color: theme.textSecondary, lineHeight: 1.6 }}>This assessment is currently locked by your lecturer. Details will be revealed on the release date.</p>
          </div>
        </Card>
      </div>
    );
    return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => setSelected(null)} label="Back to Assessments" />
        <div style={{ background: `linear-gradient(135deg, ${sc}, ${sc}99)`, borderRadius: 20, padding: "20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ display: "flex", gap: 5, marginBottom: 7 }}><Badge color="#fff">{selected.type}</Badge><Badge color="#fff">{selected.module}</Badge></div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>{selected.title}</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: 0 }}>Weight: {selected.weight}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 12 }}>
          <div style={{ background: theme.white, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}><Ic icon={Calendar} size={10} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>Due Date</p></div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 12, color: theme.textPrimary }}>{new Date(selected.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <div style={{ background: theme.white, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "12px" }}>
            <p style={{ margin: "0 0 3px", fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>Status</p>
            <Badge color={sc}>{STATUS_LABELS[selected.status]}</Badge>
          </div>
        </div>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Ic icon={ClipboardList} size={13} color={theme.orange} /><p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Description</p></div>
          <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary, lineHeight: 1.7 }}>{selected.description}</p>
        </Card>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}><Ic icon={MapPin} size={13} color={theme.orange} /><p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Venue & Instructions</p></div>
          <div style={{ display: "flex", gap: 7, marginBottom: 9 }}><Ic icon={Building2} size={13} color={theme.textMuted} style={{ marginTop: 2 }} /><div><p style={{ margin: "0 0 1px", fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>Venue</p><p style={{ margin: 0, fontSize: 12, color: theme.textPrimary, fontWeight: 600 }}>{selected.venue}</p></div></div>
          <div style={{ display: "flex", gap: 7 }}><Ic icon={Pin} size={13} color={theme.textMuted} style={{ marginTop: 2 }} /><div><p style={{ margin: "0 0 1px", fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>Instructions</p><p style={{ margin: 0, fontSize: 12, color: theme.textPrimary }}>{selected.instructions}</p></div></div>
        </Card>
        {selected.attachments?.length > 0 && (
          <Card style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><Ic icon={Paperclip} size={13} color={theme.orange} /><p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Attachments</p></div>
            {selected.attachments.map((att, i) => {
              const FileIc = fileIcon(att.type);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i > 0 ? `1px solid ${theme.border}` : undefined }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: theme.orange + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic icon={FileIc} size={18} color={theme.orange} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}><p style={{ margin: "0 0 1px", fontWeight: 700, fontSize: 12, color: theme.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.name}</p><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{att.size}</p></div>
                  <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, borderRadius: 9, padding: "7px 12px", color: "#fff", fontWeight: 700, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Ic icon={Download} size={12} color="#fff" />Download</div>
                </div>
              );
            })}
          </Card>
        )}
        {quiz && (
          <Card style={{ marginBottom: 12, borderLeft: `4px solid ${theme.green}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}><Ic icon={Brain} size={13} color={theme.green} /><p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Linked Quiz</p></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{quiz.title}</p><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{quiz.questions.length} questions</p></div>
              <button onClick={() => setActiveQuiz(quiz)} style={{ background: `linear-gradient(135deg, ${theme.green}, #009955)`, border: "none", borderRadius: 10, padding: "9px 14px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>Take Quiz<Ic icon={ArrowRight} size={12} color="#fff" /></button>
            </div>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ display: "flex", gap: 7, marginBottom: 14, overflowX: "auto", paddingBottom: 3 }}>
        {["all", "overdue", "urgent", "upcoming", "locked", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? (f === "overdue" ? theme.darkRed : f === "locked" ? theme.purple : theme.orange) : theme.surfaceAlt, color: filter === f ? "#fff" : theme.textSecondary, border: `1.5px solid ${filter === f ? (f === "overdue" ? theme.darkRed : f === "locked" ? theme.purple : theme.orange) : theme.border}`, borderRadius: 18, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            {STATUS_LABELS[f] || "All"}
          </button>
        ))}
      </div>
      {Object.keys(grouped).length === 0 && <div style={{ textAlign: "center", padding: "36px 0", color: theme.textMuted }}><Ic icon={CheckCircle} size={36} color={theme.green} /><p style={{ fontWeight: 700, marginTop: 8 }}>No assessments here</p></div>}
      {Object.entries(grouped).map(([moduleCode, assessments]) => {
        const modColor = moduleColors[moduleCode] || theme.orange;
        const mod = data.modules.find(m => m.code === moduleCode);
        const isCollapsed = collapsed[moduleCode];
        return (
          <div key={moduleCode} style={{ marginBottom: 16 }}>
            <div onClick={() => setCollapsed(p => ({ ...p, [moduleCode]: !p[moduleCode] }))} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9, cursor: "pointer", userSelect: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: modColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontWeight: 800, fontSize: 10 }}>{moduleCode.slice(0, 3)}</span></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 13, color: theme.textPrimary }}>{moduleCode}</p>
                {mod && <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{mod.name}</p>}
              </div>
              <Badge color={modColor}>{assessments.length} item{assessments.length !== 1 ? "s" : ""}</Badge>
              <Ic icon={isCollapsed ? ChevronDown : ChevronUp} size={15} color={theme.textMuted} />
            </div>
            {!isCollapsed && assessments.map(a => {
              const sc = STATUS_COLORS[a.status] || theme.orange;
              const TIcon = typeIcon(a.type);
              return (
                <Card key={a.id} onClick={() => setSelected(a)} style={{ marginBottom: 9, marginLeft: 6, borderLeft: `4px solid ${sc}` }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: sc + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {a.status === "locked" ? <Ic icon={Lock} size={16} color={theme.purple} /> : <Ic icon={TIcon} size={16} color={sc} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 13, color: theme.textPrimary }}>{a.status === "locked" ? "🔒 " + a.title : a.title}</p>
                      <p style={{ margin: "0 0 6px", fontSize: 11, color: theme.textMuted }}>Weight: {a.weight}</p>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        <Badge color={sc}>{STATUS_LABELS[a.status]}</Badge>
                        {a.status === "overdue" && <Badge color={theme.darkRed}><Ic icon={AlertTriangle} size={9} color={theme.darkRed} />{Math.abs(a.daysLeft)}d overdue</Badge>}
                        {a.status === "urgent" && a.daysLeft > 0 && <Badge color={theme.red}>{a.daysLeft}d left</Badge>}
                        {a.status === "urgent" && a.daysLeft === 0 && <Badge color={theme.red}>Due today</Badge>}
                        {a.status === "upcoming" && <Badge color={theme.textMuted}>{a.daysLeft} days left</Badge>}
                        {a.status === "locked" && <Badge color={theme.purple}><Ic icon={Lock} size={9} color={theme.purple} />Unlocks {new Date(a.releaseDate).toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}</Badge>}
                        {a.status === "completed" && <Badge color={theme.green}><Ic icon={CheckCircle} size={9} color={theme.green} />Done</Badge>}
                        {a.attachments?.length > 0 && <Badge color={theme.blue}><Ic icon={Paperclip} size={9} color={theme.blue} />{a.attachments.length}</Badge>}
                        {a.quizId && <Badge color={theme.green}><Ic icon={Brain} size={9} color={theme.green} />Quiz</Badge>}
                      </div>
                    </div>
                    <Ic icon={ChevronRight} size={14} color={theme.border} />
                  </div>
                  <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: theme.textMuted }}>{a.status === "locked" ? "Exam date" : "Due"}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.textPrimary }}>{new Date(a.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ─── STUDENT: ANNOUNCEMENTS ───────────────────────────────────
const AnnouncementsScreen = ({ data }) => {
  const [expanded, setExpanded] = useState({});
  const LIMIT = 100;
  return (
    <div style={{ padding: "0 16px 16px" }}>
      {data.announcements.map(a => {
        const isLong = a.message.length > LIMIT;
        const isOpen = expanded[a.id];
        return (
          <Card key={a.id} style={{ marginBottom: 10, opacity: a.read ? 0.8 : 1, borderLeft: !a.read ? `4px solid ${theme.orange}` : undefined }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Avatar initials={a.from.split(" ").map(w => w[0]).slice(-2).join("")} size={40} bg={a.read ? theme.textMuted : theme.orange} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontWeight: 800, fontSize: 12, color: theme.textPrimary }}>{a.from}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}><Ic icon={Clock} size={10} color={theme.textMuted} /><span style={{ fontSize: 10, color: theme.textMuted }}>{a.time}</span></div>
                </div>
                <Badge color={theme.orange}>{a.module}</Badge>
                <p style={{ margin: "7px 0 0", fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>{isLong && !isOpen ? a.message.slice(0, LIMIT) + "…" : a.message}</p>
                {isLong && <span onClick={() => setExpanded(e => ({ ...e, [a.id]: !e[a.id] }))} style={{ fontSize: 11, color: theme.orange, fontWeight: 700, cursor: "pointer", marginTop: 3, display: "inline-flex", alignItems: "center", gap: 3 }}><Ic icon={isOpen ? ChevronUp : ChevronDown} size={12} color={theme.orange} />{isOpen ? "Show less" : "Read more"}</span>}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

// ─── STUDENT: FORUMS ──────────────────────────────────────────
// ─── REPLY COMPOSER ──────────────────────────────────────────
const ReplyComposer = ({ onSend, studentName, studentId }) => {
  const [text, setText] = useState("");
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);
  const [showAttach, setShowAttach] = useState(false);
  const [newLink, setNewLink] = useState("");
  const canSend = text.trim() || links.length > 0 || files.length > 0;
  const mockFiles = [
    { name: "lecture_notes.pdf", size: "1.2 MB", type: "pdf" },
    { name: "diagram.png", size: "340 KB", type: "img" },
    { name: "code_example.zip", size: "88 KB", type: "zip" },
  ];
  const avatar = studentName ? studentName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "ST";
  const handleSend = () => {
    if (!canSend) return;
    onSend({
      user: studentName || "Student",
      author: studentName || "Student",
      studentId: studentId || "",
      avatar,
      isLecturer: false,
      time: "Just now",
      text: text.trim(),
      links,
      attachments: files,
      files,
    });
    setText(""); setLinks([]); setFiles([]); setNewLink(""); setShowAttach(false);
  };
  const addLink = () => { if (newLink.trim()) { setLinks(l => [...l, newLink.trim()]); setNewLink(""); } };
  return (
    <div style={{ background: theme.white, border: `1.5px solid ${theme.border}`, borderRadius: 18, padding: "14px", marginTop: 10, boxShadow: `0 2px 12px ${theme.shadow}` }}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write a reply..." rows={3}
        style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 10 }}
        onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
      {links.length > 0 && <div style={{ marginBottom: 9 }}>{links.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: theme.blue + "12", border: `1.5px solid ${theme.blue}22`, borderRadius: 9, padding: "6px 10px", marginBottom: 5 }}>
          <Ic icon={Link2} size={12} color={theme.blue} /><span style={{ fontSize: 11, color: theme.blue, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l}</span>
          <span onClick={() => setLinks(p => p.filter((_, idx) => idx !== i))} style={{ cursor: "pointer" }}><Ic icon={XCircle} size={13} color={theme.red} /></span>
        </div>
      ))}</div>}
      {files.length > 0 && <div style={{ marginBottom: 9 }}>{files.map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: theme.orange + "12", border: `1.5px solid ${theme.orange}22`, borderRadius: 9, padding: "6px 10px", marginBottom: 5 }}>
          <Ic icon={f.type === "img" ? Globe : f.type === "zip" ? Package : FileText} size={12} color={theme.orange} />
          <span style={{ fontSize: 11, color: theme.textPrimary, flex: 1 }}>{f.name}</span>
          <span style={{ fontSize: 10, color: theme.textMuted, marginRight: 4 }}>{f.size}</span>
          <span onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))} style={{ cursor: "pointer" }}><Ic icon={XCircle} size={13} color={theme.red} /></span>
        </div>
      ))}</div>}
      {showAttach && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: "12px", marginBottom: 8 }}>
            <p style={{ margin: "0 0 7px", fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: "uppercase" }}>Add Link</p>
            <div style={{ display: "flex", gap: 7 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic icon={Link2} size={12} color={theme.textMuted} /></div>
                <input value={newLink} onChange={e => setNewLink(e.target.value)} onKeyDown={e => e.key === "Enter" && addLink()} placeholder="https://..."
                  style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 9, padding: "9px 10px 9px 30px", fontSize: 12, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box" }} />
              </div>
              <button onClick={addLink} style={{ background: theme.blue, border: "none", borderRadius: 9, padding: "0 12px", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Add</button>
            </div>
          </div>
          <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: "12px" }}>
            <p style={{ margin: "0 0 7px", fontSize: 11, fontWeight: 700, color: theme.textSecondary, textTransform: "uppercase" }}>Attach File (demo)</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {mockFiles.map((f, i) => (
                <button key={i} onClick={() => setFiles(p => p.find(x => x.name === f.name) ? p : [...p, f])}
                  style={{ background: theme.offWhite, border: `1.5px solid ${theme.border}`, borderRadius: 9, padding: "6px 10px", fontSize: 11, fontWeight: 600, color: theme.textSecondary, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Ic icon={f.type === "img" ? Globe : f.type === "zip" ? Package : FileText} size={11} color={theme.orange} />{f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
        <button onClick={() => setShowAttach(s => !s)}
          style={{ background: showAttach ? theme.orange + "18" : theme.surfaceAlt, border: `1.5px solid ${showAttach ? theme.orange + "44" : theme.border}`, borderRadius: 10, padding: "9px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: showAttach ? theme.orange : theme.textMuted }}>
          <Ic icon={Paperclip} size={14} color={showAttach ? theme.orange : theme.textMuted} />Attach
        </button>
        <div style={{ flex: 1 }} />
        <button onClick={handleSend} disabled={!canSend}
          style={{ background: canSend ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, border: "none", borderRadius: 12, padding: "9px 18px", color: "#fff", cursor: canSend ? "pointer" : "not-allowed", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <Ic icon={Send} size={14} color="#fff" />Reply
        </button>
      </div>
    </div>
  );
};

// ─── STUDENT: FORUMS SCREEN ───────────────────────────────────
const ForumsScreen = ({ data, threadReplies = {}, onAddReply }) => {
  const [selected, setSelected] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  // Student identity from data
  const studentName = data.name;
  const studentId = data.id;

  if (selected) {
    const mod = data.modules.find(m => m.code === selected.module);
    const modColor = mod?.color || theme.orange;
    const staticPosts = [
      { id: "s1", user: "Thabo M.", studentId: "STU2024-0321", time: "2 hrs ago", text: "Has anyone figured out the architecture for Phase 2? I'm struggling with the sequence diagrams.", avatar: "TM", links: [], files: [] },
      { id: "s2", user: "Prof. A. Mokoena", time: "1 hr ago", text: "Good question! Remember that sequence diagrams should reflect the runtime interaction between objects.", avatar: "AM", isLecturer: true, links: [], files: [] },
      { id: "s3", user: "Zanele K.", studentId: "STU2024-0198", time: "45 min ago", text: "I found the examples from chapter 5 really helpful. Especially figure 5.12.", avatar: "ZK", links: [], files: [] },
    ];
    const openingPosts = selected.openingPost
      ? [{ id: "op", user: selected.openingPost.user, avatar: selected.openingPost.avatar, time: selected.openingPost.time, text: selected.openingPost.text, links: selected.openingPost.links || [], files: [], isLecturer: true }]
      : staticPosts;
    const replies = threadReplies[selected.id] || [];
    const allPosts = [...openingPosts, ...replies];

    return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => setSelected(null)} label="Back to Forums" />
        <div style={{ background: `linear-gradient(135deg, ${modColor}, ${modColor}BB)`, borderRadius: 18, padding: "16px 18px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -14, right: -14, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          {selected.pinned && <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}><Ic icon={Pin} size={10} color="rgba(255,255,255,0.8)" /><p style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, margin: 0 }}>PINNED</p></div>}
          {selected.isLecturer && <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}><Ic icon={GraduationCap} size={10} color="rgba(255,255,255,0.8)" /><p style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, margin: 0 }}>POSTED BY LECTURER</p></div>}
          <Badge color="#fff">{selected.module}</Badge>
          <h3 style={{ margin: "5px 0 3px", fontFamily: "'Sora', sans-serif", fontSize: 15, color: "#fff", fontWeight: 800 }}>{selected.topic}</h3>
          <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{allPosts.length} post{allPosts.length !== 1 ? "s" : ""}</p>
        </div>

        {allPosts.map((post, i) => (
          <Card key={post.id || i} style={{ marginBottom: 9, borderLeft: post.isLecturer ? `4px solid ${theme.orange}` : undefined }}>
            <div style={{ display: "flex", gap: 9 }}>
              <Avatar initials={post.avatar} size={34} bg={post.isLecturer ? theme.orange : theme.blue} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 4, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{post.user}</span>
                    {!post.isLecturer && post.studentId && (
                      <span style={{ fontSize: 10, color: theme.textMuted, marginLeft: 6, fontWeight: 600 }}>· {post.studentId}</span>
                    )}
                    {post.isLecturer && <Badge color={theme.orange}>Lecturer</Badge>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}><Ic icon={Clock} size={10} color={theme.textMuted} /><span style={{ fontSize: 10, color: theme.textMuted }}>{post.time}</span></div>
                </div>
                {post.text && <p style={{ margin: "0 0 8px", fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>{post.text}</p>}
                {post.links?.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 7 }}>
                    {post.links.map((link, li) => (
                      <a key={li} href={link} target="_blank" rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center", gap: 6, background: theme.blue + "12", border: `1.5px solid ${theme.blue}33`, borderRadius: 9, padding: "6px 10px", textDecoration: "none" }}>
                        <Ic icon={Link2} size={11} color={theme.blue} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: theme.blue, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</span>
                        <Ic icon={ArrowRight} size={10} color={theme.blue} />
                      </a>
                    ))}
                  </div>
                )}
                {post.files?.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {post.files.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, background: theme.orange + "10", border: `1.5px solid ${theme.orange}22`, borderRadius: 9, padding: "7px 10px" }}>
                        <Ic icon={f.type === "img" ? Globe : f.type === "zip" ? Package : FileText} size={13} color={theme.orange} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: theme.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                          <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{f.size}</p>
                        </div>
                        <div style={{ background: theme.orange, borderRadius: 7, padding: "4px 9px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                          <Ic icon={Download} size={11} color="#fff" /><span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>Download</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        <ReplyComposer onSend={(reply) => onAddReply(selected.id, reply)} studentName={studentName} studentId={studentId} />
      </div>
    );
  }

  const grouped = {};
  data.forums.forEach(f => { if (!grouped[f.module]) grouped[f.module] = []; grouped[f.module].push(f); });

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {Object.entries(grouped).map(([moduleCode, threads]) => {
        const mod = data.modules.find(m => m.code === moduleCode);
        const modColor = mod?.color || theme.orange;
        const isCollapsed = collapsed[moduleCode];
        return (
          <div key={moduleCode} style={{ marginBottom: 18 }}>
            <div onClick={() => setCollapsed(p => ({ ...p, [moduleCode]: !p[moduleCode] }))} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9, cursor: "pointer", userSelect: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: modColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontWeight: 800, fontSize: 10 }}>{moduleCode.slice(0, 3)}</span></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 13, color: theme.textPrimary }}>{moduleCode}</p>
                {mod && <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{mod.name}</p>}
              </div>
              <Badge color={modColor}>{threads.length} thread{threads.length !== 1 ? "s" : ""}</Badge>
              <Ic icon={isCollapsed ? ChevronDown : ChevronUp} size={15} color={theme.textMuted} />
            </div>
            {!isCollapsed && threads.map(f => {
              const replyCount = (threadReplies[f.id] || []).length;
              const totalPosts = f.posts + replyCount;
              return (
                <Card key={f.id} onClick={() => setSelected(f)} style={{ marginBottom: 9, marginLeft: 6, borderLeft: `4px solid ${f.isLecturer ? theme.orange : modColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {f.pinned && <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}><Ic icon={Pin} size={10} color={theme.orange} /><span style={{ fontSize: 9, color: theme.orange, fontWeight: 700 }}>PINNED</span></div>}
                      {f.isLecturer && <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}><Ic icon={GraduationCap} size={10} color={theme.orange} /><span style={{ fontSize: 9, color: theme.orange, fontWeight: 700 }}>POSTED BY LECTURER</span></div>}
                      <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{f.topic}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Ic icon={MessageSquare} size={10} color={theme.textMuted} />
                        <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{totalPosts} post{totalPosts !== 1 ? "s" : ""} · {replyCount > 0 ? "Just now" : f.lastPost}</p>
                      </div>
                    </div>
                    <Ic icon={ChevronRight} size={16} color={theme.border} />
                  </div>
                </Card>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// ─── LECTURER: SHARED HELPERS ────────────────────────────────
const LecturerField = ({ label, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</label>
    {children}
  </div>
);
const LecturerSelect = ({ value, onChange, options, placeholder }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: value ? theme.textPrimary : theme.textMuted, outline: "none", fontFamily: "inherit" }}>
    <option value="">{placeholder}</option>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);
const LecturerTextInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
    onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
);
const LecturerTextArea = ({ value, onChange, placeholder, rows = 4 }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit" }}
    onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
);

// ─── LECTURER: MAIN DASHBOARD ────────────────────────────────
const LecturerDashboard = ({ data, quizzesDb, onPublishQuiz, scheduledClasses, onAddClass, onAddAssessment, onEditAssessment, onDeleteAssessment, assessmentsDb, announcementsDb, onAddAnnouncement, forumsDb, onAddForumPost, onAddModule, onUpdateContact, threadReplies }) => {
  const [tab, setTab] = useState("home");
  const lTabs = [
    { id: "home", icon: LayoutDashboard, label: "Home" },
    { id: "modules", icon: BookCopy, label: "Modules" },
    { id: "assessments", icon: ClipboardList, label: "Tests" },
    { id: "classes", icon: Calendar, label: "Classes" },
    { id: "announcements", icon: Megaphone, label: "Updates" },
  ];

  const moduleOptions = data.modules.map(m => ({ value: m.code, label: `${m.code} — ${m.name}` }));

  const renderLecturerContent = () => {
    switch (tab) {
      case "home": return <LecturerHome data={data} scheduledClasses={scheduledClasses} assessmentsDb={assessmentsDb} announcementsDb={announcementsDb} onNavigate={setTab} onUpdateContact={onUpdateContact} />;
      case "modules": return <LecturerModules data={data} quizzesDb={quizzesDb} onPublishQuiz={onPublishQuiz} moduleOptions={moduleOptions} assessmentsDb={assessmentsDb} onAddModule={onAddModule} />;
      case "assessments": return <LecturerAssessments data={data} assessmentsDb={assessmentsDb} moduleOptions={moduleOptions} onAdd={onAddAssessment} onEdit={onEditAssessment} onDelete={onDeleteAssessment} quizzesDb={quizzesDb} onPublishQuiz={onPublishQuiz} />;
      case "classes": return <LecturerClasses data={data} scheduledClasses={scheduledClasses} moduleOptions={moduleOptions} onAdd={onAddClass} />;
      case "announcements": return <LecturerAnnouncements data={data} announcementsDb={announcementsDb} forumsDb={forumsDb} moduleOptions={moduleOptions} onAdd={onAddAnnouncement} onAddForumPost={onAddForumPost} threadReplies={threadReplies} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {renderLecturerContent()}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, flexShrink: 0, background: theme.white, borderTop: `1.5px solid ${theme.border}`, display: "flex", padding: "10px 0 14px", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 200 }}>
        {lTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 0" }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, background: tab === t.id ? theme.orange + "18" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
              <Ic icon={t.icon} size={22} color={tab === t.id ? theme.orange : theme.textMuted} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: tab === t.id ? theme.orange : theme.textMuted }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Lecturer Home
const LecturerHome = ({ data, scheduledClasses, assessmentsDb, announcementsDb, onNavigate, onUpdateContact }) => {
  const upcoming = scheduledClasses.filter(c => new Date(`${c.date}T${c.time}`) >= new Date()).sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)).slice(0, 2);
  const recentAnnouncements = announcementsDb.filter(a => a.isLecturer).slice(0, 2);
  const [editingContact, setEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: data.email, phone: data.phone,
    officeHours: data.officeHours, officeLocation: data.officeLocation,
    schoolEmail: data.schoolEmail, schoolPhone: data.schoolPhone,
  });

  if (editingContact) return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={() => setEditingContact(false)} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Ic icon={Edit3} size={17} color={theme.orange} />
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>Edit Contact Details</h3>
      </div>
      <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 18px" }}>These details are visible to students in your module pages</p>

      {/* Personal contact */}
      <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <Ic icon={User} size={14} color={theme.orange} />
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Personal Details</p>
        </div>
        {[
          { label: "Email Address", field: "email", icon: Mail, placeholder: "your.email@university.ac.za" },
          { label: "Phone Number", field: "phone", icon: Phone, placeholder: "+27 12 000 0000" },
          { label: "Office Location", field: "officeLocation", icon: MapPin, placeholder: "e.g. IT Building, Room 6-14" },
          { label: "Office Hours", field: "officeHours", icon: Clock, placeholder: "e.g. Mon & Wed 13:00–15:00" },
        ].map(({ label, field, icon: FieldIcon, placeholder }) => (
          <div key={field} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
                <Ic icon={FieldIcon} size={13} color={theme.textMuted} />
              </div>
              <input value={contactForm[field]} onChange={e => setContactForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
                style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px 10px 32px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
          </div>
        ))}
      </div>

      {/* School of Computing */}
      <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <Ic icon={Building2} size={14} color={theme.orange} />
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>School of Computing</p>
        </div>
        {[
          { label: "School Email", field: "schoolEmail", icon: Mail, placeholder: "computing@university.ac.za" },
          { label: "School Phone", field: "schoolPhone", icon: Phone, placeholder: "+27 12 000 0000" },
        ].map(({ label, field, icon: FieldIcon, placeholder }) => (
          <div key={field} style={{ marginBottom: field === "schoolPhone" ? 0 : 12 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
                <Ic icon={FieldIcon} size={13} color={theme.textMuted} />
              </div>
              <input value={contactForm[field]} onChange={e => setContactForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder}
                style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px 10px 32px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => { onUpdateContact(contactForm); setEditingContact(false); }}
        style={{ width: "100%", background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={CheckCircle} size={15} color="#fff" />Save Contact Details
      </button>
    </div>
  );

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orangeDark}, #8B2000)`, borderRadius: 20, padding: "20px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: "0 0 2px" }}>Lecturer Portal</p>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 1px", fontFamily: "'Sora', sans-serif" }}>{data.name}</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, margin: 0 }}>{data.department}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
        {[
          { label: "Modules", value: data.modules.length, icon: BookCopy, color: theme.orange, nav: "modules" },
          { label: "Assessments", value: assessmentsDb.length, icon: ClipboardList, color: theme.blue, nav: "assessments" },
          { label: "Classes", value: scheduledClasses.length, icon: Calendar, color: theme.purple, nav: "classes" },
          { label: "Updates Sent", value: announcementsDb.filter(a => a.isLecturer).length, icon: Megaphone, color: theme.green, nav: "announcements" },
        ].map(s => (
          <div key={s.label} onClick={() => onNavigate(s.nav)}
            style={{ background: s.color + "12", border: `1.5px solid ${s.color}30`, borderRadius: 13, padding: "12px 10px", textAlign: "center", cursor: "pointer" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.94)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            onTouchStart={e => e.currentTarget.style.transform = "scale(0.94)"} onTouchEnd={e => e.currentTarget.style.transform = "scale(1)"}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}><Ic icon={s.icon} size={20} color={s.color} /></div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {upcoming.length > 0 && (
        <>
          <SectionHeader title="Next Classes" icon={Calendar} action="See all" onAction={() => onNavigate("classes")} />
          {upcoming.map(cls => {
            const mod = data.modules.find(m => m.code === cls.module);
            const modColor = mod?.color || theme.orange;
            const clsDate = new Date(`${cls.date}T${cls.time}`);
            const isToday = clsDate.toDateString() === new Date().toDateString();
            return (
              <Card key={cls.id} style={{ marginBottom: 9, borderLeft: `4px solid ${cls.teamsLink ? theme.purple : modColor}` }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                  <Badge color={modColor}>{cls.module}</Badge>
                  {isToday && <Badge color={theme.orange}>Today</Badge>}
                  {cls.teamsLink && <Badge color={theme.purple}><Ic icon={Video} size={9} color={theme.purple} />Teams</Badge>}
                </div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{cls.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Ic icon={Clock} size={11} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{clsDate.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })} · {cls.time} · {cls.duration}min</p></div>
              </Card>
            );
          })}
        </>
      )}

      {recentAnnouncements.length > 0 && (
        <>
          <SectionHeader title="Recently Sent" icon={Megaphone} action="See all" onAction={() => onNavigate("announcements")} />
          {recentAnnouncements.map(a => (
            <Card key={a.id} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><Badge color={theme.orange}>{a.module}</Badge><span style={{ fontSize: 10, color: theme.textMuted }}>{a.time}</span></div>
              {a.title && <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{a.title}</p>}
              <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>{a.message}</p>
            </Card>
          ))}
        </>
      )}

      {/* Contact & Office section with Edit button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <Ic icon={Phone} size={16} color={theme.orange} />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: theme.textPrimary }}>Contact & Office</span>
        </div>
        <button onClick={() => { setContactForm({ email: data.email, phone: data.phone, officeHours: data.officeHours, officeLocation: data.officeLocation, schoolEmail: data.schoolEmail, schoolPhone: data.schoolPhone }); setEditingContact(true); }}
          style={{ background: theme.orange + "18", border: `1.5px solid ${theme.orange}33`, borderRadius: 9, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: theme.orange, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <Ic icon={Edit3} size={13} color={theme.orange} />Edit
        </button>
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Avatar initials={data.avatar} size={46} bg={theme.orangeDark} />
          <div>
            <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 14, color: theme.textPrimary }}>{data.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{data.department}</p>
          </div>
        </div>
        {[
          { icon: Mail, label: "Email", val: data.email, color: theme.orange },
          { icon: Phone, label: "Phone", val: data.phone, color: theme.blue },
          { icon: Clock, label: "Office Hours", val: data.officeHours, color: theme.green },
          { icon: MapPin, label: "Office", val: data.officeLocation, color: theme.red },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: "9px 0", borderTop: `1px solid ${theme.border}` }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: item.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ic icon={item.icon} size={14} color={item.color} />
            </div>
            <div>
              <p style={{ margin: "0 0 1px", fontSize: 10, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase" }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: 12, color: theme.textPrimary, fontWeight: 600 }}>{item.val}</p>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 12, background: theme.surfaceAlt, borderRadius: 10, padding: "12px" }}>
          <p style={{ margin: "0 0 7px", fontSize: 12, fontWeight: 800, color: theme.textPrimary, display: "flex", alignItems: "center", gap: 6 }}>
            <Ic icon={Building2} size={13} color={theme.orange} />School of Computing
          </p>
          {[{ icon: Mail, val: data.schoolEmail }, { icon: Phone, val: data.schoolPhone }].map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 5 }}>
              <Ic icon={item.icon} size={12} color={theme.textMuted} />
              <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary }}>{item.val}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Lecturer Modules
const MODULE_COLORS = ["#FF6B00", "#2B6CB0", "#E53E3E", "#00B86B", "#7B2FBE", "#D4A017", "#00A3A3", "#C05621"];
const LecturerModules = ({ data, quizzesDb, onPublishQuiz, moduleOptions, assessmentsDb, onAddModule }) => {
  const [selected, setSelected] = useState(null);
  const [buildingQuiz, setBuildingQuiz] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [regForm, setRegForm] = useState({
    code: "", name: "", description: "", students: "",
    color: MODULE_COLORS[0], quizEnabled: true,
    staffNumber: "", department: "", semester: "1", year: new Date().getFullYear().toString(),
  });

  if (buildingQuiz || editingQuiz) {
    const mc = buildingQuiz || editingQuiz.module;
    return <QuizBuilder moduleCode={mc} editQuiz={editingQuiz} onClose={() => { setBuildingQuiz(null); setEditingQuiz(null); }} onPublish={(q) => { onPublishQuiz({ id: editingQuiz?.id || `quiz_${Date.now()}`, ...q }); setBuildingQuiz(null); setEditingQuiz(null); }} />;
  }

  if (registering) {
    const canRegister = regForm.code.trim() && regForm.name.trim() && regForm.staffNumber.trim() && regForm.department.trim();
    return (
      <div style={{ padding: "0 16px 24px" }}>
        <BackButton onClick={() => setRegistering(false)} label="Cancel" />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Ic icon={BookCopy} size={17} color={theme.orange} />
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>Register Module</h3>
        </div>
        <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 18px" }}>Add a module you are registered to teach</p>

        {/* School credentials block */}
        <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <Ic icon={Building2} size={14} color={theme.orange} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>School Credentials</p>
          </div>
          <LecturerField label="Staff Number / Employee ID">
            <LecturerTextInput value={regForm.staffNumber} onChange={v => setRegForm(f => ({ ...f, staffNumber: v }))} placeholder="e.g. EMP-2019-0031" />
          </LecturerField>
          <LecturerField label="Department">
            <LecturerTextInput value={regForm.department} onChange={v => setRegForm(f => ({ ...f, department: v }))} placeholder="e.g. School of Computing" />
          </LecturerField>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <LecturerField label="Semester">
              <LecturerSelect value={regForm.semester} onChange={v => setRegForm(f => ({ ...f, semester: v }))}
                options={[{ value: "1", label: "Semester 1" }, { value: "2", label: "Semester 2" }, { value: "year", label: "Full Year" }]} placeholder="Semester..." />
            </LecturerField>
            <LecturerField label="Academic Year">
              <LecturerTextInput value={regForm.year} onChange={v => setRegForm(f => ({ ...f, year: v }))} placeholder="e.g. 2026" />
            </LecturerField>
          </div>
        </div>

        {/* Module info block */}
        <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "14px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <Ic icon={BookOpen} size={14} color={theme.orange} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>Module Details</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <LecturerField label="Module Code">
              <LecturerTextInput value={regForm.code} onChange={v => setRegForm(f => ({ ...f, code: v.toUpperCase() }))} placeholder="e.g. COS401" />
            </LecturerField>
            <LecturerField label="No. of Students">
              <LecturerTextInput value={regForm.students} onChange={v => setRegForm(f => ({ ...f, students: v }))} placeholder="e.g. 120" />
            </LecturerField>
          </div>
          <LecturerField label="Module Name">
            <LecturerTextInput value={regForm.name} onChange={v => setRegForm(f => ({ ...f, name: v }))} placeholder="e.g. Advanced Algorithms" />
          </LecturerField>
          <LecturerField label="Module Description">
            <LecturerTextArea value={regForm.description} onChange={v => setRegForm(f => ({ ...f, description: v }))} placeholder="Brief overview of what this module covers..." rows={3} />
          </LecturerField>
        </div>

        {/* Colour picker */}
        <LecturerField label="Module Colour">
          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
            {MODULE_COLORS.map(c => (
              <div key={c} onClick={() => setRegForm(f => ({ ...f, color: c }))}
                style={{ width: 32, height: 32, borderRadius: 10, background: c, cursor: "pointer", border: regForm.color === c ? `3px solid ${theme.textPrimary}` : "3px solid transparent", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {regForm.color === c && <Ic icon={CheckCircle} size={16} color="#fff" />}
              </div>
            ))}
          </div>
        </LecturerField>

        {/* Quiz toggle */}
        <div style={{ background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Ic icon={Brain} size={14} color={regForm.quizEnabled ? theme.green : theme.textMuted} />
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>Enable Quizzes</p>
                <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>Allow quiz creation for this module</p>
              </div>
            </div>
            <div onClick={() => setRegForm(f => ({ ...f, quizEnabled: !f.quizEnabled }))}
              style={{ width: 42, height: 23, borderRadius: 12, background: regForm.quizEnabled ? theme.green : theme.border, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
              <div style={{ width: 17, height: 17, borderRadius: 9, background: "#fff", position: "absolute", top: 3, left: regForm.quizEnabled ? 22 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
            </div>
          </div>
        </div>

        <button onClick={() => {
          if (!canRegister) return;
          onAddModule({
            id: Date.now(), code: regForm.code, name: regForm.name,
            description: regForm.description || `${regForm.name} — taught by ${data.name}`,
            students: parseInt(regForm.students) || 0, color: regForm.color,
            quizEnabled: regForm.quizEnabled, semester: regForm.semester, year: regForm.year,
          });
          setRegForm({ code: "", name: "", description: "", students: "", color: MODULE_COLORS[0], quizEnabled: true, staffNumber: "", department: "", semester: "1", year: new Date().getFullYear().toString() });
          setRegistering(false);
        }} disabled={!canRegister}
          style={{ width: "100%", background: canRegister ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: canRegister ? "pointer" : "not-allowed", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Ic icon={BookmarkCheck} size={15} color="#fff" />Register Module
        </button>
      </div>
    );
  }

  if (selected) {
    const moduleQuizzes = Object.values(quizzesDb).filter(q => q.module === selected.code);
    const moduleAssessments = assessmentsDb.filter(a => a.module === selected.code);
    return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => setSelected(null)} label="Back to Modules" />
        <div style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}BB)`, borderRadius: 20, padding: "20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 2px", fontFamily: "'Sora', sans-serif" }}>{selected.code}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, margin: "0 0 10px" }}>{selected.name}</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 9, padding: "5px 10px" }}><p style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, margin: "0 0 1px" }}>Students</p><p style={{ color: "#fff", fontSize: 11, fontWeight: 700, margin: 0 }}>{selected.students}</p></div>
            {selected.semester && <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 9, padding: "5px 10px" }}><p style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, margin: "0 0 1px" }}>Semester</p><p style={{ color: "#fff", fontSize: 11, fontWeight: 700, margin: 0 }}>{selected.semester === "year" ? "Full Year" : `Sem ${selected.semester}`} {selected.year || ""}</p></div>}
          </div>
        </div>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}><Ic icon={Info} size={14} color={theme.orange} /><p style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary, margin: 0 }}>About</p></div>
          <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary, lineHeight: 1.7 }}>{selected.description}</p>
        </Card>
        <div style={{ marginBottom: 14 }}>
          <SectionHeader title="Quizzes" icon={Brain} />
          <button onClick={() => setBuildingQuiz(selected.code)}
            style={{ width: "100%", background: theme.green + "15", border: `1.5px solid ${theme.green}44`, borderRadius: 11, padding: "11px", fontSize: 13, fontWeight: 700, color: theme.green, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 9 }}>
            <Ic icon={Plus} size={14} color={theme.green} />Create New Quiz
          </button>
          {moduleQuizzes.length === 0 && <p style={{ fontSize: 12, color: theme.textMuted, textAlign: "center", padding: "10px 0" }}>No quizzes yet for this module</p>}
          {moduleQuizzes.map(q => (
            <Card key={q.id} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
                    <Badge color={theme.green}>Live</Badge>
                    {q.locked && <Badge color={theme.darkRed}><Ic icon={Lock} size={9} color={theme.darkRed} />Locked</Badge>}
                  </div>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{q.title}</p>
                  <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{q.questions.length} questions</p>
                </div>
                <button onClick={() => setEditingQuiz(q)} style={{ background: theme.orange + "18", border: `1.5px solid ${theme.orange}33`, borderRadius: 9, padding: "6px 10px", fontSize: 11, fontWeight: 700, color: theme.orange, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <Ic icon={Edit3} size={12} color={theme.orange} />Edit
                </button>
              </div>
            </Card>
          ))}
        </div>
        {moduleAssessments.length > 0 && (
          <>
            <SectionHeader title="Assessments & Exams" icon={ClipboardList} />
            {moduleAssessments.map(a => (
              <Card key={a.id} style={{ marginBottom: 9, borderLeft: `4px solid ${a.locked ? theme.darkRed : theme.orange}` }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
                  <Badge color={theme.orange}>{a.type}</Badge>
                  {a.locked && <Badge color={theme.darkRed}><Ic icon={Lock} size={9} color={theme.darkRed} />Locked</Badge>}
                </div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>Due: {new Date(a.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} · {a.weight}</p>
              </Card>
            ))}
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <button onClick={() => setRegistering(true)}
        style={{ width: "100%", background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: "#fff", border: "none", borderRadius: 13, padding: "13px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "inherit", marginBottom: 16, boxShadow: `0 4px 16px ${theme.shadow}` }}>
        <Ic icon={Plus} size={16} color="#fff" />Register New Module
      </button>
      {data.modules.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 0", color: theme.textMuted }}>
          <Ic icon={BookCopy} size={36} color={theme.border} />
          <p style={{ fontWeight: 700, marginTop: 8 }}>No modules registered yet</p>
          <p style={{ fontSize: 12, margin: "4px 0 0" }}>Tap the button above to register your first module</p>
        </div>
      )}
      {data.modules.map(m => (
        <Card key={m.id} onClick={() => setSelected(m)} style={{ marginBottom: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>{m.code.slice(0, 3)}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 1px", fontWeight: 800, fontSize: 13, color: theme.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.code} — {m.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Ic icon={Users} size={10} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{m.students} students{m.semester ? ` · Sem ${m.semester === "year" ? "Full Year" : m.semester} ${m.year || ""}` : ""}</p></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
              {m.quizEnabled && <Badge color={theme.green}><Ic icon={Brain} size={9} color={theme.green} />Quizzes</Badge>}
              <Ic icon={ChevronRight} size={15} color={theme.border} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Lecturer Assessments
const LecturerAssessments = ({ data, assessmentsDb, moduleOptions, onAdd, onEdit, onDelete, quizzesDb, onPublishQuiz }) => {
  const [view, setView] = useState("list"); // list | add | edit
  const [editItem, setEditItem] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const moduleColors = {};
  data.modules.forEach(m => { moduleColors[m.code] = m.color; });
  const grouped = {};
  assessmentsDb.forEach(a => { if (!grouped[a.module]) grouped[a.module] = []; grouped[a.module].push(a); });

  if (view === "add" || view === "edit") return (
    <AssessmentForm moduleOptions={moduleOptions} onBack={() => { setView("list"); setEditItem(null); }} editItem={editItem}
      onSave={(item) => { if (editItem) onEdit(item); else onAdd(item); setView("list"); setEditItem(null); }} />
  );

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        <button onClick={() => { setEditItem(null); setView("add"); }}
          style={{ background: theme.orange, border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
          <Ic icon={FolderPlus} size={16} color="#fff" />New Assessment
        </button>
        <button onClick={() => { setEditItem({ type: "Exam" }); setView("add"); }}
          style={{ background: theme.darkRed, border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
          <Ic icon={ShieldCheck} size={16} color="#fff" />Schedule Exam
        </button>
      </div>

      {confirmDelete && (
        <div style={{ background: theme.red + "10", border: `1.5px solid ${theme.red}33`, borderRadius: 14, padding: "14px", marginBottom: 14 }}>
          <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>Delete "{confirmDelete.title}"?</p>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: theme.textMuted }}>This will remove it from the student view. This cannot be undone.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { onDelete(confirmDelete.id); setConfirmDelete(null); }}
              style={{ flex: 1, background: theme.red, border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Ic icon={Trash2} size={13} color="#fff" />Delete
            </button>
            <button onClick={() => setConfirmDelete(null)}
              style={{ flex: 1, background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 10, padding: "10px", color: theme.textMuted, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {Object.keys(grouped).length === 0 && <div style={{ textAlign: "center", padding: "36px 0", color: theme.textMuted }}><Ic icon={FolderPlus} size={36} color={theme.border} /><p style={{ fontWeight: 700, marginTop: 8 }}>No assessments yet</p></div>}

      {Object.entries(grouped).map(([moduleCode, items]) => {
        const modColor = moduleColors[moduleCode] || theme.orange;
        const mod = data.modules.find(m => m.code === moduleCode);
        const isCollapsed = collapsed[moduleCode];
        return (
          <div key={moduleCode} style={{ marginBottom: 16 }}>
            <div onClick={() => setCollapsed(p => ({ ...p, [moduleCode]: !p[moduleCode] }))} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9, cursor: "pointer", userSelect: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: modColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontWeight: 800, fontSize: 10 }}>{moduleCode.slice(0, 3)}</span></div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 13, color: theme.textPrimary }}>{moduleCode}</p>
                {mod && <p style={{ margin: 0, fontSize: 10, color: theme.textMuted }}>{mod.name}</p>}
              </div>
              <Badge color={modColor}>{items.length}</Badge>
              <Ic icon={isCollapsed ? ChevronDown : ChevronUp} size={14} color={theme.textMuted} />
            </div>
            {!isCollapsed && items.map(a => (
              <Card key={a.id} style={{ marginBottom: 9, marginLeft: 6, borderLeft: `4px solid ${a.type === "Exam" ? theme.darkRed : theme.orange}` }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                  <Badge color={a.type === "Exam" ? theme.darkRed : theme.orange}>{a.type}</Badge>
                  {a.locked && <Badge color={theme.purple}><Ic icon={Lock} size={9} color={theme.purple} />Locked</Badge>}
                </div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{a.title}</p>
                <p style={{ margin: "0 0 9px", fontSize: 11, color: theme.textMuted }}>Due: {new Date(a.due).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} · Weight: {a.weight}</p>
                <div style={{ display: "flex", gap: 7, paddingTop: 9, borderTop: `1px solid ${theme.border}` }}>
                  <button onClick={() => { setEditItem(a); setView("edit"); }}
                    style={{ flex: 1, background: theme.orange + "15", border: `1.5px solid ${theme.orange}33`, borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 700, color: theme.orange, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Ic icon={Edit3} size={13} color={theme.orange} />Edit
                  </button>
                  <button onClick={() => setConfirmDelete(a)}
                    style={{ flex: 1, background: theme.red + "15", border: `1.5px solid ${theme.red}33`, borderRadius: 9, padding: "8px", fontSize: 12, fontWeight: 700, color: theme.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Ic icon={Trash2} size={13} color={theme.red} />Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// Lecturer Classes
const LecturerClasses = ({ data, scheduledClasses, moduleOptions, onAdd }) => {
  const [form, setForm] = useState({ module: "", title: "", date: "", time: "", duration: "60", teamsLink: "", recurring: "no" });
  const [adding, setAdding] = useState(false);
  const valid = form.module && form.title && form.date && form.time;
  const upcoming = scheduledClasses.filter(c => new Date(`${c.date}T${c.time}`) >= new Date()).sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  const past = scheduledClasses.filter(c => new Date(`${c.date}T${c.time}`) < new Date()).sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

  if (adding) return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={() => setAdding(false)} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><Ic icon={CalendarCheck} size={17} color={theme.orange} /><h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>Schedule a Class</h3></div>
      <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 16px" }}>Students will see this on the home page and in their module</p>
      <LecturerField label="Module"><LecturerSelect value={form.module} onChange={v => setForm(f => ({ ...f, module: v }))} options={moduleOptions} placeholder="Select module..." /></LecturerField>
      <LecturerField label="Class Title"><LecturerTextInput value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Lecture — Design Patterns" /></LecturerField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 12 }}>
        {[{ label: "Date", field: "date", type: "date" }, { label: "Time", field: "time", type: "time" }].map(({ label, field, type }) => (
          <div key={field}>
            <label style={{ fontSize: 11, fontWeight: 700, color: theme.textSecondary, display: "block", marginBottom: 5, textTransform: "uppercase" }}>{label}</label>
            <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 9px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = theme.orange} onBlur={e => e.target.style.borderColor = theme.border} />
          </div>
        ))}
      </div>
      <LecturerField label="Duration">
        <LecturerSelect value={form.duration} onChange={v => setForm(f => ({ ...f, duration: v }))} options={[{ value: "45", label: "45 minutes" }, { value: "60", label: "1 hour" }, { value: "90", label: "1.5 hours" }, { value: "120", label: "2 hours" }]} placeholder="Select duration..." />
      </LecturerField>
      <LecturerField label="Recurring">
        <LecturerSelect value={form.recurring} onChange={v => setForm(f => ({ ...f, recurring: v }))} options={[{ value: "no", label: "Once only" }, { value: "weekly", label: "Weekly" }, { value: "biweekly", label: "Every 2 weeks" }]} placeholder="Recurrence..." />
      </LecturerField>
      <LecturerField label="Microsoft Teams Link (optional)">
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic icon={Link2} size={14} color={theme.textMuted} /></div>
          <input type="url" value={form.teamsLink} onChange={e => setForm(f => ({ ...f, teamsLink: e.target.value }))} placeholder="https://teams.microsoft.com/l/meetup-join/..."
            style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px 10px 34px", fontSize: 13, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            onFocus={e => e.target.style.borderColor = theme.purple} onBlur={e => e.target.style.borderColor = theme.border} />
        </div>
      </LecturerField>
      <button onClick={() => { if (valid) { onAdd(form); setForm({ module: "", title: "", date: "", time: "", duration: "60", teamsLink: "", recurring: "no" }); setAdding(false); } }} disabled={!valid}
        style={{ width: "100%", background: valid ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: valid ? "pointer" : "not-allowed", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={CalendarCheck} size={15} color="#fff" />Schedule Class
      </button>
    </div>
  );

  const ClassCard = ({ cls }) => {
    const mod = data.modules.find(m => m.code === cls.module);
    const modColor = mod?.color || theme.orange;
    const clsDate = new Date(`${cls.date}T${cls.time}`);
    const isToday = clsDate.toDateString() === new Date().toDateString();
    return (
      <Card style={{ marginBottom: 9, borderLeft: `4px solid ${cls.teamsLink ? theme.purple : modColor}` }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
          <Badge color={modColor}>{cls.module}</Badge>
          {isToday && <Badge color={theme.orange}>Today</Badge>}
          {cls.recurring !== "no" && <Badge color={theme.textMuted}><Ic icon={Repeat} size={9} color={theme.textMuted} />{cls.recurring}</Badge>}
          {cls.teamsLink && <Badge color={theme.purple}><Ic icon={Video} size={9} color={theme.purple} />Teams</Badge>}
        </div>
        <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 12, color: theme.textPrimary }}>{cls.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Ic icon={Clock} size={11} color={theme.textMuted} /><p style={{ margin: 0, fontSize: 11, color: theme.textMuted }}>{clsDate.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })} · {cls.time} · {cls.duration}min</p></div>
        {cls.teamsLink && <a href={cls.teamsLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, background: theme.purple + "15", border: `1.5px solid ${theme.purple}33`, borderRadius: 9, padding: "7px 10px", textDecoration: "none", marginTop: 9 }}><Ic icon={Video} size={12} color={theme.purple} /><span style={{ fontSize: 11, fontWeight: 700, color: theme.purple }}>Join on Teams</span><Ic icon={ArrowRight} size={10} color={theme.purple} style={{ marginLeft: "auto" }} /></a>}
      </Card>
    );
  };

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <button onClick={() => setAdding(true)} style={{ width: "100%", background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: "#fff", border: "none", borderRadius: 13, padding: "13px", fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, fontFamily: "inherit", marginBottom: 16 }}>
        <Ic icon={Plus} size={16} color="#fff" />Schedule New Class
      </button>
      {upcoming.length > 0 && <><SectionHeader title="Upcoming" icon={CalendarCheck} />{upcoming.map(c => <ClassCard key={c.id} cls={c} />)}</>}
      {past.length > 0 && <><SectionHeader title="Past Classes" icon={Clock} />{past.map(c => <ClassCard key={c.id} cls={c} />)}</>}
      {scheduledClasses.length === 0 && <div style={{ textAlign: "center", padding: "36px 0", color: theme.textMuted }}><Ic icon={Calendar} size={36} color={theme.border} /><p style={{ fontWeight: 700, marginTop: 8 }}>No classes scheduled yet</p></div>}
    </div>
  );
};

// Lecturer Announcements
const LecturerAnnouncements = ({ data, announcementsDb, forumsDb, moduleOptions, onAdd, onAddForumPost, threadReplies }) => {
  const [view, setView] = useState("list"); // list | announcement | forum | thread
  const [selectedThread, setSelectedThread] = useState(null);
  const [annForm, setAnnForm] = useState({ module: "", title: "", message: "" });
  const [forumForm, setForumForm] = useState({ module: "", topic: "", content: "", links: [""] });
  const lecturerAnnouncements = announcementsDb.filter(a => a.isLecturer);
  const lecturerForumPosts = (forumsDb || []).filter(f => f.isLecturer);

  // Thread detail view — lecturer reads student replies
  if (view === "thread" && selectedThread) {
    const replies = threadReplies?.[selectedThread.id] || [];
    const mod = null; // colour from thread module
    const modColor = theme.blue;
    return (
      <div style={{ padding: "0 16px 16px" }}>
        <BackButton onClick={() => { setView("list"); setSelectedThread(null); }} label="Back to Updates" />
        {/* Thread header */}
        <div style={{ background: `linear-gradient(135deg, ${theme.blue}, #1A4A80)`, borderRadius: 18, padding: "16px 18px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -14, right: -14, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
            <Badge color="#fff">{selectedThread.module}</Badge>
            <Badge color="#fff">Forum Thread</Badge>
          </div>
          <h3 style={{ fontFamily: "'Sora', sans-serif", color: "#fff", fontSize: 15, fontWeight: 800, margin: "0 0 4px" }}>{selectedThread.topic}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Ic icon={MessageSquare} size={11} color="rgba(255,255,255,0.7)" />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: 0 }}>{1 + replies.length} post{1 + replies.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Opening post (lecturer) */}
        <Card style={{ marginBottom: 10, borderLeft: `4px solid ${theme.orange}` }}>
          <div style={{ display: "flex", gap: 9 }}>
            <Avatar initials={data.avatar} size={36} bg={theme.orange} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{data.name}</span>
                <Badge color={theme.orange}>Lecturer</Badge>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Ic icon={Clock} size={10} color={theme.textMuted} />
                  <span style={{ fontSize: 10, color: theme.textMuted }}>{selectedThread.lastPost}</span>
                </div>
              </div>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: theme.textSecondary, lineHeight: 1.6 }}>{selectedThread.openingPost?.text}</p>
              {selectedThread.openingPost?.links?.filter(l => l.trim()).map((link, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, background: theme.blue + "12", border: `1.5px solid ${theme.blue}33`, borderRadius: 8, padding: "6px 10px", textDecoration: "none", marginBottom: 5 }}>
                  <Ic icon={Link2} size={11} color={theme.blue} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: theme.blue, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</span>
                  <Ic icon={ArrowRight} size={10} color={theme.blue} />
                </a>
              ))}
            </div>
          </div>
        </Card>

        {/* Student replies */}
        {replies.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: theme.textMuted }}>
            <Ic icon={MessageSquare} size={28} color={theme.border} />
            <p style={{ fontWeight: 600, fontSize: 13, marginTop: 7 }}>No student replies yet</p>
            <p style={{ fontSize: 11, marginTop: 3, color: theme.textMuted }}>Students can reply from their Forums tab</p>
          </div>
        ) : (
          replies.map((reply, i) => (
            <Card key={reply.id || i} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", gap: 9 }}>
                <Avatar initials={(reply.author || reply.user || "S").split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()} size={34} bg={theme.blue} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 3, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{reply.author || reply.user || "Student"}</span>
                      {reply.studentId && (
                        <span style={{ fontSize: 10, color: theme.textMuted, marginLeft: 6, fontWeight: 600 }}>· {reply.studentId}</span>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <Ic icon={Clock} size={10} color={theme.textMuted} />
                      <span style={{ fontSize: 10, color: theme.textMuted }}>{reply.time || "Just now"}</span>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>{reply.text}</p>
                  {reply.links?.filter(l => l?.trim()).map((link, li) => (
                    <a key={li} href={link} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 6, background: theme.blue + "12", border: `1.5px solid ${theme.blue}33`, borderRadius: 8, padding: "6px 10px", textDecoration: "none", marginBottom: 5 }}>
                      <Ic icon={Link2} size={11} color={theme.blue} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: theme.blue, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link}</span>
                    </a>
                  ))}
                  {reply.attachments?.map((att, ai) => (
                    <div key={ai} style={{ display: "flex", alignItems: "center", gap: 7, background: theme.surfaceAlt, border: `1.5px solid ${theme.border}`, borderRadius: 8, padding: "6px 10px", marginBottom: 5 }}>
                      <Ic icon={Paperclip} size={12} color={theme.textMuted} />
                      <span style={{ fontSize: 11, color: theme.textSecondary, flex: 1 }}>{att.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    );
  }

  // Announcement form
  if (view === "announcement") return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={() => setView("list")} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Ic icon={Megaphone} size={17} color={theme.orange} />
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>New Announcement</h3>
      </div>
      <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 16px" }}>Appears in the student Updates tab</p>
      <LecturerField label="Module"><LecturerSelect value={annForm.module} onChange={v => setAnnForm(f => ({ ...f, module: v }))} options={[...moduleOptions, { value: "ALL", label: "All Modules" }]} placeholder="Select module..." /></LecturerField>
      <LecturerField label="Title"><LecturerTextInput value={annForm.title} onChange={v => setAnnForm(f => ({ ...f, title: v }))} placeholder="e.g. Test 2 Reminder" /></LecturerField>
      <LecturerField label="Message"><LecturerTextArea value={annForm.message} onChange={v => setAnnForm(f => ({ ...f, message: v }))} placeholder="Type your message to students..." /></LecturerField>
      <button onClick={() => {
        if (!annForm.message.trim() || !annForm.module) return;
        onAdd({ ...annForm, id: Date.now(), from: data.name, time: "Just now", read: false, isLecturer: true });
        setAnnForm({ module: "", title: "", message: "" }); setView("list");
      }} disabled={!annForm.message.trim() || !annForm.module}
        style={{ width: "100%", background: annForm.message.trim() && annForm.module ? `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})` : theme.border, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={Send} size={15} color="#fff" />Send to Students
      </button>
    </div>
  );

  // Forum post form
  if (view === "forum") return (
    <div style={{ padding: "0 16px 24px" }}>
      <BackButton onClick={() => setView("list")} label="Cancel" />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Ic icon={MessageSquare} size={17} color={theme.blue} />
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 800, color: theme.textPrimary, margin: 0 }}>Post to Forum</h3>
      </div>
      <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 16px" }}>This will appear in the student Forums tab under the selected module</p>
      <LecturerField label="Module">
        <LecturerSelect value={forumForm.module} onChange={v => setForumForm(f => ({ ...f, module: v }))} options={moduleOptions} placeholder="Select module..." />
      </LecturerField>
      <LecturerField label="Thread Topic / Title">
        <LecturerTextInput value={forumForm.topic} onChange={v => setForumForm(f => ({ ...f, topic: v }))} placeholder="e.g. Important: Phase 2 Submission Notes" />
      </LecturerField>
      <LecturerField label="Post Content">
        <LecturerTextArea value={forumForm.content} onChange={v => setForumForm(f => ({ ...f, content: v }))} placeholder="Write your message to students..." rows={5} />
      </LecturerField>
      <LecturerField label="Attach Links (optional)">
        {forumForm.links.map((link, i) => (
          <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
                <Ic icon={Link2} size={13} color={theme.textMuted} />
              </div>
              <input value={link} onChange={e => {
                const updated = [...forumForm.links];
                updated[i] = e.target.value;
                setForumForm(f => ({ ...f, links: updated }));
              }} placeholder="https://..."
                style={{ width: "100%", border: `1.5px solid ${theme.border}`, borderRadius: 11, padding: "10px 12px 10px 32px", fontSize: 12, background: theme.offWhite, color: theme.textPrimary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = theme.blue} onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
            {forumForm.links.length > 1 && (
              <button onClick={() => setForumForm(f => ({ ...f, links: f.links.filter((_, idx) => idx !== i) }))}
                style={{ background: theme.red + "18", border: `1.5px solid ${theme.red}33`, borderRadius: 9, padding: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Ic icon={Trash2} size={13} color={theme.red} />
              </button>
            )}
          </div>
        ))}
        <button onClick={() => setForumForm(f => ({ ...f, links: [...f.links, ""] }))}
          style={{ background: "transparent", border: `1.5px dashed ${theme.blue}`, borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 700, color: theme.blue, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <Ic icon={Plus} size={13} color={theme.blue} />Add another link
        </button>
      </LecturerField>
      <div style={{ background: theme.blue + "12", border: `1.5px solid ${theme.blue}33`, borderRadius: 11, padding: "11px 13px", marginBottom: 16, display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Ic icon={Info} size={14} color={theme.blue} style={{ marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: 12, color: theme.blue, lineHeight: 1.6 }}>This creates a new forum thread. Students can reply directly in the thread.</p>
      </div>
      <button onClick={() => {
        if (!forumForm.module || !forumForm.topic.trim() || !forumForm.content.trim()) return;
        const validLinks = forumForm.links.filter(l => l.trim());
        onAddForumPost({
          id: Date.now(), module: forumForm.module, topic: forumForm.topic,
          posts: 1, lastPost: "Just now", pinned: false, isLecturer: true,
          openingPost: { user: data.name, avatar: data.avatar, time: "Just now", text: forumForm.content, links: validLinks, isLecturer: true },
        });
        setForumForm({ module: "", topic: "", content: "", links: [""] }); setView("list");
      }} disabled={!forumForm.module || !forumForm.topic.trim() || !forumForm.content.trim()}
        style={{ width: "100%", background: forumForm.module && forumForm.topic.trim() && forumForm.content.trim() ? `linear-gradient(135deg, ${theme.blue}, #1A4A80)` : theme.border, color: "#fff", border: "none", borderRadius: 13, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "'Sora', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
        <Ic icon={MessageSquare} size={15} color="#fff" />Post to Forum
      </button>
    </div>
  );

  return (
    <div style={{ padding: "0 16px 16px" }}>
      {/* Two action buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
        <button onClick={() => setView("announcement")}
          style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: "#fff", border: "none", borderRadius: 13, padding: "13px 10px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "inherit", boxShadow: `0 4px 14px ${theme.shadow}` }}>
          <Ic icon={Megaphone} size={20} color="#fff" />Post Announcement
        </button>
        <button onClick={() => setView("forum")}
          style={{ background: `linear-gradient(135deg, ${theme.blue}, #1A4A80)`, color: "#fff", border: "none", borderRadius: 13, padding: "13px 10px", fontSize: 12, fontWeight: 800, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "inherit", boxShadow: "0 4px 14px rgba(43,108,176,0.25)" }}>
          <Ic icon={MessageSquare} size={20} color="#fff" />Post to Forum
        </button>
      </div>

      {/* Sent announcements */}
      {lecturerAnnouncements.length === 0 && lecturerForumPosts.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 0", color: theme.textMuted }}>
          <Ic icon={Megaphone} size={36} color={theme.border} />
          <p style={{ fontWeight: 700, marginTop: 8 }}>Nothing sent yet</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Use the buttons above to post an announcement or a forum thread</p>
        </div>
      )}

      {lecturerAnnouncements.length > 0 && (
        <>
          <SectionHeader title="Announcements Sent" icon={Megaphone} />
          {lecturerAnnouncements.map(a => (
            <Card key={a.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <Badge color={theme.orange}>{a.module}</Badge>
                  <Badge color={theme.orange}>Announcement</Badge>
                </div>
                <span style={{ fontSize: 10, color: theme.textMuted }}>{a.time}</span>
              </div>
              {a.title && <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{a.title}</p>}
              <p style={{ margin: 0, fontSize: 12, color: theme.textSecondary, lineHeight: 1.6 }}>{a.message}</p>
            </Card>
          ))}
        </>
      )}

      {lecturerForumPosts.length > 0 && (
        <>
          <SectionHeader title="Forum Posts" icon={MessageSquare} />
          {lecturerForumPosts.map(f => {
            const replyCount = (threadReplies?.[f.id] || []).length;
            return (
              <Card key={f.id} onClick={() => { setSelectedThread(f); setView("thread"); }} style={{ marginBottom: 10, borderLeft: `4px solid ${theme.blue}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 5, marginBottom: 5 }}>
                      <Badge color={theme.blue}>{f.module}</Badge>
                      <Badge color={theme.blue}>Forum Thread</Badge>
                      {replyCount > 0 && <Badge color={theme.green}>{replyCount} repl{replyCount !== 1 ? "ies" : "y"}</Badge>}
                    </div>
                    <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 13, color: theme.textPrimary }}>{f.topic}</p>
                    {f.openingPost?.text && (
                      <p style={{ margin: "0 0 6px", fontSize: 12, color: theme.textSecondary, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{f.openingPost.text}</p>
                    )}
                    {f.openingPost?.links?.filter(l => l.trim()).length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {f.openingPost.links.filter(l => l.trim()).map((l, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, background: theme.blue + "12", borderRadius: 7, padding: "3px 8px" }}>
                            <Ic icon={Link2} size={10} color={theme.blue} />
                            <span style={{ fontSize: 10, color: theme.blue, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Ic icon={ChevronRight} size={15} color={theme.border} style={{ marginLeft: 8, flexShrink: 0 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7, paddingTop: 7, borderTop: `1px solid ${theme.border}` }}>
                  <Ic icon={MessageSquare} size={11} color={theme.textMuted} />
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{1 + replyCount} post{1 + replyCount !== 1 ? "s" : ""} · {f.lastPost} · tap to view replies</span>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};


// ─── MAIN APP ────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const scrollRef = useRef(null);

  const [quizzesDb, setQuizzesDb] = useState(INITIAL_QUIZZES);
  const [scheduledClasses, setScheduledClasses] = useState(INITIAL_CLASSES);
  const [assessmentsDb, setAssessmentsDb] = useState(BASE_ASSESSMENTS);
  const [announcementsDb, setAnnouncementsDb] = useState(BASE_ANNOUNCEMENTS);
  const [forumsDb, setForumsDb] = useState(BASE_FORUMS);
  const [threadReplies, setThreadReplies] = useState({}); // keyed by forum thread id
  const [lecturerModules, setLecturerModules] = useState(LECTURER_DATA.modules);
  const [moduleDeepLink, setModuleDeepLink] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    email: LECTURER_DATA.email,
    phone: LECTURER_DATA.phone,
    officeHours: LECTURER_DATA.officeHours,
    officeLocation: LECTURER_DATA.officeLocation,
    schoolEmail: LECTURER_DATA.schoolEmail,
    schoolPhone: LECTURER_DATA.schoolPhone,
  });

  const publishQuiz = (q) => setQuizzesDb(prev => ({ ...prev, [q.id]: q }));
  const addClass = (cls) => setScheduledClasses(p => [{ ...cls, id: Date.now() }, ...p]);
  const addAssessment = (a) => setAssessmentsDb(p => [{ ...a, id: Date.now() }, ...p]);
  const editAssessment = (updated) => setAssessmentsDb(p => p.map(a => a.id === updated.id ? updated : a));
  const deleteAssessment = (id) => setAssessmentsDb(p => p.filter(a => a.id !== id));
  const addAnnouncement = (a) => setAnnouncementsDb(p => [a, ...p]);
  const addReply = (threadId, reply) => setThreadReplies(prev => ({
    ...prev,
    [threadId]: [...(prev[threadId] || []), { ...reply, id: Date.now() }],
  }));
  const addForumPost = (post) => setForumsDb(p => [post, ...p]);
  const addModule = (m) => {
    setLecturerModules(p => [...p, m]);
    // Also add to student modules so they can see the new module
    BASE_STUDENT_MODULES.push({
      id: m.id, code: m.code, name: m.name, lecturer: LECTURER_DATA.name,
      lecturerEmail: LECTURER_DATA.email, lecturerOffice: LECTURER_DATA.officeLocation,
      credits: 16, color: m.color, progress: 0, nextClass: "TBC", quizEnabled: m.quizEnabled,
      description: m.description, resources: [],
    });
  };

  const navigateTo = (tab, moduleTarget = null) => {
    setModuleDeepLink(tab === "modules" ? moduleTarget : null);
    setActiveTab(tab);
    scrollRef.current?.scrollTo(0, 0);
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  if (!role) return <LoginScreen onLogin={(r) => { setRole(r); setActiveTab(r === "student" ? "home" : "home"); }} />;

  const studentTabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "modules", icon: BookOpen, label: "Modules" },
    { id: "assessments", icon: ClipboardList, label: "Tests" },
    { id: "announcements", icon: Megaphone, label: "Updates" },
    { id: "forums", icon: MessageSquare, label: "Forums" },
  ];
  const screenTitles = { home: role === "lecturer" ? "Dashboard" : "Overview", modules: "My Modules", assessments: "Assessments", announcements: "Announcements", forums: "Forums" };

  const studentData = {
    name: "Lerato Dlamini", id: "STU2024-0482", course: "BSc Computer Science", year: "3rd Year", avatar: "LD",
    modules: BASE_STUDENT_MODULES,
    assessments: assessmentsDb,
    announcements: announcementsDb,
    forums: forumsDb,
  };

  const renderStudent = () => {
    switch (activeTab) {
      case "home": return <HomeScreen data={studentData} onNavigate={navigateTo} scheduledClasses={scheduledClasses} />;
      case "modules": return <ModulesScreen data={studentData} quizzesDb={quizzesDb} initialModule={moduleDeepLink} scheduledClasses={scheduledClasses} assessmentsDb={assessmentsDb} />;
      case "assessments": return <AssessmentsScreen data={studentData} quizzesDb={quizzesDb} />;
      case "announcements": return <AnnouncementsScreen data={studentData} />;
      case "forums": return <ForumsScreen data={studentData} threadReplies={threadReplies} onAddReply={addReply} />;
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: theme.offWhite, height: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column", position: "relative", boxShadow: "0 0 60px rgba(0,0,0,0.15)", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, padding: "15px 18px 13px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: `0 4px 20px ${theme.shadow}`, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 19, fontWeight: 800, margin: 0, color: "#fff" }}>{screenTitles[activeTab] || "Unisa myModules"}</h1>
          {role === "student" && <p style={{ margin: "1px 0 0", fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{studentData.id}</p>}
          {role === "lecturer" && <p style={{ margin: "1px 0 0", fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{LECTURER_DATA.id}</p>}
        </div>
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <button onClick={() => { setRole(null); setActiveTab("home"); }}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 9, padding: "6px 11px", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <Ic icon={LogOut} size={12} color="#fff" />Sign Out
          </button>
          <Avatar initials={role === "student" ? studentData.avatar : LECTURER_DATA.avatar} size={34} bg="rgba(255,255,255,0.25)" />
        </div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: 14, paddingBottom: 20, WebkitOverflowScrolling: "touch" }}>
        {role === "student"
          ? renderStudent()
          : <LecturerDashboard
              data={{ ...LECTURER_DATA, modules: lecturerModules, ...contactInfo }}
              quizzesDb={quizzesDb}
              onPublishQuiz={publishQuiz}
              scheduledClasses={scheduledClasses}
              onAddClass={addClass}
              onAddAssessment={addAssessment}
              onEditAssessment={editAssessment}
              onDeleteAssessment={deleteAssessment}
              assessmentsDb={assessmentsDb}
              announcementsDb={announcementsDb}
              onAddAnnouncement={addAnnouncement}
              forumsDb={forumsDb}
              onAddForumPost={addForumPost}
              onAddModule={addModule}
              onUpdateContact={setContactInfo}
              threadReplies={threadReplies}
            />
        }
      </div>

      {role === "student" && (
        <div style={{ flexShrink: 0, background: theme.white, borderTop: `1.5px solid ${theme.border}`, display: "flex", padding: "10px 0 14px", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100 }}>
          {studentTabs.map(t => (
            <button key={t.id} onClick={() => navigateTo(t.id)}
              style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 0" }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: activeTab === t.id ? theme.orange + "18" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                <Ic icon={t.icon} size={22} color={activeTab === t.id ? theme.orange : theme.textMuted} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: activeTab === t.id ? theme.orange : theme.textMuted }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
