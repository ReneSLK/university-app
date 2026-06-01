# Unisa myModules

---

## Features

### Student Portal
- **Home Dashboard** — Personalised welcome screen with urgent assessment alerts, overdue notices, upcoming classes with Teams join links, and recent announcements
- **My Modules** — View all enrolled modules with descriptions, progress tracking, lecturer contact details, resources, scheduled classes, and available quizzes
- **Assessments & Tests** — Assessments grouped by module with live status computed from the device clock (Upcoming, Urgent, Overdue, Locked, Completed). Locked exams reveal details only on the release date
- **Updates** — Announcements from lecturers with expandable text for long messages
- **Forums** — Module-grouped discussion threads. Students can reply with text, links, and file attachments. Lecturer-posted threads are clearly labelled

### Lecturer Portal
- **Home Dashboard** — Overview stats, upcoming classes, recently sent announcements, and editable contact details (personal and School of Computing)
- **Modules** — Click into any module to view its description, manage quizzes, and see all associated assessments. Register new modules with school credentials
- **Assessments** — Create Assignments, Projects, and Exams grouped by module. Full edit and delete functionality. All assessment types support a lock feature with a configurable release date
- **Classes** — Schedule classes with date, time, duration, recurrence, and optional Microsoft Teams meeting link. Classes appear on the student home page and inside the relevant module
- **Updates** — Post announcements (appear in student Updates tab) or post directly to the student Forums tab with optional links attached. View student replies on forum threads, including student name and student number

### Shared Features
- **Multiple Choice Quizzes** — Lecturers build quizzes per module with any number of questions, four options each, correct answer marking, and an optional release date lock. Students take quizzes natively in-app with instant scored feedback
- **Live Date Engine** — Assessment statuses (Overdue, Urgent, Upcoming, Locked) are computed automatically from the device clock and refresh at midnight without a page reload
- **Shared State** — All data (quizzes, assessments, classes, announcements, forum posts, replies) is shared in real time between the lecturer and student views within the same session

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| Icons | Lucide React |
| Fonts | Sora, Plus Jakarta Sans (Google Fonts) |
| Styling | Inline CSS-in-JS |
| State Management | React useState / useEffect |
| No backend | All data is in-memory React state |

---

## Getting Started

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/unisa-mymodules.git

# Navigate into the project
cd unisa-mymodules

# Install dependencies
npm install

# Start the development server
npm start
```

The app opens at `http://localhost:3000`.

### Demo Credentials

| Role | Username | Password |
|---|---|---|
| Student | `lerato.dlamini` | `student123` |
| Lecturer | `prof.mokoena` | `lecturer123` |

---

## Project Structure
