\# LMS — Learning Management System



A full-stack Learning Management System built with Next.js and Strapi, featuring role-based access control, course management, progress tracking, auto-graded quizzes, and a blog with a draft/publish workflow.



\## Live Links



\- \*\*Frontend (Vercel):\*\* https://lms-frontend-rust-seven.vercel.app

\- \*\*Backend (Railway):\*\* https://lms-backend-production-4fbf.up.railway.app

\- \*\*Backend Admin Panel:\*\* https://lms-backend-production-4fbf.up.railway.app/admin

\- \*\*GitHub — Backend:\*\* https://github.com/Parishmitasinha/lms-backend

\- \*\*GitHub — Frontend:\*\* https://github.com/Parishmitasinha/lms-frontend

\- \*\*Video Walkthrough:\*\* \[ADD YOUR VIDEO LINK HERE]



\## Tech Stack



| Layer | Technology |

|---|---|

| Frontend | Next.js (App Router), TypeScript |

| Backend / CMS | Strapi v4 |

| Database | PostgreSQL (production, Railway) / SQLite (local dev) |

| Frontend Hosting | Vercel |

| Backend Hosting | Railway |



\## User Roles



| Role | Description |

|---|---|

| \*\*Admin\*\* | Full control of the platform. Manages users and assigns/changes roles. |

| \*\*Content Manager\*\* | Creates and manages courses, lessons, quizzes, and blog posts platform-wide. Does not manage users. |

| \*\*Instructor\*\* | Manages lessons and quizzes for their own assigned courses only, and views progress of enrolled students. |

| \*\*Student\*\* | Enrolls in courses, views lessons, takes quizzes, and tracks their own progress. |



\## Permission Matrix



| Action | Admin | Content Manager | Instructor | Student |

|---|---|---|---|---|

| Manage users \& assign roles | ✅ | ❌ | ❌ | ❌ |

| Create / edit / delete any course | ✅ | ✅ | Own only | ❌ |

| Add / edit / delete lessons | ✅ | ✅ | Own courses | ❌ |

| Create quizzes | ✅ | ✅ | Own courses | ❌ |

| View student progress | ✅ | ✅ | Own courses | Own only |

| Write / manage blog posts | ✅ | ✅ | ❌ | ❌ |

| Enroll in a course | ❌ | ❌ | ❌ | ✅ |

| Take quizzes | ❌ | ❌ | ❌ | ✅ |



Access control is enforced on the \*\*backend\*\* via custom Strapi controllers (`backend/src/api/\*/controllers/`) — not just by hiding UI elements on the frontend. Every restricted create/update/delete action checks the logged-in user's role (and, for Instructors, ownership of the specific course) before allowing the request through.



\## How to Run Locally



\### Prerequisites

\- Node.js 18 or later

\- npm



\### 1. Backend Setup



```bash

cd backend

npm install

```



Create a `.env` file in `backend/` with the following (generate each secret with `node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"`):



```env

HOST=0.0.0.0

PORT=1337

APP\_KEYS=key1,key2,key3,key4

API\_TOKEN\_SALT=your-generated-salt

ADMIN\_JWT\_SECRET=your-generated-secret

TRANSFER\_TOKEN\_SALT=your-generated-salt

JWT\_SECRET=your-generated-secret

DATABASE\_CLIENT=sqlite

DATABASE\_FILENAME=.tmp/data.db

```



Start the server:

```bash

npm run develop

```



Visit `http://localhost:1337/admin` and create your first Strapi admin account.



\*\*One-time setup after first run\*\* (required for role-based access to work):

1\. Go to \*\*Settings → Users \& Permissions Plugin → Roles\*\*

2\. Create four roles: `Admin`, `Content Manager`, `Instructor`, `Student`

3\. Configure permissions for each role according to the Permission Matrix above. Important: Student needs `find`/`findOne` on \*\*Lesson\*\* (not just Course) so lesson data populates correctly through enrolled courses, and needs the custom `submit` permission enabled on \*\*QuizAttempt\*\* for quiz submission to work

4\. Go to \*\*Advanced Settings\*\* and set "Default role for authenticated users" to `Student`



\### 2. Frontend Setup



```bash

cd frontend

npm install

```



Create `.env.local` in `frontend/`:

```env

NEXT\_PUBLIC\_STRAPI\_URL=http://localhost:1337

```



Start the dev server:

```bash

npm run dev

```



Visit `http://localhost:3000`.



\## Features Completed



\### Core Features

\- \[x] Sign up / Login with role assignment (defaults to Student; Admin promotes users afterward)

\- \[x] Backend-enforced role-based protected routes — verified via custom Strapi controllers, not just hidden UI

\- \[x] Course management — create/edit/delete per role (Content Manager platform-wide, Instructor own-courses-only)

\- \[x] Lesson management under courses (title + text or video URL content)

\- \[x] Student course browsing and enrollment

\- \[x] "My Courses" view showing enrolled courses separately

\- \[x] Sequential lesson viewing for enrolled students



\### Differentiator Features

\- \[x] \*\*Progress tracking\*\* — students mark lessons complete; percentage is calculated per student per course and persists across refreshes (recalculated from the database on every load, not cached client-side)

\- \[x] \*\*Quiz auto-grading\*\* — MCQ quizzes with server-side grading (score computed on the backend from the student's submitted answers, never trusted from the frontend); results stored and viewable

\- \[x] \*\*Admin panel\*\* — dedicated admin-only dashboard with user role management and platform statistics (users by role, total courses, total enrollments)

\- \[x] \*\*Blog\*\* — draft/publish workflow using Strapi's built-in Draft \& Publish feature; only published posts are visible publicly, drafts are visible only to Content Managers/Admins



\## Known Limitations



\- Assigning an Instructor to a course is currently done by an Admin/Content Manager setting the course's `instructor` relation directly (via the course edit form or Strapi admin); there is no dedicated "assign instructor" UI shortcut yet.

\- UI styling is functional and clean but intentionally kept simple rather than extensively designed, to prioritize correctness of role-based access and feature completeness.

\- Email confirmation on signup is disabled for local/demo simplicity (no email service configured).



\## Project Structure

